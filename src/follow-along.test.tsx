import { act, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { App } from '@/App'
import { library, type Exercise } from '@/library'
import type { Workout, WorkoutSet } from '@/workout'
import { fakeViewport } from '@/test/viewport'

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

const armCircle: WorkoutSet = {
  exercise: exercise('arm', 'arm circle'),
  target: { measure: 'time', seconds: 20 },
  perSide: false,
}
const squat: WorkoutSet = {
  exercise: exercise('squat', 'squat'),
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
  target: { measure: 'time', seconds: 20 },
  perSide: false,
}

/**
 * Timeline, in seconds from Start:
 *   0 Get ready (5) · 5 arm circle (20) · 25 Change-over (10) · 35 squat, 5 reps (15)
 *   50 Rest (15) · 65 side plank, 10 s per side (20) · 85 Rest between Rounds (30)
 *   115 squat (15), the last Round stopping after 1 Set · 130 Change-over (10)
 *   140 child pose (20) · 160 complete. Planned total: 155 s = 2:35.
 */
const workout: Workout = {
  request: { workoutType: 'full body', minutes: 15, difficulty: 'beginner', equipment: [] },
  warmUp: [armCircle],
  main: {
    sets: [squat, sidePlank],
    rounds: 2,
    lastRoundSets: 1,
    restSeconds: 15,
    roundRestSeconds: 30,
  },
  coolDown: [childPose],
}

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

const PROGRESS_KEY = 'home-workout:follow-along-progress'

const setupUser = () => userEvent.setup({ advanceTimers: vi.advanceTimersByTime })

/** Lets the Wake Lock promises settle. */
async function settle() {
  await act(async () => {})
}

const timeLeft = () => screen.getByRole('timer', { name: 'Time left' })
const nowPlaying = () => screen.getByRole('region', { name: 'Now' })
const currentRow = () => screen.getAllByRole('listitem').find((row) => row.ariaCurrent === 'step')

function expectRest(label: string, nextName: string, nextTarget: string, seconds: string) {
  const now = nowPlaying()
  expect(within(now).getByRole('heading', { level: 1, name: label })).toBeInTheDocument()
  expect(now).toHaveTextContent(`Up next${nextName}${nextTarget}`)
  expect(within(now).getByRole('img', { name: nextName })).toBeInTheDocument()
  expect(timeLeft()).toHaveTextContent(seconds)
}

function expectSet(name: string, target: string, seconds: string) {
  const now = nowPlaying()
  expect(within(now).getByRole('heading', { level: 1, name })).toBeInTheDocument()
  expect(now).toHaveTextContent(target)
  expect(within(now).getByRole('img', { name })).toBeInTheDocument()
  expect(timeLeft()).toHaveTextContent(seconds)
  expect(currentRow()).toHaveTextContent(`${name}${target}`)
}

/** Tones the app played through the fake AudioContext, by frequency in Hz. */
let tones: number[] = []

/** The tones played since the last call. */
function takeTones(): number[] {
  const played = tones
  tones = []
  return played
}

const COUNTDOWN = 880
const START = 1320
const SWITCH = 1000
const FINISH = [523, 659, 784]

/** The state a new fake AudioContext starts in; browsers start it suspended without a tap. */
let audioStartsAs: 'running' | 'suspended' = 'running'
let audioContexts: FakeAudioContext[] = []

class FakeAudioContext {
  currentTime = 0
  state = audioStartsAs
  destination = {}
  constructor() {
    audioContexts.push(this)
  }
  resume = vi.fn(async () => {
    await Promise.resolve() // browsers change the state later, never during the call
    this.state = 'running'
  })
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

/** Everything the app said through the fake speechSynthesis, in order. */
let spoken: string[] = []
let speech: {
  speaking: boolean
  pending: boolean
  speak: ReturnType<typeof vi.fn>
  cancel: ReturnType<typeof vi.fn>
}

class FakeUtterance {
  readonly text: string
  constructor(text: string) {
    this.text = text
  }
}

let wakeLock: { request: ReturnType<typeof vi.fn>; release: ReturnType<typeof vi.fn> }

beforeEach(() => {
  vi.useFakeTimers()
  // Testing Library only drives fake timers it recognises as Jest's; without this, its
  // async helpers (and so user-event) wait on a timeout the fake clock never fires.
  vi.stubGlobal('jest', { advanceTimersByTime: vi.advanceTimersByTime.bind(vi) })
  localStorage.clear()
  localStorage.setItem('home-workout:current-workout', JSON.stringify(workout))
  const release = vi.fn(async () => {})
  const request = vi.fn(async () => ({ released: false, release }))
  wakeLock = { request, release }
  Object.defineProperty(navigator, 'wakeLock', { value: { request }, configurable: true })
  tones = []
  audioStartsAs = 'running'
  audioContexts = []
  vi.stubGlobal('AudioContext', FakeAudioContext)
  spoken = []
  speech = {
    speaking: false,
    pending: false,
    speak: vi.fn((utterance: FakeUtterance) => {
      spoken.push(utterance.text)
      speech.speaking = true // the fake never finishes speaking
    }),
    cancel: vi.fn(() => {
      speech.speaking = false
    }),
  }
  vi.stubGlobal('speechSynthesis', speech)
  vi.stubGlobal('SpeechSynthesisUtterance', FakeUtterance)
})

afterEach(() => {
  vi.useRealTimers()
  vi.unstubAllGlobals()
  Reflect.deleteProperty(navigator, 'wakeLock')
})

describe('Follow-along', () => {
  it('starts from the preview with a 5 s "Get ready" showing the first Exercise up next', async () => {
    const user = setupUser()
    renderAt('/workout')

    await user.click(screen.getByRole('button', { name: 'Start Workout' }))

    expectRest('Get ready', 'arm circle', '20 s', '0:05')
    expect(screen.getByText('0:00 / 2:35')).toBeInTheDocument()
    wait(4)
    expect(timeLeft()).toHaveTextContent('0:01')
    expect(screen.getByText('0:00 / 2:35')).toBeInTheDocument()
    wait(1)
    expectSet('arm circle', '20 s', '0:20')
  })

  it('lists the whole Workout by Block and Round', () => {
    renderAt('/follow-along')

    const warmUp = screen.getByRole('region', { name: 'Warm-up' })
    const main = screen.getByRole('region', { name: 'Main' })
    const coolDown = screen.getByRole('region', { name: 'Cool-down' })
    const rows = (block: HTMLElement) =>
      within(block)
        .getAllByRole('listitem')
        .map((row) => row.textContent)

    expect(rows(warmUp)).toEqual(['arm circle20 s'])
    expect(
      within(main)
        .getAllByRole('heading', { level: 3 })
        .map((h) => h.textContent),
    ).toEqual(['Round 1 of 2', 'Round 2 of 2'])
    expect(rows(main)).toEqual(['squat5 reps', 'side plank10 s per side', 'squat5 reps'])
    expect(rows(coolDown)).toEqual(['child pose20 s'])
    expect(screen.getByRole('contentinfo')).toHaveTextContent(
      'Exercise data & GIFs: ExerciseDB (AGPL-3.0) · Source code',
    )
    for (const row of screen.getAllByRole('listitem')) {
      expect(row.querySelector('img')).toHaveAttribute(
        'src',
        expect.stringMatching(/^\/exercisedb\/\w+\.gif$/),
      )
    }
  })

  it('counts down every Set and rest and moves on by itself, to the complete screen', () => {
    renderAt('/follow-along')

    wait(5)
    expectSet('arm circle', '20 s', '0:20')
    wait(12)
    expect(timeLeft()).toHaveTextContent('0:08')
    expect(screen.getByText('0:12 / 2:35')).toBeInTheDocument()
    expect(screen.getByRole('progressbar', { name: 'Set progress' })).toHaveAttribute(
      'aria-valuenow',
      '60',
    )

    // The change-over between the warm-up and the main Block.
    wait(8)
    expectRest('Change-over', 'squat', '5 reps', '0:10')
    expect(screen.getByRole('progressbar', { name: 'Rest progress' })).toBeInTheDocument()
    expect(screen.getByText('Done:').closest('li')).toHaveTextContent('arm circle')
    expect(currentRow()).toBeUndefined()

    wait(10)
    expectSet('squat', '5 reps', '0:15') // 5 reps × 3 s
    expect(nowPlaying()).toHaveTextContent('Main · Round 1 of 2')

    wait(15)
    expectRest('Rest', 'side plank', '10 s per side', '0:15')

    wait(15)
    expectSet('side plank', '10 s per side', '0:20') // doubled per side

    wait(20)
    expectRest('Rest between Rounds', 'squat', '5 reps', '0:30')

    wait(30)
    expectSet('squat', '5 reps', '0:15')
    expect(nowPlaying()).toHaveTextContent('Main · Round 2 of 2')
    expect(screen.getAllByText('Done:')).toHaveLength(3)

    // The last Round stops after one Set; the change-over into the cool-down follows.
    wait(15)
    expectRest('Change-over', 'child pose', '20 s', '0:10')

    wait(10)
    expectSet('child pose', '20 s', '0:20')
    wait(19)
    expect(screen.getByText('2:34 / 2:35')).toBeInTheDocument()

    wait(1)
    expect(screen.getByRole('heading', { level: 1, name: 'Workout complete' })).toBeInTheDocument()
    expect(screen.queryByRole('timer')).not.toBeInTheDocument()
    wait(60)
    expect(screen.getByRole('heading', { level: 1, name: 'Workout complete' })).toBeInTheDocument()
  })

  it('preloads the next Exercise’s GIF', () => {
    // A GIF path no other test uses, as the browser keeps preloads for the whole page.
    const saved = JSON.stringify(workout).split('/squat.gif').join('/preload-squat.gif')
    localStorage.setItem('home-workout:current-workout', saved)
    const preloaded = () =>
      document.head.querySelector('link[rel="preload"][href="/exercisedb/preload-squat.gif"]')
    renderAt('/follow-along')
    expect(preloaded()).toBeNull()

    wait(5) // arm circle starts; squat comes next

    expect(preloaded()).not.toBeNull()
  })

  it('keeps the screen awake until the Workout is complete', async () => {
    renderAt('/follow-along')
    await settle()

    expect(wakeLock.request).toHaveBeenCalledWith('screen')
    wait(150)
    await settle()
    expect(wakeLock.release).not.toHaveBeenCalled()

    wait(10)
    await settle()
    expect(screen.getByRole('heading', { name: 'Workout complete' })).toBeInTheDocument()
    expect(wakeLock.release).toHaveBeenCalledTimes(1)
  })

  it('lets the screen sleep again when you leave mid-Workout', async () => {
    const { unmount } = renderAt('/follow-along')
    await settle()

    unmount()
    await settle()

    expect(wakeLock.release).toHaveBeenCalledTimes(1)
  })

  it('works in browsers without the Wake Lock API', () => {
    Reflect.deleteProperty(navigator, 'wakeLock')
    renderAt('/follow-along')

    wait(5)

    expectSet('arm circle', '20 s', '0:20')
  })

  it('sends you to the Workout Request form when no Workout is saved', () => {
    localStorage.clear()

    renderAt('/follow-along')

    expect(screen.getByRole('heading', { level: 1, name: 'Workout Request' })).toBeInTheDocument()
  })
})

describe('Follow-along controls', () => {
  it('pauses and resumes with the button and with Space', async () => {
    const user = setupUser()
    renderAt('/follow-along')
    wait(7)
    expectSet('arm circle', '20 s', '0:18')

    await user.click(screen.getByRole('button', { name: 'Pause' }))
    wait(10)
    expect(timeLeft()).toHaveTextContent('0:18')

    await user.click(screen.getByRole('button', { name: 'Resume' }))
    wait(3)
    expect(timeLeft()).toHaveTextContent('0:15')

    await user.keyboard(' ')
    wait(10)
    expect(timeLeft()).toHaveTextContent('0:15')
    expect(screen.getByRole('button', { name: 'Resume' })).toBeInTheDocument()

    await user.keyboard(' ')
    wait(5)
    expect(timeLeft()).toHaveTextContent('0:10')
  })
  it('skips to the next Set or rest with the button and with N', async () => {
    const user = setupUser()
    renderAt('/follow-along')

    await user.click(screen.getByRole('button', { name: 'Skip' }))
    expectSet('arm circle', '20 s', '0:20')
    wait(4)

    await user.keyboard('n')
    expectRest('Change-over', 'squat', '5 reps', '0:10')
    expect(screen.getByText('0:20 / 2:35')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Skip' }))
    expectSet('squat', '5 reps', '0:15')
    wait(1)
    expect(timeLeft()).toHaveTextContent('0:14')
  })

  it('restarts the Set when more than 3 s in, otherwise goes back to the previous Exercise', async () => {
    const user = setupUser()
    renderAt('/follow-along')
    wait(5 + 20 + 10 + 4) // 4 s into the first squat
    expectSet('squat', '5 reps', '0:11')

    await user.click(screen.getByRole('button', { name: 'Back' }))
    expectSet('squat', '5 reps', '0:15')

    wait(3)
    await user.keyboard('b')
    expectSet('arm circle', '20 s', '0:20')

    // Back from a rest: the Exercise before it.
    wait(20 + 2)
    expectRest('Change-over', 'squat', '5 reps', '0:08')
    await user.keyboard('b')
    expectSet('arm circle', '20 s', '0:20')

    // Nothing before the first Exercise: it restarts.
    await user.keyboard('b')
    expectSet('arm circle', '20 s', '0:20')
  })
  it('pauses with Space even after clicking another control', async () => {
    const user = setupUser()
    renderAt('/follow-along')

    await user.click(screen.getByRole('button', { name: 'Skip' }))
    await user.keyboard(' ')
    wait(5)

    expectSet('arm circle', '20 s', '0:20')
    expect(screen.getByRole('button', { name: 'Resume' })).toBeInTheDocument()
  })

  it('tells you when to switch sides on a per-side Set', () => {
    renderAt('/follow-along')
    wait(65)
    expectSet('side plank', '10 s per side', '0:20')
    expect(nowPlaying()).toHaveTextContent('Side 1 of 2')

    wait(9)
    expect(nowPlaying()).toHaveTextContent('Side 1 of 2')
    wait(1)
    expect(nowPlaying()).toHaveTextContent('Side 2 of 2 — switch!')
    expect(timeLeft()).toHaveTextContent('0:10')

    wait(3)
    expect(nowPlaying()).toHaveTextContent('Side 2 of 2')
    expect(nowPlaying()).not.toHaveTextContent('switch!')
  })

  it('shows no side on Sets that are not per side', () => {
    renderAt('/follow-along')
    wait(5)
    expect(nowPlaying()).not.toHaveTextContent('Side')
  })
})

describe('Follow-along sound', () => {
  it('beeps 3-2-1 before each Set or rest ends and a start tone when a Set begins', () => {
    renderAt('/follow-along')
    wait(1)
    expect(takeTones()).toEqual([])

    wait(1) // 3 s left of "Get ready"
    expect(takeTones()).toEqual([COUNTDOWN])
    wait(2)
    expect(takeTones()).toEqual([COUNTDOWN, COUNTDOWN])

    wait(1)
    expect(takeTones()).toEqual([START])

    // arm circle ends into the change-over: 3-2-1, and no start tone for a rest.
    wait(19)
    expect(takeTones()).toEqual([COUNTDOWN, COUNTDOWN, COUNTDOWN])
    wait(1)
    expect(takeTones()).toEqual([])
  })

  it('double-beeps at the side switch', () => {
    renderAt('/follow-along')
    wait(65 + 9)
    takeTones()

    wait(1)

    expect(takeTones()).toEqual([SWITCH, SWITCH])
  })

  it('plays a finish tone at the end of the Workout', () => {
    renderAt('/follow-along')
    wait(159)
    takeTones()

    wait(1)

    expect(screen.getByRole('heading', { name: 'Workout complete' })).toBeInTheDocument()
    expect(takeTones()).toEqual(FINISH)
  })

  it('plays the start tone again when Back restarts a Set', async () => {
    const user = setupUser()
    renderAt('/follow-along')
    wait(5 + 10)
    takeTones()

    await user.keyboard('b')

    expect(takeTones()).toEqual([START])
  })

  it('drops beeps while the browser holds audio back, and asks again on your first tap', async () => {
    audioStartsAs = 'suspended'
    const user = setupUser()
    renderAt('/follow-along')
    wait(2) // 3 s left
    expect(takeTones()).toEqual([])
    await settle()
    const [audio] = audioContexts
    audio.state = 'suspended' // the browser refused to resume it without a tap
    audio.resume.mockClear()

    await user.click(screen.getByRole('button', { name: 'Pause' }))

    expect(audio.resume).toHaveBeenCalled()
    await user.click(screen.getByRole('button', { name: 'Resume' }))
    wait(1)
    expect(takeTones()).toEqual([COUNTDOWN])
  })

  it('stays silent in browsers without Web Audio', () => {
    vi.stubGlobal('AudioContext', undefined)
    renderAt('/follow-along')

    wait(6)

    expectSet('arm circle', '20 s', '0:19')
  })
})

describe('Follow-along voice', () => {
  it('announces each rest with what comes next, each Set start, the side switch and the end', () => {
    renderAt('/follow-along')

    wait(160)

    expect(spoken).toEqual([
      'Go.', // arm circle
      'Change-over. Next: squat, 5 reps.',
      'Go.',
      'Rest. Next: side plank, 10 seconds per side.',
      'Go.',
      'Switch sides.',
      'Rest between Rounds. Next: squat, 5 reps.',
      'Go.',
      'Change-over. Next: child pose, 20 seconds.',
      'Go.',
      'Workout complete.',
    ])
    expect(screen.getByRole('heading', { name: 'Workout complete' })).toBeInTheDocument()
  })

  // Spoken in Polish only with a Polish voice: see src/follow-along-voice-polish.test.tsx.
  it('shows a translated Exercise up next in the current Language', () => {
    const pushUp = library.find((candidate) => candidate.id === 'I4hDWkc')!
    const withPushUp: Workout = {
      ...workout,
      main: { ...workout.main, sets: [{ ...squat, exercise: pushUp }, sidePlank] },
    }
    localStorage.setItem('home-workout:current-workout', JSON.stringify(withPushUp))
    localStorage.setItem('home-workout:language', '"pl"')
    renderAt('/follow-along')

    wait(25)

    const now = screen.getByRole('region', { name: 'Teraz' })
    expect(within(now).getByRole('img', { name: 'pompka' })).toBeInTheDocument()
  })

  it('waits for Resume before announcing a Set reached while paused', async () => {
    const user = setupUser()
    renderAt('/follow-along')
    wait(5)
    await user.keyboard(' ')
    spoken = []

    await user.keyboard('n')
    await user.keyboard('n')
    expect(spoken).toEqual([])
    expectSet('squat', '5 reps', '0:15')

    await user.keyboard(' ')
    expect(spoken).toEqual(['Go.'])
  })

  it('works in browsers without speech', () => {
    vi.stubGlobal('speechSynthesis', undefined)
    vi.stubGlobal('SpeechSynthesisUtterance', undefined)
    renderAt('/follow-along')

    wait(6)

    expectSet('arm circle', '20 s', '0:19')
  })
})

describe('Follow-along sound toggles', () => {
  const beepsToggle = () => screen.getByRole('button', { name: 'Beeps' })
  const voiceToggle = () => screen.getByRole('button', { name: 'Voice' })

  it('has beeps and voice on by default', () => {
    renderAt('/follow-along')

    expect(beepsToggle()).toHaveAttribute('aria-pressed', 'true')
    expect(beepsToggle()).toHaveTextContent('🔔')
    expect(voiceToggle()).toHaveAttribute('aria-pressed', 'true')
    expect(voiceToggle()).toHaveTextContent('🗣')
  })

  it('silences the beeps and the voice separately, and remembers it', async () => {
    const user = setupUser()
    const { unmount } = renderAt('/follow-along')

    await user.click(beepsToggle())
    wait(5)
    expect(beepsToggle()).toHaveAttribute('aria-pressed', 'false')
    expect(takeTones()).toEqual([])
    expect(spoken).toEqual(['Go.'])

    await user.click(voiceToggle())
    await user.click(beepsToggle())
    wait(20)
    expect(takeTones()).toEqual([COUNTDOWN, COUNTDOWN, COUNTDOWN])
    expect(spoken).toEqual(['Go.'])

    unmount()
    takeTones()
    renderAt('/follow-along') // back paused at the start of the change-over
    expect(beepsToggle()).toHaveAttribute('aria-pressed', 'true')
    expect(voiceToggle()).toHaveAttribute('aria-pressed', 'false')
    await user.click(screen.getByRole('button', { name: 'Resume' }))
    wait(10)
    expect(takeTones()).toEqual([COUNTDOWN, COUNTDOWN, COUNTDOWN, START])
    expect(spoken).toEqual(['Go.'])
  })

  it('stops speaking at once when the voice is switched off', async () => {
    const user = setupUser()
    renderAt('/follow-along')
    wait(5)
    speech.cancel.mockClear()

    await user.click(voiceToggle())

    expect(speech.cancel).toHaveBeenCalled()
  })

  it('falls back to both on when the saved settings are corrupt', () => {
    localStorage.setItem('home-workout:sound-settings', '{"beeps": "loud"')
    renderAt('/follow-along')

    expect(beepsToggle()).toHaveAttribute('aria-pressed', 'true')
    expect(voiceToggle()).toHaveAttribute('aria-pressed', 'true')
  })
})

describe('Follow-along progress', () => {
  it('comes back paused at the start of the Set it was on', async () => {
    const user = setupUser()
    const { unmount } = renderAt('/follow-along')
    wait(5 + 20 + 10 + 4) // 4 s into the first squat
    unmount()
    spoken = []
    takeTones()

    renderAt('/follow-along')

    expectSet('squat', '5 reps', '0:15')
    expect(screen.getByText('Done:').closest('li')).toHaveTextContent('arm circle')
    wait(10)
    expect(timeLeft()).toHaveTextContent('0:15')
    expect(spoken).toEqual([])

    await user.click(screen.getByRole('button', { name: 'Resume' }))
    expect(spoken).toEqual(['Go.'])
    expect(takeTones()).toEqual([START])
    wait(1)
    expect(timeLeft()).toHaveTextContent('0:14')
  })

  it('comes back at the start of the rest it was on', () => {
    const { unmount } = renderAt('/follow-along')
    wait(5 + 20 + 7)
    unmount()

    renderAt('/follow-along')

    expectRest('Change-over', 'squat', '5 reps', '0:10')
    expect(screen.getByRole('button', { name: 'Resume' })).toBeInTheDocument()
  })

  it('ignores progress older than 12 hours and starts afresh', () => {
    const { unmount } = renderAt('/follow-along')
    wait(5 + 20 + 10)
    unmount()
    expect(localStorage.getItem(PROGRESS_KEY)).not.toBeNull()
    vi.setSystemTime(Date.now() + 12 * 60 * 60 * 1000 + 1000)

    renderAt('/follow-along')

    expectRest('Get ready', 'arm circle', '20 s', '0:05')
    expect(screen.getByRole('button', { name: 'Pause' })).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem(PROGRESS_KEY)!)).toMatchObject({ index: 0 })
  })

  it('still resumes progress just under 12 hours old', () => {
    const { unmount } = renderAt('/follow-along')
    wait(5 + 20 + 10)
    unmount()
    vi.setSystemTime(Date.now() + 12 * 60 * 60 * 1000 - 1000)

    renderAt('/follow-along')

    expectSet('squat', '5 reps', '0:15')
  })

  it('starts from the top when the saved progress is corrupt', () => {
    localStorage.setItem(PROGRESS_KEY, '{"index": "three"')

    renderAt('/follow-along')

    expectRest('Get ready', 'arm circle', '20 s', '0:05')
  })

  it('comes back paused at "Get ready" when reloaded during it', () => {
    const { unmount } = renderAt('/follow-along')
    wait(2)
    unmount()

    renderAt('/follow-along')

    expectRest('Get ready', 'arm circle', '20 s', '0:05')
    expect(screen.getByRole('button', { name: 'Resume' })).toBeInTheDocument()
  })

  it('forgets the progress when a new Workout is generated', async () => {
    const user = setupUser()
    const { unmount } = renderAt('/follow-along')
    wait(5 + 20 + 10)
    unmount()

    renderAt('/')
    await user.click(screen.getByRole('button', { name: 'Generate' }))

    expect(localStorage.getItem(PROGRESS_KEY)).toBeNull()
  })

  it('starts from the top when the saved Step is beyond this Workout', () => {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify({ index: 99, savedAt: Date.now() }))

    renderAt('/follow-along')

    expectRest('Get ready', 'arm circle', '20 s', '0:05')
    expect(screen.getByRole('button', { name: 'Pause' })).toBeInTheDocument()
  })

  it('clears the progress once the Workout is complete', () => {
    renderAt('/follow-along')
    wait(100)
    expect(localStorage.getItem(PROGRESS_KEY)).not.toBeNull()

    wait(60)

    expect(screen.getByRole('heading', { name: 'Workout complete' })).toBeInTheDocument()
    expect(localStorage.getItem(PROGRESS_KEY)).toBeNull()
  })

  it('starts afresh when you press Start Workout on the preview', async () => {
    const user = setupUser()
    const { unmount } = renderAt('/follow-along')
    wait(5 + 20 + 10)
    unmount()

    renderAt('/workout')
    await user.click(screen.getByRole('button', { name: 'Start Workout' }))

    expectRest('Get ready', 'arm circle', '20 s', '0:05')
    expect(screen.getByRole('button', { name: 'Pause' })).toBeInTheDocument()
  })
})

