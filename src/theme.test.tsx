import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { App } from '@/App'

const THEME_KEY = 'home-workout:theme'

/** A fake matchMedia where only the system colour scheme query can match. */
function systemPrefersDark(dark: boolean) {
  vi.stubGlobal('matchMedia', (media: string) => ({
    matches: media === '(prefers-color-scheme: dark)' && dark,
    media,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  }))
}

function renderApp() {
  return render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  )
}

const isDark = () => document.documentElement.classList.contains('dark')
const themeColor = () => document.querySelector('meta[name="theme-color"]')?.getAttribute('content')

beforeEach(() => {
  localStorage.clear()
  localStorage.setItem('home-workout:language', JSON.stringify('en'))
  document.documentElement.classList.remove('dark')
  document.head.innerHTML = '<meta name="theme-color" content="#171717" />'
  vi.unstubAllGlobals()
})

describe('Theme', () => {
  it('follows a light system theme by default', () => {
    systemPrefersDark(false)
    renderApp()
    expect(screen.getByRole('button', { name: 'Theme: System' })).toBeInTheDocument()
    expect(isDark()).toBe(false)
    expect(themeColor()).toBe('#ffffff')
  })

  it('follows a dark system theme by default', () => {
    systemPrefersDark(true)
    renderApp()
    expect(isDark()).toBe(true)
    expect(themeColor()).toBe('#171717')
  })

  it('cycles System, Light, Dark and back, remembering the choice', async () => {
    systemPrefersDark(true)
    renderApp()
    const user = userEvent.setup()

    await user.click(screen.getByRole('button', { name: 'Theme: System' }))
    expect(screen.getByRole('button', { name: 'Theme: Light' })).toBeInTheDocument()
    expect(isDark()).toBe(false)
    expect(themeColor()).toBe('#ffffff')
    expect(JSON.parse(localStorage.getItem(THEME_KEY)!)).toBe('light')

    await user.click(screen.getByRole('button', { name: 'Theme: Light' }))
    expect(isDark()).toBe(true)
    expect(JSON.parse(localStorage.getItem(THEME_KEY)!)).toBe('dark')

    await user.click(screen.getByRole('button', { name: 'Theme: Dark' }))
    expect(screen.getByRole('button', { name: 'Theme: System' })).toBeInTheDocument()
    expect(isDark()).toBe(true)
  })

  it('keeps a saved choice over the system theme', () => {
    systemPrefersDark(true)
    localStorage.setItem(THEME_KEY, JSON.stringify('light'))
    renderApp()
    expect(screen.getByRole('button', { name: 'Theme: Light' })).toBeInTheDocument()
    expect(isDark()).toBe(false)
  })

  it('ignores a corrupt saved choice', () => {
    systemPrefersDark(false)
    localStorage.setItem(THEME_KEY, '"purple"')
    renderApp()
    expect(screen.getByRole('button', { name: 'Theme: System' })).toBeInTheDocument()
  })

  it('is named in Polish', () => {
    systemPrefersDark(false)
    localStorage.setItem('home-workout:language', JSON.stringify('pl'))
    renderApp()
    expect(screen.getByRole('button', { name: 'Motyw: systemowy' })).toBeInTheDocument()
  })
})
