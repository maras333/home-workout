import { act, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, useLocation, useNavigate } from 'react-router'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { App } from '@/App'
import type { Workout, WorkoutSet } from '@/workout'
import { library } from '@/library'
import { fakeViewport } from '@/test/viewport'

let location = ''
let goBack = () => {}

/** Records the current URL's path and query, and offers the browser's Back, which the screen lacks. */
function LocationProbe() {
  const { pathname, search } = useLocation()
  const navigate = useNavigate()
  location = decodeURIComponent(pathname + search)
  goBack = () => void navigate(-1)
  return null
}

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
      <LocationProbe />
    </MemoryRouter>,
  )
}

function storeWorkout() {
  const pushUp = library.find((exercise) => exercise.id === 'I4hDWkc')!
  const set: WorkoutSet = { exercise: pushUp, target: { measure: 'reps', reps: 5 }, perSide: false }
  const workout: Workout = {
    request: { workoutType: 'full body', minutes: 15, difficulty: 'beginner', equipment: [] },
    warmUp: [set],
    main: { sets: [set], rounds: 1, lastRoundSets: 1, restSeconds: 15, roundRestSeconds: 30 },
    coolDown: [set],
  }
  localStorage.setItem('home-workout:current-workout', JSON.stringify(workout))
}

beforeEach(() => {
  localStorage.clear()
  localStorage.setItem('home-workout:language', '"en"')
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('the header', () => {
  it.each(['/', '/workout', '/exercises'])('links to the form and the library on %s', (path) => {
    storeWorkout()
    renderAt(path)

    expect(screen.getByRole('link', { name: 'Home Workout' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'Exercises' })).toHaveAttribute('href', '/exercises')
  })

  it.each([
    ['/', 'Home Workout', 'Exercises'],
    ['/workout', 'Home Workout', 'Exercises'],
    ['/exercises', 'Exercises', 'Home Workout'],
  ])('marks the current page on %s', (path, current, other) => {
    storeWorkout()
    renderAt(path)

    expect(screen.getByRole('link', { name: current })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('link', { name: other })).not.toHaveAttribute('aria-current')
  })

  it.each(['phone', 'laptop'] as const)('has no links in Follow-along on a %s', (viewport) => {
    fakeViewport(viewport)
    storeWorkout()
    renderAt('/follow-along')

    expect(screen.queryByRole('link', { name: 'Home Workout' })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Exercises' })).not.toBeInTheDocument()
  })

  it('takes the user to the library and back to the form', async () => {
    const user = userEvent.setup()
    renderAt('/')

    await user.click(screen.getByRole('link', { name: 'Exercises' }))
    expect(screen.getByRole('heading', { level: 1, name: 'Exercise library' })).toBeInTheDocument()

    await user.click(screen.getByRole('link', { name: 'Home Workout' }))
    expect(screen.getByRole('heading', { level: 1, name: 'Workout Request' })).toBeInTheDocument()
  })
})

/** The names in the list, top to bottom. */
function listedNames() {
  return within(screen.getByRole('list', { name: 'Exercise library' }))
    .getAllByRole('button')
    .map((row) => row.querySelector('[data-name]')?.textContent)
}

describe('the Exercise library', () => {
  it('lists every Exercise alphabetically by name', () => {
    renderAt('/exercises')

    const names = listedNames()
    expect(names).toHaveLength(144)
    expect(names.slice(0, 3)).toEqual(['air bike', 'alternate heel touchers', 'ankle circles'])
    expect(names[names.length - 1]).toBe('wrist circles')
    expect(screen.getByText('144 of 144 Exercises')).toBeInTheDocument()
  })

  it('shows the Muscle groups, Equipment and Difficulty on each row', () => {
    renderAt('/exercises')

    expect(screen.getByRole('button', { name: /^dumbbell bench press/ })).toHaveTextContent(
      'dumbbell bench pressTrains: chest (also arms, shoulders) · Dumbbells, Chair or bench · Intermediate',
    )
    expect(screen.getByRole('button', { name: /^curtsey squat/ })).toHaveTextContent(
      /Trains: glutes.* · Bodyweight · Intermediate$/,
    )
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  it('opens the detail dialog for a row, without changing the URL', async () => {
    const user = userEvent.setup()
    renderAt('/exercises?difficulty=advanced')

    await user.click(screen.getByRole('button', { name: /^sissy squat/ }))

    const dialog = screen.getByRole('dialog', { name: 'sissy squat' })
    expect(within(dialog).getByRole('img', { name: 'sissy squat' })).toBeInTheDocument()
    expect(within(dialog).getByText('Advanced')).toBeInTheDocument()

    expect(location).toBe('/exercises?difficulty=advanced')

    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(location).toBe('/exercises?difficulty=advanced')
  })

  it('closes the detail dialog with its close button', async () => {
    const user = userEvent.setup()
    renderAt('/exercises')

    await user.click(screen.getByRole('button', { name: /^sissy squat/ }))
    await user.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Close' }))

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})

function chip(group: string, name: string) {
  return within(screen.getByRole('group', { name: group })).getByRole('button', { name })
}

describe('the filters', () => {
  it('match primary Muscle groups only', async () => {
    const user = userEvent.setup()
    renderAt('/exercises')

    await user.click(chip('Muscle group', 'legs'))

    expect(listedNames()).toContain('dumbbell goblet squat')
    expect(listedNames()).not.toContain('band stiff leg deadlift') // legs only as secondary
    expect(location).toBe('/exercises?muscle=legs')
  })

  it('list Exercises using the chosen Equipment, and Bodyweight ones with none', async () => {
    const user = userEvent.setup()
    renderAt('/exercises')

    await user.click(chip('Equipment', 'Kettlebell'))
    expect(screen.getByText('10 of 144 Exercises')).toBeInTheDocument()
    expect(listedNames()).toContain('kettlebell goblet squat')

    await user.click(chip('Equipment', 'Kettlebell'))
    await user.click(chip('Equipment', 'Bodyweight'))
    expect(screen.getByText('105 of 144 Exercises')).toBeInTheDocument()
    expect(listedNames()).toContain('curtsey squat')
    expect(listedNames()).not.toContain('kettlebell goblet squat')
    expect(location).toBe('/exercises?equipment=bodyweight')
  })

  it('match the Difficulty exactly', async () => {
    const user = userEvent.setup()
    renderAt('/exercises')

    await user.click(chip('Difficulty', 'Advanced'))

    expect(screen.getByText('22 of 144 Exercises')).toBeInTheDocument()
    expect(listedNames()).toContain('sissy squat')
    expect(listedNames()).not.toContain('dumbbell goblet squat') // intermediate
  })

  it('combine chips in a group with OR, and groups with AND', async () => {
    const user = userEvent.setup()
    renderAt('/exercises')

    await user.click(chip('Difficulty', 'Beginner'))
    await user.click(chip('Difficulty', 'Advanced'))
    expect(screen.getByText('93 of 144 Exercises')).toBeInTheDocument()

    await user.click(chip('Equipment', 'Kettlebell'))
    expect(listedNames()).toContain('kettlebell turkish get up (squat style)') // advanced
    expect(listedNames()).not.toContain('kettlebell goblet squat') // intermediate
    expect(listedNames().length).toBeLessThan(10)
    expect(location).toBe('/exercises?equipment=kettlebell&difficulty=beginner&difficulty=advanced')
  })

  it('are restored from the URL, ignoring values they do not know', () => {
    renderAt('/exercises?muscle=legs&muscle=wings&equipment=resistance+band&difficulty=easy&q=')

    expect(chip('Muscle group', 'legs')).toHaveAttribute('aria-pressed', 'true')
    expect(chip('Equipment', 'Resistance band')).toHaveAttribute('aria-pressed', 'true')
    expect(chip('Difficulty', 'Beginner')).toHaveAttribute('aria-pressed', 'false')
    // The one band Exercise for legs; band squat trains legs only as secondary.
    expect(listedNames()).toEqual(['resistance band seated hip abduction'])
  })
})

describe('Back', () => {
  it('restores the filters before the last chip', async () => {
    const user = userEvent.setup()
    renderAt('/exercises')

    await user.click(chip('Difficulty', 'Advanced'))
    await user.click(chip('Muscle group', 'legs'))
    expect(location).toBe('/exercises?muscle=legs&difficulty=advanced')

    act(goBack)

    expect(location).toBe('/exercises?difficulty=advanced')
    expect(chip('Muscle group', 'legs')).toHaveAttribute('aria-pressed', 'false')
    expect(chip('Difficulty', 'Advanced')).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText('22 of 144 Exercises')).toBeInTheDocument()
  })
})

describe('the name search', () => {
  it('ignores case, keeps the URL up to date and narrows the chips', async () => {
    const user = userEvent.setup()
    renderAt('/exercises?equipment=dumbbells')

    await user.type(screen.getByRole('searchbox', { name: 'Search by name' }), 'GOBLET')

    expect(listedNames()).toEqual(['dumbbell goblet squat'])
    expect(screen.getByText('1 of 144 Exercises')).toBeInTheDocument()
    expect(location).toBe('/exercises?equipment=dumbbells&q=GOBLET')
  })

  it('is restored from the URL', () => {
    renderAt('/exercises?q=goblet')

    expect(screen.getByRole('searchbox', { name: 'Search by name' })).toHaveValue('goblet')
    expect(listedNames()).toEqual(['dumbbell goblet squat', 'kettlebell goblet squat'])
  })
})

describe('Clear filters', () => {
  it('shows only when something is active', async () => {
    const user = userEvent.setup()
    renderAt('/exercises')
    expect(screen.queryByRole('button', { name: 'Clear filters' })).not.toBeInTheDocument()

    await user.click(chip('Muscle group', 'core'))
    expect(screen.getByRole('button', { name: 'Clear filters' })).toBeInTheDocument()
  })

  it('resets the search and every chip', async () => {
    const user = userEvent.setup()
    renderAt('/exercises?muscle=legs&equipment=kettlebell&difficulty=intermediate&q=squat')
    expect(listedNames()).toEqual(['kettlebell goblet squat'])

    await user.click(screen.getByRole('button', { name: 'Clear filters' }))

    expect(screen.getByText('144 of 144 Exercises')).toBeInTheDocument()
    expect(screen.getByRole('searchbox', { name: 'Search by name' })).toHaveValue('')
    expect(within(screen.getByRole('main')).queryAllByRole('button', { pressed: true })).toEqual([])
    expect(location).toBe('/exercises')
  })

  it('goes with the message when nothing matches', async () => {
    const user = userEvent.setup()
    renderAt('/exercises?q=zzz')

    expect(screen.getByText('No Exercise matches the filters')).toBeInTheDocument()
    expect(screen.getByText('0 of 144 Exercises')).toBeInTheDocument()
    expect(screen.queryByRole('list', { name: 'Exercise library' })).not.toBeInTheDocument()

    await user.click(screen.getAllByRole('button', { name: 'Clear filters' })[0])
    expect(screen.queryByText('No Exercise matches the filters')).not.toBeInTheDocument()
    expect(listedNames()).toHaveLength(144)
  })
})
