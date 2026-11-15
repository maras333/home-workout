import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { App } from '@/App'
import { library, type Exercise } from '@/library'
import type { Workout, WorkoutSet } from '@/workout'

function exercise(id: string, name: string): Exercise {
  return {
    id,
    name,
    steps: ['Do it.'],
    gifUrl: `/exercisedb/${id}.gif`,
    muscleGroups: { primary: ['legs'], secondary: [] },
    equipment: [],
    difficulty: 'beginner',
    workoutTypes: ['full body'],
    blockRoles: ['main'],
    measure: 'time',
    perSide: false,
  }
}

const pushUp = library.find((candidate) => candidate.id === 'I4hDWkc')!

const armCircle: WorkoutSet = {
  exercise: exercise('arm', 'arm circle'),
  target: { measure: 'time', seconds: 20 },
  perSide: false,
}
const pushUps: WorkoutSet = {
  exercise: pushUp,
  target: { measure: 'reps', reps: 5 },
  perSide: false,
}
const sidePlank: WorkoutSet = {
  exercise: exercise('plank', 'side plank'),
  target: { measure: 'time', seconds: 10 },
  perSide: true,
}
const childPose: WorkoutSet = {
  exercise: exercise('child', 'child pose'),
  target: { measure: 'time', seconds: 21 },
  perSide: false,
}

/**
 * Timeline, in seconds from Start:
 *   0 Get ready (5) · 5 arm circle (20) · 25 Change-over (10) · 35 push-up, 5 reps (15)
 *   50 Rest (15) · 65 side plank, 10 s per side (20) · 85 Rest between Rounds (30)
 *   115 push-up (15), the last Round stopping after 1 Set · 130 Change-over (10)
 *   140 child pose (21) · 161 complete.
 * Push-up is in the library with a Polish name; the others are not, so they keep their saved names.
 */
const workout: Workout = {
  request: { workoutType: 'full body', minutes: 15, difficulty: 'beginner', equipment: [] },
  warmUp: [armCircle],
  main: {
    sets: [pushUps, sidePlank],
    rounds: 2,
    lastRoundSets: 1,
    restSeconds: 15,
    roundRestSeconds: 30,
  },
  coolDown: [childPose],
}

const LANGUAGE_KEY = 'home-workout:language'
const SOUND_KEY = 'home-workout:sound-settings'

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

/** Moves the clock on by whole seconds, rendering after each one as the browser would. */
function wait(seconds: number) {
  for (let second = 0; second < seconds; second++) {
    act(() => {
      vi.advanceTimersByTime(1000)
    })
  }
}

const setupUser = () => userEvent.setup({ advanceTimers: vi.advanceTimersByTime })

/** Tones the app played through the fake AudioContext. */
let tones: number[] = []

class FakeAudioContext {
  currentTime = 0
  state = 'running'
  destination = {}
  resume = async () => {}
  close = async () => {}
  createOscillator() {
    const oscillator = {
      type: 'sine',
      frequency: { value: 0 },
      connect: <T,>(node: T) => node,
      start: () => tones.push(oscillator.frequency.value),
      stop: () => {},
    }
    return oscillator
  }
  createGain() {
    const ramp = () => {}
    return {
      gain: { value: 1, setValueAtTime: ramp, exponentialRampToValueAtTime: ramp },
      connect: <T,>(node: T) => node,
    }
  }
}

type FakeVoice = { name: string; lang: string }

const SAMANTHA: FakeVoice = { name: 'Samantha', lang: 'en-US' }
const ZOSIA: FakeVoice = { name: 'Zosia', lang: 'pl-PL' }

class FakeUtterance {
  readonly text: string
  lang = ''
  voice: FakeVoice | null = null
  constructor(text: string) {
    this.text = text
  }
}

/** What the app said: the text, the language it was tagged with and the voice it chose. */
let spoken: { text: string; lang: string; voice: string | undefined }[] = []
/** The voices the fake browser offers; tests fill it, or change it and announce the change. */
let voices: FakeVoice[] = []
let voicesChanged: (() => void)[] = []
let speech: { speaking: boolean; cancel: ReturnType<typeof vi.fn> }

/** The browser fills its voice list later and says so. */
function announceVoices(next: FakeVoice[]) {
  voices = next
  act(() => voicesChanged.forEach((listener) => listener()))
}

const spokenTexts = () => spoken.map(({ text }) => text)

