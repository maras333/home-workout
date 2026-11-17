import { useEffect, useState } from 'react'
import { cn } from 'cn'
import { keyPoses, type Exercise, type KeyPose } from '@/library'

/** How long one Key pose takes to fade into the next. */
const FADE_MS = 500

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'

function prefersReducedMotion() {
  return typeof window.matchMedia === 'function' && window.matchMedia(REDUCED_MOTION).matches
}

/**
 * The current Exercise's picture in Follow-along: its Key poses, each held as long as its GIF
 * holds it and then cross-faded into the next, smoother than the GIF's 10 fps dissolve. It
 * stops while the Workout is paused, and shows only the first pose to whoever prefers reduced
 * motion. Without Key poses it is the GIF.
 */
export function ExercisePicture({
  exercise,
  alt,
  paused,
  className,
}: {
  exercise: Exercise
  alt: string
  paused: boolean
  className: string
}) {
  const poses = keyPoses(exercise)
  if (poses.length === 0) {
    return (
      <img
        src={exercise.gifUrl}
        alt={alt}
        width={288}
        height={288}
        className={cn('rounded-2xl bg-white', className)}
      />
    )
  }
  // A new Exercise starts again from its first pose.
  return (
    <CrossFade key={exercise.id} poses={poses} alt={alt} paused={paused} className={className} />
  )
}

function CrossFade({
  poses,
  alt,
  paused,
  className,
}: {
  poses: KeyPose[]
  alt: string
  paused: boolean
  className: string
}) {
  const [shown, setShown] = useState(0)
  const [still] = useState(prefersReducedMotion)
  const hold = poses[shown].holdMs

  useEffect(() => {
    if (paused || still || poses.length < 2) return
    // The pose stays fully shown for its hold; the fade into it ran for FADE_MS before.
    const timer = setTimeout(() => setShown((n) => (n + 1) % poses.length), FADE_MS + hold)
    return () => clearTimeout(timer)
  }, [shown, hold, paused, still, poses.length])

  return (
    <div
      role="img"
      aria-label={alt}
      className={cn('relative overflow-hidden rounded-2xl bg-white', className)}
    >
      {poses.map((pose, n) => (
        <img
          key={pose.url}
          src={pose.url}
          alt=""
          data-shown={n === shown}
          className={cn(
            'absolute inset-0 size-full object-contain transition-opacity ease-in-out',
            n === shown ? 'opacity-100' : 'opacity-0',
          )}
          style={{ transitionDuration: `${FADE_MS}ms` }}
        />
      ))}
    </div>
  )
}
