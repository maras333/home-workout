import type { Exercise } from '@/library'

let nextId = 0

/** A hand-built Exercise; by default a bodyweight, Beginner, full-body main-Block timed Exercise. */
export function exercise(overrides: Partial<Exercise> = {}): Exercise {
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

export function many(count: number, overrides: Partial<Exercise> = {}): Exercise[] {
  return Array.from({ length: count }, () => exercise(overrides))
}
