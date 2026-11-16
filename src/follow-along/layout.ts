import { useSyncExternalStore } from 'react'

/**
 * A phone's viewport: narrow (portrait), or short and wide (landscape, about 640–930 × 360–430).
 * Never from the `lg` breakpoint (64rem) up, where Follow-along keeps its laptop layout.
 */
export const PHONE_QUERY =
  '(max-width: 639.98px), (max-width: 1023.98px) and (max-height: 479.98px)'

function phoneQuery(): MediaQueryList | null {
  return typeof window.matchMedia === 'function' ? window.matchMedia(PHONE_QUERY) : null
}

function subscribe(onChange: () => void): () => void {
  const query = phoneQuery()
  query?.addEventListener('change', onChange)
  return () => query?.removeEventListener('change', onChange)
}

/**
 * Whether Follow-along lays itself out for a phone, chosen from the viewport rather than the
 * device, and kept up to date as it turns or resizes. Without matchMedia it is a laptop.
 */
export function usePhoneLayout(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => phoneQuery()?.matches ?? false,
    () => false,
  )
}
