import type { Difficulty, Equipment, Exercise, WorkoutType } from '@/library'

export const MINUTES = [15, 30, 45, 60] as const
export type Minutes = (typeof MINUTES)[number]

export type WorkoutRequest = {
  workoutType: WorkoutType
  minutes: Minutes
  difficulty: Difficulty
  /** The Equipment ticked today; empty means bodyweight only. */
  equipment: Equipment[]
}

/** Reps, or seconds; per side when the Set is per side. */
export type Target = { measure: 'reps'; reps: number } | { measure: 'time'; seconds: number }

export type WorkoutSet = {
  exercise: Exercise
  target: Target
  perSide: boolean
}

export type MainBlock = {
  /** One Set per Exercise, in Round order. */
  sets: WorkoutSet[]
  rounds: number
  /** How many Sets the last Round holds; equals `sets.length` when it is a full Round. */
  lastRoundSets: number
  /** Rest after each Set inside a Round. */
  restSeconds: number
  /** Rest between Rounds, in place of the rest after a Round's last Set. */
  roundRestSeconds: number
}

export type Workout = {
  request: WorkoutRequest
  warmUp: WorkoutSet[]
  main: MainBlock
  coolDown: WorkoutSet[]
}

/** A number in [0, 1), like Math.random. */
export type RandomSource = () => number

/** A Workout the user saved to start again later: a frozen copy, named automatically. */
export type Favourite = {
  id: string
  /** The name in the Language it was saved in; shown only when there is no `savedOn`. */
  name: string
  workout: Workout
  /** The day it was saved, "2026-11-14"; missing on Favourites saved before it was kept. */
  savedOn?: string
}

/** Favourites are capped; nothing is ever removed behind the user's back. */
export const MAX_FAVOURITES = 20
