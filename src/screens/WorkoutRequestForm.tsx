import { useId, useState, type FormEvent, type ReactNode } from 'react'
import { useNavigate } from 'react-router'
import { Button } from '@/components/ui/button'
import { FavouritesSection } from '@/favourites/FavouritesSection'
import { useText } from '@/language'
import { DIFFICULTIES, EQUIPMENT, WORKOUT_TYPES, library } from '@/library'
import {
  MINUTES,
  generate,
  loadRequest,
  saveRequest,
  saveWorkout,
  type WorkoutRequest,
} from '@/workout'

const optionCard =
  'flex min-w-0 cursor-pointer flex-col gap-1 rounded-lg border p-2 break-words sm:p-3 has-checked:border-primary has-checked:bg-muted has-focus-visible:ring-3 has-focus-visible:ring-ring/50'

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
  const { request: text, terms, counts } = useText()
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
    <div className="mx-auto flex max-w-3xl flex-col gap-8 p-4 sm:gap-12 sm:p-8">
      <form onSubmit={onSubmit} className="flex flex-col gap-6 sm:gap-8">
        <h1 className="text-2xl font-bold sm:text-3xl">{text.heading}</h1>

        <Field legend={text.workoutType}>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
            {WORKOUT_TYPES.map((type) => (
              <RadioCard
                key={type}
                name="workout-type"
                label={terms.workoutTypes[type]}
                checked={request.workoutType === type}
                onChange={() => update({ workoutType: type })}
              />
            ))}
          </div>
        </Field>

        <Field legend={text.time}>
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            {MINUTES.map((minutes) => (
              <RadioCard
                key={minutes}
                name="minutes"
                label={counts.minutes(minutes)}
                checked={request.minutes === minutes}
                onChange={() => update({ minutes })}
              />
            ))}
          </div>
        </Field>

        <Field legend={text.difficulty}>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3">
            {DIFFICULTIES.map((difficulty) => (
              <RadioCard
                key={difficulty}
                name="difficulty"
                label={terms.difficulties[difficulty].label}
                hint={terms.difficulties[difficulty].hint}
                checked={request.difficulty === difficulty}
                onChange={() => update({ difficulty })}
              />
            ))}
          </div>
        </Field>

        <Field legend={text.equipment}>
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
                {terms.equipment[item]}
              </label>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">{text.bodyweightIncluded}</p>
        </Field>

        <Button type="submit" size="lg" className="self-start px-6">
          {text.generate}
        </Button>
      </form>
      <FavouritesSection />
    </div>
  )
}
