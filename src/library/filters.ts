import type { Language } from '@/language/types'
import { exerciseText } from './index'
import {
  DIFFICULTIES,
  EQUIPMENT,
  MUSCLE_GROUPS,
  type Difficulty,
  type Exercise,
  type MuscleGroup,
} from './types'

/** An Equipment chip: one item, or Bodyweight for Exercises with no Equipment. */
export const EQUIPMENT_FILTERS = [...EQUIPMENT, 'bodyweight'] as const
export type EquipmentFilter = (typeof EQUIPMENT_FILTERS)[number]

/** What the Exercise library shows: a name search and the chips pressed in each group. */
export type ExerciseFilters = {
  search: string
  muscleGroups: MuscleGroup[]
  equipment: EquipmentFilter[]
  difficulties: Difficulty[]
}

const KEYS = { muscleGroups: 'muscle', equipment: 'equipment', difficulties: 'difficulty' } as const

/** The values given for `key` that are among `values`, once each and in `values`' order. */
function knownValues<T extends string>(
  params: URLSearchParams,
  key: string,
  values: readonly T[],
): T[] {
  const given = params.getAll(key)
  return values.filter((value) => given.includes(value))
}

/** The filters in a URL query, e.g. `?muscle=legs&equipment=bodyweight&q=squat`; unknown values are ignored. */
export function parseFilters(params: URLSearchParams): ExerciseFilters {
  return {
    search: params.get('q') ?? '',
    muscleGroups: knownValues(params, KEYS.muscleGroups, MUSCLE_GROUPS),
    equipment: knownValues(params, KEYS.equipment, EQUIPMENT_FILTERS),
    difficulties: knownValues(params, KEYS.difficulties, DIFFICULTIES),
  }
}

/** The URL query for `filters`, leaving out what is empty. */
export function filtersToParams(filters: ExerciseFilters): URLSearchParams {
  const params = new URLSearchParams()
  for (const group of ['muscleGroups', 'equipment', 'difficulties'] as const) {
    for (const value of filters[group]) params.append(KEYS[group], value)
  }
  if (filters.search !== '') params.set('q', filters.search)
  return params
}

/** Whether any chip is pressed or the search has text. */
export function hasActiveFilters(filters: ExerciseFilters): boolean {
  return (
    filters.search.trim() !== '' ||
    filters.muscleGroups.length > 0 ||
    filters.equipment.length > 0 ||
    filters.difficulties.length > 0
  )
}

/** Lower case, without diacritics: "Przysiąd" and "Skłon" become "przysiad" and "sklon". */
function folded(text: string): string {
  return text.toLowerCase().normalize('NFD').replace(/\p{M}/gu, '').replace(/ł/g, 'l')
}

/**
 * The Exercises that match `filters`, with the names they show in `language`, sorted by name.
 * Chips in one group combine with OR; the groups and the search combine with AND. A Muscle
 * group matches an Exercise's primary groups only.
 */
export function filterExercises(
  exercises: readonly Exercise[],
  filters: ExerciseFilters,
  language: Language,
): { exercise: Exercise; name: string }[] {
  const search = folded(filters.search.trim())
  const collator = new Intl.Collator(language)
  const anyOf = <T>(chosen: readonly T[], test: (value: T) => boolean) =>
    chosen.length === 0 || chosen.some(test)
  return exercises
    .map((exercise) => ({ exercise, name: exerciseText(exercise, language).name }))
    .filter(
      ({ exercise, name }) =>
        folded(name).includes(search) &&
        anyOf(filters.muscleGroups, (group) => exercise.muscleGroups.primary.includes(group)) &&
        anyOf(filters.equipment, (item) =>
          item === 'bodyweight'
            ? exercise.equipment.length === 0
            : exercise.equipment.includes(item),
        ) &&
        anyOf(filters.difficulties, (difficulty) => exercise.difficulty === difficulty),
    )
    .sort((a, b) => collator.compare(a.name, b.name))
}
