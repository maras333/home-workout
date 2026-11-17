import { act, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { App } from '@/App'
import { keyPoses, library } from '@/library'
import type { Workout } from '@/workout'

// A real Exercise from the library, whose GIF holds 2 Key poses for 1 s each.
const exercise = library.find(
  (candidate) =>
    keyPoses(candidate).length === 2 && keyPoses(candidate).every((pose) => pose.holdMs === 1000),
)!

const set = { exercise, target: { measure: 'time', seconds: 60 }, perSide: false } as const
const workout: Workout = {
  request: { workoutType: 'full body', minutes: 15, difficulty: 'beginner', equipment: [] },
  warmUp: [],
  main: { sets: [set], rounds: 1, lastRoundSets: 1, restSeconds: 15, roundRestSeconds: 30 },
  coolDown: [],
}

function renderFollowAlong() {
  return render(
    <MemoryRouter initialEntries={['/follow-along']}>
      <App />
    </MemoryRouter>,
  )
}

/** Moves the clock on, rendering after each step as the browser would. */
function advance(ms: number) {
  for (let step = 0; step < ms; step += 100) {
    act(() => {
      vi.advanceTimersByTime(100)
    })
  }
}

const picture = () => within(screen.getByRole('region', { name: 'Now' })).getByRole('img')
/** The `src` of the Key pose now shown. */
const shownPose = () => picture().querySelector('img[data-shown="true"]')?.getAttribute('src')

const [first, second] = keyPoses(exercise).map((pose) => pose.url)

/** Answers only the reduced-motion query; everything else (the phone layout) does not match. */
function stubReducedMotion(reduce: boolean) {
  vi.stubGlobal('matchMedia', (media: string) => ({
    media,
    matches: reduce && media.includes('prefers-reduced-motion'),
    addEventListener: () => {},
    removeEventListener: () => {},
  }))
}

beforeEach(() => {
  vi.useFakeTimers()
  vi.stubGlobal('jest', { advanceTimersByTime: vi.advanceTimersByTime.bind(vi) })
  localStorage.clear()
  localStorage.setItem('home-workout:current-workout', JSON.stringify(workout))
  Object.defineProperty(navigator, 'wakeLock', {
    value: { request: vi.fn(async () => ({ released: false, release: async () => {} })) },
    configurable: true,
  })
})

afterEach(() => {
  vi.useRealTimers()
  vi.unstubAllGlobals()
})

describe('Follow-along Key poses', () => {
  it('cross-fades the Exercise’s Key poses, holding each as long as its GIF does', () => {
    renderFollowAlong()

    expect(picture()).toHaveAccessibleName(exercise.name)
    expect(picture().querySelectorAll('img')).toHaveLength(2)
    expect(shownPose()).toBe(first)

    advance(1400) // the first pose's 1 s hold plus the 0.5 s fade is not over yet
    expect(shownPose()).toBe(first)
    advance(100)
    expect(shownPose()).toBe(second)
    advance(1500)
    expect(shownPose()).toBe(first)
  })

  it('stops on the pose it is on while the Workout is paused', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    renderFollowAlong()

    await user.click(screen.getByRole('button', { name: /pause/i }))
    advance(5000)
    expect(shownPose()).toBe(first)

    await user.click(screen.getByRole('button', { name: /resume/i }))
    advance(1500)
    expect(shownPose()).toBe(second)
  })

  it('shows only the first pose to whoever prefers reduced motion', () => {
    stubReducedMotion(true)
    renderFollowAlong()

    advance(5000)

    expect(shownPose()).toBe(first)
  })

  it('preloads the next Exercise’s Key poses', () => {
    renderFollowAlong()

    for (const url of [first, second]) {
      expect(document.head.querySelector(`link[rel="preload"][href="${url}"]`)).not.toBeNull()
    }
  })
})
