import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { beforeEach, describe, expect, it } from 'vitest'
import { App } from '@/App'
import { library } from '@/library'
import { difficultyLabel, equipmentLabel } from '@/workout'

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

function workoutList() {
  return screen.getAllByRole('listitem').map((row) => row.textContent)
}

function mainRows() {
  return within(screen.getByRole('region', { name: /^Main/ }))
    .getAllByRole('listitem')
    .map((row) => row.textContent)
}

beforeEach(() => {
  localStorage.clear()
})

describe('Workout Request form', () => {
  it('starts with full body, 30 min, Intermediate and no Equipment', () => {
    renderAt('/')

    expect(screen.getByRole('radio', { name: 'Full body' })).toBeChecked()
    expect(screen.getByRole('radio', { name: '30 min' })).toBeChecked()
    expect(screen.getByRole('radio', { name: 'Intermediate' })).toBeChecked()
    for (const item of ['Dumbbells', 'Resistance band', 'Kettlebell', 'Chair or bench']) {
      expect(screen.getByRole('checkbox', { name: item })).not.toBeChecked()
    }
    expect(screen.getAllByRole('radio', { name: /body|core|cardio|mobility/i })).toHaveLength(6)
    expect(screen.getByRole('radio', { name: 'Beginner' })).toHaveAccessibleDescription(
      'New to training, or coming back after a break.',
    )
    expect(screen.getByRole('radio', { name: 'Advanced' })).toHaveAccessibleDescription(
      'You train regularly and want to be pushed.',
    )
  })

  it('prefills the last Workout Request', async () => {
    const user = userEvent.setup()
    const { unmount } = renderAt('/')
    await user.click(screen.getByRole('radio', { name: 'Core' }))
    await user.click(screen.getByRole('radio', { name: '15 min' }))
    await user.click(screen.getByRole('radio', { name: 'Beginner' }))
    await user.click(screen.getByRole('checkbox', { name: 'Dumbbells' }))
    await user.click(screen.getByRole('button', { name: 'Generate' }))
    unmount()

    renderAt('/')

    expect(screen.getByRole('radio', { name: 'Core' })).toBeChecked()
    expect(screen.getByRole('radio', { name: '15 min' })).toBeChecked()
    expect(screen.getByRole('radio', { name: 'Beginner' })).toBeChecked()
    expect(screen.getByRole('checkbox', { name: 'Dumbbells' })).toBeChecked()
    expect(screen.getByRole('checkbox', { name: 'Kettlebell' })).not.toBeChecked()
  })

  it('falls back to the defaults when the saved Request is corrupt', () => {
    localStorage.setItem('home-workout:last-request', '{"workoutType":"yoga","minutes":')

    renderAt('/')

    expect(screen.getByRole('radio', { name: 'Full body' })).toBeChecked()
    expect(screen.getByRole('radio', { name: '30 min' })).toBeChecked()
  })
})

