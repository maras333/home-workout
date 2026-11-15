import { useCallback, useEffect, useRef, useState } from 'react'
import { loadSoundSettings, saveSoundSettings, type SoundSettings } from '@/workout'
import type { Step } from '@/workout/follow-along'
import { cueAt, type Beep } from './cues'
import type { PlayerState } from './player'

/** Beeps and voice on/off, both on by default, remembered in browser storage. */
export function useSoundSettings(): [SoundSettings, (settings: SoundSettings) => void] {
  const [settings, setSettings] = useState(loadSoundSettings)
  const change = (next: SoundSettings) => {
    setSettings(next)
    saveSoundSettings(next)
  }
  return [settings, change]
}

type Tone = { frequency: number; at: number; seconds: number }

/** Every beep is made of short sine tones generated in the browser; no audio files. */
const TONES: Record<Beep, Tone[]> = {
  countdown: [{ frequency: 880, at: 0, seconds: 0.12 }],
  start: [{ frequency: 1320, at: 0, seconds: 0.35 }],
  switch: [
    { frequency: 1000, at: 0, seconds: 0.1 },
    { frequency: 1000, at: 0.18, seconds: 0.1 },
  ],
  finish: [
    { frequency: 523, at: 0, seconds: 0.2 },
    { frequency: 659, at: 0.2, seconds: 0.2 },
    { frequency: 784, at: 0.4, seconds: 0.6 },
  ],
}

const VOLUME = 0.2

/**
 * Browsers hold audio back until the page has been tapped. Clicking Start Workout usually
 * counts; otherwise the next tap or key on Follow-along lets it play.
 */
function useAudio(): () => AudioContext | null {
  const audio = useRef<AudioContext | null>(null)

  const get = useCallback(() => {
    if (typeof AudioContext === 'undefined') return null
    audio.current ??= new AudioContext()
    if (audio.current.state === 'suspended') void audio.current.resume().catch(() => {})
    return audio.current
  }, [])

  useEffect(() => {
    window.addEventListener('pointerdown', get, true)
    window.addEventListener('keydown', get, true)
    return () => {
      window.removeEventListener('pointerdown', get, true)
      window.removeEventListener('keydown', get, true)
      void audio.current?.close().catch(() => {})
      audio.current = null
    }
  }, [get])

  return get
}

function playTones(context: AudioContext, tones: readonly Tone[]): void {
  // Still held back: drop the beep rather than have it burst out late.
  if (context.state !== 'running') return
  for (const { frequency, at, seconds } of tones) {
    const start = context.currentTime + at
    const oscillator = context.createOscillator()
    const gain = context.createGain()
    oscillator.type = 'sine'
    oscillator.frequency.value = frequency
    // Fade out rather than cut off, which would click.
    gain.gain.setValueAtTime(VOLUME, start)
    gain.gain.exponentialRampToValueAtTime(0.001, start + seconds)
    oscillator.connect(gain).connect(context.destination)
    oscillator.start(start)
    oscillator.stop(start + seconds)
  }
}

const hasSpeech = () =>
  typeof speechSynthesis !== 'undefined' && typeof SpeechSynthesisUtterance !== 'undefined'

/** Stops whatever the browser's voice is saying or about to say. */
function stopSpeaking(): void {
  // Chrome can drop the next utterance after a needless cancel, so only cancel real speech.
  if (hasSpeech() && (speechSynthesis.speaking || speechSynthesis.pending)) {
    speechSynthesis.cancel()
  }
}

/** Speaks with the browser's built-in voice, cutting off whatever it was still saying. */
function say(text: string): void {
  if (!hasSpeech()) return
  stopSpeaking()
  speechSynthesis.speak(new SpeechSynthesisUtterance(text))
}

/**
 * Beeps and speaks as Follow-along reaches each new position. Nothing plays for the
 * position it opens on, so a remount does not repeat the last cue; a position reached
 * while paused plays its cue on Resume.
 */
export function useCues(steps: readonly Step[], state: PlayerState, settings: SoundSettings): void {
  const { index, elapsed, paused } = state
  const { beeps, voice } = settings
  const audio = useAudio()
  const played = useRef(`${index}:${elapsed}`)

  useEffect(() => {
    const at = `${index}:${elapsed}`
    if (paused || played.current === at) return
    played.current = at

    const cue = cueAt(steps, { index, elapsed })
    if (cue.beep && beeps) {
      const context = audio()
      if (context) playTones(context, TONES[cue.beep])
    }
    if (cue.speech && voice) say(cue.speech)
  }, [steps, index, elapsed, paused, beeps, voice, audio])

  useEffect(() => {
    if (!voice) stopSpeaking()
  }, [voice])

  useEffect(() => stopSpeaking, [])
}
