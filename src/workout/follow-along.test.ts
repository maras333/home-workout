import { describe, expect, it } from 'vitest'
import { DIFFICULTIES, WORKOUT_TYPES, library, type Exercise } from '@/library'
import { MINUTES, generate, plannedSeconds, seededRandom } from '@/workout'
import type { Workout, WorkoutSet } from '@/workout'
import { clockText, flatten, nextWork } from './follow-along'

function exercise(id: string): Exercise {
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
  }
}

const timed = (id: string, seconds: number, perSide = false): WorkoutSet => ({
  exercise: exercise(id),
  target: { measure: 'time', seconds },
  perSide,
})
const reps = (id: string, count: number, perSide = false): WorkoutSet => ({
  exercise: exercise(id),
  target: { measure: 'reps', reps: count },
  perSide,
})

const small: Workout = {
  request: { workoutType: 'full body', minutes: 15, difficulty: 'beginner', equipment: [] },
  warmUp: [timed('a', 20), timed('b', 15, true)],
  main: {
    sets: [reps('c', 4), reps('d', 2, true), timed('e', 30)],
    rounds: 2,
    lastRoundSets: 2,
    restSeconds: 15,
    roundRestSeconds: 45,
  },
  coolDown: [timed('f', 40)],
}

/** A compact view of a Step: "ready 5", "work Main c R1/2 12", "rest Rest 15". */
function describeStep(step: ReturnType<typeof flatten>[number]): string {
  if (step.kind === 'ready') return `ready ${step.block} ${step.seconds}`
  if (step.kind === 'rest') return `rest ${step.block} ${step.label} ${step.seconds}`
  const round = step.round ? ` R${step.round}/${step.rounds}` : ''
  return `work ${step.block} ${step.set.exercise.id}${round} ${step.seconds}`
}

describe('flatten', () => {
  it('lays out a small Workout worked out by hand', () => {
    expect(flatten(small).map(describeStep)).toEqual([
      'ready Warm-up 5',
      'work Warm-up a 20',
      'rest Warm-up Change-over 10',
      'work Warm-up b 30', // 15 s per side
      'rest Main Change-over 10',
      'work Main c R1/2 12', // 4 reps × 3 s
      'rest Main Rest 15',
      'work Main d R1/2 12', // 2 reps × 3 s per side
      'rest Main Rest 15',
      'work Main e R1/2 30',
      'rest Main Rest between Rounds 45',
      'work Main c R2/2 12',
      'rest Main Rest 15',
      'work Main d R2/2 12', // the last Round stops after 2 Sets
      'rest Cool-down Change-over 10',
      'work Cool-down f 40',
    ])
  })

  it('totals the planned length, without "Get ready"', () => {
    const steps = flatten(small)
    const total = steps.filter((s) => s.kind !== 'ready').reduce((sum, s) => sum + s.seconds, 0)
    // 20 + 10 + 30 | 10 + (12 + 15 + 12 + 15 + 30) + 45 + (12 + 15 + 12) | 10 + 40
    expect(total).toBe(288)
    expect(total).toBe(plannedSeconds(small))
  })

  it('totals the planned length for generated Workouts of every kind', () => {
    let seed = 1
    for (const workoutType of WORKOUT_TYPES) {
      for (const minutes of MINUTES) {
        for (const difficulty of DIFFICULTIES) {
          const request = { workoutType, minutes, difficulty, equipment: [] }
          const workout = generate(request, library, seededRandom(seed++))
          const steps = flatten(workout)
          const total = steps.slice(1).reduce((sum, s) => sum + s.seconds, 0)
          expect(steps[0]).toEqual({ kind: 'ready', block: 'Warm-up', seconds: 5 })
          expect(total).toBe(plannedSeconds(workout))
        }
      }
    }
  })

  it('leaves out rests of 0 s', () => {
    const noRest = { ...small, main: { ...small.main, restSeconds: 0, roundRestSeconds: 0 } }

    const labels = flatten(noRest).flatMap((s) => (s.kind === 'rest' ? [s.label] : []))

    expect(labels).not.toContain('Rest')
    expect(labels).not.toContain('Rest between Rounds')
  })
})

describe('nextWork', () => {
  it('finds the next Set after a position', () => {
    const steps = flatten(small)

    expect(nextWork(steps, 0)?.set.exercise.id).toBe('a')
    expect(nextWork(steps, 1)?.set.exercise.id).toBe('b')
    expect(nextWork(steps, steps.length - 1)).toBeNull()
  })
})

describe('clockText', () => {
  it.each([
    [0, '0:00'],
    [5, '0:05'],
    [65, '1:05'],
    [600, '10:00'],
  ])('shows %i s as %s', (seconds, text) => {
    expect(clockText(seconds)).toBe(text)
  })
})
