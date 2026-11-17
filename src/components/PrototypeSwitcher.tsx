/** PROTOTYPE (throwaway): floating bar that cycles `?variant=`. Only rendered in dev builds. */
import { useEffect } from 'react'
import { useSearchParams } from 'react-router'

export function PrototypeSwitcher({
  variants,
  current,
}: {
  variants: Record<string, string>
  current: string
}) {
  const [params, setParams] = useSearchParams()
  const keys = Object.keys(variants)
  const go = (step: number) => {
    const i = (keys.indexOf(current) + step + keys.length) % keys.length
    const next = new URLSearchParams(params)
    next.set('variant', keys[i])
    setParams(next, { replace: true })
  }

  useEffect(() => {
    if (!import.meta.env.DEV) return
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null
      if (t?.closest('input, textarea, [contenteditable]')) return
      if (e.key === 'ArrowLeft') go(-1)
      if (e.key === 'ArrowRight') go(1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  if (!import.meta.env.DEV) return null
  return (
    <div className="fixed top-3 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-full bg-black px-4 py-2 text-sm text-white shadow-lg">
      <button type="button" aria-label="Previous variant" onClick={() => go(-1)}>
        ←
      </button>
      <span className="tabular-nums">
        {current} ({variants[current]})
      </span>
      <button type="button" aria-label="Next variant" onClick={() => go(1)}>
        →
      </button>
    </div>
  )
}