beforeEach(() => {
  vi.useFakeTimers()
  // Testing Library only drives fake timers it recognises as Jest's.
  vi.stubGlobal('jest', { advanceTimersByTime: vi.advanceTimersByTime.bind(vi) })
  localStorage.clear()
  localStorage.setItem('home-workout:current-workout', JSON.stringify(workout))
  localStorage.setItem(LANGUAGE_KEY, '"pl"')
  const request = vi.fn(async () => ({ released: false, release: async () => {} }))
  Object.defineProperty(navigator, 'wakeLock', { value: { request }, configurable: true })
  tones = []
  vi.stubGlobal('AudioContext', FakeAudioContext)
  spoken = []
  voices = [SAMANTHA, ZOSIA]
  voicesChanged = []
  speech = {
    speaking: false,
    cancel: vi.fn(() => {
      speech.speaking = false
    }),
  }
  vi.stubGlobal('speechSynthesis', {
    get speaking() {
      return speech.speaking
    },
    pending: false,
    speak: (utterance: FakeUtterance) => {
      spoken.push({ text: utterance.text, lang: utterance.lang, voice: utterance.voice?.name })
      speech.speaking = true // the fake never finishes speaking
    },
    cancel: speech.cancel,
    getVoices: () => voices,
    addEventListener: (type: string, listener: () => void) => {
      if (type === 'voiceschanged') voicesChanged.push(listener)
    },
    removeEventListener: (_type: string, listener: () => void) => {
      voicesChanged = voicesChanged.filter((candidate) => candidate !== listener)
    },
  })
  vi.stubGlobal('SpeechSynthesisUtterance', FakeUtterance)
})

afterEach(() => {
  vi.useRealTimers()
  vi.unstubAllGlobals()
  Reflect.deleteProperty(navigator, 'wakeLock')
})

describe('the voice in Polish', () => {
  it('speaks every cue in Polish, tagged pl-PL, with a Polish voice', () => {
    renderAt('/follow-along')

    wait(161)

    expect(spokenTexts()).toEqual([
      'Start.', // arm circle
      'Zmiana. Następne: pompka, 5 powtórzeń.',
      'Start.',
      'Przerwa. Następne: side plank, 10 sekund na stronę.',
      'Start.',
      'Zmień stronę.',
      'Przerwa między rundami. Następne: pompka, 5 powtórzeń.',
      'Start.',
      'Zmiana. Następne: child pose, 21 sekund.',
      'Start.',
      'Trening zakończony.',
    ])
    expect(new Set(spoken.map(({ lang, voice }) => `${lang} ${voice}`))).toEqual(
      new Set(['pl-PL Zosia']),
    )
  })

  it('reads targets with Polish plural forms in full words', () => {
    const counted = (reps: number, seconds: number): Workout => ({
      ...workout,
      main: {
        ...workout.main,
        sets: [
          { ...pushUps, target: { measure: 'reps', reps } },
          { ...sidePlank, target: { measure: 'time', seconds }, perSide: false },
        ],
      },
    })
    localStorage.setItem('home-workout:current-workout', JSON.stringify(counted(1, 22)))
    renderAt('/follow-along')

    wait(5 + 20 + 10 + 3) // 1 rep takes 3 s

    expect(spokenTexts()).toEqual([
      'Start.',
      'Zmiana. Następne: pompka, 1 powtórzenie.',
      'Start.',
      'Przerwa. Następne: side plank, 22 sekundy.',
    ])
  })

  it('stays silent with a hint when the browser has no Polish voice, and still beeps', () => {
    voices = [SAMANTHA]
    renderAt('/follow-along')

    expect(screen.getByText('Brak polskiego głosu w tej przeglądarce')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Głos' })).toHaveAttribute('aria-pressed', 'false')
    wait(30)

    expect(spoken).toEqual([])
    expect(tones).toContain(1320) // the start beep
    expect(localStorage.getItem(SOUND_KEY)).toBeNull()
  })

  it('starts speaking Polish once the browser fills its voice list', () => {
    voices = []
    renderAt('/follow-along')
    expect(screen.getByText('Brak polskiego głosu w tej przeglądarce')).toBeInTheDocument()

    announceVoices([SAMANTHA, ZOSIA])
    wait(5)

    expect(screen.queryByText('Brak polskiego głosu w tej przeglądarce')).not.toBeInTheDocument()
    expect(spoken).toEqual([{ text: 'Start.', lang: 'pl-PL', voice: 'Zosia' }])
  })

  it('cuts off the cue in progress when the Language changes and speaks the next in the new one', async () => {
    localStorage.setItem(LANGUAGE_KEY, '"en"')
    const user = setupUser()
    renderAt('/follow-along')
    wait(25)
    expect(spoken[spoken.length - 1]).toEqual({
      text: 'Change-over. Next: push-up, 5 reps.',
      lang: 'en-US',
      voice: 'Samantha',
    })

    await user.click(screen.getByRole('button', { name: 'PL' }))

    expect(speech.cancel).toHaveBeenCalled()
    expect(screen.getByRole('timer', { name: 'Pozostały czas' })).toHaveTextContent('0:10')
    wait(10)
    expect(spoken[spoken.length - 1]).toEqual({ text: 'Start.', lang: 'pl-PL', voice: 'Zosia' })
  })
})
