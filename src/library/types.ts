export const MUSCLE_GROUPS = [
  'chest',
  'back',
  'shoulders',
  'arms',
  'core',
  'glutes',
  'legs',
] as const
export type MuscleGroup = (typeof MUSCLE_GROUPS)[number]

/** No Equipment means bodyweight. */
export const EQUIPMENT = ['dumbbells', 'resistance band', 'kettlebell', 'chair or bench'] as const
export type Equipment = (typeof EQUIPMENT)[number]

export const DIFFICULTIES = ['beginner', 'intermediate', 'advanced'] as const
export type Difficulty = (typeof DIFFICULTIES)[number]

export const WORKOUT_TYPES = [
  'full body',
  'upper body',
  'lower body',
  'core',
  'cardio/HIIT',
  'mobility/stretching',
] as const
export type WorkoutType = (typeof WORKOUT_TYPES)[number]

export const BLOCK_ROLES = ['warm-up', 'main', 'cool-down'] as const
export type BlockRole = (typeof BLOCK_ROLES)[number]

export const MEASURES = ['reps', 'time'] as const
export type Measure = (typeof MEASURES)[number]

export type MuscleGroups = {
  primary: MuscleGroup[]
  secondary: MuscleGroup[]
}

/** Our curation, layered over an unmodified ExerciseDB record. */
export type ExerciseTags = {
  muscleGroups: MuscleGroups
  equipment: Equipment[]
  difficulty: Difficulty
  workoutTypes: WorkoutType[]
  blockRoles: BlockRole[]
  measure: Measure
  perSide: boolean
}

export type Exercise = ExerciseTags & {
  /** The dataset's `exerciseId`. */
  id: string
  name: string
  steps: string[]
  /** "Trains: …" text derived from the Muscle groups. */
  trains: string
  /** Static file path of the Exercise's GIF. */
  gifUrl: string
}
