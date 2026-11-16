import { act } from '@testing-library/react'
import { vi } from 'vitest'

type Listener = (event: { matches: boolean }) => void

/**
 * A fake `window.matchMedia` for a phone or a laptop viewport. jsdom computes no layout and has
 * no matchMedia; this one answers every query alike: it matches on a phone, not on a laptop.
 * `turn` changes the viewport while the app runs, as rotating or resizing would.
 * Undo with `vi.unstubAllGlobals()`.
 */
export function fakeViewport(viewport: 'phone' | 'laptop') {
  let matches = viewport === 'phone'
  const listeners = new Set<Listener>()
  vi.stubGlobal('matchMedia', (media: string) => ({
    media,
    get matches() {
      return matches
    },
    onchange: null,
    addEventListener: (_type: 'change', listener: Listener) => listeners.add(listener),
    removeEventListener: (_type: 'change', listener: Listener) => listeners.delete(listener),
    addListener: (listener: Listener) => listeners.add(listener),
    removeListener: (listener: Listener) => listeners.delete(listener),
    dispatchEvent: () => true,
  }))
  return {
    turn(to: 'phone' | 'laptop') {
      matches = to === 'phone'
      act(() => {
        for (const listener of listeners) listener({ matches })
      })
    },
  }
}
