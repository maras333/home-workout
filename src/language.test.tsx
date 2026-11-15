import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { App } from '@/App'
import { library } from '@/library'
import type { Target, Workout, WorkoutSet } from '@/workout'

const LANGUAGE_KEY = 'home-workout:language'

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

function browserLanguages(...languages: string[]) {
  vi.spyOn(navigator, 'languages', 'get').mockReturnValue(languages)
}

function libraryExercise(id: string) {
  const found = library.find((exercise) => exercise.id === id)
  if (!found) throw new Error(`No Exercise ${id}`)
  return found
}

const PUSH_UP = 'I4hDWkc'
const CALF_RAISE = 'bJYHBIN'

function set(id: string, target: Target, perSide = false): WorkoutSet {
  return { exercise: libraryExercise(id), target, perSide }
}

const reps = (count: number): Target => ({ measure: 'reps', reps: count })

/** A Workout with known targets and counts, saved as if just generated. */
function storeWorkout(rounds = 4) {
  const workout: Workout = {
    request: { workoutType: 'lower body', minutes: 15, difficulty: 'beginner', equipment: [] },
    warmUp: [set(CALF_RAISE, reps(1))],
    main: {
      sets: [
        set(PUSH_UP, reps(3)),
        set(CALF_RAISE, reps(12)),
        set(PUSH_UP, reps(22)),
        set(CALF_RAISE, { measure: 'time', seconds: 40 }, true),
        set(PUSH_UP, reps(5)),
      ],
      rounds,
      lastRoundSets: 2,
      restSeconds: 20,
      roundRestSeconds: 60,
    },
    coolDown: [set(CALF_RAISE, { measure: 'time', seconds: 30 })],
  }
  localStorage.setItem('home-workout:current-workout', JSON.stringify(workout))
}

/** Each row's target in a Block: the row's text after the Exercise name, before Swap. */
function blockTargets(name: RegExp) {
  return within(screen.getByRole('region', { name }))
    .getAllByRole('listitem')
    .map((row) => {
      const exerciseName = within(row).getByRole('img').getAttribute('alt') ?? ''
      return within(row).getAllByRole('button')[0].textContent?.slice(exerciseName.length)
    })
}

function languageSwitch() {
  return screen.getByRole('group', { name: /^(Language|Język)$/ })
}

beforeEach(() => {
  localStorage.clear()
})

describe('the default Language', () => {
  it('is Polish when the browser prefers Polish', () => {
    browserLanguages('pl-PL', 'en-US')
    renderAt('/')

    expect(screen.getByRole('heading', { level: 1, name: 'Czego chcesz?' })).toBeInTheDocument()
    expect(document.documentElement).toHaveAttribute('lang', 'pl')
  })

  it('is English when the browser prefers any other language', () => {
    browserLanguages('de-DE', 'pl-PL')
    renderAt('/')

    expect(screen.getByRole('heading', { level: 1, name: 'Workout Request' })).toBeInTheDocument()
    expect(document.documentElement).toHaveAttribute('lang', 'en')
  })
})

describe('a saved Language', () => {
  it.each([
    ['corrupt', '{"lang'],
    ['unknown', '"de"'],
  ])('falls back to the browser language when %s', (_case, saved) => {
    browserLanguages('pl')
    localStorage.setItem(LANGUAGE_KEY, saved)
    renderAt('/')

    expect(screen.getByRole('heading', { level: 1, name: 'Czego chcesz?' })).toBeInTheDocument()
  })
})

