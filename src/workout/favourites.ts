import type { Exercise } from '@/library'
import type { Favourite, Workout } from './types'
import { allSets, sameWorkout } from './workout'

/** The Favourite holding exactly this Workout, if any. */
export function favouriteOf(favourites: readonly Favourite[], workout: Workout): Favourite | null {
  return favourites.find((favourite) => sameWorkout(favourite.workout, workout)) ?? null
}

/** False when any of its Exercises has left the library. */
export function isAvailable({ workout }: Favourite, library: readonly Exercise[]): boolean {
  const ids = new Set(library.map((exercise) => exercise.id))
  return allSets(workout).every((set) => ids.has(set.exercise.id))
}
