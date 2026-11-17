import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { App } from '@/App'
import { generate as generateWorkout, type Workout } from '@/workout'
import { library } from '@/library'

const FAVOURITES_KEY = 'home-workout:favourites'

type User = ReturnType<typeof userEvent.setup>

/** The Favourites as saved in browser storage. */
const storedFavourites = () => JSON.parse(localStorage.getItem(FAVOURITES_KEY)!) as unknown[]

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

const favourites = () => screen.getByRole('region', { name: 'Favourites' })
const favouriteRows = () => within(favourites()).getAllByRole('listitem')
const saveButton = () => screen.getByRole('button', { name: 'Save' })

/** The preview's Exercise names, in order, read from the row GIFs' alt text. */
function previewExercises() {
  return screen.getAllByRole('img').map((gif) => gif.getAttribute('alt'))
}

/** "28 Exercises" from the preview header. */
function previewCount() {
  return screen.getByText(/Planned total/).textContent?.match(/\d+ Exercises/)?.[0]
}

/** A Workout generated from the real library, as the form would. */
function workout(): Workout {
  return generateWorkout(
    { workoutType: 'full body', minutes: 15, difficulty: 'beginner', equipment: [] },
    library,
    Math.random,
  )
}

/** Skips through every Set and rest to the "Workout complete" screen. */
async function finishWorkout(user: User) {
  while (!screen.queryByRole('heading', { name: 'Workout complete' })) {
    await user.click(screen.getByRole('button', { name: 'Skip' }))
  }
}

/** Saves Favourites straight to storage, as earlier visits would have. */
function storeFavourites(count: number, change: (workout: Workout) => Workout = (w) => w) {
  const saved = Array.from({ length: count }, (_, index) => ({
    id: `fav-${index}`,
    name: `Favourite ${index + 1}`,
    workout: change(workout()),
  }))
  localStorage.setItem(FAVOURITES_KEY, JSON.stringify(saved))
  return saved
}

async function generate(user: User) {
  renderAt('/')
  await user.click(screen.getByRole('button', { name: 'Generate' }))
}

beforeEach(() => {
  vi.useFakeTimers({ toFake: ['Date'] })
  vi.setSystemTime(new Date(2026, 10, 14, 9, 30))
  localStorage.clear()
})

afterEach(() => {
  vi.useRealTimers()
})

