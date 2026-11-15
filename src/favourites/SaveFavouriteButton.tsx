import { useId } from 'react'
import { cn } from 'cn'
import { Button } from '@/components/ui/button'
import { favouriteOf, type Workout } from '@/workout'
import { useFavourites } from './use-favourites'

/** ☆ Save: saves the Workout as a Favourite; pressed again, removes it. */
export function SaveFavouriteButton({ workout }: { workout: Workout }) {
  const { favourites, full, toggle } = useFavourites()
  const hintId = useId()
  const saved = favouriteOf(favourites, workout) !== null
  const blocked = full && !saved

  return (
    <div className="flex items-center gap-2">
      {blocked && (
        <p id={hintId} className="text-muted-foreground text-sm">
          Favourites full — delete one first
        </p>
      )}
      <Button
        variant="outline"
        size="lg"
        aria-pressed={saved}
        aria-describedby={blocked ? hintId : undefined}
        // aria-disabled, not disabled, so keyboard users can still reach it and its hint.
        aria-disabled={blocked || undefined}
        className={cn(blocked && 'cursor-not-allowed opacity-50')}
        onClick={() => !blocked && toggle(workout)}
      >
        <span aria-hidden="true">{saved ? '★' : '☆'}</span>
        Save
      </Button>
    </div>
  )
}
