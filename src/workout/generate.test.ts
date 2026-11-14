import { describe, expect, it } from 'vitest'
import type { Exercise } from '@/library'
import { generate, plannedSeconds, seededRandom, setSeconds } from '@/workout'
import type { Minutes, Workout, WorkoutRequest } from '@/workout'

let nextId = 0

/** A hand-built Exercise; by default a bodyweight, Beginner, full-body main-Block timed Exercise. */
function exercise(overrides: Partial<Exercise> = {}): Exercise {
  const id = `ex${nextId++}`
  return {
    id,
    name: id,
    steps: ['Do it.'],
    trains: 'Trains: legs',
    gifUrl: `/exercisedb/${id}.gif`,
    muscleGroups: { primary: ['legs'], secondary: [] },
    equipment: [],
    difficulty: 'beginner',
    workoutTypes: ['full body'],
    blockRoles: ['main'],
    measure: 'time',
    perSide: false,
    ...overrides,
  }
}

function many(count: number, overrides: Partial<Exercise> = {}): Exercise[] {
  return Array.from({ length: count }, () => exercise(overrides))
}

const request: WorkoutRequest = {
  workoutType: 'full body',
  minutes: 30,
  difficulty: 'intermediate',
  equipment: [],
}

describe('generate', () => {
  it('builds a 15-minute Workout worked out by hand', () => {
    // Warm-up: 30 s Sets + 10 s change-overs fit 4 Sets in 3 min (150 s).
    // Cool-down: 10 s change-over + 40 s hold fits 2 Sets in 2 min (100 s).
    // Main: 900 - 150 - 100 = 650 s left. 10 s change-over, then 40 s Sets with 20 s rest
    // and 60 s between Rounds. Set ends: R1 70..230, R2 330..510, R3 610, 670, 730...
    // 670 is nearest to 650, so 3 Rounds with the last stopping after 2 Sets.
    const library = [
      ...many(6, { blockRoles: ['warm-up'] }),
      ...many(6, { blockRoles: ['main'] }),
      ...many(6, { blockRoles: ['cool-down'] }),
    ]

    const workout = generate({ ...request, minutes: 15 }, library, seededRandom(1))

    expect(workout.warmUp).toHaveLength(4)
    expect(workout.coolDown).toHaveLength(2)
    expect(workout.main.sets).toHaveLength(4)
    expect(workout.main.rounds).toBe(3)
    expect(workout.main.lastRoundSets).toBe(2)
    expect(plannedSeconds(workout)).toBe(920)
  })

  it.each([
    [15, 3, 10, 2, 4],
    [30, 5, 21, 4, 5],
    [45, 6, 34, 5, 6],
    [60, 8, 45, 7, 6],
  ] as const)(
    'fits %i minutes: warm-up %i, main %i, cool-down %i minutes, %i main Exercises, total within ±10%%',
    (minutes, warmUpMinutes, mainMinutes, coolDownMinutes, mainExercises) => {
      const library = [
        ...many(20, { blockRoles: ['warm-up'] }),
        ...many(10, { blockRoles: ['main'], measure: 'reps' }),
        ...many(10, { blockRoles: ['main'], measure: 'reps', perSide: true }),
        ...many(10, { blockRoles: ['main'], measure: 'time' }),
        ...many(20, { blockRoles: ['cool-down'], perSide: true }),
        ...many(20, { blockRoles: ['cool-down'] }),
      ]

      for (const difficulty of ['beginner', 'intermediate', 'advanced'] as const) {
        for (let seed = 1; seed <= 20; seed++) {
          const workout = generate(
            { ...request, minutes: minutes as Minutes, difficulty },
            library,
            seededRandom(seed),
          )
          const blocks = blockSeconds(workout)

          // Single-pass Blocks hold as many Sets as fit: within one Set of their minutes.
          expect(blocks.warmUp).toBeLessThanOrEqual(warmUpMinutes * 60)
          expect(blocks.warmUp).toBeGreaterThan(warmUpMinutes * 60 - 70)
          expect(blocks.coolDown).toBeLessThanOrEqual(coolDownMinutes * 60)
          expect(blocks.coolDown).toBeGreaterThan(coolDownMinutes * 60 - 90)
          expect(blocks.main).toBeGreaterThan(mainMinutes * 60 * 0.85)

          expect(workout.main.sets).toHaveLength(mainExercises)
          expect(workout.main.lastRoundSets).toBeGreaterThanOrEqual(1)
          expect(workout.main.lastRoundSets).toBeLessThanOrEqual(mainExercises)

          const total = blocks.warmUp + blocks.main + blocks.coolDown
          expect(plannedSeconds(workout)).toBe(total)
          expect(total).toBeGreaterThanOrEqual(minutes * 60 * 0.9)
          expect(total).toBeLessThanOrEqual(minutes * 60 * 1.1)
        }
      }
    },
  )

  it.each([
    ['beginner', 8, 30, 30, 60],
    ['intermediate', 12, 40, 20, 60],
    ['advanced', 15, 45, 15, 45],
  ] as const)(
    'uses the %s work and rest table in the main Block',
    (difficulty, reps, timedSeconds, restSeconds, roundRestSeconds) => {
      const library = [
        exercise({ blockRoles: ['main'], measure: 'reps', difficulty }),
        exercise({ blockRoles: ['main'], measure: 'time', difficulty }),
      ]

      const workout = generate({ ...request, difficulty }, library, seededRandom(1))

      expect(workout.main.sets.map((set) => set.target)).toEqual(
        expect.arrayContaining([
          { measure: 'reps', reps },
          { measure: 'time', seconds: timedSeconds },
        ]),
      )
      expect(workout.main.restSeconds).toBe(restSeconds)
      expect(workout.main.roundRestSeconds).toBe(roundRestSeconds)
    },
  )

  it.each([
    ['beginner', 20, 40],
    ['intermediate', 30, 30],
    ['advanced', 40, 20],
  ] as const)(
    'uses %s cardio/HIIT work and rest: %i s work, %i s rest, even for rep Exercises',
    (difficulty, workSeconds, restSeconds) => {
      const library = many(5, {
        blockRoles: ['main'],
        workoutTypes: ['cardio/HIIT'],
        measure: 'reps',
      })

      const workout = generate(
        { ...request, workoutType: 'cardio/HIIT', difficulty },
        library,
        seededRandom(1),
      )

      for (const set of workout.main.sets) {
        expect(set.target).toEqual({ measure: 'time', seconds: workSeconds })
      }
      expect(workout.main.restSeconds).toBe(restSeconds)
    },
  )

  it('times warm-up Sets at 30 s and cool-down holds at 40 s, even for rep Exercises', () => {
    const library = [
      ...many(3, { blockRoles: ['warm-up'], measure: 'reps' }),
      ...many(3, { blockRoles: ['main'] }),
      ...many(3, { blockRoles: ['cool-down'], measure: 'reps' }),
    ]

    const workout = generate(request, library, seededRandom(1))

    expect(workout.warmUp.length).toBeGreaterThan(0)
    for (const set of workout.warmUp) expect(set.target).toEqual({ measure: 'time', seconds: 30 })
    expect(workout.coolDown.length).toBeGreaterThan(0)
    for (const set of workout.coolDown) expect(set.target).toEqual({ measure: 'time', seconds: 40 })
  })

  it.each(['beginner', 'intermediate', 'advanced'] as const)(
    'holds %s mobility/stretching main-Block Sets for 40 s, with 10 s change-overs and no Round rest',
    (difficulty) => {
      const library = many(5, {
        blockRoles: ['main'],
        workoutTypes: ['mobility/stretching'],
        measure: 'reps',
      })

      const workout = generate(
        { ...request, workoutType: 'mobility/stretching', difficulty },
        library,
        seededRandom(1),
      )

      for (const set of workout.main.sets) {
        expect(set.target).toEqual({ measure: 'time', seconds: 40 })
      }
      expect(workout.main.restSeconds).toBe(10)
      expect(workout.main.roundRestSeconds).toBe(10)
    },
  )

  it('makes a per-side Exercise one Set, counting a rep as 3 s doubled per side', () => {
    const library = [
      exercise({ blockRoles: ['main'], measure: 'reps', perSide: true }),
      exercise({ blockRoles: ['cool-down'], perSide: true }),
    ]

    const workout = generate(request, library, seededRandom(1))

    const [mainSet] = workout.main.sets
    expect(mainSet).toMatchObject({ target: { measure: 'reps', reps: 12 }, perSide: true })
    expect(setSeconds(mainSet)).toBe(72)
    const [hold] = workout.coolDown
    expect(hold).toMatchObject({ target: { measure: 'time', seconds: 40 }, perSide: true })
    expect(setSeconds(hold)).toBe(80)
  })

  it.each([
    ['another workout type', { workoutTypes: ['core'] }],
    ['another Block role', { blockRoles: ['cool-down'] }],
    ['Equipment that is not ticked', { equipment: ['kettlebell'] }],
    ['a harder Difficulty', { difficulty: 'advanced' }],
  ] as const)('leaves an Exercise with %s out of the main Block', (_reason, overrides) => {
    const ineligible = exercise({ blockRoles: ['main'], ...overrides } as Partial<Exercise>)
    const library = [ineligible, ...many(10, { blockRoles: ['main'] })]

    for (let seed = 1; seed <= 20; seed++) {
      const workout = generate(
        { ...request, equipment: ['dumbbells'] },
        library,
        seededRandom(seed),
      )
      expect(workout.main.sets.map((set) => set.exercise.id)).not.toContain(ineligible.id)
    }
  })

  it('includes Exercises needing only ticked Equipment, at or below the Difficulty', () => {
    const library = [
      exercise({ equipment: ['dumbbells'], difficulty: 'intermediate' }),
      exercise({ equipment: ['dumbbells', 'chair or bench'], difficulty: 'beginner' }),
      exercise({ equipment: [], difficulty: 'beginner' }),
    ]

    const workout = generate(
      { ...request, equipment: ['dumbbells', 'chair or bench'] },
      library,
      seededRandom(1),
    )

    expect(workout.main.sets.map((set) => set.exercise.id).sort()).toEqual(
      library.map((item) => item.id).sort(),
    )
  })

  it('never repeats an Exercise within a Block', () => {
    const library = [
      ...many(3, { blockRoles: ['warm-up'] }),
      ...many(3, { blockRoles: ['main'] }),
      ...many(3, { blockRoles: ['cool-down'] }),
    ]

    for (let seed = 1; seed <= 20; seed++) {
      const workout = generate({ ...request, minutes: 60 }, library, seededRandom(seed))
      for (const sets of [workout.warmUp, workout.main.sets, workout.coolDown]) {
        const ids = sets.map((set) => set.exercise.id)
        expect(new Set(ids).size).toBe(ids.length)
      }
    }
  })

  it('gives the same Workout for the same seed, and varies with the seed', () => {
    const library = [
      ...many(10, { blockRoles: ['warm-up'] }),
      ...many(10, { blockRoles: ['main'] }),
      ...many(10, { blockRoles: ['cool-down'] }),
    ]

    const first = generate(request, library, seededRandom(42))
    const again = generate(request, library, seededRandom(42))
    const other = generate(request, library, seededRandom(43))

    expect(again).toEqual(first)
    expect(exerciseIds(other)).not.toEqual(exerciseIds(first))
  })
})

