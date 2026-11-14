import { useEffect } from 'react'

/**
 * Keeps the screen awake while `active`, where the browser has the Wake Lock API.
 * The browser drops the lock when the tab is hidden, so it is taken again on return.
 */
export function useWakeLock(active: boolean): void {
  useEffect(() => {
    if (!active || !('wakeLock' in navigator)) return
    let sentinel: WakeLockSentinel | null = null
    let stopped = false

    const acquire = () => {
      navigator.wakeLock.request('screen').then(
        (lock) => {
          if (stopped) void lock.release().catch(() => {})
          else sentinel = lock
        },
        () => {
          // Denied, e.g. on battery saver: Follow-along still works.
        },
      )
    }
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible' && (sentinel === null || sentinel.released)) {
        acquire()
      }
    }

    acquire()
    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => {
      stopped = true
      document.removeEventListener('visibilitychange', onVisibilityChange)
      void sentinel?.release().catch(() => {})
    }
  }, [active])
}
