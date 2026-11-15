import { useId, useState } from 'react'
import { Navigate, useNavigate } from 'react-router'
import { Shuffle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ExerciseDetailDialog } from '@/components/ExerciseDetailDialog'
import { library, type Exercise } from '@/library'
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
  return (
    <section aria-labelledby={headingId} className="flex flex-col gap-2">
      <h2 id={headingId} className="text-lg font-semibold">
        {title}
      </h2>
      <ul className="flex flex-col divide-y rounded-lg border">
        {sets.map((set, index) => (
          <li key={`${index}-${set.exercise.id}`} className="flex items-center gap-2 pr-2">
            <button
              type="button"
              onClick={() => onOpenExercise(set.exercise)}
              className="flex flex-1 cursor-pointer items-center gap-4 p-2 text-left outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <img
                src={set.exercise.gifUrl}
                alt={set.exercise.name}
                loading="lazy"
                width={56}
                height={56}
                className="size-14 rounded"
              />
              <span className="flex-1 capitalize">{set.exercise.name}</span>
              <span className="text-muted-foreground">{targetText(set)}</span>
            </button>
            <Button
              variant="outline"
              aria-label={`Swap ${set.exercise.name}`}
              disabled={!canSwapAt(index)}
              onClick={() => onSwap(index)}
            >
              <Shuffle aria-hidden="true" />
              Swap
            </Button>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function WorkoutPreview() {
  const [workout, setWorkout] = useState(loadWorkout)
  const [detailExercise, setDetailExercise] = useState<Exercise | null>(null)
  const navigate = useNavigate()
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
    <div className="mx-auto flex max-w-3xl flex-col gap-6 p-8">
      <nav aria-label="Workout actions" className="flex flex-wrap items-center gap-2">
        <Button
          variant="ghost"
          size="lg"
          className="mr-auto"
          onClick={() => changeRequest(workout)}
        >
          ← Change request
        </Button>
        <Button variant="secondary" size="lg" onClick={() => generateAnother(workout)}>
          Generate another
        </Button>
        <Button
          size="lg"
          className="px-6"
          onClick={() => {
            clearProgress()
            navigate('/follow-along')
          }}
        >
          Start Workout
        </Button>
      </nav>
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold">Workout preview</h1>
        <p>{requestSummary(workout.request)}</p>
        <p className="text-muted-foreground">
          Planned total: {durationText(plannedSeconds(workout))} · {exerciseCount(workout)}{' '}
          Exercises
        </p>
      </header>
      <BlockSection title="Warm-up" sets={workout.warmUp} {...rowActions(workout, 'warmUp')} />
      <BlockSection
        title={`Main · ${roundsText(workout.main)}`}
        sets={workout.main.sets}
        {...rowActions(workout, 'main')}
      />
      <BlockSection
        title="Cool-down"
        sets={workout.coolDown}
        {...rowActions(workout, 'coolDown')}
      />
      <ExerciseDetailDialog exercise={detailExercise} onClose={() => setDetailExercise(null)} />
    </div>
  )
}
