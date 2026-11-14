// Our tags, keyed by ExerciseDB `exerciseId`, layered over the unmodified
// dataset records in ./exercisedb. The keys of this file are the id list the
// copy script (scripts/copy-exercisedb.ts) copies from the pinned snapshot.
//
// Curation notes:
// - Eligibility checks workout types and Block roles independently, so an
//   Exercise tagged `main` is a main-Block candidate for every workout type it
//   lists. Stretches meant for the main Block are therefore tagged with
//   mobility/stretching only; stretches for every type are cool-down only.
// - Chair or bench is inferred from the Exercise name or steps; the dataset
//   has no tag for it.
// - Difficulty is hand-tagged; the dataset has none.

import { WORKOUT_TYPES, type ExerciseTags } from './types.ts'

const EVERY_TYPE = [...WORKOUT_TYPES]

export const curation: Record<string, ExerciseTags> = {
  // --- Warm-up ---
  uL9CsKm: {
    // ankle circles
    muscleGroups: { primary: ['legs'], secondary: [] },
    equipment: [],
    difficulty: 'beginner',
    workoutTypes: EVERY_TYPE,
    blockRoles: ['warm-up'],
    measure: 'time',
    perSide: true,
  },
  QChZi3x: {
    // squat to overhead reach
    muscleGroups: { primary: ['legs'], secondary: ['glutes', 'shoulders', 'core'] },
    equipment: [],
    difficulty: 'beginner',
    workoutTypes: EVERY_TYPE,
    blockRoles: ['warm-up'],
    measure: 'time',
    perSide: false,
  },
  ealLwvX: {
    // high knee against wall
    muscleGroups: { primary: ['legs'], secondary: ['glutes', 'core'] },
    equipment: [],
    difficulty: 'beginner',
    workoutTypes: ['full body', 'lower body', 'cardio/HIIT'],
    blockRoles: ['warm-up', 'main'],
    measure: 'time',
    perSide: false,
  },
  oLrKqDH: {
    // run (jogging in place)
    muscleGroups: { primary: ['legs'], secondary: [] },
    equipment: [],
    difficulty: 'beginner',
    workoutTypes: ['full body', 'lower body', 'cardio/HIIT'],
    blockRoles: ['warm-up', 'main'],
    measure: 'time',
    perSide: false,
  },
  '1g5bPpA': {
    // jack jump (male)
    muscleGroups: { primary: ['legs'], secondary: ['shoulders'] },
    equipment: [],
    difficulty: 'beginner',
    workoutTypes: ['full body', 'cardio/HIIT'],
    blockRoles: ['warm-up', 'main'],
    measure: 'time',
    perSide: false,
  },
  DFGXwZr: {
    // world greatest stretch
    muscleGroups: { primary: ['legs'], secondary: ['glutes', 'back'] },
    equipment: [],
    difficulty: 'beginner',
    workoutTypes: ['mobility/stretching'],
    blockRoles: ['warm-up', 'main'],
    measure: 'time',
    perSide: true,
  },

  // --- Main: upper body ---
  I4hDWkc: {
    // push-up
    muscleGroups: { primary: ['chest'], secondary: ['arms', 'shoulders', 'core'] },
    equipment: [],
    difficulty: 'intermediate',
    workoutTypes: ['full body', 'upper body'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  ZOuKWir: {
    // kneeling push-up (male)
    muscleGroups: { primary: ['chest'], secondary: ['arms', 'shoulders'] },
    equipment: [],
    difficulty: 'beginner',
    workoutTypes: ['full body', 'upper body'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  LEH9jxP: {
    // push-up (wall)
    muscleGroups: { primary: ['chest'], secondary: ['arms', 'shoulders'] },
    equipment: [],
    difficulty: 'beginner',
    workoutTypes: ['full body', 'upper body'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  B1EVP9F: {
    // incline push-up
    muscleGroups: { primary: ['chest'], secondary: ['arms', 'shoulders'] },
    equipment: ['chair or bench'],
    difficulty: 'beginner',
    workoutTypes: ['full body', 'upper body'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  soIB2rj: {
    // diamond push-up
    muscleGroups: { primary: ['arms'], secondary: ['chest', 'shoulders'] },
    equipment: [],
    difficulty: 'advanced',
    workoutTypes: ['full body', 'upper body'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  RrLske5: {
    // bench dip (knees bent)
    muscleGroups: { primary: ['arms'], secondary: ['chest', 'shoulders'] },
    equipment: ['chair or bench'],
    difficulty: 'beginner',
    workoutTypes: ['upper body'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  v3vLFW0: {
    // close-grip push-up (on knees)
    muscleGroups: { primary: ['arms'], secondary: ['chest', 'shoulders'] },
    equipment: [],
    difficulty: 'beginner',
    workoutTypes: ['full body', 'upper body'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  wbUYILZ: {
    // elbow lift - reverse push-up
    muscleGroups: { primary: ['back'], secondary: ['arms', 'shoulders'] },
    equipment: [],
    difficulty: 'beginner',
    workoutTypes: ['full body', 'upper body'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  BJ0Hz5L: {
    // dumbbell bent over row
    muscleGroups: { primary: ['back'], secondary: ['arms'] },
    equipment: ['dumbbells'],
    difficulty: 'intermediate',
    workoutTypes: ['full body', 'upper body'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  peAeMR3: {
    // band shoulder press
    muscleGroups: { primary: ['shoulders'], secondary: ['arms', 'back'] },
    equipment: ['resistance band'],
    difficulty: 'beginner',
    workoutTypes: ['full body', 'upper body'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },

  // --- Main: lower body ---
  u0cNiij: {
    // low glute bridge on floor
    muscleGroups: { primary: ['glutes'], secondary: ['legs', 'core'] },
    equipment: [],
    difficulty: 'beginner',
    workoutTypes: ['full body', 'lower body'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  kMzUs9Y: {
    // forward lunge (male), alternating legs
    muscleGroups: { primary: ['glutes'], secondary: ['legs'] },
    equipment: [],
    difficulty: 'beginner',
    workoutTypes: ['full body', 'lower body'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  bJYHBIN: {
    // bodyweight standing calf raise
    muscleGroups: { primary: ['legs'], secondary: [] },
    equipment: [],
    difficulty: 'beginner',
    workoutTypes: ['lower body'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  yn8yg1r: {
    // dumbbell goblet squat
    muscleGroups: { primary: ['legs'], secondary: ['glutes'] },
    equipment: ['dumbbells'],
    difficulty: 'intermediate',
    workoutTypes: ['full body', 'lower body'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  UHJlbu3: {
    // kettlebell swing
    muscleGroups: { primary: ['glutes'], secondary: ['legs', 'core'] },
    equipment: ['kettlebell'],
    difficulty: 'intermediate',
    workoutTypes: ['full body', 'lower body', 'cardio/HIIT'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },

  // --- Main: core ---
  iny3m5y: {
    // dead bug
    muscleGroups: { primary: ['core'], secondary: [] },
    equipment: [],
    difficulty: 'beginner',
    workoutTypes: ['full body', 'core'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  TFqbd8t: {
    // crunch floor
    muscleGroups: { primary: ['core'], secondary: [] },
    equipment: [],
    difficulty: 'beginner',
    workoutTypes: ['core'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  nCU1Ekp: {
    // reverse crunch
    muscleGroups: { primary: ['core'], secondary: [] },
    equipment: [],
    difficulty: 'beginner',
    workoutTypes: ['core'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  XVDdcoj: {
    // russian twist
    muscleGroups: { primary: ['core'], secondary: [] },
    equipment: [],
    difficulty: 'intermediate',
    workoutTypes: ['core'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },

  // --- Main: cardio/HIIT ---
  RJgzwny: {
    // mountain climber
    muscleGroups: { primary: ['core'], secondary: ['shoulders', 'legs'] },
    equipment: [],
    difficulty: 'intermediate',
    workoutTypes: ['full body', 'core', 'cardio/HIIT'],
    blockRoles: ['main'],
    measure: 'time',
    perSide: false,
  },
  zfNHMN9: {
    // skater hops
    muscleGroups: { primary: ['legs'], secondary: ['glutes'] },
    equipment: [],
    difficulty: 'intermediate',
    workoutTypes: ['lower body', 'cardio/HIIT'],
    blockRoles: ['main'],
    measure: 'time',
    perSide: false,
  },
  dK9394r: {
    // burpee
    muscleGroups: { primary: ['legs'], secondary: ['chest', 'shoulders', 'core'] },
    equipment: [],
    difficulty: 'advanced',
    workoutTypes: ['full body', 'cardio/HIIT'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },

  // --- Main and cool-down: mobility/stretching only ---
  BWnJR72: {
    // lying (side) quads stretch
    muscleGroups: { primary: ['legs'], secondary: [] },
    equipment: [],
    difficulty: 'beginner',
    workoutTypes: ['mobility/stretching'],
    blockRoles: ['main', 'cool-down'],
    measure: 'time',
    perSide: true,
  },
  QY39eBr: {
    // seated piriformis stretch
    muscleGroups: { primary: ['glutes'], secondary: ['back'] },
    equipment: [],
    difficulty: 'beginner',
    workoutTypes: ['mobility/stretching'],
    blockRoles: ['main', 'cool-down'],
    measure: 'time',
    perSide: true,
  },

  // --- Cool-down for every workout type ---
  '99rWm7w': {
    // hamstring stretch
    muscleGroups: { primary: ['legs'], secondary: ['glutes'] },
    equipment: [],
    difficulty: 'beginner',
    workoutTypes: EVERY_TYPE,
    blockRoles: ['cool-down'],
    measure: 'time',
    perSide: true,
  },
  DeDThfG: {
    // seated glute stretch
    muscleGroups: { primary: ['glutes'], secondary: ['legs'] },
    equipment: [],
    difficulty: 'beginner',
    workoutTypes: EVERY_TYPE,
    blockRoles: ['cool-down'],
    measure: 'time',
    perSide: true,
  },
  Uto7l43: {
    // chest and front of shoulder stretch
    muscleGroups: { primary: ['chest'], secondary: ['shoulders'] },
    equipment: [],
    difficulty: 'beginner',
    workoutTypes: EVERY_TYPE,
    blockRoles: ['cool-down'],
    measure: 'time',
    perSide: false,
  },
  '1jXLYEw': {
    // standing lateral stretch
    muscleGroups: { primary: ['back'], secondary: ['shoulders', 'core'] },
    equipment: [],
    difficulty: 'beginner',
    workoutTypes: EVERY_TYPE,
    blockRoles: ['cool-down'],
    measure: 'time',
    perSide: true,
  },
}
