import { DIFFICULTIES } from '@/library'
import type { BlockRole, Difficulty, Exercise } from '@/library'
import { shuffle } from './random'
import { coolDownSeconds, mainSeconds, warmUpSeconds } from './timing'
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
/** Mobility main-Block Sets are separated by the normal change-over, not strength rest. */
const MOBILITY_REST_SECONDS = 10

function isEligible(exercise: Exercise, request: WorkoutRequest, role: BlockRole): boolean {
  return (
    exercise.workoutTypes.includes(request.workoutType) &&
    exercise.blockRoles.includes(role) &&
    exercise.equipment.every((item) => request.equipment.includes(item)) &&
    DIFFICULTIES.indexOf(exercise.difficulty) <= DIFFICULTIES.indexOf(request.difficulty)
  )
}

function timedSet(exercise: Exercise, seconds: number): WorkoutSet {
  return { exercise, target: { measure: 'time', seconds }, perSide: exercise.perSide }
}

/** A single pass of as many Sets as fit in the budget. */
function fillPass(
  pool: Exercise[],
  budgetSeconds: number,
  toSet: (exercise: Exercise) => WorkoutSet,
  blockSeconds: (sets: WorkoutSet[]) => number,
): WorkoutSet[] {
  const sets: WorkoutSet[] = []
  for (const exercise of pool) {
    const candidate = [...sets, toSet(exercise)]
    if (blockSeconds(candidate) <= budgetSeconds) sets.push(candidate[candidate.length - 1])
  }
  return sets
}

function mainTarget(exercise: Exercise, request: WorkoutRequest): Target {
  const table = MAIN_BY_DIFFICULTY[request.difficulty]
  if (request.workoutType === 'cardio/HIIT') {
    return { measure: 'time', seconds: table.cardioWorkSeconds }
  }
  if (request.workoutType === 'mobility/stretching') {
    return { measure: 'time', seconds: HOLD_SECONDS }
  }
  return exercise.measure === 'reps'
    ? { measure: 'reps', reps: table.reps }
    : { measure: 'time', seconds: table.timedSeconds }
}

function mainRest(request: WorkoutRequest): Pick<MainBlock, 'restSeconds' | 'roundRestSeconds'> {
  const table = MAIN_BY_DIFFICULTY[request.difficulty]
  const restSeconds =
    request.workoutType === 'cardio/HIIT'
      ? table.cardioRestSeconds
      : request.workoutType === 'mobility/stretching'
        ? MOBILITY_REST_SECONDS
        : table.restSeconds
  return { restSeconds, roundRestSeconds: table.roundRestSeconds }
}

/**
 * Repeats the Sets in Rounds, stopping after the Set whose end lands nearest the budget.
 * The first Round is always complete.
 */
function fitRounds(
  sets: WorkoutSet[],
  rest: Pick<MainBlock, 'restSeconds' | 'roundRestSeconds'>,
  budgetSeconds: number,
): MainBlock {
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
 * Warm-up and cool-down are filled first; the main Block then absorbs whatever time is left,
 * so the total lands near the chosen time.
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

  const warmUp = fillPass(
    pool('warm-up'),
    split.warmUp * 60,
    (exercise) => timedSet(exercise, WARM_UP_SECONDS),
    warmUpSeconds,
  )
  const coolDown = fillPass(
    pool('cool-down'),
    split.coolDown * 60,
    (exercise) => timedSet(exercise, HOLD_SECONDS),
    coolDownSeconds,
  )

  const mainSets = pool('main')
    .slice(0, MAIN_EXERCISES[request.minutes])
    .map((exercise) => ({
      exercise,
      target: mainTarget(exercise, request),
      perSide: exercise.perSide,
    }))
  const mainBudget = request.minutes * 60 - warmUpSeconds(warmUp) - coolDownSeconds(coolDown)
  const main = fitRounds(mainSets, mainRest(request), mainBudget)

  return { request, warmUp, main, coolDown }
}
