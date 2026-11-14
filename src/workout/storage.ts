import { DIFFICULTIES, EQUIPMENT, WORKOUT_TYPES } from '@/library'
import { MINUTES } from './types'
import type { Workout, WorkoutRequest } from './types'

const REQUEST_KEY = 'home-workout:last-request'
const WORKOUT_KEY = 'home-workout:current-workout'

export const DEFAULT_REQUEST: WorkoutRequest = {
  workoutType: 'full body',
  minutes: 30,
  difficulty: 'intermediate',
  equipment: [],
}

function read(key: string): unknown {
  try {
    const raw = localStorage.getItem(key)
    return raw === null ? null : JSON.parse(raw)
  } catch {
    return null
  }
}

function write(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage full or blocked: the app still works for this visit.
  }
}

function includes<T>(values: readonly T[], value: unknown): value is T {
  return values.includes(value as T)
}

function isRequest(value: unknown): value is WorkoutRequest {
  if (typeof value !== 'object' || value === null) return false
  const request = value as Record<string, unknown>
  return (
    includes(WORKOUT_TYPES, request.workoutType) &&
    includes(MINUTES, request.minutes) &&
    includes(DIFFICULTIES, request.difficulty) &&
    Array.isArray(request.equipment) &&
    request.equipment.every((item) => includes(EQUIPMENT, item))
  )
}

function isWorkout(value: unknown): value is Workout {
  if (typeof value !== 'object' || value === null) return false
  const workout = value as Record<string, unknown>
  const main = workout.main as Record<string, unknown> | undefined
  return (
    isRequest(workout.request) &&
    Array.isArray(workout.warmUp) &&
    Array.isArray(workout.coolDown) &&
    typeof main === 'object' &&
    main !== null &&
    Array.isArray(main.sets) &&
    typeof main.rounds === 'number' &&
    typeof main.lastRoundSets === 'number'
  )
}

/** The last Workout Request, or the defaults when none is saved or it is corrupt. */
export function loadRequest(): WorkoutRequest {
  const value = read(REQUEST_KEY)
  return isRequest(value) ? value : DEFAULT_REQUEST
}

export function saveRequest(request: WorkoutRequest): void {
  write(REQUEST_KEY, request)
}

/** The current Workout, or null when none is saved or it is corrupt. */
export function loadWorkout(): Workout | null {
  const value = read(WORKOUT_KEY)
  return isWorkout(value) ? value : null
}

export function saveWorkout(workout: Workout): void {
  write(WORKOUT_KEY, workout)
}
