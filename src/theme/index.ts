import { useEffect, useState } from 'react'
import { loadTheme, saveTheme } from '@/workout'
import { THEMES, type Theme } from './types'

export { THEMES, type Theme } from './types'

const DARK_QUERY = '(prefers-color-scheme: dark)'

/** The browser chrome's colour (status bar, task switcher) for each look. */
const THEME_COLOR = { light: '#ffffff', dark: '#171717' }

function systemQuery(): MediaQueryList | null {
  return typeof window.matchMedia === 'function' ? window.matchMedia(DARK_QUERY) : null
}

/** Puts the page in the dark look, or takes it out, and tints the browser chrome to match. */
function show(dark: boolean) {
  document.documentElement.classList.toggle('dark', dark)
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', dark ? THEME_COLOR.dark : THEME_COLOR.light)
}

/**
 * The saved Theme choice (System until the user picks one) and a way to move to the next one,
 * System → Light → Dark. Keeps the page's look in step, following the system while on System.
 */
export function useTheme(): { theme: Theme; next: () => void } {
  const [theme, setTheme] = useState<Theme>(() => loadTheme() ?? 'system')

  useEffect(() => {
    if (theme !== 'system') {
      show(theme === 'dark')
      return
    }
    const query = systemQuery()
    show(query?.matches ?? false)
    const onChange = (event: MediaQueryListEvent) => show(event.matches)
    query?.addEventListener('change', onChange)
    return () => query?.removeEventListener('change', onChange)
  }, [theme])

  function next() {
    const following = THEMES[(THEMES.indexOf(theme) + 1) % THEMES.length]
    saveTheme(following)
    setTheme(following)
  }

  return { theme, next }
}
