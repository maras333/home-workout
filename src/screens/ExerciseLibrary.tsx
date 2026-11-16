import { useState } from 'react'
import { useSearchParams } from 'react-router'
import { ExerciseDetailDialog } from '@/components/ExerciseDetailDialog'
import { useLanguage, useText } from '@/language'
import { DIFFICULTIES, MUSCLE_GROUPS, library, type Exercise } from '@/library'
import {
  hasActiveFilters,
  EQUIPMENT_FILTERS,
  filterExercises,
  filtersToParams,
  parseFilters,
  type ExerciseFilters,
} from '@/library/filters'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { equipmentText, trainsText } from '@/workout'

function ChipGroup<T extends string>({
  label,
  values,
  chosen,
  labelOf,
  onChange,
}: {
  label: string
  values: readonly T[]
  chosen: readonly T[]
  labelOf: (value: T) => string
  onChange: (chosen: T[]) => void
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-col gap-2">
      <span className="text-sm font-semibold">{label}</span>
      <div className="flex flex-wrap gap-2">
        {values.map((value) => {
          const pressed = chosen.includes(value)
          return (
            <button
              key={value}
              type="button"
              aria-pressed={pressed}
              onClick={() =>
                onChange(values.filter((v) => (v === value ? !pressed : chosen.includes(v))))
              }
              className={cn(
                'rounded-full border px-3 py-1 text-sm first-letter:uppercase focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none',
                pressed
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'bg-background hover:bg-muted',
              )}
            >
              {labelOf(value)}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/**
 * Every Exercise in the library, to browse: a name search and filter chips kept in the URL
 * query, and a row per Exercise that opens its detail dialog.
 */
export function ExerciseLibrary() {
  const { language } = useLanguage()
  const { library: text, terms } = useText()
  const [params, setParams] = useSearchParams()
  const [detail, setDetail] = useState<Exercise | null>(null)

  const filters = parseFilters(params)
  // Each keystroke replaces the URL rather than adding to the history; chips add to it.
  const update = (changes: Partial<ExerciseFilters>, replace = false) =>
    setParams(filtersToParams({ ...filters, ...changes }), { replace })
  const clear = () => setParams(new URLSearchParams())
  const rows = filterExercises(library, filters, language)

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 p-4 sm:p-8">
      <h1 id="exercise-library" className="text-2xl font-bold sm:text-3xl">
        {text.heading}
      </h1>
      <div className="flex flex-col gap-4">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold">{text.search}</span>
          <input
            type="search"
            value={filters.search}
            placeholder={text.searchPlaceholder}
            onChange={(event) => update({ search: event.target.value }, true)}
            className="h-9 w-full min-w-0 rounded-lg border bg-background px-3 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          />
        </label>
        <ChipGroup
          label={text.muscleGroup}
          values={MUSCLE_GROUPS}
          chosen={filters.muscleGroups}
          labelOf={(group) => terms.muscleGroups[group]}
          onChange={(muscleGroups) => update({ muscleGroups })}
        />
        <ChipGroup
          label={text.equipment}
          values={EQUIPMENT_FILTERS}
          chosen={filters.equipment}
          labelOf={(item) => (item === 'bodyweight' ? terms.bodyweight : terms.equipment[item])}
          onChange={(equipment) => update({ equipment })}
        />
        <ChipGroup
          label={text.difficulty}
          values={DIFFICULTIES}
          chosen={filters.difficulties}
          labelOf={(difficulty) => terms.difficulties[difficulty].label}
          onChange={(difficulties) => update({ difficulties })}
        />
      </div>
      <div className="flex min-h-8 flex-wrap items-center justify-between gap-2">
        <p aria-live="polite" className="text-sm text-muted-foreground">
          {text.count(rows.length, library.length)}
        </p>
        {hasActiveFilters(filters) && (
          <Button type="button" variant="outline" onClick={clear}>
            {text.clear}
          </Button>
        )}
      </div>
      {rows.length === 0 ? (
        <p className="py-8 text-center text-muted-foreground">{text.empty}</p>
      ) : (
        <ul aria-labelledby="exercise-library" className="flex flex-col divide-y rounded-lg border">
          {rows.map(({ exercise, name }) => (
            <li key={exercise.id}>
              <button
                type="button"
                onClick={() => setDetail(exercise)}
                className="flex w-full min-w-0 flex-col gap-0.5 px-3 py-2 text-left break-words hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                <span data-name className="font-medium capitalize">
                  {name}
                </span>
                <span className="text-sm text-muted-foreground">
                  {[
                    trainsText(exercise.muscleGroups, language),
                    equipmentText(exercise.equipment, language),
                    terms.difficulties[exercise.difficulty].label,
                  ].join(' · ')}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
      <ExerciseDetailDialog exercise={detail} onClose={() => setDetail(null)} />
    </div>
  )
}
