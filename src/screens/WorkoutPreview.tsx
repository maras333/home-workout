import { useId, useState } from 'react'
import { Navigate } from 'react-router'
import { plannedSeconds, type WorkoutSet } from '@/workout'
import { loadWorkout } from '@/workout/storage'
import { durationText, requestSummary, roundsText, targetText } from '@/workout/text'

function BlockSection({ title, sets }: { title: string; sets: WorkoutSet[] }) {
  const headingId = useId()
  return (
    <section aria-labelledby={headingId} className="flex flex-col gap-2">
      <h2 id={headingId} className="text-lg font-semibold">
        {title}
      </h2>
      <ul className="flex flex-col divide-y rounded-lg border">
        {sets.map((set) => (
          <li key={set.exercise.id} className="flex items-center gap-4 p-2">
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
          </li>
        ))}
      </ul>
    </section>
  )
}

export function WorkoutPreview() {
  const [workout] = useState(loadWorkout)
  if (!workout) return <Navigate to="/" replace />

  const exerciseCount = workout.warmUp.length + workout.main.sets.length + workout.coolDown.length

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 p-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold">Workout preview</h1>
        <p>{requestSummary(workout.request)}</p>
        <p className="text-muted-foreground">
          Planned total: {durationText(plannedSeconds(workout))} · {exerciseCount} Exercises
        </p>
      </header>
      <BlockSection title="Warm-up" sets={workout.warmUp} />
      <BlockSection title={`Main · ${roundsText(workout.main)}`} sets={workout.main.sets} />
      <BlockSection title="Cool-down" sets={workout.coolDown} />
    </div>
  )
}
