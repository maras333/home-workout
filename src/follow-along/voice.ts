import { useEffect, useMemo, useState } from 'react'
import { useText } from '@/language'

const hasSpeech = () =>
  typeof speechSynthesis !== 'undefined' && typeof SpeechSynthesisUtterance !== 'undefined'

/** Stops whatever the browser's voice is saying or about to say. */
export function stopSpeaking(): void {
  // Chrome can drop the next utterance after a needless cancel, so only cancel real speech.
  if (hasSpeech() && (speechSynthesis.speaking || speechSynthesis.pending)) {
    speechSynthesis.cancel()
  }
}

/**
 * The browser's voices, read again whenever it announces its list changed: Chrome fills it
 * only after the page loads, Safari may never announce it.
 */
function useBrowserVoices(): readonly SpeechSynthesisVoice[] {
  const [voices, setVoices] = useState(() =>
    hasSpeech() ? (speechSynthesis.getVoices?.() ?? []) : [],
  )
  useEffect(() => {
    if (!hasSpeech() || !speechSynthesis.addEventListener) return
    const synth = speechSynthesis
    const update = () => setVoices(synth.getVoices())
    synth.addEventListener('voiceschanged', update)
    return () => synth.removeEventListener('voiceschanged', update)
  }, [])
  return voices
}

/** Who speaks Follow-along's cues in the current Language. */
export type Speaker = {
  /** The language tag each utterance carries, e.g. "pl-PL". */
  tag: string
  /** The browser voice for that tag, or null to leave the choice to the browser. */
  voice: SpeechSynthesisVoice | null
  canSpeak: boolean
  /** The browser can speak, but has no voice for this Language: the 🗣 toggle says so. */
  voiceMissing: boolean
}

const normalise = (lang: string) => lang.replace('_', '-').toLowerCase()

/**
 * The browser voice for the current Language, matched on the language tag ("pl-PL", then
 * any "pl"). Without one, the browser's default voice speaks only where the Language allows.
 */
export function useSpeaker(): Speaker {
  const { tag, speaksWithDefaultVoice } = useText().speech
  const voices = useBrowserVoices()
  return useMemo(() => {
    const wanted = tag.toLowerCase()
    const [base] = wanted.split('-')
    const voice =
      voices.find((candidate) => normalise(candidate.lang) === wanted) ??
      voices.find((candidate) => normalise(candidate.lang).split('-')[0] === base) ??
      null
    const voiceMissing = hasSpeech() && voice === null && !speaksWithDefaultVoice
    return { tag, voice, canSpeak: hasSpeech() && !voiceMissing, voiceMissing }
  }, [tag, speaksWithDefaultVoice, voices])
}

/** Speaks with the Speaker's voice, cutting off whatever it was still saying. */
export function say(text: string, { tag, voice }: Speaker): void {
  if (!hasSpeech()) return
  stopSpeaking()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = tag
  if (voice) utterance.voice = voice
  speechSynthesis.speak(utterance)
}