describe('Workout preview', () => {
  it('shows the generated Workout after Generate', async () => {
    const user = userEvent.setup()
    renderAt('/')
    await user.click(screen.getByRole('radio', { name: 'Lower body' }))
    await user.click(screen.getByRole('radio', { name: '45 min' }))
    await user.click(screen.getByRole('checkbox', { name: 'Dumbbells' }))
    await user.click(screen.getByRole('checkbox', { name: 'Kettlebell' }))
    await user.click(screen.getByRole('button', { name: 'Generate' }))

    expect(screen.getByRole('heading', { level: 1, name: 'Workout preview' })).toBeInTheDocument()
    expect(
      screen.getByText('Lower body · 45 min · Intermediate · Dumbbells, Kettlebell'),
    ).toBeInTheDocument()

    const totals = screen.getByText(/^Planned total: \d+ min · \d+ Exercises$/).textContent ?? ''
    const [, minutes, exercises] = totals.match(/(\d+) min · (\d+) Exercises/) ?? []
    expect(Number(minutes)).toBeGreaterThanOrEqual(40)
    expect(Number(minutes)).toBeLessThanOrEqual(50)
    expect(screen.getAllByRole('listitem')).toHaveLength(Number(exercises))

    const warmUp = screen.getByRole('region', { name: 'Warm-up' })
    const main = screen.getByRole('region', {
      name: /^Main · \d+ Exercises × \d+ Rounds( \(last Round: \d+ Exercises?\))?$/,
    })
    const coolDown = screen.getByRole('region', { name: 'Cool-down' })
    for (const block of [warmUp, main, coolDown]) {
      const rows = within(block).getAllByRole('listitem')
      expect(rows.length).toBeGreaterThan(0)
      for (const row of rows) {
        expect(within(row).getByRole('img')).toHaveAttribute(
          'src',
          expect.stringMatching(/^\/exercisedb\/\w+\.gif$/),
        )
        expect(row).toHaveTextContent(/\d+ (reps|s)( per side)?$/)
      }
    }
    for (const row of within(warmUp).getAllByRole('listitem')) {
      expect(row).toHaveTextContent(/30 s( per side)?$/)
    }
    expect(screen.queryByText(/rest|change-over/i)).not.toBeInTheDocument()

    const footer = screen.getByRole('contentinfo')
    expect(footer).toHaveTextContent('Exercise data & GIFs: ExerciseDB (AGPL-3.0) · Source code')
  })

  it('shows the same Workout after a reload', async () => {
    const user = userEvent.setup()
    const { unmount } = renderAt('/')
    await user.click(screen.getByRole('button', { name: 'Generate' }))
    const before = workoutList()
    unmount()

    renderAt('/workout')

    expect(screen.getByRole('heading', { level: 1, name: 'Workout preview' })).toBeInTheDocument()
    expect(workoutList()).toEqual(before)
  })

  it('replaces the Workout with different main-Block Exercises on "Generate another"', async () => {
    const user = userEvent.setup()
    const { unmount } = renderAt('/')
    await user.click(screen.getByRole('button', { name: 'Generate' }))
    const before = mainRows()

    await user.click(screen.getByRole('button', { name: 'Generate another' }))

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    const after = mainRows()
    expect(after.length).toBeGreaterThan(0)
    expect(after.filter((row) => before.includes(row))).toEqual([])
    expect(screen.getByText('Full body · 30 min · Intermediate · Bodyweight')).toBeInTheDocument()

    const shown = workoutList()
    unmount()
    renderAt('/workout')
    expect(workoutList()).toEqual(shown)
  })

  it('"← Change request" returns to the form filled in with the Workout\'s Request', async () => {
    const user = userEvent.setup()
    const { unmount } = renderAt('/')
    await user.click(screen.getByRole('radio', { name: 'Upper body' }))
    await user.click(screen.getByRole('radio', { name: '45 min' }))
    await user.click(screen.getByRole('radio', { name: 'Advanced' }))
    await user.click(screen.getByRole('checkbox', { name: 'Kettlebell' }))
    await user.click(screen.getByRole('button', { name: 'Generate' }))
    unmount()
    // The form's remembered Request may differ from the Workout's (e.g. a Favourite started later).
    localStorage.removeItem('home-workout:last-request')
    renderAt('/workout')

    await user.click(screen.getByRole('button', { name: '← Change request' }))

    expect(screen.getByRole('heading', { level: 1, name: 'Workout Request' })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: 'Upper body' })).toBeChecked()
    expect(screen.getByRole('radio', { name: '45 min' })).toBeChecked()
    expect(screen.getByRole('radio', { name: 'Advanced' })).toBeChecked()
    expect(screen.getByRole('checkbox', { name: 'Kettlebell' })).toBeChecked()
    expect(screen.getByRole('checkbox', { name: 'Dumbbells' })).not.toBeChecked()
  })

  it('opens the Exercise detail dialog when an Exercise row is clicked', async () => {
    const user = userEvent.setup()
    renderAt('/')
    await user.click(screen.getByRole('checkbox', { name: 'Dumbbells' }))
    await user.click(screen.getByRole('button', { name: 'Generate' }))
    const main = screen.getByRole('region', { name: /^Main/ })
    const row = within(main).getAllByRole('listitem')[0]
    const name = within(row).getByRole('img').getAttribute('alt') ?? ''
    const exercise = library.find((candidate) => candidate.name === name)
    if (!exercise) throw new Error(`No Exercise named ${name}`)

    await user.click(within(row).getByRole('button'))

    const dialog = screen.getByRole('dialog', { name })
    expect(within(dialog).getByRole('img')).toHaveAttribute('src', exercise.gifUrl)
    expect(
      within(dialog)
        .getAllByRole('listitem')
        .map((step) => step.textContent),
    ).toEqual(exercise.steps)
    expect(dialog).toHaveTextContent(exercise.trains)
    expect(exercise.trains).toMatch(/^Trains: /)
    const equipment =
      exercise.equipment.length > 0
        ? exercise.equipment.map(equipmentLabel).join(', ')
        : 'Bodyweight'
    expect(dialog).toHaveTextContent(`Equipment: ${equipment}`)
    expect(dialog).toHaveTextContent(`Difficulty: ${difficultyLabel(exercise.difficulty)}`)

    await user.click(within(dialog).getByRole('button', { name: 'Close' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it.each([
    ['nothing is saved', null],
    ['the saved Workout is corrupt', '{"request":{}}'],
    [
      'a saved Set is corrupt',
      JSON.stringify({
        request: { workoutType: 'core', minutes: 15, difficulty: 'beginner', equipment: [] },
        warmUp: [],
        main: { sets: [{}], rounds: 1, lastRoundSets: 1, restSeconds: 30, roundRestSeconds: 60 },
        coolDown: [],
      }),
    ],
  ])('sends you to the Workout Request form when %s', (_case, saved) => {
    if (saved !== null) localStorage.setItem('home-workout:current-workout', saved)

    renderAt('/workout')

    expect(screen.getByRole('heading', { level: 1, name: 'Workout Request' })).toBeInTheDocument()
  })
})
