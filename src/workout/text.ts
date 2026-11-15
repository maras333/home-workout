import { dictionaries } from '@/language/dictionaries'
import type { Language } from '@/language/types'
import type { Equipment, MuscleGroups } from '@/library'
import { parseDay, type Day } from './day'
import type { Favourite, MainBlock, WorkoutRequest, WorkoutSet } from './types'

/** e.g. "Dumbbells, Kettlebell", or "Bodyweight" for none */
export function equipmentText(equipment: readonly Equipment[], language: Language): string {
  const { terms } = dictionaries[language]
  return equipment.length > 0
    ? equipment.map((item) => terms.equipment[item]).join(', ')
    : terms.bodyweight
}

/** e.g. ["Full body", "30 min", "Intermediate"] */
function requestParts(request: WorkoutRequest, language: Language): string[] {
  const { terms, counts } = dictionaries[language]
  return [
    terms.workoutTypes[request.workoutType],
    counts.minutes(request.minutes),
    terms.difficulties[request.difficulty].label,
  ]
}

/** e.g. "Full body · 30 min · Intermediate · Dumbbells, Kettlebell" */
export function requestSummary(request: WorkoutRequest, language: Language): string {
  return [...requestParts(request, language), equipmentText(request.equipment, language)].join(
    ' · ',
  )
}

/** A Favourite's automatic name, e.g. "Full body · 30 min · Intermediate · 14 Nov" */
export function favouriteName(request: WorkoutRequest, savedOn: Day, language: Language): string {
  const date = `${savedOn.day} ${dictionaries[language].favourites.months[savedOn.month - 1]}`
  return [...requestParts(request, language), date].join(' · ')
}

/**
 * The name a Favourite shows: built in the Language from its Workout and the day it was
 * saved, or, for one saved before that day was kept, the name it was saved with.
 */
export function favouriteLabel({ name, savedOn, workout }: Favourite, language: Language): string {
  const day = savedOn === undefined ? null : parseDay(savedOn)
  return day ? favouriteName(workout.request, day, language) : name
}

/** e.g. "12 reps", "40 s per side" */
export function targetText({ target, perSide }: WorkoutSet, language: Language): string {
  const { counts } = dictionaries[language]
  const amount =
    target.measure === 'reps' ? counts.reps(target.reps) : counts.seconds(target.seconds)
  return perSide ? counts.perSide(amount) : amount
}

/** e.g. "5 Exercises × 4 Rounds (last Round: 2 Exercises)" */
export function roundsText({ sets, rounds, lastRoundSets }: MainBlock, language: Language): string {
  const { counts, preview } = dictionaries[language]
  const partial =
    lastRoundSets < sets.length ? ` (${preview.lastRound(counts.exercises(lastRoundSets))})` : ''
  return `${counts.exercises(sets.length)} × ${counts.rounds(rounds)}${partial}`
}

/** e.g. "29 min" */
export function durationText(seconds: number, language: Language): string {
  return dictionaries[language].counts.minutes(Math.round(seconds / 60))
}

/** The Muscle-group line, e.g. "Trains: chest (also arms, shoulders)" */
export function trainsText({ primary, secondary }: MuscleGroups, language: Language): string {
  const { terms, exercise } = dictionaries[language]
  const words = (groups: MuscleGroups['primary']) =>
    groups.map((group) => terms.muscleGroups[group]).join(', ')
  return exercise.trains(words(primary), secondary.length > 0 ? words(secondary) : null)
}
