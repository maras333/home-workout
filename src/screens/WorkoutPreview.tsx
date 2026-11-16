import { useId, useState } from 'react'
import { Navigate, useNavigate } from 'react-router'
import { Shuffle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ExerciseDetailDialog } from '@/components/ExerciseDetailDialog'
import { SaveFavouriteButton } from '@/favourites/SaveFavouriteButton'
import { useLanguage, useText } from '@/language'
import { exerciseText, library, type Exercise } from '@/library'
import {
  canSwap,
  clearProgress,
  durationText,
  exerciseCount,
  generate,
  loadWorkout,
  plannedSeconds,
  requestSummary,
  roundsText,
  saveRequest,
  saveWorkout,
  swap,
  targetText,
  type SetPosition,
  type Workout,
  type WorkoutSet,
} from '@/workout'

function BlockSection({
  title,
  sets,
  onOpenExercise,
  canSwapAt,
  onSwap,
}: {
  title: string
  sets: WorkoutSet[]
  onOpenExercise: (exercise: Exercise) => void
  canSwapAt: (index: number) => boolean
  onSwap: (index: number) => void
}) {
  const headingId = useId()
  const { language } = useLanguage()
  const text = useText().preview
  return (
    <section aria-labelledby={headingId} className="flex flex-col gap-2">
      <h2 id={headingId} className="text-lg font-semibold">
        {title}
      </h2>
      <ul className="flex flex-col divide-y rounded-lg border">
        {sets.map((set, index) => {
          const { name } = exerciseText(set.exercise, language)
          return (
            <li key={`${index}-${set.exercise.id}`} className="flex items-center gap-2 pr-2">
              <button
                type="button"
                onClick={() => onOpenExercise(set.exercise)}
                className="flex min-w-0 flex-1 cursor-pointer items-center gap-3 p-2 text-left sm:gap-4 outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <img
                  src={set.exercise.gifUrl}
                  alt={name}
                  loading="lazy"
                  width={56}
                  height={56}
                  className="size-14 shrink-0 rounded"
                />
                {/* On a phone the target goes under the name: beside it, a long Polish
                    target ("12 powtórzeń na stronę") left the name almost no width. */}
                <span className="flex min-w-0 flex-1 flex-col sm:flex-row sm:items-center sm:gap-4">
                  <span className="break-words first-letter:uppercase sm:flex-1">{name}</span>
                  <span className="text-muted-foreground">{targetText(set, language)}</span>
                </span>
              </button>
              <Button
                variant="outline"
                aria-label={text.swapExercise(name)}
                disabled={!canSwapAt(index)}
                onClick={() => onSwap(index)}
              >
                <Shuffle aria-hidden="true" />
                <span className="max-sm:sr-only">{text.swap}</span>
              </Button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export function WorkoutPreview() {
  const [workout, setWorkout] = useState(loadWorkout)
  const [detailExercise, setDetailExercise] = useState<Exercise | null>(null)
  const navigate = useNavigate()
  const { language } = useLanguage()
  const { preview: text, counts } = useText()
  if (!workout) return <Navigate to="/" replace />

  function generateAnother(previous: Workout) {
    const next = generate(previous.request, library, Math.random, previous)
    saveWorkout(next)
    setWorkout(next)
  }

  function swapAt(current: Workout, position: SetPosition) {
    const next = swap(current, position, library, Math.random)
    if (!next) return
    saveWorkout(next)
    setWorkout(next)
  }

  /** The props that let a Block's rows open the detail dialog and Swap. */
  const rowActions = (current: Workout, block: SetPosition['block']) => ({
    onOpenExercise: setDetailExercise,
    canSwapAt: (index: number) => canSwap(current, { block, index }, library),
    onSwap: (index: number) => swapAt(current, { block, index }),
  })

  function changeRequest(current: Workout) {
    // The form prefills from the saved Request, so make that this Workout's Request.
    saveRequest(current.request)
    navigate('/')
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 p-4 sm:p-8">
      <nav aria-label={text.actions} className="flex flex-wrap items-center gap-2">
        <Button
          variant="ghost"
          size="lg"
          className="mr-auto"
          onClick={() => changeRequest(workout)}
        >
          {text.changeRequest}
        </Button>
        <Button variant="secondary" size="lg" onClick={() => generateAnother(workout)}>
          {text.generateAnother}
        </Button>
        <SaveFavouriteButton workout={workout} />
        {/* On a phone, Start Workout is a bar fixed to the bottom, under the thumb; the Layout
            leaves room for it. On a laptop the wrapper disappears and it sits in the row. */}
        <div
          data-bottom-bar
          className="max-sm:fixed max-sm:inset-x-0 max-sm:bottom-0 max-sm:z-10 max-sm:border-t max-sm:bg-background max-sm:p-4 max-sm:pb-[calc(1rem+env(safe-area-inset-bottom))] sm:contents"
        >
          <Button
            size="lg"
            className="px-6 max-sm:h-11 max-sm:w-full"
            onClick={() => {
              clearProgress()
              navigate('/follow-along')
            }}
          >
            {text.start}
          </Button>
        </div>
      </nav>
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold sm:text-3xl">{text.heading}</h1>
        <p>{requestSummary(workout.request, language)}</p>
        <p className="text-muted-foreground">
          {text.plannedTotal(
            durationText(plannedSeconds(workout), language),
            counts.exercises(exerciseCount(workout)),
          )}
        </p>
      </header>
      <BlockSection title={text.warmUp} sets={workout.warmUp} {...rowActions(workout, 'warmUp')} />
      <BlockSection
        title={`${text.main} · ${roundsText(workout.main, language)}`}
        sets={workout.main.sets}
        {...rowActions(workout, 'main')}
      />
      <BlockSection
        title={text.coolDown}
        sets={workout.coolDown}
        {...rowActions(workout, 'coolDown')}
      />
      <ExerciseDetailDialog exercise={detailExercise} onClose={() => setDetailExercise(null)} />
    </div>
  )
}
