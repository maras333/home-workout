import { useCallback, useEffect, useRef, useState } from 'react'
import { useLanguage } from '@/language'
import { loadSoundSettings, saveSoundSettings, type SoundSettings } from '@/workout'
import type { Step } from '@/workout/follow-along'
import { cueAt, type Beep } from './cues'
import type { PlayerState } from './player'
import { say, stopSpeaking, type Speaker } from './voice'

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

/**
 * Beeps and speaks as Follow-along reaches each new position. Nothing plays for the
 * running position it opens on; a position reached or opened while paused plays its cue
 * on Resume.
 */
export function useCues(
  steps: readonly Step[],
  state: PlayerState,
  settings: SoundSettings,
  speaker: Speaker,
): void {
  const { index, elapsed, paused } = state
  const { beeps } = settings
  // Without a voice for the Language, stay silent but leave the saved setting as it is.
  const voiceOn = settings.voice && speaker.canSpeak
  const audio = useAudio()
  const { language } = useLanguage()
  // Opening paused (resumed progress), the cue waits for Resume; otherwise it already passed.
  const played = useRef<string | null>(paused ? null : `${index}:${elapsed}`)

  // A new Language cuts off the cue in progress; the next one comes in the new Language.
  // Declared before the cue effect, so a cue reached in the same render is not cut off.
  useEffect(() => stopSpeaking(), [language])

  useEffect(() => {
    const at = `${index}:${elapsed}`
    if (paused || played.current === at) return
    played.current = at

    const cue = cueAt(steps, { index, elapsed }, language)
    if (cue.beep && beeps) {
      const context = audio()
      if (context) playTones(context, TONES[cue.beep])
    }
    if (cue.speech && voiceOn) say(cue.speech, speaker)
  }, [steps, index, elapsed, paused, beeps, voiceOn, speaker, audio, language])

  useEffect(() => {
    if (!voiceOn) stopSpeaking()
  }, [voiceOn])

  useEffect(() => stopSpeaking, [])
}
