import type { MainBlock, Workout, WorkoutSet } from './types'

/** For time fitting and Follow-along, a rep lasts 3 s. */
const REP_SECONDS = 3
/** The pause between Exercises outside main-Block Rounds, and between Blocks. */
export const CHANGE_OVER_SECONDS = 10

/** Planned length of one Set, covering both sides of a per-side Exercise. */
export function setSeconds({ target, perSide }: WorkoutSet): number {
  const sides = perSide ? 2 : 1
  const oneSide = target.measure === 'reps' ? target.reps * REP_SECONDS : target.seconds
  return oneSide * sides
}

function sum(values: number[]): number {
  return values.reduce((total, value) => total + value, 0)
}

/** Warm-up: Sets with change-overs between them. */
export function warmUpSeconds(sets: WorkoutSet[]): number {
  return sum(sets.map(setSeconds)) + CHANGE_OVER_SECONDS * Math.max(0, sets.length - 1)
}

/** Main Block: a change-over in from the warm-up, then its Rounds. */
export function mainSeconds(main: MainBlock): number {
  const { sets, rounds, lastRoundSets, restSeconds, roundRestSeconds } = main
  if (sets.length === 0 || rounds === 0) return 0
  let seconds = CHANGE_OVER_SECONDS
  for (let round = 1; round <= rounds; round++) {
    const setsInRound = round === rounds ? lastRoundSets : sets.length
    if (round > 1) seconds += roundRestSeconds
    seconds += sum(sets.slice(0, setsInRound).map(setSeconds))
    seconds += restSeconds * (setsInRound - 1)
  }
  return seconds
}

/** Cool-down: a change-over before each Set, the first one coming in from the main Block. */
export function coolDownSeconds(sets: WorkoutSet[]): number {
  return sum(sets.map((set) => CHANGE_OVER_SECONDS + setSeconds(set)))
}

/** The Workout's planned length, rest included. */
export function plannedSeconds(workout: Workout): number {
  return (
    warmUpSeconds(workout.warmUp) + mainSeconds(workout.main) + coolDownSeconds(workout.coolDown)
  )
}

/** How many Exercises the Workout holds; the main Block counts each Exercise once. */
export function exerciseCount(workout: Workout): number {
  return workout.warmUp.length + workout.main.sets.length + workout.coolDown.length
}