describe('Favourites', () => {
  it('saves the Workout from the preview and starts exactly it again from the form', async () => {
    const user = userEvent.setup()
    await generate(user)
    const saved = previewExercises()
    const count = previewCount()

    await user.click(saveButton())

    expect(saveButton()).toHaveAttribute('aria-pressed', 'true')
    await user.click(screen.getByRole('button', { name: '← Change request' }))
    const [row] = favouriteRows()
    expect(row).toHaveTextContent('Full body · 30 min · Intermediate · 14 Nov')
    expect(row).toHaveTextContent(count!)

    await user.click(screen.getByRole('button', { name: 'Generate' }))
    expect(previewExercises()).not.toEqual(saved)
    expect(saveButton()).toHaveAttribute('aria-pressed', 'false')
    await user.click(screen.getByRole('button', { name: '← Change request' }))
    await user.click(within(favouriteRows()[0]).getByRole('button', { name: 'Start' }))

    expect(screen.getByRole('heading', { level: 1, name: 'Workout preview' })).toBeInTheDocument()
    expect(previewExercises()).toEqual(saved)
    expect(saveButton()).toHaveAttribute('aria-pressed', 'true')
  })

  it('un-saves when Save is pressed again on the same Workout', async () => {
    const user = userEvent.setup()
    await generate(user)

    await user.click(saveButton())
    await user.click(saveButton())

    expect(saveButton()).toHaveAttribute('aria-pressed', 'false')
    expect(storedFavourites()).toEqual([])
  })

  it('hides the section when there are no Favourites', () => {
    renderAt('/')

    expect(screen.queryByRole('region', { name: 'Favourites' })).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Favourites' })).not.toBeInTheDocument()
  })

  it('saves and un-saves from the "Workout complete" screen', async () => {
    const user = userEvent.setup()
    localStorage.setItem('home-workout:current-workout', JSON.stringify(workout()))
    renderAt('/follow-along')
    await finishWorkout(user)

    await user.click(saveButton())
    expect(saveButton()).toHaveAttribute('aria-pressed', 'true')
    expect(storedFavourites()).toHaveLength(1)

    await user.click(saveButton())
    expect(saveButton()).toHaveAttribute('aria-pressed', 'false')
    expect(storedFavourites()).toEqual([])
  })

  it('keeps the saved Favourite as it was when its started copy is swapped', async () => {
    const user = userEvent.setup()
    const [favourite] = storeFavourites(1)
    renderAt('/')
    await user.click(screen.getByRole('button', { name: 'Start' }))
    const before = previewExercises()

    const main = screen.getByRole('region', { name: /^Main/ })
    await user.click(within(main).getAllByRole('button', { name: /^Swap/ })[0])

    expect(previewExercises()).not.toEqual(before)
    expect(saveButton()).toHaveAttribute('aria-pressed', 'false')
    expect(storedFavourites()).toEqual([favourite])

    // Saving the swapped Workout adds it as a new Favourite.
    await user.click(saveButton())
    expect(storedFavourites()).toHaveLength(2)
  })

  it('stops at 20: Save is disabled with a hint, and nothing is removed', async () => {
    const user = userEvent.setup()
    const saved = storeFavourites(20)
    await generate(user)

    expect(saveButton()).toHaveAttribute('aria-disabled', 'true')
    expect(saveButton()).toHaveAccessibleDescription('Favourites full — delete one first')
    await user.click(saveButton())
    expect(storedFavourites()).toEqual(saved)

    await user.click(screen.getByRole('button', { name: '← Change request' }))
    expect(favouriteRows()).toHaveLength(20)
  })

  it('still lets you un-save a Favourite when there are 20', async () => {
    const user = userEvent.setup()
    storeFavourites(20)
    renderAt('/')
    await user.click(screen.getAllByRole('button', { name: 'Start' })[0])

    expect(saveButton()).not.toHaveAttribute('aria-disabled', 'true')
    await user.click(saveButton())

    expect(storedFavourites()).toHaveLength(19)
  })

  it('deletes a Favourite after asking, and keeps it when you cancel', async () => {
    const user = userEvent.setup()
    storeFavourites(2)
    renderAt('/')
    const second = () => favouriteRows()[1]

    await user.click(within(second()).getByRole('button', { name: 'Delete' }))
    const dialog = screen.getByRole('dialog', { name: 'Delete this Favourite?' })
    expect(dialog).toHaveTextContent('Favourite 2')
    await user.click(within(dialog).getByRole('button', { name: 'Cancel' }))
    expect(favouriteRows()).toHaveLength(2)

    await user.click(within(second()).getByRole('button', { name: 'Delete' }))
    await user.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Delete' }))

    expect(favouriteRows()).toHaveLength(1)
    expect(favouriteRows()[0]).toHaveTextContent('Favourite 1')
    expect(storedFavourites()).toHaveLength(1)

    await user.click(within(favouriteRows()[0]).getByRole('button', { name: 'Delete' }))
    await user.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Delete' }))
    expect(screen.queryByRole('region', { name: 'Favourites' })).not.toBeInTheDocument()
  })

  it('greys out a Favourite whose Exercise left the library, offering only Delete', () => {
    storeFavourites(1, (saved) => ({
      ...saved,
      coolDown: [
        ...saved.coolDown,
        { ...saved.coolDown[0], exercise: { ...saved.coolDown[0].exercise, id: 'gone' } },
      ],
    }))

    renderAt('/')

    const [row] = favouriteRows()
    expect(row).toHaveTextContent('No longer available')
    expect(row).toHaveTextContent(/\d+ Exercises/)
    expect(within(row).queryByRole('button', { name: 'Start' })).not.toBeInTheDocument()
    expect(within(row).getByRole('button', { name: 'Delete' })).toBeInTheDocument()
  })

  it('reads corrupt Favourites as none', () => {
    localStorage.setItem(FAVOURITES_KEY, '[{"id": 1')

    renderAt('/')

    expect(screen.queryByRole('region', { name: 'Favourites' })).not.toBeInTheDocument()
  })

  it('sits between "Generate another" and Start Workout in the preview top bar', async () => {
    const user = userEvent.setup()
    await generate(user)

    const bar = screen.getByRole('navigation', { name: 'Workout actions' })
    expect(
      within(bar)
        .getAllByRole('button')
        .map((button) => button.textContent),
    ).toEqual(['← Change request', 'Generate another', '☆Save', 'Start Workout'])
  })

  it('keeps Favourites saved meanwhile in another tab', async () => {
    const user = userEvent.setup()
    await generate(user)
    const [other] = storeFavourites(1) // saved in another tab after this one loaded

    await user.click(saveButton())

    expect(storedFavourites()).toHaveLength(2)
    expect(storedFavourites()).toContainEqual(other)
  })
})

