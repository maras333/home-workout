import { useEffect, useReducer } from 'react'
import type { Step } from '@/workout/follow-along'

/**
 * Where Follow-along stands: the Step being played and the whole seconds spent on it.
 * `index === steps.length` means the Workout is complete. Pause, Skip and Back
 * (ticket 08) and saved progress (ticket 09) work on this same position.
 */
export type Position = { index: number; elapsed: number }

export type PlayerAction = { type: 'tick' }

export function advance(
  steps: readonly Step[],
  position: Position,
  action: PlayerAction,
): Position {
  switch (action.type) {
    case 'tick': {
      const step = steps[position.index]
      if (!step) return position
      const elapsed = position.elapsed + 1
      return elapsed >= step.seconds
        ? { index: position.index + 1, elapsed: 0 }
        : { ...position, elapsed }
    }
  }
}

export type Player = Position & {
  step: Step | undefined
  /** Seconds left on the current Step. */
  remaining: number
  finished: boolean
}

const TICK_MS = 1000

/** Plays the Steps from the start, one second at a time, moving on when each runs out. */
export function usePlayer(steps: readonly Step[]): Player {
  const [position, dispatch] = useReducer(
    (current: Position, action: PlayerAction) => advance(steps, current, action),
    { index: 0, elapsed: 0 },
  )
  const finished = position.index >= steps.length

  useEffect(() => {
    if (finished) return
    const timer = setInterval(() => dispatch({ type: 'tick' }), TICK_MS)
    return () => clearInterval(timer)
  }, [finished])

  const step = steps[position.index]
  return {
    ...position,
    step,
    remaining: step ? step.seconds - position.elapsed : 0,
    finished,
  }
}
