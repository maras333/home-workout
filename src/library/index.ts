import type { Language } from '@/language/types'
import { curation } from './curation'
import records from './exercisedb/exercises.json'
import { polish } from './polish'
import type { Exercise, ExerciseTags, ExerciseText } from './types'

export * from './types'

type ExerciseRecord = { exerciseId: string; name: string; instructions: string[] }

function toExercise(record: ExerciseRecord, tags: ExerciseTags): Exercise {
  return {
    ...tags,
    id: record.exerciseId,
    name: record.name,
    steps: record.instructions.map((step) => step.replace(/^Step:\d+\s+/, '')),
    gifUrl: `/exercisedb/${record.exerciseId}.gif`,
  }
}

/** Every Exercise: the copied ExerciseDB records joined with our curation tags. */
export const library: readonly Exercise[] = (records as ExerciseRecord[]).flatMap((record) => {
  const tags = curation[record.exerciseId]
  return tags ? [toExercise(record, tags)] : []
})

const byId = new Map(library.map((exercise) => [exercise.id, exercise]))

/** Each Language's Exercise text by id, besides the English text in the records. */
const otherLanguages: Partial<Record<Language, Record<string, ExerciseText>>> = { pl: polish }

/**
 * An Exercise's name and steps in `language`, looked up in the library by id: English
 * when it has no Polish text yet, and the saved copy's text when it left the library.
 */
export function exerciseText(exercise: Exercise, language: Language): ExerciseText {
  const current = byId.get(exercise.id)
  if (!current) return { name: exercise.name, steps: exercise.steps }
  return otherLanguages[language]?.[current.id] ?? { name: current.name, steps: current.steps }
}
