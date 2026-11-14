import { describe, expect, it } from 'vitest'
import { exercise, many } from '@/test/exercises'
import { allSets, canSwap, generate, plannedSeconds, seededRandom, swap } from '@/workout'
import type { Workout, WorkoutRequest } from '@/workout'

const request: WorkoutRequest = {
  workoutType: 'full body',
  minutes: 30,
  difficulty: 'intermediate',
  equipment: [],
}
const seeds = Array.from({ length: 30 }, (_, i) => i + 1)

function ids(workout: Workout): string[] {
  return allSets(workout).map((set) => set.exercise.id)
}

describe('swap', () => {
  it('swaps one warm-up Set for an eligible Exercise not in the Workout, leaving the rest', () => {
    const library = [
      ...many(12, { blockRoles: ['warm-up'] }),
      ...many(8, { blockRoles: ['main'] }),
      ...many(8, { blockRoles: ['cool-down'] }),
    ]

    for (const seed of seeds) {
      const workout = generate(request, library, seededRandom(seed))
      const swapped = swap(workout, { block: 'warmUp', index: 1 }, library, seededRandom(seed))
      if (!swapped) throw new Error('expected a swap')

      const replacement = swapped.warmUp[1]
      expect(ids(workout)).not.toContain(replacement.exercise.id)
      expect(replacement.exercise.blockRoles).toContain('warm-up')
      expect(replacement.target).toEqual({ measure: 'time', seconds: 30 })
      expect({ ...swapped, warmUp: swapped.warmUp.filter((_, i) => i !== 1) }).toEqual({
        ...workout,
        warmUp: workout.warmUp.filter((_, i) => i !== 1),
      })
    }
  })

  it('changes a main-Block Exercise in every Round and refits the Rounds to the time', () => {
    const longer = exercise({ measure: 'reps', perSide: true })
    const library = [
      ...many(12, { blockRoles: ['warm-up'] }),
      ...many(5, { blockRoles: ['main'] }),
      ...many(8, { blockRoles: ['cool-down'] }),
    ]

    for (const seed of seeds) {
      const workout = generate(request, library, seededRandom(seed))
      const swapped = swap(
        workout,
        { block: 'main', index: 2 },
        [...library, longer],
        seededRandom(seed),
      )
      if (!swapped) throw new Error('expected a swap')

      // 12 reps per side lasts 72 s against the 40 s it replaces, so the old Rounds overrun.
      expect(swapped.main.sets[2]).toEqual({
        exercise: longer,
        target: { measure: 'reps', reps: 12 },
        perSide: true,
      })
      const others = (w: Workout) => w.main.sets.filter((_, i) => i !== 2)
      expect(others(swapped)).toEqual(others(workout))
      expect(swapped.warmUp).toEqual(workout.warmUp)
      expect(swapped.coolDown).toEqual(workout.coolDown)

      const unfitted = {
        ...swapped,
        main: {
          ...swapped.main,
          rounds: workout.main.rounds,
          lastRoundSets: workout.main.lastRoundSets,
        },
      }
      expect(plannedSeconds(unfitted)).toBeGreaterThan(30 * 60 * 1.05)
      expect(Math.abs(plannedSeconds(swapped) - 30 * 60)).toBeLessThanOrEqual(30 * 60 * 0.05)
    }
  })

  it('prefers an Exercise with the same primary Muscle group, picking among them at random', () => {
    const chest = (count: number) =>
      many(count, { muscleGroups: { primary: ['chest'], secondary: [] } })
    const library = [
      ...many(12, { blockRoles: ['warm-up'] }),
      ...chest(5),
      ...many(8, { blockRoles: ['cool-down'] }),
    ]
    const workout = generate(request, library, seededRandom(1))
    const sameGroup = chest(3)
    const otherGroups = many(10, { muscleGroups: { primary: ['back'], secondary: ['chest'] } })

    const picked = new Set<string>()
    for (const seed of seeds) {
      const swapped = swap(
        workout,
        { block: 'main', index: 0 },
        [...library, ...otherGroups, ...sameGroup],
        seededRandom(seed),
      )
      const id = swapped?.main.sets[0].exercise.id ?? ''
      expect(sameGroup.map((candidate) => candidate.id)).toContain(id)
      picked.add(id)
    }
    expect(picked.size).toBe(3)
  })

  it('falls back to other Muscle groups when none with the same one is left', () => {
    const library = [
      ...many(12, { blockRoles: ['warm-up'] }),
      ...many(5, { blockRoles: ['main'] }),
      ...many(8, { blockRoles: ['cool-down'] }),
    ]
    const workout = generate(request, library, seededRandom(1))
    const back = exercise({ muscleGroups: { primary: ['back'], secondary: [] } })

    const swapped = swap(workout, { block: 'main', index: 0 }, [...library, back], seededRandom(1))

    expect(swapped?.main.sets[0].exercise).toEqual(back)
  })

  it('never picks an Exercise already in another Block, or one the Request rules out', () => {
    // The only main Exercises. The warm-up holds every one of them too (it repeats them to fill its time).
    const inWarmUp = many(6, { blockRoles: ['warm-up', 'main'] })
    const library = [...inWarmUp, ...many(8, { blockRoles: ['cool-down'] })]
    const ruledOut = [
      exercise({ equipment: ['kettlebell'] }),
      exercise({ difficulty: 'advanced' }),
      exercise({ workoutTypes: ['core'] }),
      exercise({ blockRoles: ['cool-down'] }),
    ]
    const fits = exercise()

    for (const seed of seeds) {
      const workout = generate(request, library, seededRandom(seed))
      const swapped = swap(
        workout,
        { block: 'main', index: 0 },
        [...library, ...ruledOut, fits],
        seededRandom(seed),
      )
      expect(ids(workout)).toEqual(expect.arrayContaining(inWarmUp.map((e) => e.id)))
      expect(swapped?.main.sets[0].exercise).toEqual(fits)
    }
  })

  it('reports when no other Exercise is eligible', () => {
    const library = [
      ...many(12, { blockRoles: ['warm-up'] }),
      ...many(5, { blockRoles: ['main'] }),
      ...many(8, { blockRoles: ['cool-down'] }),
    ]
    const workout = generate(request, library, seededRandom(1))
    const mainPosition = { block: 'main', index: 3 } as const
    const warmUpPosition = { block: 'warmUp', index: 0 } as const

    expect(swap(workout, mainPosition, library, seededRandom(1))).toBeNull()
    expect(canSwap(workout, mainPosition, library)).toBe(false)
    expect(canSwap(workout, warmUpPosition, library)).toBe(true)
  })

  it('refits the main Block when a per-side warm-up or cool-down Exercise doubles a Set', () => {
    const library = [
      ...many(12, { blockRoles: ['warm-up'] }),
      ...many(5, { blockRoles: ['main'] }),
      ...many(8, { blockRoles: ['cool-down'] }),
    ]
    const perSideWarmUps = many(4, { blockRoles: ['warm-up'], perSide: true })
    const perSideHolds = many(2, { blockRoles: ['cool-down'], perSide: true })
    const short = { ...request, minutes: 15 } as const

    for (const seed of seeds) {
      const random = seededRandom(seed)
      const withPerSide = [...library, ...perSideWarmUps, ...perSideHolds]
      let workout = generate(short, library, random)
      // Swap each warm-up and cool-down Set until it holds a per-side Exercise.
      const positions = [
        ...workout.warmUp.map((_, index) => ({ block: 'warmUp' as const, index })),
        ...workout.coolDown.map((_, index) => ({ block: 'coolDown' as const, index })),
      ]
      for (const position of positions) {
        const sets = () => (position.block === 'warmUp' ? workout.warmUp : workout.coolDown)
        while (!sets()[position.index].perSide) {
          workout = swap(workout, position, withPerSide, random) ?? workout
        }
      }

      // Every warm-up and cool-down Set now lasts twice as long: about 3 min more in all.
      expect(Math.abs(plannedSeconds(workout) - 15 * 60)).toBeLessThanOrEqual(15 * 60 * 0.1)
    }
  })
})
