import type { BlockRole, Exercise } from '@/library'
import { blockSet, fitRounds, isEligible, mainBudget, mainRules, sharesGroup } from './generate'
import { shuffle } from './random'
import type { RandomSource, Workout, WorkoutSet } from './types'
import { allSets } from './workout'

/** Where a Set sits in a Workout; a main-Block position covers that Exercise in every Round. */
export type SetPosition = { block: 'warmUp' | 'main' | 'coolDown'; index: number }

const ROLE: Record<SetPosition['block'], BlockRole> = {
  warmUp: 'warm-up',
  main: 'main',
  coolDown: 'cool-down',
}

function candidates(workout: Workout, position: SetPosition, library: readonly Exercise[]) {
  const inWorkout = new Set(allSets(workout).map((set) => set.exercise.id))
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
 * Swaps the Exercise at `position` for a random eligible one not already in the Workout,
 * preferring one with the same primary Muscle group, and leaves the other Exercises as they
 * were. The main Block's Rounds are then refitted to the time left, since the new Set may be
 * longer or shorter. Pure. Returns null when no other Exercise is eligible.
 */
export function swap(
  workout: Workout,
  position: SetPosition,
  library: readonly Exercise[],
  random: RandomSource,
): Workout | null {
  const { block, index } = position
  const sets = block === 'main' ? workout.main.sets : workout[block]
  const swappedOutGroups = sets[index].exercise.muscleGroups.primary
  const eligible = candidates(workout, position, library)
  const sameGroup = eligible.filter((exercise) =>
    sharesGroup(exercise.muscleGroups.primary, swappedOutGroups),
  )
  const [incoming] = shuffle(sameGroup.length > 0 ? sameGroup : eligible, random)
  if (!incoming) return null

  const newSet = blockSet(incoming, ROLE[block], workout.request)
  const swapped: WorkoutSet[] = sets.map((set, i) => (i === index ? newSet : set))
  const warmUp = block === 'warmUp' ? swapped : workout.warmUp
  const coolDown = block === 'coolDown' ? swapped : workout.coolDown
  const mainSets = block === 'main' ? swapped : workout.main.sets
  const main = fitRounds(
    mainSets,
    mainRules(workout.request).rest,
    mainBudget(workout.request, warmUp, coolDown),
  )
  return { ...workout, warmUp, main, coolDown }
}
