import { useId, useState } from 'react'
import { useNavigate } from 'react-router'
import { cn } from 'cn'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { library } from '@/library'
import { exerciseCount, isAvailable, saveWorkout, type Favourite } from '@/workout'
import { useFavourites } from './use-favourites'

/** The saved Favourites under the Workout Request form; hidden when there are none. */
export function FavouritesSection() {
  const { favourites, remove } = useFavourites()
  const [deleting, setDeleting] = useState<Favourite | null>(null)
  const navigate = useNavigate()
  const headingId = useId()
  if (favourites.length === 0) return null

  const start = (favourite: Favourite) => {
    // A copy: Swaps on the current Workout never reach the saved Favourite.
    saveWorkout(favourite.workout)
    navigate('/workout')
  }

  return (
    <section aria-labelledby={headingId} className="flex flex-col gap-3">
      <h2 id={headingId} className="text-xl font-semibold">
        Favourites
      </h2>
      <ul className="flex flex-col divide-y rounded-lg border">
        {favourites.map((favourite) => {
          const available = isAvailable(favourite, library)
          return (
            <li
              key={favourite.id}
              className={cn('flex items-center gap-3 p-3', !available && 'text-muted-foreground')}
            >
              <div className="flex flex-1 flex-col">
                <span className="font-medium">{favourite.name}</span>
                <span className="text-sm">
                  {exerciseCount(favourite.workout)} Exercises
                  {!available && ' · No longer available'}
                </span>
              </div>
              {available && <Button onClick={() => start(favourite)}>Start</Button>}
              <Button variant="ghost" onClick={() => setDeleting(favourite)}>
                Delete
              </Button>
            </li>
          )
        })}
      </ul>
      <Dialog open={deleting !== null} onOpenChange={(open) => !open && setDeleting(null)}>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Delete this Favourite?</DialogTitle>
            <DialogDescription>{deleting?.name}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={() => {
                if (deleting) remove(deleting.id)
                setDeleting(null)
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}
