import { curation } from './curation'
import records from './exercisedb/exercises.json'
import type { Exercise, ExerciseTags } from './types'

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
