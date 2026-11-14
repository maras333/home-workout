import { DIFFICULTIES, EQUIPMENT, WORKOUT_TYPES } from '@/library'
import { MINUTES } from './types'
import type { Workout, WorkoutRequest } from './types'

const REQUEST_KEY = 'home-workout:last-request'
const WORKOUT_KEY = 'home-workout:current-workout'

const DEFAULT_REQUEST: WorkoutRequest = {
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

function isRequest(request: unknown): request is WorkoutRequest {
  if (!isRecord(request)) return false
  return (
    includes(WORKOUT_TYPES, request.workoutType) &&
    includes(MINUTES, request.minutes) &&
    includes(DIFFICULTIES, request.difficulty) &&
    Array.isArray(request.equipment) &&
    request.equipment.every((item) => includes(EQUIPMENT, item))
  )
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isSet(value: unknown): boolean {
  if (!isRecord(value) || !isRecord(value.exercise) || !isRecord(value.target)) return false
  const { exercise, target } = value
  return (
    typeof exercise.id === 'string' &&
    typeof exercise.name === 'string' &&
    typeof exercise.gifUrl === 'string' &&
    typeof value.perSide === 'boolean' &&
    ((target.measure === 'reps' && typeof target.reps === 'number') ||
      (target.measure === 'time' && typeof target.seconds === 'number'))
  )
}

function isSetList(value: unknown): boolean {
  return Array.isArray(value) && value.every(isSet)
}

function isWorkout(value: unknown): value is Workout {
  if (!isRecord(value) || !isRecord(value.main)) return false
  const { main } = value
  return (
    isRequest(value.request) &&
    isSetList(value.warmUp) &&
    isSetList(value.coolDown) &&
    isSetList(main.sets) &&
    typeof main.rounds === 'number' &&
    typeof main.lastRoundSets === 'number' &&
    typeof main.restSeconds === 'number' &&
    typeof main.roundRestSeconds === 'number'
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