describe('the Language switch', () => {
  it('shows the active Language and switches to the other one', async () => {
    browserLanguages('en-US')
    const user = userEvent.setup()
    renderAt('/')

    const header = languageSwitch()
    expect(header).toHaveTextContent('EN | PL')
    expect(within(header).getByRole('button', { name: 'EN' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(within(header).getByRole('button', { name: 'PL' })).toHaveAttribute(
      'aria-pressed',
      'false',
    )

    await user.click(within(header).getByRole('button', { name: 'PL' }))

    expect(screen.getByRole('heading', { level: 1, name: 'Czego chcesz?' })).toBeInTheDocument()
    expect(within(header).getByRole('button', { name: 'PL' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(document.documentElement).toHaveAttribute('lang', 'pl')
  })

  it('remembers the choice across a remount', async () => {
    browserLanguages('pl-PL')
    const user = userEvent.setup()
    const { unmount } = renderAt('/')
    await user.click(screen.getByRole('button', { name: 'EN' }))
    unmount()

    renderAt('/')

    expect(screen.getByRole('heading', { level: 1, name: 'Workout Request' })).toBeInTheDocument()
  })

  it('sits in the header of the Workout preview too', async () => {
    const user = userEvent.setup()
    renderAt('/')
    await user.click(screen.getByRole('button', { name: 'Generate' }))

    expect(
      screen.queryByRole('heading', { level: 1, name: 'Workout Request' }),
    ).not.toBeInTheDocument()
    expect(within(languageSwitch()).getByRole('button', { name: 'PL' })).toBeInTheDocument()
  })
})

describe('in Polish', () => {
  beforeEach(() => {
    browserLanguages('pl-PL')
  })

  it('shows the Workout Request form in Polish', () => {
    renderAt('/')

    for (const legend of ['Rodzaj treningu', 'Czas', 'Poziom', 'Sprzęt']) {
      expect(screen.getByRole('group', { name: legend })).toBeInTheDocument()
    }
    for (const type of [
      'Całe ciało',
      'Góra ciała',
      'Dół ciała',
      'Brzuch',
      'Cardio/HIIT',
      'Mobilność i rozciąganie',
    ]) {
      expect(screen.getByRole('radio', { name: type })).toBeInTheDocument()
    }
    expect(screen.getByRole('radio', { name: 'Całe ciało' })).toBeChecked()
    expect(screen.getByRole('radio', { name: '30 min' })).toBeChecked()
    expect(screen.getByRole('radio', { name: 'Średni' })).toBeChecked()
    expect(screen.getByRole('radio', { name: 'Początkujący' })).toHaveAccessibleDescription(
      'Dopiero zaczynasz albo wracasz po przerwie.',
    )
    expect(screen.getByRole('radio', { name: 'Zaawansowany' })).toHaveAccessibleDescription(
      'Trenujesz regularnie i chcesz się zmęczyć.',
    )
    for (const item of ['Hantle', 'Guma oporowa', 'Kettlebell', 'Krzesło lub ławka']) {
      expect(screen.getByRole('checkbox', { name: item })).not.toBeChecked()
    }
    expect(screen.getByText('Ćwiczenia z masą ciała są zawsze uwzględnione.')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Generuj' })).toBeInTheDocument()
  })

  it('credits ExerciseDB and AGPL-3.0 in Polish', () => {
    renderAt('/')

    const footer = screen.getByRole('contentinfo')
    expect(footer).toHaveTextContent('Dane ćwiczeń i GIF-y: ExerciseDB (AGPL-3.0) · Kod źródłowy')
    expect(within(footer).getByRole('link', { name: 'ExerciseDB (AGPL-3.0)' })).toHaveAttribute(
      'href',
      'https://github.com/bootstrapping-lab/exercisedb-api/tree/7cdc82e',
    )
    expect(within(footer).getByRole('link', { name: 'Kod źródłowy' })).toHaveAttribute(
      'href',
      'https://github.com/maras333/home-workout',
    )
  })
})

describe('the Workout preview in Polish', () => {
  beforeEach(() => {
    browserLanguages('pl-PL')
    storeWorkout()
  })

  it('shows the summary, the Blocks and the targets with Polish plural forms', () => {
    renderAt('/workout')

    expect(screen.getByRole('heading', { level: 1, name: 'Podgląd treningu' })).toBeInTheDocument()
    expect(screen.getByText('Dół ciała · 15 min · Początkujący · Bez sprzętu')).toBeInTheDocument()
    expect(screen.getByText(/^Planowany czas: /)).toHaveTextContent(
      /^Planowany czas: \d+ min · 7 Ćwiczeń$/,
    )
    expect(screen.getByRole('heading', { level: 2, name: 'Rozgrzewka' })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Część główna · 5 Ćwiczeń × 4 Rundy (ostatnia Runda: 2 Ćwiczenia)',
      }),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: 'Wyciszenie' })).toBeInTheDocument()

    expect(blockTargets(/^Rozgrzewka/)).toEqual(['1 powtórzenie'])
    expect(blockTargets(/^Część główna/)).toEqual([
      '3 powtórzenia',
      '12 powtórzeń',
      '22 powtórzenia',
      '40 s na stronę',
      '5 powtórzeń',
    ])
    expect(blockTargets(/^Wyciszenie/)).toEqual(['30 s'])
  })

  it('shows the top bar and Swap in Polish', () => {
    renderAt('/workout')

    const actions = screen.getByRole('navigation', { name: 'Akcje treningu' })
    expect(within(actions).getByRole('button', { name: '← Zmień zgłoszenie' })).toBeInTheDocument()
    expect(within(actions).getByRole('button', { name: 'Wygeneruj inny' })).toBeInTheDocument()
    expect(within(actions).getByRole('button', { name: 'Rozpocznij trening' })).toBeInTheDocument()
    const warmUp = screen.getByRole('region', { name: 'Rozgrzewka' })
    expect(within(warmUp).getByRole('button', { name: /^Zamień / })).toHaveTextContent('Zamień')
  })

  it('shows the Exercise detail dialog in Polish', async () => {
    const user = userEvent.setup()
    renderAt('/workout')
    const main = screen.getByRole('region', { name: /^Część główna/ })
    const pushUpRow = within(main).getAllByRole('listitem')[0]

    await user.click(within(pushUpRow).getAllByRole('button')[0])

    const dialog = screen.getByRole('dialog', { name: 'pompka' })
    expect(
      within(dialog)
        .getAllByRole('listitem')
        .map((step) => step.textContent),
    ).toEqual([
      'Zacznij w podporze przodem na prostych rękach, z dłońmi rozstawionymi nieco szerzej niż barki i złączonymi stopami.',
      'Napnij brzuch i opuść ciało w stronę podłogi, zginając łokcie i utrzymując ciało w jednej linii.',
      'Zatrzymaj się na chwilę, gdy klatka piersiowa jest tuż nad podłogą, a potem wypchnij się do pozycji wyjściowej, prostując ręce.',
      'Powtórz tyle razy, ile zakłada seria.',
    ])
    expect(dialog).toHaveTextContent('Ćwiczy: klatka piersiowa (także ręce, barki, brzuch)')
    expect(dialog).toHaveTextContent('Sprzęt: Bez sprzętu')
    expect(dialog).toHaveTextContent('Poziom: Średni')

    await user.click(within(dialog).getByRole('button', { name: 'Zamknij' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it.each([
    [1, '1 Runda'],
    [5, '5 Rund'],
  ])('names %i Rounds with the Polish plural form', (rounds, text) => {
    storeWorkout(rounds)
    renderAt('/workout')

    expect(screen.getByRole('heading', { level: 2, name: /^Część główna/ })).toHaveTextContent(
      `Część główna · 5 Ćwiczeń × ${text} (ostatnia Runda: 2 Ćwiczenia)`,
    )
  })

  it('names translated Exercises in Polish and untranslated ones in English', () => {
    renderAt('/workout')

    const main = screen.getByRole('region', { name: /^Część główna/ })
    expect(
      within(main)
        .getAllByRole('img')
        .map((gif) => gif.getAttribute('alt')),
    ).toEqual([
      'pompka',
      'bodyweight standing calf raise',
      'pompka',
      'bodyweight standing calf raise',
      'pompka',
    ])
    expect(within(main).getAllByRole('button', { name: 'Zamień ćwiczenie: pompka' })).toHaveLength(
      3,
    )
  })

  it('shows the saved text of an Exercise that left the library', async () => {
    const user = userEvent.setup()
    const saved = JSON.parse(localStorage.getItem('home-workout:current-workout')!) as Workout
    saved.warmUp[0].exercise = {
      ...saved.warmUp[0].exercise,
      id: 'gone',
      name: 'old move',
      steps: ['Move the old way.'],
    }
    localStorage.setItem('home-workout:current-workout', JSON.stringify(saved))
    renderAt('/workout')

    const warmUp = screen.getByRole('region', { name: 'Rozgrzewka' })
    await user.click(within(warmUp).getAllByRole('button')[0])

    const dialog = screen.getByRole('dialog', { name: 'old move' })
    expect(within(dialog).getByRole('listitem')).toHaveTextContent('Move the old way.')
  })

  it('keeps a saved Favourite matching after switching the Language', async () => {
    const user = userEvent.setup()
    renderAt('/workout')
    await user.click(screen.getByRole('button', { name: /Save/ }))

    await user.click(screen.getByRole('button', { name: 'EN' }))

    expect(screen.getByRole('button', { name: /Save/ })).toHaveAttribute('aria-pressed', 'true')
  })
})
