/* eslint-disable react-refresh/only-export-components -- prototype: hook, constants and component kept together */
/**
 * PROTOTYPE (throwaway, branch prototype/key-pose-crossfade only).
 *
 * Question: does playing an Exercise's key poses with a CSS cross-fade look smoother than the
 * ExerciseDB GIF on the Follow-along screen? See docs/research/smooth-exercise-animations.md.
 *
 * Three variants of the Exercise picture in Follow-along, switchable via `?variant=`:
 *   A  the GIF, as today
 *   B  key poses, cross-faded at the GIF's own timing (holds from the GIF, 500 ms eased fade)
 *   C  key poses, slow eased fade (1.2 s) with 0.8 s holds, paused with the Workout
 * Key poses come from scripts/prototype-extract-key-poses.py.
 */
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import { cn } from 'cn'
import poses from '../../public/prototype-key-poses/poses.json'

export const VARIANTS = {
  A: 'GIF (today)',
  B: 'Cross-fade, GIF timing',
  C: 'Slow eased cross-fade',
} as const
export type Variant = keyof typeof VARIANTS

export function useVariant(): Variant {
  const [params] = useSearchParams()
  const v = params.get('variant')
  return v && v in VARIANTS ? (v as Variant) : 'A'
}

type Props = {
  id: string
  gifUrl: string
  alt: string
  className: string
  paused: boolean
  variant: Variant
}

export function PrototypeExerciseAnimation({ id, gifUrl, alt, className, paused, variant }: Props) {
  const entry = (poses as Record<string, { count: number; holds: number[] }>)[id]
  if (variant === 'A' || !entry) {
    return (
      <img
        src={gifUrl}
        alt={alt}
        width={288}
        height={288}
        className={cn('rounded-2xl bg-white', className)}
      />
    )
  }
  const fade = variant === 'B' ? 500 : 1200
  return (
    <CrossFade
      key={`${id}-${variant}`}
      id={id}
      count={entry.count}
      holds={entry.holds}
      fixedHold={variant === 'C' ? 800 : null}
      fade={fade}
      alt={alt}
      className={className}
      paused={paused}
    />
  )
}

function CrossFade({
  id,
  count,
  holds,
  fixedHold,
  fade,
  alt,
  className,
  paused,
}: {
  id: string
  count: number
  holds: number[]
  fixedHold: number | null
  fade: number
  alt: string
  className: string
  paused: boolean
}) {
  const [shown, setShown] = useState(0)
  const reduced =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (paused || reduced || count < 2) return
    // Hold the pose, then start fading to the next one; the fade itself is the CSS transition.
    const t = setTimeout(() => setShown((s) => (s + 1) % count), (fixedHold ?? holds[shown]) + fade)
    return () => clearTimeout(t)
  }, [shown, paused, reduced, count, holds, fixedHold, fade])

  return (
    <div
      role="img"
      aria-label={alt}
      className={cn('relative overflow-hidden rounded-2xl bg-white', className)}
    >
      {Array.from({ length: count }, (_, n) => (
        <img
          key={n}
          src={`/prototype-key-poses/${id}-${n}.webp`}
          alt=""
          className="absolute inset-0 size-full object-contain"
          style={{
            opacity: n === shown ? 1 : 0,
            transition: `opacity ${fade}ms cubic-bezier(0.45, 0, 0.55, 1)`,
          }}
        />
      ))}
    </div>
  )
}
