import { useEffect } from 'react'
import type { PlayerControls } from './player'

/**
 * Space pauses and resumes, N skips, B goes back, while `active`. Space pauses even when
 * a control has focus, so its click on key-up is stopped; Enter still presses a focused button.
 */
export function useControlKeys({ togglePause, skip, back }: PlayerControls, active: boolean): void {
  useEffect(() => {
    if (!active) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return
      if (event.key === ' ') {
        event.preventDefault()
        if (!event.repeat) togglePause()
      } else if (event.repeat) {
        return
      } else if (event.key === 'n' || event.key === 'N') {
        skip()
      } else if (event.key === 'b' || event.key === 'B') {
        back()
      }
    }
    const onKeyUp = (event: KeyboardEvent) => {
      if (event.key === ' ') event.preventDefault()
    }
    window.addEventListener('keydown', onKeyDown, true)
    window.addEventListener('keyup', onKeyUp, true)
    return () => {
      window.removeEventListener('keydown', onKeyDown, true)
      window.removeEventListener('keyup', onKeyUp, true)
    }
  }, [togglePause, skip, back, active])
}
