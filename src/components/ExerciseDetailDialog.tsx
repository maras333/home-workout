import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { Exercise } from '@/library'
import { difficultyLabel, equipmentText } from '@/workout'

/**
 * How an Exercise is done: a large GIF, the steps, "Trains: …", Equipment and Difficulty.
 * Open while `exercise` is set; `onClose` should clear it.
 */
export function ExerciseDetailDialog({
  exercise,
  onClose,
}: {
  exercise: Exercise | null
  onClose: () => void
}) {
  return (
    <Dialog open={exercise !== null} onOpenChange={(open) => !open && onClose()}>
      {exercise && (
        <DialogContent className="max-h-[calc(100svh-2rem)] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="pr-8 text-xl capitalize">{exercise.name}</DialogTitle>
            <DialogDescription>{exercise.trains}</DialogDescription>
          </DialogHeader>
          <img
            src={exercise.gifUrl}
            alt={exercise.name}
            width={360}
            height={360}
            className="mx-auto aspect-square w-full max-w-90 rounded-lg bg-white"
          />
          <div className="flex flex-col gap-1">
            <p>
              <span className="font-medium">Equipment:</span> {equipmentText(exercise.equipment)}
            </p>
            <p>
              <span className="font-medium">Difficulty:</span>{' '}
              {difficultyLabel(exercise.difficulty)}
            </p>
          </div>
          <ol className="flex list-decimal flex-col gap-1 pl-5">
            {exercise.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </DialogContent>
      )}
    </Dialog>
  )
}