describe('End Workout', () => {
  const timeline = () => screen.getByRole('complementary')

  it('asks first, then clears the progress and goes to the Workout Request form', async () => {
    const user = setupUser()
    renderAt('/follow-along')
    wait(5 + 20 + 10)
    expect(localStorage.getItem(PROGRESS_KEY)).not.toBeNull()

    await user.click(within(timeline()).getByRole('button', { name: 'End Workout' }))
    const dialog = screen.getByRole('dialog', { name: 'End this Workout?' })
    await user.click(within(dialog).getByRole('button', { name: 'End Workout' }))

    expect(screen.getByRole('heading', { level: 1, name: 'Workout Request' })).toBeInTheDocument()
    expect(localStorage.getItem(PROGRESS_KEY)).toBeNull()
    expect(localStorage.getItem('home-workout:current-workout')).not.toBeNull()
  })

  it('keeps going when you cancel', async () => {
    const user = setupUser()
    renderAt('/follow-along')
    wait(5 + 20 + 10)

    await user.click(within(timeline()).getByRole('button', { name: 'End Workout' }))
    wait(30) // the Workout waits while it asks
    await user.click(screen.getByRole('button', { name: 'Keep going' }))

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Pause' })).toBeInTheDocument()
    wait(1)
    expect(timeLeft()).toHaveTextContent('0:14')
    expect(localStorage.getItem(PROGRESS_KEY)).not.toBeNull()
  })

  it('stays paused after cancelling if it was paused before', async () => {
    const user = setupUser()
    renderAt('/follow-along')
    wait(5)
    await user.click(screen.getByRole('button', { name: 'Pause' }))

    await user.click(within(timeline()).getByRole('button', { name: 'End Workout' }))
    await user.click(screen.getByRole('button', { name: 'Keep going' }))

    expect(screen.getByRole('button', { name: 'Resume' })).toBeInTheDocument()
  })

  it('leaves the control keys alone while it asks', async () => {
    const user = setupUser()
    renderAt('/follow-along')
    wait(5)

    await user.click(within(timeline()).getByRole('button', { name: 'End Workout' }))
    await user.keyboard('n')
    await user.keyboard('{Escape}')

    expectSet('arm circle', '20 s', '0:20')
  })
})

