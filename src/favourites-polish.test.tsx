import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { App } from '@/App'
import { generate as generateWorkout, type Workout } from '@/workout'
import { library } from '@/library'

const FAVOURITES_KEY = 'home-workout:favourites'
const WORKOUT_KEY = 'home-workout:current-workout'
const SOUND_KEY = 'home-workout:sound-settings'

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

function choosePolish() {
  localStorage.setItem('home-workout:language', '"pl"')
}

const favourites = (name = 'Ulubione') => screen.getByRole('region', { name })
const favouriteRows = (name = 'Ulubione') => within(favourites(name)).getAllByRole('listitem')
const saveButton = (name = 'Zapisz') => screen.getByRole('button', { name })

/** A Workout generated from the real library, as the form would. */
function workout(): Workout {
  return generateWorkout(
    { workoutType: 'full body', minutes: 15, difficulty: 'beginner', equipment: [] },
    library,
    Math.random,
  )
}

/** Saves Favourites straight to storage, as earlier visits would have (with no saved day). */
function storeFavourites(count: number, change: (workout: Workout) => Workout = (w) => w) {
  const saved = Array.from({ length: count }, (_, index) => ({
    id: `fav-${index}`,
    name: `Favourite ${index + 1}`,
    workout: change(workout()),
  }))
  localStorage.setItem(FAVOURITES_KEY, JSON.stringify(saved))
  return saved
}

/** Skips through every Set and rest to the "Trening zakończony" screen, in Polish. */
async function finishWorkout(user: User) {
  while (!screen.queryByRole('heading', { name: 'Trening zakończony' })) {
    await user.click(screen.getByRole('button', { name: 'Pomiń' }))
  }
}

beforeEach(() => {
  vi.useFakeTimers({ toFake: ['Date'] })
  vi.setSystemTime(new Date(2026, 10, 14, 9, 30))
  localStorage.clear()
})

afterEach(() => {
  vi.useRealTimers()
})

describe('Favourites in Polish', () => {
  it('shows the section, its rows and buttons in Polish', () => {
    choosePolish()
    storeFavourites(2)

    renderAt('/')

    expect(screen.getByRole('heading', { name: 'Ulubione' })).toBeInTheDocument()
    const [row] = favouriteRows()
    expect(row).toHaveTextContent(/\d+ Ćwicze(nie|nia|ń)/)
    expect(within(row).getByRole('button', { name: 'Start' })).toBeInTheDocument()
    expect(within(row).getByRole('button', { name: 'Usuń' })).toBeInTheDocument()
  })

  it('asks before deleting, in Polish', async () => {
    const user = userEvent.setup()
    choosePolish()
    storeFavourites(2)
    renderAt('/')

    await user.click(within(favouriteRows()[1]).getByRole('button', { name: 'Usuń' }))
    const dialog = screen.getByRole('dialog', { name: 'Usunąć z Ulubionych?' })
    expect(dialog).toHaveTextContent('Favourite 2')
    await user.click(within(dialog).getByRole('button', { name: 'Anuluj' }))
    expect(favouriteRows()).toHaveLength(2)

    await user.click(within(favouriteRows()[1]).getByRole('button', { name: 'Usuń' }))
    await user.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Usuń' }))
    expect(favouriteRows()).toHaveLength(1)
  })

  it('marks a Favourite whose Exercise left the library "Niedostępny"', () => {
    choosePolish()
    storeFavourites(1, (saved) => ({
      ...saved,
      coolDown: [
        ...saved.coolDown,
        { ...saved.coolDown[0], exercise: { ...saved.coolDown[0].exercise, id: 'gone' } },
      ],
    }))

    renderAt('/')

    const [row] = favouriteRows()
    expect(row).toHaveTextContent('Niedostępny')
    expect(within(row).queryByRole('button', { name: 'Start' })).not.toBeInTheDocument()
  })

  it('saves from the preview with "Zapisz"', async () => {
    const user = userEvent.setup()
    choosePolish()
    renderAt('/')
    await user.click(screen.getByRole('button', { name: 'Generuj' }))

    await user.click(saveButton())

    expect(saveButton()).toHaveAttribute('aria-pressed', 'true')
    expect(storedFavourites()).toHaveLength(1)
  })

  it('saves from the "Trening zakończony" screen with "Zapisz"', async () => {
    const user = userEvent.setup()
    choosePolish()
    localStorage.setItem(WORKOUT_KEY, JSON.stringify(workout()))
    renderAt('/follow-along')
    await finishWorkout(user)

    await user.click(saveButton())

    expect(saveButton()).toHaveAttribute('aria-pressed', 'true')
  })

  it('stops at 20 with the hint "Ulubione pełne — usuń jeden"', async () => {
    const user = userEvent.setup()
    choosePolish()
    storeFavourites(20)
    renderAt('/')
    await user.click(screen.getByRole('button', { name: 'Generuj' }))

    expect(saveButton()).toHaveAttribute('aria-disabled', 'true')
    expect(saveButton()).toHaveAccessibleDescription('Ulubione pełne — usuń jeden')
  })

  it("builds a new Favourite's name in the current Language", async () => {
    const user = userEvent.setup()
    choosePolish()
    renderAt('/')
    await user.click(screen.getByRole('button', { name: 'Generuj' }))
    await user.click(saveButton())
    await user.click(screen.getByRole('button', { name: '← Zmień wybór' }))

    expect(favouriteRows()[0]).toHaveTextContent('Całe ciało · 30 min · Średni · 14 lis')

    await user.click(screen.getByRole('button', { name: 'EN' }))

    expect(favouriteRows('Favourites')[0]).toHaveTextContent(
      'Full body · 30 min · Intermediate · 14 Nov',
    )
  })

  it('stores the day a new Favourite was saved', async () => {
    const user = userEvent.setup()
    choosePolish()
    renderAt('/')
    await user.click(screen.getByRole('button', { name: 'Generuj' }))
    await user.click(saveButton())

    expect(storedFavourites()[0]).toMatchObject({ savedOn: '2026-11-14' })
  })

  it('keeps the stored name of a Favourite saved before names were built per Language', () => {
    choosePolish()
    localStorage.setItem(
      FAVOURITES_KEY,
      JSON.stringify([
        { id: 'old', name: 'Full body · 15 min · Beginner · 3 Oct', workout: workout() },
      ]),
    )

    renderAt('/')

    expect(favouriteRows()[0]).toHaveTextContent('Full body · 15 min · Beginner · 3 Oct')
  })

  it('keeps the Favourites, the current Workout and sound settings when the Language is switched', async () => {
    const user = userEvent.setup()
    choosePolish()
    const saved = storeFavourites(2)
    const current = workout()
    localStorage.setItem(WORKOUT_KEY, JSON.stringify(current))
    localStorage.setItem(SOUND_KEY, JSON.stringify({ beeps: false, voice: true }))
    renderAt('/')

    await user.click(screen.getByRole('button', { name: 'EN' }))

    expect(favouriteRows('Favourites')).toHaveLength(2)
    expect(storedFavourites()).toEqual(saved)
    expect(JSON.parse(localStorage.getItem(WORKOUT_KEY)!)).toEqual(current)
    expect(JSON.parse(localStorage.getItem(SOUND_KEY)!)).toEqual({ beeps: false, voice: true })
  })
})

