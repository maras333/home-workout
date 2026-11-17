import { DIFFICULTIES, EQUIPMENT, MUSCLE_GROUPS, WORKOUT_TYPES } from '@/library'
import { LANGUAGES, type Language } from '@/language/types'
import { THEMES, type Theme } from '@/theme/types'
import { MINUTES } from './types'
import type { Favourite, Workout, WorkoutRequest } from './types'

const REQUEST_KEY = 'home-workout:last-request'
const WORKOUT_KEY = 'home-workout:current-workout'
const SOUND_KEY = 'home-workout:sound-settings'
const PROGRESS_KEY = 'home-workout:follow-along-progress'
const FAVOURITES_KEY = 'home-workout:favourites'
const LANGUAGE_KEY = 'home-workout:language'
const THEME_KEY = 'home-workout:theme'

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

function remove(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch {
    // Storage blocked: nothing was saved there anyway.
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

function isMuscleGroupList(value: unknown): boolean {
  return Array.isArray(value) && value.every((group) => includes(MUSCLE_GROUPS, group))
}

function isSet(value: unknown): boolean {
  if (!isRecord(value) || !isRecord(value.exercise) || !isRecord(value.target)) return false
  const { exercise, target } = value
  return (
    typeof exercise.id === 'string' &&
    typeof exercise.name === 'string' &&
    typeof exercise.gifUrl === 'string' &&
    isRecord(exercise.muscleGroups) &&
    isMuscleGroupList(exercise.muscleGroups.primary) &&
    isMuscleGroupList(exercise.muscleGroups.secondary) &&
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

/** Saves the current Workout; progress through the one it replaces no longer applies. */
export function saveWorkout(workout: Workout): void {
  write(WORKOUT_KEY, workout)
  remove(PROGRESS_KEY)
}

/** Follow-along's beeps and voice, each on or off. */
export type SoundSettings = { beeps: boolean; voice: boolean }

const DEFAULT_SOUND: SoundSettings = { beeps: true, voice: true }

/** The saved sound settings, or both on when none are saved or they are corrupt. */
export function loadSoundSettings(): SoundSettings {
  const value = read(SOUND_KEY)
  return isRecord(value) && typeof value.beeps === 'boolean' && typeof value.voice === 'boolean'
    ? { beeps: value.beeps, voice: value.voice }
    : DEFAULT_SOUND
}

export function saveSoundSettings(settings: SoundSettings): void {
  write(SOUND_KEY, settings)
}

/** The saved Language, or null when none is saved or it is corrupt. */
export function loadLanguage(): Language | null {
  const value = read(LANGUAGE_KEY)
  return includes(LANGUAGES, value) ? value : null
}

export function saveLanguage(language: Language): void {
  write(LANGUAGE_KEY, language)
}

/** The saved Theme choice, or null when none is saved or it is corrupt. */
export function loadTheme(): Theme | null {
  const value = read(THEME_KEY)
  return includes(THEMES, value) ? value : null
}

export function saveTheme(theme: Theme): void {
  write(THEME_KEY, theme)
}

/** Follow-along progress older than this is ignored: the Workout was left long ago. */
const PROGRESS_MAX_AGE_MS = 12 * 60 * 60 * 1000

/**
 * The index of the Step Follow-along was on, or null when nothing is saved, it is corrupt,
 * or it is too old (then it is cleared as well).
 */
export function loadProgress(): number | null {
  const value = read(PROGRESS_KEY)
  if (
    !isRecord(value) ||
    !Number.isInteger(value.index) ||
    (value.index as number) < 0 ||
    typeof value.savedAt !== 'number'
  ) {
    return null
  }
  if (Date.now() - value.savedAt > PROGRESS_MAX_AGE_MS) {
    remove(PROGRESS_KEY)
    return null
  }
  return value.index as number
}

/** Remembers the Step Follow-along is on, with when it was saved. */
export function saveProgress(index: number): void {
  write(PROGRESS_KEY, { index, savedAt: Date.now() })
}

export function clearProgress(): void {
  remove(PROGRESS_KEY)
}

function isFavourite(value: unknown): value is Favourite {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.name === 'string' &&
    (value.savedOn === undefined || typeof value.savedOn === 'string') &&
    (value.ownName === undefined || typeof value.ownName === 'string') &&
    isWorkout(value.workout)
  )
}

/** The saved Favourites, newest first; a corrupt list reads as none, a corrupt entry is skipped. */
export function loadFavourites(): Favourite[] {
  const value = read(FAVOURITES_KEY)
  return Array.isArray(value) ? value.filter(isFavourite) : []
}

export function saveFavourites(favourites: readonly Favourite[]): void {
  write(FAVOURITES_KEY, favourites)
}
