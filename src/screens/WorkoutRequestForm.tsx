import { useId, useState, type FormEvent, type ReactNode } from 'react'
import { useNavigate } from 'react-router'
import { Button } from '@/components/ui/button'
import { DIFFICULTIES, EQUIPMENT, WORKOUT_TYPES, library } from '@/library'
import {
  DIFFICULTY_HINTS,
  MINUTES,
  difficultyLabel,
  equipmentLabel,
  generate,
  loadRequest,
  saveRequest,
  saveWorkout,
  workoutTypeLabel,
  type WorkoutRequest,
} from '@/workout'

const optionCard =
  'flex cursor-pointer flex-col gap-1 rounded-lg border p-3 has-checked:border-primary has-checked:bg-muted has-focus-visible:ring-3 has-focus-visible:ring-ring/50'

function Field({ legend, children }: { legend: string; children: ReactNode }) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="mb-2 font-semibold">{legend}</legend>
      {children}
    </fieldset>
  )
}

function RadioCard({
  name,
  label,
  hint,
  checked,
  onChange,
}: {
  name: string
  label: string
  hint?: string
  checked: boolean
  onChange: () => void
}) {
  const id = useId()
  return (
    <label className={optionCard}>
      <input
        type="radio"
        className="sr-only"
        name={name}
        checked={checked}
        onChange={onChange}
        aria-labelledby={`${id}-label`}
        aria-describedby={hint ? `${id}-hint` : undefined}
      />
      <span id={`${id}-label`} className="font-medium">
        {label}
      </span>
      {hint && (
        <span id={`${id}-hint`} className="text-sm text-muted-foreground">
          {hint}
        </span>
      )}
    </label>
  )
}

export function WorkoutRequestForm() {
  const navigate = useNavigate()
  const [request, setRequest] = useState<WorkoutRequest>(loadRequest)

  function update(changes: Partial<WorkoutRequest>) {
    setRequest((current) => ({ ...current, ...changes }))
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    saveRequest(request)
    saveWorkout(generate(request, library, Math.random))
    navigate('/workout')
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto flex max-w-3xl flex-col gap-8 p-8">
      <h1 className="text-3xl font-bold">Workout Request</h1>

      <Field legend="Workout type">
        <div className="grid grid-cols-3 gap-3">
          {WORKOUT_TYPES.map((type) => (
            <RadioCard
              key={type}
              name="workout-type"
              label={workoutTypeLabel(type)}
              checked={request.workoutType === type}
              onChange={() => update({ workoutType: type })}
            />
          ))}
        </div>
      </Field>

      <Field legend="Time">
        <div className="grid grid-cols-4 gap-3">
          {MINUTES.map((minutes) => (
            <RadioCard
              key={minutes}
              name="minutes"
              label={`${minutes} min`}
              checked={request.minutes === minutes}
              onChange={() => update({ minutes })}
            />
          ))}
        </div>
      </Field>

      <Field legend="Difficulty">
        <div className="grid grid-cols-3 gap-3">
          {DIFFICULTIES.map((difficulty) => (
            <RadioCard
              key={difficulty}
              name="difficulty"
              label={difficultyLabel(difficulty)}
              hint={DIFFICULTY_HINTS[difficulty]}
              checked={request.difficulty === difficulty}
              onChange={() => update({ difficulty })}
            />
          ))}
        </div>
      </Field>

      <Field legend="Equipment">
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {EQUIPMENT.map((item) => (
            <label key={item} className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                className="size-4 accent-primary"
                checked={request.equipment.includes(item)}
                onChange={(event) =>
                  update({
                    equipment: event.target.checked
                      ? EQUIPMENT.filter((e) => e === item || request.equipment.includes(e))
                      : request.equipment.filter((e) => e !== item),
                  })
                }
              />
              {equipmentLabel(item)}
            </label>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">Bodyweight Exercises are always included.</p>
      </Field>

      <Button type="submit" size="lg" className="self-start px-6">
        Generate
      </Button>
    </form>
  )
}
