import { useEffect } from 'react'
import { clearProgress, loadProgress, saveProgress } from '@/workout'
import type { Step } from '@/workout/follow-along'
import type { PlayerState } from './player'

/**
 * Where Follow-along starts: paused at the start of the saved Step when there is recent
 * progress for a Step of this Workout, otherwise running from the top.
 */
export function startingState(steps: readonly Step[]): PlayerState {
  const index = loadProgress()
  if (index !== null && index < steps.length) return { index, elapsed: 0, paused: true }
  if (index !== null) clearProgress()
  return { index: 0, elapsed: 0, paused: false }
}

/** Saves the Step Follow-along is on, Get ready included, and clears it at the end. */
export function useSaveProgress(index: number, finished: boolean): void {
  useEffect(() => {
    if (finished) clearProgress()
    else saveProgress(index)
  }, [index, finished])
}
