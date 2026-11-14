import { useId, useState } from 'react'
import { Navigate, useNavigate } from 'react-router'
import { Button } from '@/components/ui/button'
import { ExerciseDetailDialog } from '@/components/ExerciseDetailDialog'
import { library, type Exercise } from '@/library'
import {
  durationText,
  exerciseCount,
  generate,
  loadWorkout,
  plannedSeconds,
  requestSummary,
  roundsText,
  saveRequest,
  saveWorkout,
  targetText,
  type Workout,
  type WorkoutSet,
} from '@/workout'

function BlockSection({
  title,
  sets,
  onOpenExercise,
}: {
  title: string
  sets: WorkoutSet[]
  onOpenExercise: (exercise: Exercise) => void
}) {
  const headingId = useId()
  return (
    <section aria-labelledby={headingId} className="flex flex-col gap-2">
      <h2 id={headingId} className="text-lg font-semibold">
        {title}
      </h2>
      <ul className="flex flex-col divide-y rounded-lg border">
        {sets.map((set, index) => (
          <li key={`${index}-${set.exercise.id}`}>
            <button
              type="button"
              onClick={() => onOpenExercise(set.exercise)}
              className="flex w-full cursor-pointer items-center gap-4 p-2 text-left outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
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
        <Button size="lg" className="px-6" onClick={() => navigate('/follow-along')}>
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
      <BlockSection title="Warm-up" sets={workout.warmUp} onOpenExercise={setDetailExercise} />
      <BlockSection
        title={`Main · ${roundsText(workout.main)}`}
        sets={workout.main.sets}
        onOpenExercise={setDetailExercise}
      />
      <BlockSection title="Cool-down" sets={workout.coolDown} onOpenExercise={setDetailExercise} />
      <ExerciseDetailDialog exercise={detailExercise} onClose={() => setDetailExercise(null)} />
    </div>
  )
}
