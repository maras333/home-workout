import { useState } from 'react'
import {
  favouriteName,
  favouriteOf,
  loadFavourites,
  MAX_FAVOURITES,
  saveFavourites,
  type Favourite,
  type Workout,
} from '@/workout'

export type FavouritesStore = {
  /** Newest first. */
  favourites: Favourite[]
  full: boolean
  /** Saves the Workout as a new Favourite, or removes it when it is one already. */
  toggle: (workout: Workout) => void
  remove: (id: string) => void
}

/** A unique id; `crypto.randomUUID` only exists on HTTPS pages and localhost. */
function newId(): string {
  return typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${performance.now().toString(36)}`
}

/**
 * The saved Favourites, kept in browser storage. Each change starts from what is stored
 * now, so a Favourite saved in another tab is never written over.
 */
export function useFavourites(): FavouritesStore {
  const [favourites, setFavourites] = useState(loadFavourites)

  const change = (edit: (stored: Favourite[]) => Favourite[]) => {
    const next = edit(loadFavourites())
    saveFavourites(next)
    setFavourites(next)
  }

  const remove = (id: string) =>
    change((stored) => stored.filter((favourite) => favourite.id !== id))

  const toggle = (workout: Workout) =>
    change((stored) => {
      const existing = favouriteOf(stored, workout)
      if (existing) return stored.filter((favourite) => favourite !== existing)
      if (stored.length >= MAX_FAVOURITES) return stored
      const name = favouriteName(workout.request, new Date())
      return [{ id: newId(), name, workout }, ...stored]
    })

  return { favourites, full: favourites.length >= MAX_FAVOURITES, toggle, remove }
}
