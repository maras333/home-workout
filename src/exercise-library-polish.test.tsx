import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { beforeEach, describe, expect, it } from 'vitest'
import { App } from '@/App'

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

/** The names in the list, top to bottom. */
function listedNames() {
  return within(screen.getByRole('list', { name: 'Biblioteka ćwiczeń' }))
    .getAllByRole('button')
    .map((row) => row.querySelector('[data-name]')?.textContent)
}

function chip(group: string, name: string) {
  return within(screen.getByRole('group', { name: group })).getByRole('button', { name })
}

function search() {
  return screen.getByRole('searchbox', { name: 'Szukaj po nazwie' })
}

beforeEach(() => {
  localStorage.clear()
  localStorage.setItem('home-workout:language', '"pl"')
})

describe('the Exercise library in Polish', () => {
  it('is linked from the header as Ćwiczenia, next to the app name', async () => {
    const user = userEvent.setup()
    renderAt('/')

    expect(screen.getByRole('link', { name: 'Home Workout' })).toHaveAttribute('href', '/')
    await user.click(screen.getByRole('link', { name: 'Ćwiczenia' }))

    expect(
      screen.getByRole('heading', { level: 1, name: 'Biblioteka ćwiczeń' }),
    ).toBeInTheDocument()
  })

  it('lists every Exercise alphabetically by its Polish name', () => {
    renderAt('/exercises')

    const names = listedNames()
    expect(names).toHaveLength(144)
    expect(names.slice(0, 3)).toEqual(['bieg w miejscu', 'brzuszek', 'brzuszek skośny'])
    expect(names[names.length - 1]).toBe('żelazny krzyż')
    expect(screen.getByText('144 z 144 Ćwiczeń')).toBeInTheDocument()
  })

  it('shows each row in Polish and opens the detail dialog', async () => {
    const user = userEvent.setup()
    renderAt('/exercises')

    const row = screen.getByRole('button', { name: /^wyciskanie hantli na ławce/ })
    expect(row).toHaveTextContent(
      'Ćwiczy: klatka piersiowa (także ręce, barki) · Hantle, Krzesło lub ławka · Średni',
    )

    await user.click(row)
    expect(screen.getByRole('dialog', { name: 'wyciskanie hantli na ławce' })).toBeInTheDocument()
  })

  it('filters with Polish chips, Bez sprzętu meaning no Equipment', async () => {
    const user = userEvent.setup()
    renderAt('/exercises')

    await user.click(chip('Sprzęt', 'Bez sprzętu'))
    await user.click(chip('Poziom', 'Zaawansowany'))
    await user.click(chip('Partia mięśni', 'nogi'))

    expect(listedNames()).toContain('przysiad sissy')
    expect(listedNames()).not.toContain('przysiad bułgarski z hantlami') // dumbbells
    expect(screen.getByText(/^\d+ z 144 Ćwiczeń$/)).toBeInTheDocument()
  })

  it('searches the Polish names ignoring case and diacritics', async () => {
    const user = userEvent.setup()
    renderAt('/exercises')

    await user.type(search(), 'POMPKA WASKA')
    expect(listedNames()).toEqual(['pompka wąska', 'pompka wąska na kolanach'])

    await user.clear(search())
    await user.type(search(), 'sklon boczny')
    expect(listedNames()).toEqual(['skłon boczny w staniu'])
  })

  it('finds the English name only of an Exercise with no Polish text', async () => {
    const user = userEvent.setup()
    renderAt('/exercises')

    await user.type(search(), 'dead bug')
    expect(listedNames()).toEqual(['dead bug'])

    await user.clear(search())
    await user.type(search(), 'goblet squat') // English names of Exercises shown in Polish
    expect(screen.getByText('Żadne ćwiczenie nie pasuje do filtrów')).toBeInTheDocument()
    expect(screen.getByText('0 z 144 Ćwiczeń')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Wyczyść filtry' }))
    expect(listedNames()).toHaveLength(144)
  })
})
