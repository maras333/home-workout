import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { App } from '@/App'

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
