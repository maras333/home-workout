import { DIFFICULTIES } from '@/library'
import type { BlockRole, Difficulty, Exercise, MuscleGroup, WorkoutType } from '@/library'
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

/**
 * The Muscle groups the main Block rotates through, slot by slot. Types without a list
 * (core, cardio/HIIT, mobility) just avoid repeating groups where they can.
 */
const ROTATION: Partial<Record<WorkoutType, MuscleGroup[]>> = {
  'full body': ['legs', 'glutes', 'chest', 'back', 'shoulders', 'core'],
  'upper body': ['chest', 'back', 'shoulders', 'arms'],
  'lower body': ['legs', 'glutes'],
}

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

const sharesGroup = (a: MuscleGroup[], b: MuscleGroup[]) => a.some((group) => b.includes(group))

/**
 * Picks the main Block's Exercises one slot at a time from a shuffled pool. Each slot takes the
 * best candidate by these rules, strongest first, so ties fall to the shuffle:
 * 1. reach "at least half on ticked Equipment" when the remaining slots only just allow it;
 * 2. not in the previous Workout's main Block, so "Generate another" changes something;
 * 3. don't share a primary group with the previous pick (or, in the last slot, with the first,
 *    since Rounds wrap around);
 * 4. the exact requested Difficulty;
 * 5. the rotation's group for this slot;
 * 6. a primary group not used yet.
 * Equipment ranks above neighbours because this only decides which Exercises go in;
 * `orderToAvoidClashes` then decides their order.
 */
function pickMain(
  pool: Exercise[],
  count: number,
  request: WorkoutRequest,
  previousIds: ReadonlySet<string>,
): Exercise[] {
  const rotation = ROTATION[request.workoutType]
  const equipmentWanted = request.equipment.length > 0 ? Math.ceil(count / 2) : 0
  const picks: Exercise[] = []
  let remaining = [...pool]

  while (picks.length < count && remaining.length > 0) {
    const slot = picks.length
    const isLast = slot === Math.min(count, pool.length) - 1
    const equipmentPicked = picks.filter((pick) => pick.equipment.length > 0).length
    const mustUseEquipment = equipmentWanted - equipmentPicked >= count - slot
    const previous = picks[slot - 1]?.muscleGroups.primary ?? []
    const firstPickGroups = isLast && slot > 0 ? picks[0].muscleGroups.primary : []
    const used = picks.flatMap((pick) => pick.muscleGroups.primary)
    const rotationGroup = rotation?.[slot % rotation.length]

    const penalties = (exercise: Exercise): number[] => {
      const groups = exercise.muscleGroups.primary
      return [
        mustUseEquipment && exercise.equipment.length === 0 ? 1 : 0,
        previousIds.has(exercise.id) ? 1 : 0,
        sharesGroup(groups, previous) || sharesGroup(groups, firstPickGroups) ? 1 : 0,
        exercise.difficulty === request.difficulty ? 0 : 1,
        rotationGroup === undefined || groups.includes(rotationGroup) ? 0 : 1,
        sharesGroup(groups, used) ? 1 : 0,
      ]
    }
    const best = remaining.reduce((winner, candidate) => {
      const a = penalties(candidate)
      const b = penalties(winner)
      const firstDifference = a.findIndex((value, i) => value !== b[i])
      return firstDifference !== -1 && a[firstDifference] < b[firstDifference] ? candidate : winner
    })
    picks.push(best)
    remaining = remaining.filter((exercise) => exercise !== best)
  }
  return picks
}

function clashes(order: Exercise[]): number {
  if (order.length < 2) return 0
  return order.filter((exercise, i) =>
    sharesGroup(exercise.muscleGroups.primary, order[(i + 1) % order.length].muscleGroups.primary),
  ).length
}

function permutations<T>(items: T[]): T[][] {
  if (items.length <= 1) return [items]
  return items.flatMap((item, i) =>
    permutations([...items.slice(0, i), ...items.slice(i + 1)]).map((rest) => [item, ...rest]),
  )
}

/**
 * Reorders the picks so that as few neighbours as possible share a primary group, counting
 * the last → first pair between Rounds. Keeps the picked order when it is already best.
 */
function orderToAvoidClashes(picks: Exercise[]): Exercise[] {
  let best = picks
  for (const order of permutations(picks)) {
    if (clashes(best) === 0) break
    if (clashes(order) < clashes(best)) best = order
  }
  return best
}

/**
 * A single pass of as many Sets as fit in the budget, taking Exercises that work the main
 * Block's Muscle groups first; Exercises repeat only when the pool runs out.
 */
function fillPass(
  pool: Exercise[],
  mainGroups: MuscleGroup[],
  budgetSeconds: number,
  target: Target,
  blockSeconds: (sets: WorkoutSet[]) => number,
): WorkoutSet[] {
  const worksMainGroups = (exercise: Exercise) =>
    sharesGroup([...exercise.muscleGroups.primary, ...exercise.muscleGroups.secondary], mainGroups)
  const ordered = [
    ...pool.filter(worksMainGroups),
    ...pool.filter((exercise) => !worksMainGroups(exercise)),
  ]
  const sets: WorkoutSet[] = []
  const tryAdd = (exercise: Exercise) => {
    const set = toSet(exercise, target)
    if (blockSeconds([...sets, set]) > budgetSeconds) return false
    sets.push(set)
    return true
  }
  for (const exercise of ordered) tryAdd(exercise)

  // Fallback: when the pool runs out before the time does, repeat Exercises, never back to back
  // unless there is only one.
  // Only once every Exercise is in; until then a long unused one is better left out.
  let added = sets.length > 0 && new Set(sets.map((set) => set.exercise)).size === ordered.length
  while (added) {
    added = false
    for (const exercise of ordered) {
      const last = sets[sets.length - 1].exercise
      if (exercise === last && ordered.length > 1) continue
      if (tryAdd(exercise)) added = true
    }
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
 * Given the `previous` Workout ("Generate another"), it steers away from that Workout's
 * main-Block Exercises as far as the pool allows.
 * The main Block's Exercises are picked first. Warm-up and cool-down are then filled to their
 * minutes, and the main Block's Rounds absorb whatever time is left, so the total lands near
 * the chosen time.
 */
export function generate(
  request: WorkoutRequest,
  library: readonly Exercise[],
  random: RandomSource,
  previous?: Workout,
): Workout {
  const split = TIME_SPLIT[request.minutes]
  const pool = (role: BlockRole) =>
    shuffle(
      library.filter((exercise) => isEligible(exercise, request, role)),
      random,
    )

  const rules = mainRules(request)
  const previousIds = new Set(previous?.main.sets.map((set) => set.exercise.id))
  const mainSets = orderToAvoidClashes(
    pickMain(pool('main'), MAIN_EXERCISES[request.minutes], request, previousIds),
  ).map((exercise) => toSet(exercise, rules.target(exercise)))
  const mainGroups = mainSets.flatMap((set) => set.exercise.muscleGroups.primary)
  const warmUp = fillPass(
    pool('warm-up'),
    mainGroups,
    split.warmUp * 60,
    { measure: 'time', seconds: WARM_UP_SECONDS },
    warmUpSeconds,
  )
  const coolDown = fillPass(
    pool('cool-down'),
    mainGroups,
    split.coolDown * 60,
    { measure: 'time', seconds: HOLD_SECONDS },
    coolDownSeconds,
  )

  const mainBudget = request.minutes * 60 - warmUpSeconds(warmUp) - coolDownSeconds(coolDown)
  const main = fitRounds(mainSets, rules.rest, mainBudget)

  return { request, warmUp, main, coolDown }
}
