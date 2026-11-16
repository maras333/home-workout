import { act, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { App } from '@/App'
import type { Exercise } from '@/library'
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
 * The Exercises are not in the library, so their saved English names show in either Language.
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

const LANGUAGE_KEY = 'home-workout:language'
const PROGRESS_KEY = 'home-workout:follow-along-progress'

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

const timeLeft = () => screen.getByRole('timer', { name: 'Pozostały czas' })
const nowPlaying = () => screen.getByRole('region', { name: 'Teraz' })
const savedIndex = () => JSON.parse(localStorage.getItem(PROGRESS_KEY)!).index

function expectRest(label: string, nextName: string, nextTarget: string, seconds: string) {
  const now = nowPlaying()
  expect(within(now).getByRole('heading', { level: 1, name: label })).toBeInTheDocument()
  expect(now).toHaveTextContent(`Następne${nextName}${nextTarget}`)
  expect(timeLeft()).toHaveTextContent(seconds)
  expect(screen.getByRole('progressbar', { name: 'Postęp przerwy' })).toBeInTheDocument()
}

function expectSet(block: string, name: string, target: string, seconds: string) {
  const now = nowPlaying()
  expect(now).toHaveTextContent(`${block}${name}${target}`)
  expect(within(now).getByRole('heading', { level: 1, name })).toBeInTheDocument()
  expect(timeLeft()).toHaveTextContent(seconds)
  expect(screen.getByRole('progressbar', { name: 'Postęp serii' })).toBeInTheDocument()
}

class FakeAudioContext {
  currentTime = 0
  state = 'running'
  destination = {}
  resume = async () => {}
  close = async () => {}
  createOscillator() {
    return {
      type: 'sine',
      frequency: { value: 0 },
      connect: <T,>(node: T) => node,
      start: () => {},
      stop: () => {},
    }
  }
  createGain() {
    const ramp = () => {}
    return {
      gain: { value: 1, setValueAtTime: ramp, exponentialRampToValueAtTime: ramp },
      connect: <T,>(node: T) => node,
    }
  }
}

class FakeUtterance {
  readonly text: string
  constructor(text: string) {
    this.text = text
  }
}

beforeEach(() => {
  vi.useFakeTimers()
  // Testing Library only drives fake timers it recognises as Jest's.
  vi.stubGlobal('jest', { advanceTimersByTime: vi.advanceTimersByTime.bind(vi) })
  localStorage.clear()
  localStorage.setItem('home-workout:current-workout', JSON.stringify(workout))
  localStorage.setItem(LANGUAGE_KEY, '"pl"')
  const request = vi.fn(async () => ({ released: false, release: async () => {} }))
  Object.defineProperty(navigator, 'wakeLock', { value: { request }, configurable: true })
  vi.stubGlobal('AudioContext', FakeAudioContext)
  vi.stubGlobal('speechSynthesis', {
    speaking: false,
    pending: false,
    speak: () => {},
    cancel: () => {},
  })
  vi.stubGlobal('SpeechSynthesisUtterance', FakeUtterance)
})

afterEach(() => {
  vi.useRealTimers()
  vi.unstubAllGlobals()
  Reflect.deleteProperty(navigator, 'wakeLock')
})

describe('Follow-along in Polish', () => {
  it('shows "Przygotuj się", then each Set with its Block and Round, and each rest', () => {
    renderAt('/follow-along')

    expectRest('Przygotuj się', 'arm circle', '20 s', '0:05')
    wait(5)
    expectSet('Rozgrzewka', 'arm circle', '20 s', '0:20')
    wait(20)
    expectRest('Zmiana', 'squat', '5 powtórzeń', '0:10')
    wait(10)
    expectSet('Część główna · Runda 1 z 2', 'squat', '5 powtórzeń', '0:15')
    wait(15)
    expectRest('Przerwa', 'side plank', '10 s na stronę', '0:15')
    wait(15 + 20)
    expectRest('Przerwa między rundami', 'squat', '5 powtórzeń', '0:30')
    wait(30 + 15 + 10)
    expectSet('Wyciszenie', 'child pose', '20 s', '0:20')
  })

  it('lists the whole Workout by Block and Round, with the time done', () => {
    renderAt('/follow-along')
    wait(5 + 20 + 10)

    const main = screen.getByRole('region', { name: 'Część główna' })
    expect(screen.getByRole('region', { name: 'Rozgrzewka' })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'Wyciszenie' })).toBeInTheDocument()
    expect(
      within(main)
        .getAllByRole('heading', { level: 3 })
        .map((h) => h.textContent),
    ).toEqual(['Runda 1 z 2', 'Runda 2 z 2'])
    expect(
      within(main)
        .getAllByRole('listitem')
        .map((row) => row.textContent),
    ).toEqual(['squat5 powtórzeń', 'side plank10 s na stronę', 'squat5 powtórzeń'])
    expect(screen.getByText('Zrobione:').closest('li')).toHaveTextContent('arm circle')
    expect(screen.getByText('Czas za tobą:').parentElement).toHaveTextContent(
      'Czas za tobą: 0:30 / 2:35',
    )
  })

  it('shows the side badge on a per-side Set', () => {
    renderAt('/follow-along')
    wait(5 + 20 + 10 + 15 + 15)

    expect(nowPlaying()).toHaveTextContent('Strona 1 z 2')
    wait(10)
    expect(nowPlaying()).toHaveTextContent('Strona 2 z 2 — zmiana!')
    wait(3)
    expect(nowPlaying()).toHaveTextContent('Strona 2 z 2')
    expect(nowPlaying()).not.toHaveTextContent('zmiana!')
  })

  it('names the controls in Polish and keeps the keys Space, N and B', async () => {
    const user = setupUser()
    renderAt('/follow-along')

    const pause = screen.getByRole('button', { name: 'Pauza' })
    expect(pause).toHaveAttribute('aria-keyshortcuts', 'Space')
    expect(screen.getByRole('button', { name: 'Pomiń' })).toHaveAttribute('aria-keyshortcuts', 'n')
    expect(screen.getByRole('button', { name: 'Wstecz' })).toHaveAttribute('aria-keyshortcuts', 'b')

    await user.keyboard(' ')
    expect(screen.getByRole('button', { name: 'Wznów' })).toBeInTheDocument()
    await user.keyboard('n')
    expectSet('Rozgrzewka', 'arm circle', '20 s', '0:20')
    await user.keyboard('n')
    expectRest('Zmiana', 'squat', '5 powtórzeń', '0:10')
    await user.keyboard('b')
    expectSet('Rozgrzewka', 'arm circle', '20 s', '0:20')
    await user.click(screen.getByRole('button', { name: 'Wznów' }))
    expect(screen.getByRole('button', { name: 'Pauza' })).toBeInTheDocument()
  })

  it('names the sound toggles in Polish', async () => {
    const user = setupUser()
    renderAt('/follow-along')

    const beeps = screen.getByRole('button', { name: 'Sygnały' })
    const voice = screen.getByRole('button', { name: 'Głos' })
    expect(beeps).toHaveAttribute('title', 'Sygnały: włączone')
    await user.click(voice)
    expect(voice).toHaveAttribute('aria-pressed', 'false')
    expect(voice).toHaveAttribute('title', 'Głos: wyłączone')
  })

  it('asks before ending the Workout, in Polish', async () => {
    const user = setupUser()
    renderAt('/follow-along')

    await user.click(screen.getByRole('button', { name: 'Zakończ trening' }))
    const dialog = screen.getByRole('dialog', { name: 'Zakończyć ten trening?' })
    expect(dialog).toHaveTextContent(
      'Twoje miejsce w nim przepadnie. Możesz zacząć go od nowa z podglądu.',
    )
    await user.click(within(dialog).getByRole('button', { name: 'Trenuj dalej' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Zakończ trening' }))
    await user.click(
      within(screen.getByRole('dialog')).getByRole('button', { name: 'Zakończ trening' }),
    )
    expect(
      screen.getByRole('heading', { level: 1, name: 'Jaki trening chcesz wykonać?' }),
    ).toBeInTheDocument()
  })

  it('shows "Trening zakończony" at the end', () => {
    renderAt('/follow-along')
    wait(160)

    expect(
      screen.getByRole('heading', { level: 1, name: 'Trening zakończony' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Zaplanowano 2:35. Dobra robota!')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Zaplanuj kolejny trening' })).toHaveAttribute(
      'href',
      '/',
    )
  })
})

describe('switching the Language mid-Workout', () => {
  it('changes the screen at once and leaves the countdown, position and progress alone', async () => {
    localStorage.setItem(LANGUAGE_KEY, '"en"')
    const user = setupUser()
    renderAt('/follow-along')
    wait(5 + 20 + 10 + 4) // 4 s into the first squat
    expect(screen.getByRole('timer', { name: 'Time left' })).toHaveTextContent('0:11')
    expect(screen.getByRole('button', { name: 'Pause' })).toBeInTheDocument()
    const progressBefore = localStorage.getItem(PROGRESS_KEY)

    await user.click(screen.getByRole('button', { name: 'PL' }))

    expectSet('Część główna · Runda 1 z 2', 'squat', '5 powtórzeń', '0:11')
    expect(screen.getByRole('button', { name: 'Pauza' })).toBeInTheDocument()
    expect(localStorage.getItem(PROGRESS_KEY)).toBe(progressBefore)
    expect(savedIndex()).toBe(3)
    wait(1)
    expect(timeLeft()).toHaveTextContent('0:10')

    await user.click(screen.getByRole('button', { name: 'EN' }))

    expect(screen.getByRole('timer', { name: 'Time left' })).toHaveTextContent('0:10')
    expect(screen.getByRole('region', { name: 'Now' })).toHaveTextContent('Main · Round 1 of 2')
    expect(savedIndex()).toBe(3)
  })

  it('changes a rest on screen while it counts down, paused or not', async () => {
    localStorage.setItem(LANGUAGE_KEY, '"en"')
    const user = setupUser()
    renderAt('/follow-along')
    wait(5 + 20 + 3) // 3 s into the Change-over
    await user.keyboard(' ')

    await user.click(screen.getByRole('button', { name: 'PL' }))

    expectRest('Zmiana', 'squat', '5 powtórzeń', '0:07')
    expect(screen.getByRole('button', { name: 'Wznów' })).toBeInTheDocument()
    wait(5)
    expect(timeLeft()).toHaveTextContent('0:07')
    expect(savedIndex()).toBe(2)
  })
})
