import type { Difficulty, Equipment, WorkoutType } from '@/library'
import type { MainBlock, WorkoutRequest, WorkoutSet } from './types'

function capitalise(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export const workoutTypeLabel = (type: WorkoutType) => capitalise(type)
export const difficultyLabel = (difficulty: Difficulty) => capitalise(difficulty)
export const equipmentLabel = (item: Equipment) => capitalise(item)

export const DIFFICULTY_HINTS: Record<Difficulty, string> = {
  beginner: 'New to training, or coming back after a break.',
  intermediate: 'You train now and then and know the basic moves.',
  advanced: 'You train regularly and want to be pushed.',
}

/** e.g. "Full body · 30 min · Intermediate · Dumbbells, Kettlebell" */
export function requestSummary(request: WorkoutRequest): string {
  const equipment =
    request.equipment.length > 0 ? request.equipment.map(equipmentLabel).join(', ') : 'Bodyweight'
  return [
    workoutTypeLabel(request.workoutType),
    `${request.minutes} min`,
    difficultyLabel(request.difficulty),
    equipment,
  ].join(' · ')
}

/** e.g. "12 reps", "40 s per side" */
export function targetText({ target, perSide }: WorkoutSet): string {
  const amount = target.measure === 'reps' ? `${target.reps} reps` : `${target.seconds} s`
  return perSide ? `${amount} per side` : amount
}

/** e.g. "5 Exercises × 4 Rounds (last Round: 2 Exercises)" */
export function roundsText({ sets, rounds, lastRoundSets }: MainBlock): string {
  const plural = (count: number, word: string) => `${count} ${word}${count === 1 ? '' : 's'}`
  const partial =
    lastRoundSets < sets.length ? ` (last Round: ${plural(lastRoundSets, 'Exercise')})` : ''
  return `${plural(sets.length, 'Exercise')} × ${plural(rounds, 'Round')}${partial}`
}

/** e.g. "29 min" */
export function durationText(seconds: number): string {
  return `${Math.round(seconds / 60)} min`
}
