import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { exerciseText, type Exercise } from '@/library'
import { useLanguage, useText } from '@/language'
import { equipmentText, trainsText } from '@/workout'

/**
 * How an Exercise is done: a large GIF, the steps, the Muscle-group line, Equipment and Difficulty.
 * Open while `exercise` is set; `onClose` should clear it.
 */
export function ExerciseDetailDialog({
  exercise,
  onClose,
}: {
  exercise: Exercise | null
  onClose: () => void
}) {
  const { language } = useLanguage()
  const { exercise: text, terms } = useText()
  const shown = exercise && exerciseText(exercise, language)
  return (
    <Dialog open={exercise !== null} onOpenChange={(open) => !open && onClose()}>
      {exercise && shown && (
        <DialogContent closeLabel={text.close} className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="pr-8 text-xl break-words first-letter:uppercase">
              {shown.name}
            </DialogTitle>
            <DialogDescription>{trainsText(exercise.muscleGroups, language)}</DialogDescription>
          </DialogHeader>
          <img
            src={exercise.gifUrl}
            alt={shown.name}
            width={360}
            height={360}
            className="mx-auto aspect-square w-full max-w-90 rounded-lg bg-white"
          />
          <div className="flex flex-col gap-1">
            <p>
              <span className="font-medium">{text.equipment}</span>{' '}
              {equipmentText(exercise.equipment, language)}
            </p>
            <p>
              <span className="font-medium">{text.difficulty}</span>{' '}
              {terms.difficulties[exercise.difficulty].label}
            </p>
          </div>
          <ol className="flex list-decimal flex-col gap-1 pl-5">
            {shown.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </DialogContent>
      )}
    </Dialog>
  )
}