function exerciseIds(workout: Workout): string[] {
  return [...workout.warmUp, ...workout.main.sets, ...workout.coolDown].map(
    (set) => set.exercise.id,
  )
}

/**
 * Seconds per Block, worked out from the spec's rules independently of the code under test:
 * change-overs between warm-up Sets, into the main Block and before each cool-down Set;
 * rest after each main Set, replaced by the Round rest between Rounds.
 */
function blockSeconds(workout: Workout) {
  const { warmUp, main, coolDown } = workout
  const warmUpSeconds =
    warmUp.reduce((total, set) => total + setSeconds(set), 0) + 10 * (warmUp.length - 1)
  const coolDownSeconds = coolDown.reduce((total, set) => total + 10 + setSeconds(set), 0)
  const mainSets = Array.from({ length: main.rounds }, (_, round) =>
    main.sets.slice(0, round === main.rounds - 1 ? main.lastRoundSets : main.sets.length),
  )
  const mainSeconds =
    10 +
    mainSets.reduce(
      (total, roundSets, round) =>
        total +
        (round > 0 ? main.roundRestSeconds : 0) +
        roundSets.reduce((sum, set) => sum + setSeconds(set), 0) +
        main.restSeconds * (roundSets.length - 1),
      0,
    )
  return { warmUp: warmUpSeconds, main: mainSeconds, coolDown: coolDownSeconds }
}
