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
    trains: 'Trains: legs',
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

/** Moves the clock on by whole seconds. */
function wait(seconds: number) {
  act(() => {
    vi.advanceTimersByTime(seconds * 1000)
  })
}

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
})

afterEach(() => {
  vi.useRealTimers()
  vi.unstubAllGlobals()
  Reflect.deleteProperty(navigator, 'wakeLock')
})

describe('Follow-along', () => {
  it('starts from the preview with a 5 s "Get ready" showing the first Exercise up next', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
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