describe('Follow-along on a laptop', () => {
  it('shows the Timeline beside the Exercise, with no button for it', () => {
    fakeViewport('laptop')
    renderAt('/follow-along')

    const aside = screen.getByRole('complementary')
    expect(within(aside).getByRole('region', { name: 'Warm-up' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Timeline' })).not.toBeInTheDocument()
  })
})

describe('Follow-along on a phone', () => {
  const panel = () => screen.getByRole('dialog', { name: 'Timeline' })
  // While the panel is open, the rest of the screen is hidden from the accessibility tree.
  const shownTimeLeft = () => screen.getByRole('timer', { name: 'Time left', hidden: true })

  it('hides the Timeline until you open it, then shows it as a panel', async () => {
    fakeViewport('phone')
    const user = setupUser()
    renderAt('/follow-along')

    expect(screen.queryByRole('region', { name: 'Warm-up' })).not.toBeInTheDocument()
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Timeline' }))

    expect(within(panel()).getByRole('region', { name: 'Warm-up' })).toBeInTheDocument()
    expect(within(panel()).getByRole('region', { name: 'Main' })).toBeInTheDocument()
    expect(within(panel()).getByRole('region', { name: 'Cool-down' })).toBeInTheDocument()
    expect(panel()).toHaveTextContent('0:00 / 2:35')
  })

  it('keeps the Workout running while it is open, with the current Set moving on in it', async () => {
    fakeViewport('phone')
    const user = setupUser()
    renderAt('/follow-along')
    wait(5 + 10)

    await user.click(screen.getByRole('button', { name: 'Timeline' }))
    expect(currentRow()).toHaveTextContent('arm circle20 s')
    expect(shownTimeLeft()).toHaveTextContent('0:10')

    wait(10 + 10 + 1)
    expect(shownTimeLeft()).toHaveTextContent('0:14')
    expect(panel()).toHaveTextContent('0:31 / 2:35')
    expect(currentRow()).toHaveTextContent('squat5 reps')
    expect(within(panel()).getByText('arm circle').closest('li')).toHaveTextContent('Done:')
  })

  it('scrolls to the current Set when it opens', async () => {
    fakeViewport('phone')
    const scrolled: Element[] = []
    const scrollIntoView = vi.fn(function (this: Element) {
      scrolled.push(this)
    })
    Object.defineProperty(Element.prototype, 'scrollIntoView', {
      value: scrollIntoView,
      configurable: true,
    })
    const user = setupUser()
    renderAt('/follow-along')
    wait(5 + 20 + 10)

    await user.click(screen.getByRole('button', { name: 'Timeline' }))

    expect(currentRow()).toHaveTextContent('squat5 reps')
    expect(scrolled).toEqual([currentRow()])
    Reflect.deleteProperty(Element.prototype, 'scrollIntoView')
  })

  it('closes with its button and carries on as it was', async () => {
    fakeViewport('phone')
    const user = setupUser()
    renderAt('/follow-along')
    wait(5)

    await user.click(screen.getByRole('button', { name: 'Timeline' }))
    await user.click(within(panel()).getByRole('button', { name: 'Close' }))

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Pause' })).toBeInTheDocument()
    wait(1)
    expect(timeLeft()).toHaveTextContent('0:19')
  })

  it('closes when you tap outside it', async () => {
    fakeViewport('phone')
    const user = setupUser()
    renderAt('/follow-along')

    await user.click(screen.getByRole('button', { name: 'Timeline' }))
    const backdrop = document.querySelector('[data-slot="sheet-overlay"]')!
    await user.pointer({ keys: '[MouseLeft]', target: backdrop })

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Pause' })).toBeInTheDocument()
  })

  it('keeps the keys Space, N and B working while it is closed', async () => {
    fakeViewport('phone')
    const user = setupUser()
    renderAt('/follow-along')
    wait(5)

    await user.click(screen.getByRole('button', { name: 'Timeline' }))
    await user.click(within(panel()).getByRole('button', { name: 'Close' }))

    await user.keyboard('n')
    expectRest('Change-over', 'squat', '5 reps', '0:10')
    await user.keyboard('b')
    expect(within(nowPlaying()).getByRole('heading', { level: 1 })).toHaveTextContent('arm circle')
    await user.keyboard(' ')
    expect(screen.getByRole('button', { name: 'Resume' })).toBeInTheDocument()
  })

  it('puts Back, Pause and Skip in a bar of their own, and they work from it', async () => {
    fakeViewport('phone')
    const user = setupUser()
    renderAt('/follow-along')
    wait(7)
    const bar = screen.getByRole('group', { name: 'Controls' })

    await user.click(within(bar).getByRole('button', { name: 'Pause' }))
    wait(10)
    expect(timeLeft()).toHaveTextContent('0:18')
    await user.click(within(bar).getByRole('button', { name: 'Resume' }))

    await user.click(within(bar).getByRole('button', { name: 'Skip' }))
    expectRest('Change-over', 'squat', '5 reps', '0:10')
    await user.click(within(bar).getByRole('button', { name: 'Back' }))
    expect(within(nowPlaying()).getByRole('heading', { level: 1 })).toHaveTextContent('arm circle')
    expect(timeLeft()).toHaveTextContent('0:20')
  })

  it('still offers End Workout, which asks first', async () => {
    fakeViewport('phone')
    const user = setupUser()
    renderAt('/follow-along')

    await user.click(screen.getByRole('button', { name: 'End Workout' }))

    expect(screen.getByRole('dialog', { name: 'End this Workout?' })).toBeInTheDocument()
  })

  // Upright and on its side differ only in CSS, which jsdom doesn't compute; switching between
  // the phone and laptop layouts is the turn that changes what renders.
  it('keeps the countdown, the position and the progress when the layout switches mid-Workout', () => {
    const viewport = fakeViewport('phone')
    renderAt('/follow-along')
    wait(5 + 20 + 10 + 5) // 5 s into the first squat
    const progress = () => screen.getByRole('progressbar', { name: 'Set progress' })
    expect(timeLeft()).toHaveTextContent('0:10')
    expect(progress()).toHaveAttribute('aria-valuenow', '33')

    viewport.turn('laptop')
    expectSet('squat', '5 reps', '0:10')
    expect(progress()).toHaveAttribute('aria-valuenow', '33')
    expect(screen.getByText('0:35 / 2:35')).toBeInTheDocument()
    wait(1)

    viewport.turn('phone')
    expect(within(nowPlaying()).getByRole('heading', { level: 1 })).toHaveTextContent('squat')
    expect(timeLeft()).toHaveTextContent('0:09')
    expect(progress()).toHaveAttribute('aria-valuenow', '40')
  })

  it('follows the viewport as it changes', () => {
    const viewport = fakeViewport('laptop')
    renderAt('/follow-along')
    expect(screen.getByRole('region', { name: 'Warm-up' })).toBeInTheDocument()

    viewport.turn('phone')
    expect(screen.queryByRole('region', { name: 'Warm-up' })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Timeline' })).toBeInTheDocument()

    viewport.turn('laptop')
    expect(screen.getByRole('region', { name: 'Warm-up' })).toBeInTheDocument()
  })
})
