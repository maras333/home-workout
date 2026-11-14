import { describe, expect, it } from 'vitest'
import { DIFFICULTIES, WORKOUT_TYPES } from '@/library'
import type { BlockRole, Exercise, MuscleGroup } from '@/library'
import { MINUTES, generate, plannedSeconds, seededRandom, setSeconds } from '@/workout'
import type { Minutes, Workout, WorkoutRequest, WorkoutSet } from '@/workout'

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

  it('never repeats an Exercise within a Block while the pool has enough', () => {
    const library = [
      ...many(20, { blockRoles: ['warm-up'] }),
      ...many(8, { blockRoles: ['main'] }),
      ...many(20, { blockRoles: ['cool-down'] }),
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

describe('generate: another Workout', () => {
  const mainIds = (workout: Workout) => workout.main.sets.map((set) => set.exercise.id)
  // The previous Workout comes back from storage, so it holds copies, not the library's objects.
  const fromStorage = (workout: Workout): Workout => JSON.parse(JSON.stringify(workout))
  const seeds = Array.from({ length: 30 }, (_, i) => i + 1)

  it("steers away from the previous Workout's main-Block Exercises when the pool allows", () => {
    const library = [
      ...many(10, { blockRoles: ['warm-up'] }),
      ...many(10, { blockRoles: ['main'] }),
      ...many(10, { blockRoles: ['cool-down'] }),
    ]

    for (const seed of seeds) {
      const previous = fromStorage(generate(request, library, seededRandom(seed)))
      const next = generate(request, library, seededRandom(seed + 100), previous)

      expect(next.main.sets).toHaveLength(5)
      expect(mainIds(next).filter((id) => mainIds(previous).includes(id))).toEqual([])
    }
  })

  it('still uses ticked Equipment in at least half the main Block when steering away', () => {
    const library = [
      ...many(10, { blockRoles: ['warm-up'] }),
      ...many(10, { blockRoles: ['main'] }),
      ...many(4, { blockRoles: ['main'], equipment: ['dumbbells'] }),
      ...many(10, { blockRoles: ['cool-down'] }),
    ]
    const withDumbbells = { ...request, equipment: ['dumbbells' as const] }

    for (const seed of seeds) {
      const previous = fromStorage(generate(withDumbbells, library, seededRandom(seed)))
      const next = generate(withDumbbells, library, seededRandom(seed + 100), previous)

      const withEquipment = next.main.sets.filter((set) => set.exercise.equipment.length > 0)
      expect(withEquipment.length).toBeGreaterThanOrEqual(3)
    }
  })

  it('reuses as few previous main-Block Exercises as it must when the pool is small', () => {
    const library = [
      ...many(10, { blockRoles: ['warm-up'] }),
      ...many(7, { blockRoles: ['main'] }),
      ...many(10, { blockRoles: ['cool-down'] }),
    ]

    for (const seed of seeds) {
      const previous = fromStorage(generate(request, library, seededRandom(seed)))
      const next = generate(request, library, seededRandom(seed + 100), previous)

      expect(next.main.sets).toHaveLength(5)
      expect(mainIds(next).filter((id) => mainIds(previous).includes(id))).toHaveLength(3)
    }
  })
})

describe('generate: preferences', () => {
  const main = (overrides: Partial<Exercise>) => exercise({ blockRoles: ['main'], ...overrides })
  const primary = (group: MuscleGroup, overrides: Partial<Exercise> = {}) =>
    main({ muscleGroups: { primary: [group], secondary: [] }, ...overrides })
  const seeds = Array.from({ length: 30 }, (_, i) => i + 1)

  it('prefers Exercises at exactly the requested Difficulty in the main Block', () => {
    const groups: MuscleGroup[] = ['legs', 'glutes', 'chest', 'back', 'shoulders', 'core']
    const library = [
      ...groups.map((group) => primary(group, { difficulty: 'beginner' })),
      ...groups.map((group) => primary(group, { difficulty: 'intermediate' })),
    ]

    for (const seed of seeds) {
      const workout = generate(request, library, seededRandom(seed))
      expect(workout.main.sets.map((set) => set.exercise.difficulty)).toEqual(
        Array(5).fill('intermediate'),
      )
    }
  })

  it('uses ticked Equipment in at least half the main Block when the pool allows', () => {
    const groups: MuscleGroup[] = ['legs', 'glutes', 'chest', 'back', 'shoulders', 'core']
    const library = [
      ...groups.flatMap((group) => [primary(group), primary(group)]),
      primary('legs', { equipment: ['dumbbells'] }),
      primary('back', { equipment: ['dumbbells'] }),
      primary('core', { equipment: ['kettlebell'] }),
      primary('chest', { equipment: ['dumbbells'] }),
    ]

    for (const seed of seeds) {
      const workout = generate(
        { ...request, equipment: ['dumbbells', 'kettlebell'] },
        library,
        seededRandom(seed),
      )
      const withEquipment = workout.main.sets.filter((set) => set.exercise.equipment.length > 0)
      expect(withEquipment.length).toBeGreaterThanOrEqual(3)
    }
  })

  it.each([
    ['full body', ['legs', 'glutes', 'chest', 'back', 'shoulders', 'core', 'arms'], 6],
    ['upper body', ['chest', 'back', 'shoulders', 'arms', 'core', 'legs'], 4],
  ] as const)(
    'rotates the %s main Block through its Muscle groups',
    (workoutType, poolGroups, expectedDistinct) => {
      const library = poolGroups.flatMap((group) =>
        Array.from({ length: 3 }, () => primary(group, { workoutTypes: [workoutType] })),
      )
      const wanted = {
        // Arms are optional in full body.
        'full body': ['legs', 'glutes', 'chest', 'back', 'shoulders', 'core', 'arms'],
        'upper body': ['chest', 'back', 'shoulders', 'arms'],
      }[workoutType]

      for (const seed of seeds) {
        const workout = generate(
          { ...request, workoutType, minutes: workoutType === 'full body' ? 60 : 15 },
          library,
          seededRandom(seed),
        )
        const groups = primaries(workout.main.sets)
        expect(new Set(groups).size).toBe(expectedDistinct)
        for (const group of groups) expect(wanted).toContain(group)
      }
    },
  )

  it.each([
    ['full body', ['legs', 'glutes', 'chest']],
    ['lower body', ['legs', 'glutes', 'core']],
    ['cardio/HIIT', ['legs', 'core', 'shoulders']],
    ['mobility/stretching', ['legs', 'back', 'glutes']],
  ] as const)(
    'never puts two %s Exercises with the same primary group next to each other, across Rounds too',
    (workoutType, poolGroups) => {
      const library = poolGroups.flatMap((group) =>
        Array.from({ length: 6 }, () => primary(group, { workoutTypes: [workoutType] })),
      )

      for (const seed of seeds) {
        const workout = generate({ ...request, workoutType }, library, seededRandom(seed))
        expect(neighbourClashes(workout.main.sets)).toBe(0)
      }
    },
  )

  it('fills the lower body main Block with legs and glutes, using core only as a filler', () => {
    const library = (['legs', 'glutes', 'core'] as const).flatMap((group) =>
      Array.from({ length: 6 }, () => primary(group, { workoutTypes: ['lower body'] })),
    )

    for (const seed of seeds) {
      const workout = generate(
        { ...request, workoutType: 'lower body', minutes: 15 },
        library,
        seededRandom(seed),
      )
      expect(primaries(workout.main.sets).filter((group) => group === 'core')).toHaveLength(0)
    }
  })

  it('varies the core main Block with distinct core Exercises', () => {
    const library = Array.from({ length: 8 }, () => primary('core', { workoutTypes: ['core'] }))

    const workout = generate({ ...request, workoutType: 'core' }, library, seededRandom(1))

    expect(primaries(workout.main.sets)).toEqual(Array(5).fill('core'))
    expect(new Set(workout.main.sets.map((set) => set.exercise.id)).size).toBe(5)
  })

  it('prefers warm-up and cool-down Exercises that work the main Block Muscle groups', () => {
    const others = (role: BlockRole) =>
      Array.from({ length: 12 }, () =>
        exercise({ blockRoles: [role], muscleGroups: { primary: ['legs'], secondary: [] } }),
      )
    const matching = (role: BlockRole) =>
      Array.from({ length: 2 }, () =>
        exercise({ blockRoles: [role], muscleGroups: { primary: ['back'], secondary: ['chest'] } }),
      )
    const warmUpMatches = matching('warm-up')
    const coolDownMatches = matching('cool-down')
    const library = [
      ...Array.from({ length: 6 }, () => primary('chest')),
      ...others('warm-up'),
      ...warmUpMatches,
      ...others('cool-down'),
      ...coolDownMatches,
    ]

    for (const seed of seeds) {
      const workout = generate(
        { ...request, workoutType: 'full body' },
        library,
        seededRandom(seed),
      )
      const ids = exerciseIds(workout)
      for (const match of [...warmUpMatches, ...coolDownMatches]) expect(ids).toContain(match.id)
    }
  })
})

describe('generate: fallbacks when the pool is small', () => {
  const total = (workout: Workout) => {
    const blocks = blockSeconds(workout)
    return blocks.warmUp + blocks.main + blocks.coolDown
  }
  const fullBlocks = (role: BlockRole, count = 12) => many(count, { blockRoles: [role] })
  const seeds = Array.from({ length: 30 }, (_, i) => i + 1)

  it('drops the Equipment preference when too few Exercises use the ticked Equipment', () => {
    const withDumbbells = exercise({ blockRoles: ['main'], equipment: ['dumbbells'] })
    const library = [withDumbbells, ...many(10, { blockRoles: ['main'] })]

    for (const seed of seeds) {
      const workout = generate(
        { ...request, equipment: ['dumbbells'] },
        library,
        seededRandom(seed),
      )
      expect(workout.main.sets).toHaveLength(5)
      expect(workout.main.sets.map((set) => set.exercise.id)).toContain(withDumbbells.id)
    }
  })

  it('drops the Equipment preference before it shrinks the main Block', () => {
    const withEquipment = many(2, { blockRoles: ['main'], equipment: ['kettlebell'] })
    const library = [
      ...fullBlocks('warm-up'),
      ...withEquipment,
      ...many(4, { blockRoles: ['main'] }),
      ...fullBlocks('cool-down'),
    ]

    for (const seed of seeds) {
      const workout = generate(
        { ...request, minutes: 60, equipment: ['kettlebell'] },
        library,
        seededRandom(seed),
      )
      expect(workout.main.sets).toHaveLength(6)
    }
  })

  it('repeats a cool-down Exercise only once every one has been used', () => {
    const library = [
      ...many(5, { blockRoles: ['main'] }),
      exercise({ blockRoles: ['cool-down'] }),
      ...many(3, { blockRoles: ['cool-down'], perSide: true }),
    ]

    for (const seed of seeds) {
      // 5 min cool-down: a plain hold takes 50 s, a per-side one 90 s. Either three per-side
      // holds fit, or the plain one and two per-side ones leave 70 s with one still unused:
      // repeating the plain hold would fit, but must wait until every Exercise is in.
      const workout = generate({ ...request, minutes: 45 }, library, seededRandom(seed))
      const ids = workout.coolDown.map((set) => set.exercise.id)
      expect(new Set(ids).size).toBe(ids.length)
    }
  })

  it.each([3, 4])(
    'shrinks a 60-minute main Block to the %i eligible Exercises and adds Rounds to fit',
    (count) => {
      const library = [
        ...fullBlocks('warm-up'),
        ...many(count, { blockRoles: ['main'] }),
        ...fullBlocks('cool-down'),
      ]

      const workout = generate({ ...request, minutes: 60 }, library, seededRandom(1))

      expect(workout.main.sets).toHaveLength(count)
      expect(total(workout)).toBeGreaterThanOrEqual(60 * 60 * 0.9)
      expect(total(workout)).toBeLessThanOrEqual(60 * 60 * 1.1)
    },
  )

  it('lets warm-up and cool-down Exercises repeat, never back to back, to fill their time', () => {
    const library = [
      ...many(1, { blockRoles: ['warm-up'] }),
      ...many(6, { blockRoles: ['main'] }),
      ...many(2, { blockRoles: ['cool-down'] }),
    ]

    const workout = generate({ ...request, minutes: 60 }, library, seededRandom(1))

    // 8 min warm-up of 30 s Sets with 10 s change-overs: 12 Sets fit.
    expect(workout.warmUp).toHaveLength(12)
    // 7 min cool-down of 10 s change-over + 40 s holds: 8 Sets fit, alternating the two.
    expect(workout.coolDown).toHaveLength(8)
    const coolDownIds = workout.coolDown.map((set) => set.exercise.id)
    for (let i = 1; i < coolDownIds.length; i++) expect(coolDownIds[i]).not.toBe(coolDownIds[i - 1])
    expect(total(workout)).toBeGreaterThanOrEqual(60 * 60 * 0.9)
    expect(total(workout)).toBeLessThanOrEqual(60 * 60 * 1.1)
  })

  it('still repeats a lone warm-up or cool-down Exercise rather than leaving time unused', () => {
    const library = [
      ...many(1, { blockRoles: ['warm-up'] }),
      ...many(5, { blockRoles: ['main'] }),
      ...many(1, { blockRoles: ['cool-down'] }),
    ]

    const workout = generate({ ...request, minutes: 15 }, library, seededRandom(1))

    expect(workout.warmUp).toHaveLength(4)
    expect(workout.coolDown).toHaveLength(2)
  })

  it.each([
    ['an empty library', []],
    ['a single Exercise', [exercise({ blockRoles: ['warm-up', 'main', 'cool-down'] })]],
    ['only warm-up Exercises', many(3, { blockRoles: ['warm-up'] })],
    ['one main Exercise', many(1, { blockRoles: ['main'] })],
  ] as const)('never throws, even with %s', (_case, library) => {
    for (const workoutType of WORKOUT_TYPES) {
      for (const minutes of MINUTES) {
        for (const difficulty of DIFFICULTIES) {
          expect(() =>
            generate(
              { workoutType, minutes, difficulty, equipment: ['dumbbells'] },
              library,
              seededRandom(minutes),
            ),
          ).not.toThrow()
        }
      }
    }
  })
})

function primaries(sets: WorkoutSet[]): MuscleGroup[] {
  return sets.map((set) => set.exercise.muscleGroups.primary[0])
}

/** Neighbouring pairs sharing a primary group, counting the last → first pair between Rounds. */
function neighbourClashes(sets: WorkoutSet[]): number {
  if (sets.length < 2) return 0
  return sets.filter((set, i) => {
    const next = sets[(i + 1) % sets.length]
    return set.exercise.muscleGroups.primary.some((group) =>
      next.exercise.muscleGroups.primary.includes(group),
    )
  }).length
}

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
