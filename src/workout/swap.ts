import type { BlockRole, Exercise } from '@/library'
import {
  HOLD_SECONDS,
  WARM_UP_SECONDS,
  fitRounds,
  isEligible,
  mainBudget,
  mainRules,
  toSet,
} from './generate'
import { shuffle } from './random'
import type { RandomSource, Workout, WorkoutSet } from './types'

/** Where a Set sits in a Workout; a main-Block position covers that Exercise in every Round. */
export type SetPosition = { block: 'warmUp' | 'main' | 'coolDown'; index: number }

const ROLE: Record<SetPosition['block'], BlockRole> = {
  warmUp: 'warm-up',
  main: 'main',
  coolDown: 'cool-down',
}

function blockSets(workout: Workout, block: SetPosition['block']): WorkoutSet[] {
  return block === 'main' ? workout.main.sets : workout[block]
}

function candidates(workout: Workout, position: SetPosition, library: readonly Exercise[]) {
  const inWorkout = new Set(
    [...workout.warmUp, ...workout.main.sets, ...workout.coolDown].map((set) => set.exercise.id),
  )
  return library.filter(
    (exercise) =>
      !inWorkout.has(exercise.id) && isEligible(exercise, workout.request, ROLE[position.block]),
  )
}

/** Whether `swap` has another Exercise to offer at `position`; the Swap button is disabled when not. */
export function canSwap(
  workout: Workout,
  position: SetPosition,
  library: readonly Exercise[],
): boolean {
  return candidates(workout, position, library).length > 0
}

/**
 * Replaces the Exercise at `position` with a random eligible one not already in the Workout,
 * leaving the rest unchanged. Pure. Returns null when no other Exercise is eligible.
 */
export function swap(
  workout: Workout,
  position: SetPosition,
  library: readonly Exercise[],
  random: RandomSource,
): Workout | null {
  const eligible = candidates(workout, position, library)
  const current = blockSets(workout, position.block)[position.index].exercise.muscleGroups.primary
  const sameGroup = eligible.filter((exercise) =>
    exercise.muscleGroups.primary.some((group) => current.includes(group)),
  )
  const [replacement] = shuffle(sameGroup.length > 0 ? sameGroup : eligible, random)
  if (!replacement) return null
  const replace = <T>(items: T[], item: T) =>
    items.map((existing, i) => (i === position.index ? item : existing))

  switch (position.block) {
    case 'warmUp': {
      const set = toSet(replacement, { measure: 'time', seconds: WARM_UP_SECONDS })
      return { ...workout, warmUp: replace(workout.warmUp, set) }
    }
    case 'coolDown': {
      const set = toSet(replacement, { measure: 'time', seconds: HOLD_SECONDS })
      return { ...workout, coolDown: replace(workout.coolDown, set) }
    }
    case 'main': {
      const rules = mainRules(workout.request)
      const sets = replace(workout.main.sets, toSet(replacement, rules.target(replacement)))
      const budget = mainBudget(workout.request, workout.warmUp, workout.coolDown)
      return { ...workout, main: fitRounds(sets, rules.rest, budget) }
    }
  }
}