describe('Renaming a Favourite in Polish', () => {
  const AUTOMATIC_PL = 'Całe ciało · 15 min · Początkujący · 14 lis'
  const AUTOMATIC_EN = 'Full body · 15 min · Beginner · 14 Nov'

  function storeDatedFavourite() {
    const saved = [{ id: 'fav-0', name: 'Old name', workout: workout(), savedOn: '2026-11-14' }]
    localStorage.setItem(FAVOURITES_KEY, JSON.stringify(saved))
  }

  it('renames with Polish labels, and the own name stays as typed in English', async () => {
    const user = userEvent.setup()
    choosePolish()
    storeDatedFavourite()
    renderAt('/')

    await user.click(screen.getByRole('button', { name: `Zmień nazwę: ${AUTOMATIC_PL}` }))
    const dialog = screen.getByRole('dialog', { name: 'Zmień nazwę Ulubionego' })
    const field = within(dialog).getByRole('textbox', { name: 'Nazwa' })
    expect(field).toHaveAttribute('placeholder', AUTOMATIC_PL)
    expect(field).toHaveAccessibleDescription('Zostaw puste, by wrócić do nazwy automatycznej')
    expect(within(dialog).getByRole('button', { name: 'Anuluj' })).toBeInTheDocument()
    await user.type(field, 'Dzień nóg')
    await user.click(within(dialog).getByRole('button', { name: 'Zapisz' }))

    expect(favouriteRows()[0]).toHaveTextContent(/^Dzień nóg/)
    await user.click(within(favouriteRows()[0]).getByRole('button', { name: 'Usuń' }))
    expect(screen.getByRole('dialog', { name: 'Usunąć z Ulubionych?' })).toHaveTextContent(
      'Dzień nóg',
    )
    await user.click(screen.getByRole('button', { name: 'Anuluj' }))
    await user.click(screen.getByRole('button', { name: 'EN' }))
    expect(favouriteRows('Favourites')[0]).toHaveTextContent(/^Dzień nóg/)
    expect(screen.getByRole('button', { name: 'Rename “Dzień nóg”' })).toBeInTheDocument()
  })

  it('brings back the automatic name, which again follows the Language', async () => {
    const user = userEvent.setup()
    choosePolish()
    storeDatedFavourite()
    renderAt('/')

    await user.click(screen.getByRole('button', { name: `Zmień nazwę: ${AUTOMATIC_PL}` }))
    await user.type(screen.getByRole('textbox', { name: 'Nazwa' }), 'Dzień nóg{Enter}')
    await user.click(screen.getByRole('button', { name: 'Zmień nazwę: Dzień nóg' }))
    await user.clear(screen.getByRole('textbox', { name: 'Nazwa' }))
    await user.click(screen.getByRole('button', { name: 'Zapisz' }))

    expect(favouriteRows()[0]).toHaveTextContent(new RegExp(`^${AUTOMATIC_PL}`))
    await user.click(screen.getByRole('button', { name: 'EN' }))
    expect(favouriteRows('Favourites')[0]).toHaveTextContent(new RegExp(`^${AUTOMATIC_EN}`))
  })
})
