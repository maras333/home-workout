import { useEffect, useMemo, useReducer } from 'react'
import type { Step } from '@/workout/follow-along'

/**
 * Where Follow-along stands: the Step being played and the whole seconds spent on it.
 * `index === steps.length` means the Workout is complete.
 */
export type Position = { index: number; elapsed: number }

export type PlayerState = Position & { paused: boolean }

export type PlayerAction =
  { type: 'tick' } | { type: 'toggle-pause' } | { type: 'skip' } | { type: 'back' }

/** Back restarts the current Step once more than this many seconds are done. */
const BACK_RESTARTS_AFTER = 3

export function advance(
  steps: readonly Step[],
  state: PlayerState,
  action: PlayerAction,
): PlayerState {
  const step = steps[state.index]
  if (!step) return state
  const goTo = (index: number): PlayerState => ({ ...state, index, elapsed: 0 })

  switch (action.type) {
    case 'tick': {
      if (state.paused) return state
      const elapsed = state.elapsed + 1
      return elapsed >= step.seconds ? goTo(state.index + 1) : { ...state, elapsed }
    }
    case 'toggle-pause':
      return { ...state, paused: !state.paused }
    case 'skip':
      return goTo(state.index + 1)
    case 'back': {
      if (state.elapsed > BACK_RESTARTS_AFTER) return goTo(state.index)
      for (let i = state.index - 1; i >= 0; i--) {
        if (steps[i].kind === 'work') return goTo(i)
      }
      return goTo(state.index)
    }
  }
}

export type PlayerControls = {
  togglePause: () => void
  /** On to the next Set or rest. */
  skip: () => void
  /** Restarts the current Step if more than 3 s in, otherwise goes to the previous Exercise. */
  back: () => void
}

export type Player = PlayerState &
  PlayerControls & {
    step: Step | undefined
    /** Seconds left on the current Step. */
    remaining: number
    finished: boolean
  }

const TICK_MS = 1000

/** Plays the Steps from `start`, one second at a time, moving on when each runs out. */
export function usePlayer(steps: readonly Step[], start: PlayerState): Player {
  const [state, dispatch] = useReducer(
    (current: PlayerState, action: PlayerAction) => advance(steps, current, action),
    start,
  )
  const controls = useMemo<PlayerControls>(
    () => ({
      togglePause: () => dispatch({ type: 'toggle-pause' }),
      skip: () => dispatch({ type: 'skip' }),
      back: () => dispatch({ type: 'back' }),
    }),
    [],
  )
  const finished = state.index >= steps.length
  const running = !finished && !state.paused

  // A new Step starts a fresh interval, so a Skip or Back gets its first second in full.
  useEffect(() => {
    if (!running) return
    const timer = setInterval(() => dispatch({ type: 'tick' }), TICK_MS)
    return () => clearInterval(timer)
  }, [running, state.index])

  const step = steps[state.index]
  return {
    ...state,
    step,
    remaining: step ? step.seconds - state.elapsed : 0,
    finished,
    ...controls,
  }
}
