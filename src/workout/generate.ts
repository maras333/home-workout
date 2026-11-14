import { DIFFICULTIES } from '@/library'
import type { BlockRole, Difficulty, Exercise } from '@/library'
import { shuffle } from './random'
import { CHANGE_OVER_SECONDS, coolDownSeconds, mainSeconds, warmUpSeconds } from './workout'
import type {
  MainBlock,
  Minutes,
  RandomSource,
  Target,
  Workout,
  WorkoutRequest,
  WorkoutSet,
} from './types'

/** Minutes per Block (warm-up / main / cool-down) for each time preset. */
const TIME_SPLIT: Record<Minutes, { warmUp: number; main: number; coolDown: number }> = {
  15: { warmUp: 3, main: 10, coolDown: 2 },
  30: { warmUp: 5, main: 21, coolDown: 4 },
  45: { warmUp: 6, main: 34, coolDown: 5 },
  60: { warmUp: 8, main: 45, coolDown: 7 },
}

const MAIN_EXERCISES: Record<Minutes, number> = { 15: 4, 30: 5, 45: 6, 60: 6 }

/** Main-Block work and rest by Difficulty. */
const MAIN_BY_DIFFICULTY: Record<
  Difficulty,
  {
    reps: number
    timedSeconds: number
    restSeconds: number
    roundRestSeconds: number
    cardioWorkSeconds: number
    cardioRestSeconds: number
  }
> = {
  beginner: {
    reps: 8,
    timedSeconds: 30,
    restSeconds: 30,
    roundRestSeconds: 60,
    cardioWorkSeconds: 20,
    cardioRestSeconds: 40,
  },
  intermediate: {
    reps: 12,
    timedSeconds: 40,
    restSeconds: 20,
    roundRestSeconds: 60,
    cardioWorkSeconds: 30,
    cardioRestSeconds: 30,
  },
  advanced: {
    reps: 15,
    timedSeconds: 45,
    restSeconds: 15,
    roundRestSeconds: 45,
    cardioWorkSeconds: 40,
    cardioRestSeconds: 20,
  },
}

const WARM_UP_SECONDS = 30
const HOLD_SECONDS = 40

type MainRest = Pick<MainBlock, 'restSeconds' | 'roundRestSeconds'>

/** How the Request's workout type and Difficulty shape the main Block's Sets and rest. */
function mainRules(request: WorkoutRequest): {
  target: (exercise: Exercise) => Target
  rest: MainRest
} {
  const table = MAIN_BY_DIFFICULTY[request.difficulty]
  const time = (seconds: number): Target => ({ measure: 'time', seconds })
  switch (request.workoutType) {
    case 'cardio/HIIT':
      return {
        target: () => time(table.cardioWorkSeconds),
        rest: { restSeconds: table.cardioRestSeconds, roundRestSeconds: table.roundRestSeconds },
      }
    case 'mobility/stretching':
      // Mobility does not change with Difficulty: 40 s holds with change-overs between them.
      return {
        target: () => time(HOLD_SECONDS),
        rest: { restSeconds: CHANGE_OVER_SECONDS, roundRestSeconds: CHANGE_OVER_SECONDS },
      }
    default:
      return {
        target: (exercise) =>
          exercise.measure === 'reps'
            ? { measure: 'reps', reps: table.reps }
            : time(table.timedSeconds),
        rest: { restSeconds: table.restSeconds, roundRestSeconds: table.roundRestSeconds },
      }
  }
}

function isEligible(exercise: Exercise, request: WorkoutRequest, role: BlockRole): boolean {
  return (
    exercise.workoutTypes.includes(request.workoutType) &&
    exercise.blockRoles.includes(role) &&
    exercise.equipment.every((item) => request.equipment.includes(item)) &&
    DIFFICULTIES.indexOf(exercise.difficulty) <= DIFFICULTIES.indexOf(request.difficulty)
  )
}

function toSet(exercise: Exercise, target: Target): WorkoutSet {
  return { exercise, target, perSide: exercise.perSide }
}

/** A single pass of as many Sets as fit in the budget. */
function fillPass(
  pool: Exercise[],
  budgetSeconds: number,
  target: Target,
  blockSeconds: (sets: WorkoutSet[]) => number,
): WorkoutSet[] {
  const sets: WorkoutSet[] = []
  for (const exercise of pool) {
    const set = toSet(exercise, target)
    if (blockSeconds([...sets, set]) <= budgetSeconds) sets.push(set)
  }
  return sets
}

/**
 * Repeats the Sets in Rounds, stopping after the Set whose end lands nearest the budget.
 * The first Round is always complete.
 */
function fitRounds(sets: WorkoutSet[], rest: MainRest, budgetSeconds: number): MainBlock {
  let best: MainBlock = { sets, rounds: 1, lastRoundSets: sets.length, ...rest }
  if (sets.length === 0) return { ...best, rounds: 0, lastRoundSets: 0 }
  let bestDistance = Math.abs(mainSeconds(best) - budgetSeconds)
  for (let rounds = 2; ; rounds++) {
    for (let lastRoundSets = 1; lastRoundSets <= sets.length; lastRoundSets++) {
      const candidate: MainBlock = { sets, rounds, lastRoundSets, ...rest }
      const seconds = mainSeconds(candidate)
      const distance = Math.abs(seconds - budgetSeconds)
      if (distance < bestDistance) {
        best = candidate
        bestDistance = distance
      }
      if (seconds >= budgetSeconds) return best
    }
  }
}

/**
 * Builds a Workout for the Request from the library. Pure: all randomness comes from `random`.
 * The main Block's Exercises are picked first. Warm-up and cool-down are then filled to their
 * minutes, and the main Block's Rounds absorb whatever time is left, so the total lands near
 * the chosen time.
 */
export function generate(
  request: WorkoutRequest,
  library: readonly Exercise[],
  random: RandomSource,
): Workout {
  const split = TIME_SPLIT[request.minutes]
  const pool = (role: BlockRole) =>
    shuffle(
      library.filter((exercise) => isEligible(exercise, request, role)),
      random,
    )

  const rules = mainRules(request)
  const mainSets = pool('main')
    .slice(0, MAIN_EXERCISES[request.minutes])
    .map((exercise) => toSet(exercise, rules.target(exercise)))
  const warmUp = fillPass(
    pool('warm-up'),
    split.warmUp * 60,
    { measure: 'time', seconds: WARM_UP_SECONDS },
    warmUpSeconds,
  )
  const coolDown = fillPass(
    pool('cool-down'),
    split.coolDown * 60,
    { measure: 'time', seconds: HOLD_SECONDS },
    coolDownSeconds,
  )

  const mainBudget = request.minutes * 60 - warmUpSeconds(warmUp) - coolDownSeconds(coolDown)
  const main = fitRounds(mainSets, rules.rest, mainBudget)

  return { request, warmUp, main, coolDown }
}