/** A Favourite saved on 14 Nov, so its automatic name is "Full body · 15 min · Beginner · 14 Nov". */
function storeDatedFavourite(extra: Record<string, unknown> = {}) {
  const saved = [
    { id: 'fav-0', name: 'Old name', workout: workout(), savedOn: '2026-11-14', ...extra },
  ]
  localStorage.setItem(FAVOURITES_KEY, JSON.stringify(saved))
}

const AUTOMATIC = 'Full body · 15 min · Beginner · 14 Nov'

async function rename(user: User, from: string, to: string) {
  await user.click(screen.getByRole('button', { name: `Rename “${from}”` }))
  const dialog = screen.getByRole('dialog', { name: 'Rename this Favourite' })
  const field = within(dialog).getByRole('textbox', { name: 'Name' })
  await user.clear(field)
  if (to !== '') await user.type(field, to)
  await user.click(within(dialog).getByRole('button', { name: 'Save' }))
}

describe('Renaming a Favourite', () => {
  it('shows the trimmed name in its row, and keeps it after a reload', async () => {
    const user = userEvent.setup()
    storeDatedFavourite()
    const { unmount } = renderAt('/')

    await rename(user, AUTOMATIC, '  Leg day  ')

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(favouriteRows()[0]).toHaveTextContent(/^Leg day/)
    unmount()
    renderAt('/')
    expect(favouriteRows()[0]).toHaveTextContent(/^Leg day/)
  })

  it('opens an empty field with the automatic name as its placeholder and a hint', async () => {
    const user = userEvent.setup()
    storeDatedFavourite()
    renderAt('/')

    await user.click(screen.getByRole('button', { name: `Rename “${AUTOMATIC}”` }))

    const field = screen.getByRole('textbox', { name: 'Name' })
    expect(field).toHaveValue('')
    expect(field).toHaveAttribute('placeholder', AUTOMATIC)
    expect(field).toHaveAttribute('maxLength', '60')
    expect(field).toHaveFocus()
    expect(field).toHaveAccessibleDescription('Leave empty for the automatic name')
  })

  it('opens with the own name in the field, and an empty Save brings back the automatic name', async () => {
    const user = userEvent.setup()
    storeDatedFavourite({ ownName: 'Leg day' })
    renderAt('/')

    await user.click(screen.getByRole('button', { name: 'Rename “Leg day”' }))
    expect(screen.getByRole('textbox', { name: 'Name' })).toHaveValue('Leg day')
    await user.click(screen.getByRole('button', { name: 'Cancel' }))

    await rename(user, 'Leg day', '   ')
    expect(favouriteRows()[0]).toHaveTextContent(new RegExp(`^${AUTOMATIC}`))
    expect(storedFavourites()[0]).not.toHaveProperty('ownName')
  })

  it('saves with Enter, and changes nothing on Cancel or Esc', async () => {
    const user = userEvent.setup()
    storeDatedFavourite()
    renderAt('/')

    await user.click(screen.getByRole('button', { name: `Rename “${AUTOMATIC}”` }))
    await user.type(screen.getByRole('textbox', { name: 'Name' }), 'Nope')
    await user.click(screen.getByRole('button', { name: 'Cancel' }))
    await user.click(screen.getByRole('button', { name: `Rename “${AUTOMATIC}”` }))
    await user.type(screen.getByRole('textbox', { name: 'Name' }), 'Nope')
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(favouriteRows()[0]).toHaveTextContent(new RegExp(`^${AUTOMATIC}`))

    await user.click(screen.getByRole('button', { name: `Rename “${AUTOMATIC}”` }))
    await user.type(screen.getByRole('textbox', { name: 'Name' }), 'Leg day{Enter}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(favouriteRows()[0]).toHaveTextContent(/^Leg day/)
  })

  it('shows the own name when asking to delete, and keeps the Workout, order and Start', async () => {
    const user = userEvent.setup()
    const [first, second] = storeFavourites(2)
    renderAt('/')

    await rename(user, 'Favourite 2', 'Leg day')

    expect(favouriteRows()[0]).toHaveTextContent(/^Favourite 1/)
    expect(favouriteRows()[1]).toHaveTextContent(/^Leg day/)
    expect(storedFavourites()).toEqual([first, { ...second, ownName: 'Leg day' }])

    await user.click(within(favouriteRows()[1]).getByRole('button', { name: 'Delete' }))
    expect(screen.getByRole('dialog')).toHaveTextContent('Leg day')
    await user.click(screen.getByRole('button', { name: 'Cancel' }))

    await user.click(within(favouriteRows()[1]).getByRole('button', { name: 'Start' }))
    expect(screen.getByRole('heading', { level: 1, name: 'Workout preview' })).toBeInTheDocument()
  })

  it('offers no rename for a Favourite whose Exercise left the library', () => {
    storeFavourites(1, (saved) => ({
      ...saved,
      coolDown: [{ ...saved.coolDown[0], exercise: { ...saved.coolDown[0].exercise, id: 'gone' } }],
    }))
    renderAt('/')

    expect(
      within(favouriteRows()[0]).queryByRole('button', { name: /^Rename/ }),
    ).not.toBeInTheDocument()
  })

  it('is lost when its Workout is un-saved with one click on Save in the preview', async () => {
    const user = userEvent.setup()
    await generate(user)
    await user.click(saveButton())
    await user.click(screen.getByRole('button', { name: '← Change request' }))
    const [row] = favouriteRows()
    await user.click(within(row).getByRole('button', { name: /^Rename/ }))
    await user.type(screen.getByRole('textbox', { name: 'Name' }), 'Leg day{Enter}')
    await user.click(within(favouriteRows()[0]).getByRole('button', { name: 'Start' }))

    await user.click(saveButton())

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(saveButton()).toHaveAttribute('aria-pressed', 'false')
    expect(storedFavourites()).toEqual([])
    await user.click(saveButton())
    expect(storedFavourites()[0]).not.toHaveProperty('ownName')
  })

  it('skips a stored Favourite whose own name is not text', () => {
    storeFavourites(2)
    const stored = JSON.parse(localStorage.getItem(FAVOURITES_KEY)!) as object[]
    localStorage.setItem(FAVOURITES_KEY, JSON.stringify([{ ...stored[0], ownName: 42 }, stored[1]]))

    renderAt('/')

    expect(favouriteRows()).toHaveLength(1)
    expect(favouriteRows()[0]).toHaveTextContent(/^Favourite 2/)
  })
})
