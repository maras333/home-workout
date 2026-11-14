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
// - Muscle groups map the dataset's muscles: abs, obliques, lower back and
//   spine are core; lats, upper back and traps are back; abductors and
//   adductors are legs. Primary follows the dataset's target muscle unless
//   that is clearly wrong (e.g. flutter kicks, pike-to-cobra push-up).
// - Rows "with towel" count as bodyweight, and the monster walk needs a band
//   although the dataset lists it as body weight.

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
  '2zNKRUB': {
    // wrist circles
    muscleGroups: { primary: ['arms'], secondary: [] },
    equipment: [],
    difficulty: 'beginner',
    workoutTypes: EVERY_TYPE,
    blockRoles: ['warm-up'],
    measure: 'time',
    perSide: false,
  },
  X7jbxra: {
    // circles knee stretch
    muscleGroups: { primary: ['legs'], secondary: [] },
    equipment: [],
    difficulty: 'beginner',
    workoutTypes: EVERY_TYPE,
    blockRoles: ['warm-up'],
    measure: 'time',
    perSide: false,
  },
  tnaj0mT: {
    // swing 360
    muscleGroups: { primary: ['shoulders'], secondary: ['core'] },
    equipment: [],
    difficulty: 'beginner',
    workoutTypes: EVERY_TYPE,
    blockRoles: ['warm-up'],
    measure: 'time',
    perSide: false,
  },
  '3uj0Ozg': {
    // dynamic chest stretch (male)
    muscleGroups: { primary: ['chest'], secondary: ['shoulders'] },
    equipment: [],
    difficulty: 'beginner',
    workoutTypes: EVERY_TYPE,
    blockRoles: ['warm-up'],
    measure: 'time',
    perSide: false,
  },
  BbfB8Gb: {
    // basic toe touch (male)
    muscleGroups: { primary: ['legs'], secondary: ['glutes', 'back'] },
    equipment: [],
    difficulty: 'beginner',
    workoutTypes: EVERY_TYPE,
    blockRoles: ['warm-up'],
    measure: 'time',
    perSide: false,
  },
  ErqK3UL: {
    // posterior step to overhead reach
    muscleGroups: { primary: ['legs'], secondary: ['glutes', 'shoulders', 'core'] },
    equipment: [],
    difficulty: 'beginner',
    workoutTypes: EVERY_TYPE,
    blockRoles: ['warm-up'],
    measure: 'time',
    perSide: false,
  },
  ZgsNQ6d: {
    // inchworm
    muscleGroups: { primary: ['core'], secondary: ['shoulders', 'legs'] },
    equipment: [],
    difficulty: 'beginner',
    workoutTypes: ['full body', 'upper body', 'core', 'cardio/HIIT', 'mobility/stretching'],
    blockRoles: ['warm-up'],
    measure: 'time',
    perSide: false,
  },

  // --- Warm-up and main ---
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
    // run
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
  mweqJin: {
    // quick feet v. 2
    muscleGroups: { primary: ['legs'], secondary: [] },
    equipment: [],
    difficulty: 'beginner',
    workoutTypes: ['full body', 'lower body', 'cardio/HIIT'],
    blockRoles: ['warm-up', 'main'],
    measure: 'time',
    perSide: false,
  },
  ia6kIIl: {
    // half knee bends (male)
    muscleGroups: { primary: ['legs'], secondary: ['glutes'] },
    equipment: [],
    difficulty: 'beginner',
    workoutTypes: ['full body', 'lower body', 'cardio/HIIT'],
    blockRoles: ['warm-up', 'main'],
    measure: 'reps',
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
  '6sYyrRX': {
    // bent knee lying twist (male)
    muscleGroups: { primary: ['core'], secondary: ['glutes'] },
    equipment: [],
    difficulty: 'beginner',
    workoutTypes: ['core', 'mobility/stretching'],
    blockRoles: ['warm-up', 'main'],
    measure: 'reps',
    perSide: false,
  },
  znP9SIh: {
    // hug keens to chest
    muscleGroups: { primary: ['glutes'], secondary: ['legs', 'back'] },
    equipment: [],
    difficulty: 'beginner',
    workoutTypes: ['mobility/stretching'],
    blockRoles: ['warm-up', 'main'],
    measure: 'time',
    perSide: false,
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
  jV65tKx: {
    // scapula push-up
    muscleGroups: { primary: ['chest'], secondary: ['shoulders', 'arms'] },
    equipment: [],
    difficulty: 'beginner',
    workoutTypes: ['full body', 'upper body'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  JmMVpR3: {
    // wide hand push up
    muscleGroups: { primary: ['chest'], secondary: ['arms', 'shoulders'] },
    equipment: [],
    difficulty: 'intermediate',
    workoutTypes: ['full body', 'upper body'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  epOSYUZ: {
    // modified hindu push-up (male)
    muscleGroups: { primary: ['chest'], secondary: ['shoulders', 'arms', 'core'] },
    equipment: [],
    difficulty: 'intermediate',
    workoutTypes: ['full body', 'upper body'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  i5cEhka: {
    // decline push-up
    muscleGroups: { primary: ['chest'], secondary: ['shoulders', 'arms'] },
    equipment: ['chair or bench'],
    difficulty: 'advanced',
    workoutTypes: ['full body', 'upper body'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  '4GqRrAk': {
    // superman push-up
    muscleGroups: { primary: ['chest'], secondary: ['core', 'shoulders'] },
    equipment: [],
    difficulty: 'advanced',
    workoutTypes: ['full body', 'upper body'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  qEse6fe: {
    // shoulder tap push-up
    muscleGroups: { primary: ['chest'], secondary: ['arms', 'core'] },
    equipment: [],
    difficulty: 'advanced',
    workoutTypes: ['full body', 'upper body'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  A9qxk2F: {
    // archer push up
    muscleGroups: { primary: ['chest'], secondary: ['arms', 'shoulders', 'core'] },
    equipment: [],
    difficulty: 'advanced',
    workoutTypes: ['upper body'],
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
  x6KpKpq: {
    // close-grip push-up
    muscleGroups: { primary: ['arms'], secondary: ['chest', 'shoulders'] },
    equipment: [],
    difficulty: 'intermediate',
    workoutTypes: ['full body', 'upper body'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  '7aVz15j': {
    // triceps dips floor
    muscleGroups: { primary: ['arms'], secondary: ['chest', 'shoulders'] },
    equipment: ['chair or bench'],
    difficulty: 'intermediate',
    workoutTypes: ['upper body'],
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
  uTv34oq: {
    // bodyweight standing row (with towel)
    muscleGroups: { primary: ['back'], secondary: ['arms', 'shoulders'] },
    equipment: [],
    difficulty: 'beginner',
    workoutTypes: ['full body', 'upper body'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  BReCuOn: {
    // bodyweight squatting row (with towel)
    muscleGroups: { primary: ['back'], secondary: ['legs', 'arms'] },
    equipment: [],
    difficulty: 'beginner',
    workoutTypes: ['full body', 'upper body'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  XPUDTt7: {
    // pike-to-cobra push-up
    muscleGroups: { primary: ['shoulders'], secondary: ['arms', 'core'] },
    equipment: [],
    difficulty: 'advanced',
    workoutTypes: ['full body', 'upper body'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  h1ezqSu: {
    // kneeling plank tap shoulder (male)
    muscleGroups: { primary: ['core'], secondary: ['shoulders', 'arms'] },
    equipment: [],
    difficulty: 'beginner',
    workoutTypes: ['full body', 'upper body', 'core'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  yRpV5TC: {
    // shoulder tap
    muscleGroups: { primary: ['core'], secondary: ['shoulders', 'arms'] },
    equipment: [],
    difficulty: 'intermediate',
    workoutTypes: ['full body', 'upper body', 'core'],
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
  DsgkuIt: {
    // dumbbell lateral raise
    muscleGroups: { primary: ['shoulders'], secondary: [] },
    equipment: ['dumbbells'],
    difficulty: 'beginner',
    workoutTypes: ['full body', 'upper body'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  A6wtbuL: {
    // dumbbell standing overhead press
    muscleGroups: { primary: ['shoulders'], secondary: ['arms'] },
    equipment: ['dumbbells'],
    difficulty: 'intermediate',
    workoutTypes: ['full body', 'upper body'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  FS63wTN: {
    // dumbbell push press
    muscleGroups: { primary: ['shoulders'], secondary: ['arms', 'legs'] },
    equipment: ['dumbbells'],
    difficulty: 'intermediate',
    workoutTypes: ['full body', 'upper body'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  EAs3xL9: {
    // dumbbell reverse fly
    muscleGroups: { primary: ['shoulders'], secondary: ['back'] },
    equipment: ['dumbbells'],
    difficulty: 'intermediate',
    workoutTypes: ['upper body'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  SpYC0Kp: {
    // dumbbell bench press
    muscleGroups: { primary: ['chest'], secondary: ['arms', 'shoulders'] },
    equipment: ['dumbbells', 'chair or bench'],
    difficulty: 'intermediate',
    workoutTypes: ['full body', 'upper body'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  NbVPDMW: {
    // dumbbell biceps curl
    muscleGroups: { primary: ['arms'], secondary: [] },
    equipment: ['dumbbells'],
    difficulty: 'beginner',
    workoutTypes: ['upper body'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  slDvUAU: {
    // dumbbell hammer curl
    muscleGroups: { primary: ['arms'], secondary: [] },
    equipment: ['dumbbells'],
    difficulty: 'beginner',
    workoutTypes: ['upper body'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  W6PxUkg: {
    // dumbbell kickback
    muscleGroups: { primary: ['arms'], secondary: ['shoulders'] },
    equipment: ['dumbbells'],
    difficulty: 'intermediate',
    workoutTypes: ['upper body'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  PdmaD0N: {
    // dumbbell standing triceps extension
    muscleGroups: { primary: ['arms'], secondary: ['shoulders'] },
    equipment: ['dumbbells'],
    difficulty: 'intermediate',
    workoutTypes: ['upper body'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: true,
  },
  '3omWx6P': {
    // band alternating biceps curl
    muscleGroups: { primary: ['arms'], secondary: [] },
    equipment: ['resistance band'],
    difficulty: 'beginner',
    workoutTypes: ['upper body'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  aHDy5O5: {
    // band y-raise
    muscleGroups: { primary: ['shoulders'], secondary: ['back'] },
    equipment: ['resistance band'],
    difficulty: 'beginner',
    workoutTypes: ['upper body'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  g9AsZ8P: {
    // kettlebell one arm row
    muscleGroups: { primary: ['back'], secondary: ['arms'] },
    equipment: ['kettlebell'],
    difficulty: 'intermediate',
    workoutTypes: ['full body', 'upper body'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: true,
  },
  rg59QCH: {
    // kettlebell one arm floor press
    muscleGroups: { primary: ['chest'], secondary: ['arms', 'shoulders'] },
    equipment: ['kettlebell'],
    difficulty: 'intermediate',
    workoutTypes: ['upper body'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: true,
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
    // forward lunge (male)
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
  '6YUfHPL': {
    // quads
    muscleGroups: { primary: ['legs'], secondary: ['glutes'] },
    equipment: [],
    difficulty: 'beginner',
    workoutTypes: ['full body', 'lower body'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  '7WaDzyL': {
    // side hip abduction
    muscleGroups: { primary: ['legs'], secondary: ['glutes'] },
    equipment: [],
    difficulty: 'beginner',
    workoutTypes: ['lower body'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  mQ1tBXn: {
    // straight leg outer hip abductor
    muscleGroups: { primary: ['legs'], secondary: ['glutes'] },
    equipment: [],
    difficulty: 'beginner',
    workoutTypes: ['lower body'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: true,
  },
  C5jncD2: {
    // standing single leg curl
    muscleGroups: { primary: ['legs'], secondary: ['glutes'] },
    equipment: [],
    difficulty: 'beginner',
    workoutTypes: ['lower body'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: true,
  },
  '9E25EOx': {
    // split squats
    muscleGroups: { primary: ['legs'], secondary: ['glutes'] },
    equipment: [],
    difficulty: 'intermediate',
    workoutTypes: ['full body', 'lower body'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: true,
  },
  gUjqdei: {
    // curtsey squat
    muscleGroups: { primary: ['glutes'], secondary: ['legs'] },
    equipment: [],
    difficulty: 'intermediate',
    workoutTypes: ['full body', 'lower body'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  GibBPPg: {
    // glute bridge march
    muscleGroups: { primary: ['glutes'], secondary: ['legs', 'core'] },
    equipment: [],
    difficulty: 'intermediate',
    workoutTypes: ['full body', 'lower body'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  rmEukuS: {
    // single leg bridge with outstretched leg
    muscleGroups: { primary: ['glutes'], secondary: ['legs', 'core'] },
    equipment: [],
    difficulty: 'intermediate',
    workoutTypes: ['full body', 'lower body'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: true,
  },
  '0jp9Rlz': {
    // one leg floor calf raise
    muscleGroups: { primary: ['legs'], secondary: [] },
    equipment: [],
    difficulty: 'intermediate',
    workoutTypes: ['lower body'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: true,
  },
  sVQCCeG: {
    // march sit (wall)
    muscleGroups: { primary: ['legs'], secondary: ['glutes', 'core'] },
    equipment: [],
    difficulty: 'intermediate',
    workoutTypes: ['lower body'],
    blockRoles: ['main'],
    measure: 'time',
    perSide: false,
  },
  LIlE5Tn: {
    // jump squat
    muscleGroups: { primary: ['glutes'], secondary: ['legs'] },
    equipment: [],
    difficulty: 'intermediate',
    workoutTypes: ['full body', 'lower body', 'cardio/HIIT'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  uZKq7lo: {
    // forward jump
    muscleGroups: { primary: ['legs'], secondary: ['glutes'] },
    equipment: [],
    difficulty: 'intermediate',
    workoutTypes: ['lower body', 'cardio/HIIT'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  PM1PZjg: {
    // lunge with jump
    muscleGroups: { primary: ['glutes'], secondary: ['legs'] },
    equipment: [],
    difficulty: 'advanced',
    workoutTypes: ['full body', 'lower body', 'cardio/HIIT'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  C31LMnP: {
    // one leg squat
    muscleGroups: { primary: ['glutes'], secondary: ['legs', 'core'] },
    equipment: [],
    difficulty: 'advanced',
    workoutTypes: ['lower body'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: true,
  },
  xdYPUtE: {
    // sissy squat
    muscleGroups: { primary: ['legs'], secondary: ['glutes'] },
    equipment: [],
    difficulty: 'advanced',
    workoutTypes: ['lower body'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  WL4EmxJ: {
    // side bridge hip abduction
    muscleGroups: { primary: ['legs'], secondary: ['glutes', 'core'] },
    equipment: [],
    difficulty: 'advanced',
    workoutTypes: ['full body', 'lower body'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: true,
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
  rR0LJzx: {
    // dumbbell romanian deadlift
    muscleGroups: { primary: ['glutes'], secondary: ['legs', 'core'] },
    equipment: ['dumbbells'],
    difficulty: 'intermediate',
    workoutTypes: ['full body', 'lower body'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  SSsBDwB: {
    // dumbbell rear lunge
    muscleGroups: { primary: ['glutes'], secondary: ['legs'] },
    equipment: ['dumbbells'],
    difficulty: 'intermediate',
    workoutTypes: ['full body', 'lower body'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  aXtJhlg: {
    // dumbbell step-up
    muscleGroups: { primary: ['glutes'], secondary: ['legs'] },
    equipment: ['dumbbells', 'chair or bench'],
    difficulty: 'intermediate',
    workoutTypes: ['lower body'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: true,
  },
  qx4fgX7: {
    // dumbbell single leg split squat
    muscleGroups: { primary: ['legs'], secondary: ['glutes'] },
    equipment: ['dumbbells', 'chair or bench'],
    difficulty: 'advanced',
    workoutTypes: ['lower body'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: true,
  },
  TUZLh71: {
    // band squat
    muscleGroups: { primary: ['glutes'], secondary: ['legs'] },
    equipment: ['resistance band'],
    difficulty: 'beginner',
    workoutTypes: ['full body', 'lower body'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  E4R8Hz1: {
    // band hip lift
    muscleGroups: { primary: ['glutes'], secondary: ['legs'] },
    equipment: ['resistance band'],
    difficulty: 'beginner',
    workoutTypes: ['lower body'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  kuMiR2T: {
    // band stiff leg deadlift
    muscleGroups: { primary: ['glutes'], secondary: ['legs', 'core'] },
    equipment: ['resistance band'],
    difficulty: 'beginner',
    workoutTypes: ['lower body'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  O95afRA: {
    // monster walk
    muscleGroups: { primary: ['glutes'], secondary: ['legs'] },
    equipment: ['resistance band'],
    difficulty: 'beginner',
    workoutTypes: ['lower body'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  '0xDpB4L': {
    // resistance band seated hip abduction
    muscleGroups: { primary: ['legs'], secondary: ['glutes'] },
    equipment: ['resistance band', 'chair or bench'],
    difficulty: 'beginner',
    workoutTypes: ['lower body'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  ZA8b5hc: {
    // kettlebell goblet squat
    muscleGroups: { primary: ['legs'], secondary: ['glutes'] },
    equipment: ['kettlebell'],
    difficulty: 'intermediate',
    workoutTypes: ['full body', 'lower body'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  WKMQzCD: {
    // kettlebell lunge pass through
    muscleGroups: { primary: ['glutes'], secondary: ['legs', 'core'] },
    equipment: ['kettlebell'],
    difficulty: 'advanced',
    workoutTypes: ['full body', 'lower body'],
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
  NKJ8o6x: {
    // pelvic tilt
    muscleGroups: { primary: ['core'], secondary: [] },
    equipment: [],
    difficulty: 'beginner',
    workoutTypes: ['core'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  qaZVsGk: {
    // alternate heel touchers
    muscleGroups: { primary: ['core'], secondary: [] },
    equipment: [],
    difficulty: 'beginner',
    workoutTypes: ['core'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  rbu5UUb: {
    // cross body crunch
    muscleGroups: { primary: ['core'], secondary: [] },
    equipment: [],
    difficulty: 'beginner',
    workoutTypes: ['core'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  '2jl9K55': {
    // spine twist
    muscleGroups: { primary: ['core'], secondary: [] },
    equipment: [],
    difficulty: 'beginner',
    workoutTypes: ['core'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  ANbbry2: {
    // lower back curl
    muscleGroups: { primary: ['core'], secondary: ['glutes'] },
    equipment: [],
    difficulty: 'beginner',
    workoutTypes: ['full body', 'core'],
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
  '1ZFqTDN': {
    // air bike
    muscleGroups: { primary: ['core'], secondary: [] },
    equipment: [],
    difficulty: 'intermediate',
    workoutTypes: ['full body', 'core'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  AQIhRjM: {
    // lying elbow to knee
    muscleGroups: { primary: ['core'], secondary: [] },
    equipment: [],
    difficulty: 'intermediate',
    workoutTypes: ['core'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  '9IxJdtC': {
    // lying leg-hip raise
    muscleGroups: { primary: ['core'], secondary: [] },
    equipment: [],
    difficulty: 'intermediate',
    workoutTypes: ['core'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  BMMolZ3: {
    // tuck crunch
    muscleGroups: { primary: ['core'], secondary: [] },
    equipment: [],
    difficulty: 'intermediate',
    workoutTypes: ['core'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  UVo2Qs2: {
    // flutter kicks
    muscleGroups: { primary: ['core'], secondary: ['legs'] },
    equipment: [],
    difficulty: 'intermediate',
    workoutTypes: ['core'],
    blockRoles: ['main'],
    measure: 'time',
    perSide: false,
  },
  '5VXmnV5': {
    // bodyweight incline side plank
    muscleGroups: { primary: ['core'], secondary: ['shoulders'] },
    equipment: [],
    difficulty: 'intermediate',
    workoutTypes: ['full body', 'core'],
    blockRoles: ['main'],
    measure: 'time',
    perSide: true,
  },
  CosupLu: {
    // front plank with twist
    muscleGroups: { primary: ['core'], secondary: ['shoulders'] },
    equipment: [],
    difficulty: 'intermediate',
    workoutTypes: ['full body', 'core'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  hCjGsRQ: {
    // power point plank
    muscleGroups: { primary: ['core'], secondary: ['shoulders', 'arms', 'glutes'] },
    equipment: [],
    difficulty: 'intermediate',
    workoutTypes: ['full body', 'core'],
    blockRoles: ['main'],
    measure: 'time',
    perSide: false,
  },
  ZuXu4Eq: {
    // v-sit on floor
    muscleGroups: { primary: ['core'], secondary: [] },
    equipment: [],
    difficulty: 'advanced',
    workoutTypes: ['core'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  tFToB7l: {
    // reverse plank with leg lift
    muscleGroups: { primary: ['core'], secondary: ['glutes', 'legs', 'shoulders'] },
    equipment: [],
    difficulty: 'advanced',
    workoutTypes: ['full body', 'core'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  UpWmA5E: {
    // l-sit on floor
    muscleGroups: { primary: ['core'], secondary: ['arms'] },
    equipment: [],
    difficulty: 'advanced',
    workoutTypes: ['core'],
    blockRoles: ['main'],
    measure: 'time',
    perSide: false,
  },
  KhHJ338: {
    // push-up to side plank
    muscleGroups: { primary: ['core'], secondary: ['chest', 'shoulders', 'arms'] },
    equipment: [],
    difficulty: 'advanced',
    workoutTypes: ['full body', 'core'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  IpONWYv: {
    // dumbbell side bend
    muscleGroups: { primary: ['core'], secondary: [] },
    equipment: ['dumbbells'],
    difficulty: 'beginner',
    workoutTypes: ['core'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: true,
  },
  L4ay0PW: {
    // kettlebell figure 8
    muscleGroups: { primary: ['core'], secondary: ['shoulders', 'arms'] },
    equipment: ['kettlebell'],
    difficulty: 'intermediate',
    workoutTypes: ['full body', 'core'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  '9Tkqa9O': {
    // kettlebell windmill
    muscleGroups: { primary: ['core'], secondary: ['shoulders'] },
    equipment: ['kettlebell'],
    difficulty: 'advanced',
    workoutTypes: ['core'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: true,
  },
  Ha7SZ3y: {
    // kettlebell turkish get up (squat style)
    muscleGroups: { primary: ['core'], secondary: ['glutes', 'legs', 'shoulders'] },
    equipment: ['kettlebell'],
    difficulty: 'advanced',
    workoutTypes: ['full body', 'core'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: true,
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
  fNGumX0: {
    // back and forth step
    muscleGroups: { primary: ['legs'], secondary: ['glutes'] },
    equipment: [],
    difficulty: 'beginner',
    workoutTypes: ['full body', 'cardio/HIIT'],
    blockRoles: ['main'],
    measure: 'time',
    perSide: false,
  },
  hoXt6wv: {
    // left hook. boxing
    muscleGroups: { primary: ['shoulders'], secondary: ['arms', 'core'] },
    equipment: [],
    difficulty: 'beginner',
    workoutTypes: ['cardio/HIIT'],
    blockRoles: ['main'],
    measure: 'time',
    perSide: true,
  },
  HtfCpfi: {
    // star jump (male)
    muscleGroups: { primary: ['legs'], secondary: ['shoulders'] },
    equipment: [],
    difficulty: 'intermediate',
    workoutTypes: ['full body', 'cardio/HIIT'],
    blockRoles: ['main'],
    measure: 'time',
    perSide: false,
  },
  Eh2v5Iu: {
    // scissor jumps (male)
    muscleGroups: { primary: ['legs'], secondary: [] },
    equipment: [],
    difficulty: 'intermediate',
    workoutTypes: ['cardio/HIIT'],
    blockRoles: ['main'],
    measure: 'time',
    perSide: false,
  },
  J9zIWig: {
    // walking high knees lunge
    muscleGroups: { primary: ['legs'], secondary: ['glutes', 'core'] },
    equipment: [],
    difficulty: 'intermediate',
    workoutTypes: ['lower body', 'cardio/HIIT'],
    blockRoles: ['main'],
    measure: 'time',
    perSide: false,
  },
  '0Yz8WdV': {
    // bear crawl
    muscleGroups: { primary: ['core'], secondary: ['shoulders', 'legs'] },
    equipment: [],
    difficulty: 'intermediate',
    workoutTypes: ['full body', 'core', 'cardio/HIIT'],
    blockRoles: ['main'],
    measure: 'time',
    perSide: false,
  },
  mr7pkqP: {
    // jack burpee
    muscleGroups: { primary: ['legs'], secondary: ['chest', 'shoulders', 'core'] },
    equipment: [],
    difficulty: 'advanced',
    workoutTypes: ['full body', 'cardio/HIIT'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  PrQbjvB: {
    // push to run
    muscleGroups: { primary: ['chest'], secondary: ['core', 'legs'] },
    equipment: [],
    difficulty: 'advanced',
    workoutTypes: ['full body', 'cardio/HIIT'],
    blockRoles: ['main'],
    measure: 'time',
    perSide: false,
  },
  '0JtKWum': {
    // dumbbell burpee
    muscleGroups: { primary: ['legs'], secondary: ['chest', 'shoulders', 'core'] },
    equipment: ['dumbbells'],
    difficulty: 'advanced',
    workoutTypes: ['full body', 'cardio/HIIT'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  yWxMvB5: {
    // kettlebell thruster
    muscleGroups: { primary: ['shoulders'], secondary: ['legs', 'glutes', 'core'] },
    equipment: ['kettlebell'],
    difficulty: 'intermediate',
    workoutTypes: ['full body', 'cardio/HIIT'],
    blockRoles: ['main'],
    measure: 'reps',
    perSide: false,
  },
  '8ARQ9Hw': {
    // kettlebell sumo high pull
    muscleGroups: { primary: ['back'], secondary: ['shoulders', 'glutes', 'legs'] },
    equipment: ['kettlebell'],
    difficulty: 'intermediate',
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
  bWlZvXh: {
    // butterfly yoga pose
    muscleGroups: { primary: ['legs'], secondary: ['glutes'] },
    equipment: [],
    difficulty: 'beginner',
    workoutTypes: ['mobility/stretching'],
    blockRoles: ['main', 'cool-down'],
    measure: 'time',
    perSide: false,
  },
  '0mB6wHO': {
    // runners stretch
    muscleGroups: { primary: ['legs'], secondary: [] },
    equipment: [],
    difficulty: 'beginner',
    workoutTypes: ['mobility/stretching'],
    blockRoles: ['main', 'cool-down'],
    measure: 'time',
    perSide: true,
  },
  f38OEuO: {
    // kneeling lat stretch
    muscleGroups: { primary: ['back'], secondary: ['shoulders'] },
    equipment: [],
    difficulty: 'beginner',
    workoutTypes: ['mobility/stretching'],
    blockRoles: ['main', 'cool-down'],
    measure: 'time',
    perSide: true,
  },
  DIVyqrU: {
    // sphinx
    muscleGroups: { primary: ['core'], secondary: ['back'] },
    equipment: [],
    difficulty: 'beginner',
    workoutTypes: ['mobility/stretching'],
    blockRoles: ['main', 'cool-down'],
    measure: 'time',
    perSide: false,
  },
  '2Dk4xQV': {
    // rocking frog stretch
    muscleGroups: { primary: ['glutes'], secondary: ['legs'] },
    equipment: [],
    difficulty: 'intermediate',
    workoutTypes: ['mobility/stretching'],
    blockRoles: ['main'],
    measure: 'time',
    perSide: false,
  },
  pZwUsKB: {
    // iron cross stretch
    muscleGroups: { primary: ['glutes'], secondary: ['core', 'back'] },
    equipment: [],
    difficulty: 'intermediate',
    workoutTypes: ['mobility/stretching'],
    blockRoles: ['main'],
    measure: 'time',
    perSide: false,
  },
  HIgYKAB: {
    // seated wide angle pose sequence
    muscleGroups: { primary: ['legs'], secondary: ['back'] },
    equipment: [],
    difficulty: 'intermediate',
    workoutTypes: ['mobility/stretching'],
    blockRoles: ['main', 'cool-down'],
    measure: 'time',
    perSide: false,
  },
  '01qpYSe': {
    // upward facing dog
    muscleGroups: { primary: ['core'], secondary: ['chest', 'shoulders'] },
    equipment: [],
    difficulty: 'intermediate',
    workoutTypes: ['mobility/stretching'],
    blockRoles: ['main'],
    measure: 'time',
    perSide: false,
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
  m0tCHqc: {
    // calf stretch with hands against wall
    muscleGroups: { primary: ['legs'], secondary: [] },
    equipment: [],
    difficulty: 'beginner',
    workoutTypes: EVERY_TYPE,
    blockRoles: ['cool-down'],
    measure: 'time',
    perSide: true,
  },
  uOV3Itw: {
    // triceps stretch
    muscleGroups: { primary: ['arms'], secondary: ['shoulders'] },
    equipment: [],
    difficulty: 'beginner',
    workoutTypes: EVERY_TYPE,
    blockRoles: ['cool-down'],
    measure: 'time',
    perSide: true,
  },
  xifhB5W: {
    // rear deltoid stretch
    muscleGroups: { primary: ['shoulders'], secondary: ['back'] },
    equipment: [],
    difficulty: 'beginner',
    workoutTypes: EVERY_TYPE,
    blockRoles: ['cool-down'],
    measure: 'time',
    perSide: true,
  },
  x2chWLO: {
    // neck side stretch
    muscleGroups: { primary: ['back'], secondary: [] },
    equipment: [],
    difficulty: 'beginner',
    workoutTypes: EVERY_TYPE,
    blockRoles: ['cool-down'],
    measure: 'time',
    perSide: true,
  },
  GSDioYu: {
    // upper back stretch
    muscleGroups: { primary: ['back'], secondary: ['shoulders'] },
    equipment: [],
    difficulty: 'beginner',
    workoutTypes: EVERY_TYPE,
    blockRoles: ['cool-down'],
    measure: 'time',
    perSide: false,
  },
}
