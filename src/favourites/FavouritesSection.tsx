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
import { useLanguage, useText } from '@/language'
import { library } from '@/library'
import { exerciseCount, favouriteLabel, isAvailable, saveWorkout, type Favourite } from '@/workout'
import { useFavourites } from './use-favourites'

/** The saved Favourites under the Workout Request form; hidden when there are none. */
export function FavouritesSection() {
  const { favourites, remove } = useFavourites()
  const [deleting, setDeleting] = useState<Favourite | null>(null)
  const navigate = useNavigate()
  const headingId = useId()
  const { language } = useLanguage()
  const { favourites: text, counts } = useText()
  if (favourites.length === 0) return null

  const start = (favourite: Favourite) => {
    // A copy: Swaps on the current Workout never reach the saved Favourite.
    saveWorkout(favourite.workout)
    navigate('/workout')
  }

  return (
    <section aria-labelledby={headingId} className="flex flex-col gap-3">
      <h2 id={headingId} className="text-xl font-semibold">
        {text.heading}
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
                <span className="font-medium">{favouriteLabel(favourite, language)}</span>
                <span className="text-sm">
                  {counts.exercises(exerciseCount(favourite.workout))}
                  {!available && ` · ${text.unavailable}`}
                </span>
              </div>
              {available && <Button onClick={() => start(favourite)}>{text.start}</Button>}
              <Button variant="ghost" onClick={() => setDeleting(favourite)}>
                {text.delete}
              </Button>
            </li>
          )
        })}
      </ul>
      <Dialog open={deleting !== null} onOpenChange={(open) => !open && setDeleting(null)}>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>{text.deleteTitle}</DialogTitle>
            <DialogDescription>{deleting && favouriteLabel(deleting, language)}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">{text.cancel}</Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={() => {
                if (deleting) remove(deleting.id)
                setDeleting(null)
              }}
            >
              {text.delete}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}
