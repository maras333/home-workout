// @vitest-environment node
import { existsSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import records from '@/library/exercisedb/exercises.json'
import {
  BLOCK_ROLES,
  DIFFICULTIES,
  EQUIPMENT,
  MEASURES,
  MUSCLE_GROUPS,
  WORKOUT_TYPES,
  library,
} from '@/library'

const publicDir = path.resolve(__dirname, '../../public')

function isSubsetOf<T>(values: readonly T[], allowed: readonly T[]) {
  return values.every((value) => allowed.includes(value))
}

function hasNoDuplicates(values: readonly unknown[]) {
  return new Set(values).size === values.length
}

describe('Exercise library data check', () => {
  it('holds exactly the copied dataset records, each once', () => {
    const libraryIds = library.map((exercise) => exercise.id)
    const recordIds = records.map((record) => record.exerciseId)

    expect(hasNoDuplicates(libraryIds)).toBe(true)
    expect([...libraryIds].sort()).toEqual([...recordIds].sort())
  })

  it.each(library.map((exercise) => [exercise.name, exercise] as const))(
    '%s has a GIF file served by its id',
    (_name, exercise) => {
      expect(exercise.gifUrl).toBe(`/exercisedb/${exercise.id}.gif`)
      expect(existsSync(path.join(publicDir, exercise.gifUrl))).toBe(true)
    },
  )

  it.each(library.map((exercise) => [exercise.name, exercise] as const))(
    '%s has valid tags',
    (_name, exercise) => {
      const { primary, secondary } = exercise.muscleGroups
      expect(primary.length).toBeGreaterThan(0)
      expect(isSubsetOf(primary, MUSCLE_GROUPS)).toBe(true)
      expect(isSubsetOf(secondary, MUSCLE_GROUPS)).toBe(true)
      expect(hasNoDuplicates([...primary, ...secondary])).toBe(true)

      expect(isSubsetOf(exercise.equipment, EQUIPMENT)).toBe(true)
      expect(hasNoDuplicates(exercise.equipment)).toBe(true)

      expect(DIFFICULTIES).toContain(exercise.difficulty)

      expect(exercise.workoutTypes.length).toBeGreaterThan(0)
      expect(isSubsetOf(exercise.workoutTypes, WORKOUT_TYPES)).toBe(true)
      expect(hasNoDuplicates(exercise.workoutTypes)).toBe(true)

      expect(exercise.blockRoles.length).toBeGreaterThan(0)
      expect(isSubsetOf(exercise.blockRoles, BLOCK_ROLES)).toBe(true)
      expect(hasNoDuplicates(exercise.blockRoles)).toBe(true)

      expect(MEASURES).toContain(exercise.measure)
      expect(typeof exercise.perSide).toBe('boolean')
    },
  )

  it.each(library.map((exercise) => [exercise.name, exercise] as const))(
    '%s has steps without the "Step:N " prefix',
    (_name, exercise) => {
      expect(exercise.steps.length).toBeGreaterThan(0)
      for (const step of exercise.steps) {
        expect(step).not.toMatch(/^Step:\d+/)
        expect(step.trim()).not.toBe('')
      }
    },
  )

  it('derives the "Trains: …" text from Muscle groups', () => {
    const pushUp = library.find((exercise) => exercise.id === 'I4hDWkc')
    const calfRaise = library.find((exercise) => exercise.id === 'bJYHBIN')

    expect(pushUp?.name).toBe('push-up')
    expect(pushUp?.steps[0]).toBe(
      'Start in a high plank position with your hands slightly wider than shoulder-width apart and your feet together.',
    )
    expect(pushUp?.trains).toBe('Trains: chest (also arms, shoulders, core)')
    expect(calfRaise?.trains).toBe('Trains: legs')
  })

  it.each(WORKOUT_TYPES.flatMap((type) => BLOCK_ROLES.map((role) => [type, role] as const)))(
    'can fill the %s %s Block with Beginner bodyweight Exercises',
    (type, role) => {
      const pool = library.filter(
        (exercise) =>
          exercise.workoutTypes.includes(type) &&
          exercise.blockRoles.includes(role) &&
          exercise.equipment.length === 0 &&
          exercise.difficulty === 'beginner',
      )
      expect(pool.length).toBeGreaterThanOrEqual(role === 'main' ? 3 : 1)
    },
  )
})
