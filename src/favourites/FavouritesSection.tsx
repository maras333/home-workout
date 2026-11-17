import { useId, useState, type FormEvent } from 'react'
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
import {
  automaticLabel,
  exerciseCount,
  favouriteLabel,
  isAvailable,
  MAX_FAVOURITE_NAME_LENGTH,
  saveWorkout,
  type Favourite,
} from '@/workout'
import { useFavourites } from './use-favourites'

/** The saved Favourites under the Workout Request form; hidden when there are none. */
export function FavouritesSection() {
  const { favourites, remove, rename } = useFavourites()
  const [deleting, setDeleting] = useState<Favourite | null>(null)
  const [renaming, setRenaming] = useState<Favourite | null>(null)
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
          const label = favouriteLabel(favourite, language)
          return (
            <li
              key={favourite.id}
              className={cn('flex items-center gap-3 p-3', !available && 'text-muted-foreground')}
            >
              <div className="flex min-w-0 flex-1 flex-col break-words">
                <span className="flex items-start gap-1">
                  <span className="min-w-0 font-medium">{label}</span>
                  {available && (
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      aria-label={text.rename(label)}
                      onClick={() => setRenaming(favourite)}
                    >
                      <span aria-hidden="true">✎</span>
                    </Button>
                  )}
                </span>
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
            <DialogDescription className="break-words">
              {deleting && favouriteLabel(deleting, language)}
            </DialogDescription>
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
      <RenameDialog favourite={renaming} onRename={rename} onClose={() => setRenaming(null)} />
    </section>
  )
}

/** Asks for the Favourite's own name; left empty, the automatic name comes back. */
function RenameDialog({
  favourite,
  onRename,
  onClose,
}: {
  favourite: Favourite | null
  onRename: (id: string, name: string) => void
  onClose: () => void
}) {
  const { language } = useLanguage()
  const { favourites: text } = useText()
  const fieldId = useId()
  const hintId = useId()
  const save = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (favourite) onRename(favourite.id, new FormData(event.currentTarget).get('name') as string)
    onClose()
  }
  return (
    <Dialog open={favourite !== null} onOpenChange={(open) => !open && onClose()}>
      {favourite && (
        <DialogContent showCloseButton={false}>
          <form onSubmit={save} className="flex flex-col gap-4">
            <DialogHeader>
              <DialogTitle>{text.renameTitle}</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-2">
              <label htmlFor={fieldId} className="text-sm font-semibold">
                {text.nameField}
              </label>
              <input
                id={fieldId}
                name="name"
                autoFocus
                maxLength={MAX_FAVOURITE_NAME_LENGTH}
                defaultValue={favourite.ownName ?? ''}
                placeholder={automaticLabel(favourite, language)}
                aria-describedby={hintId}
                className="h-9 w-full min-w-0 rounded-lg border bg-background px-3 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
              />
              <DialogDescription id={hintId}>{text.nameHint}</DialogDescription>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  {text.cancel}
                </Button>
              </DialogClose>
              <Button type="submit">{text.save}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      )}
    </Dialog>
  )
}
