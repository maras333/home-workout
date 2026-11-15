import type { Language } from '@/language'
import { exerciseText } from '@/library'
import type { WorkoutSet } from '@/workout'
import { nextWork, switchSecond, type Step } from '@/workout/follow-along'
import type { Position } from './player'

export type Beep = 'countdown' | 'start' | 'switch' | 'finish'

/** What Follow-along plays on reaching a position: a beep, words, both or neither. */
export type Cue = { beep: Beep | null; speech: string | null }

/** The countdown beeps on each of the last this many seconds of a Set or rest. */
const COUNTDOWN_SECONDS = 3

/** e.g. "12 reps", "40 seconds per side": the target as it should be read aloud. */
function spokenTarget({ target, perSide }: WorkoutSet): string {
  const amount = target.measure === 'reps' ? `${target.reps} reps` : `${target.seconds} seconds`
  return perSide ? `${amount} per side` : amount
}

/** The cue for the moment Follow-along arrives at `position`. */
export function cueAt(
  steps: readonly Step[],
  { index, elapsed }: Position,
  language: Language,
): Cue {
  const step = steps[index]
  if (!step) return { beep: 'finish', speech: 'Workout complete.' }

  if (elapsed === 0) {
    if (step.kind === 'work') return { beep: 'start', speech: 'Go.' }
    const next = nextWork(steps, index)
    if (step.kind === 'rest' && next) {
      const { set } = next
      return {
        beep: null,
        speech: `${step.label}. Next: ${exerciseText(set.exercise, language).name}, ${spokenTarget(set)}.`,
      }
    }
    return { beep: null, speech: null }
  }

  if (step.kind === 'work' && elapsed === switchSecond(step)) {
    return { beep: 'switch', speech: 'Switch sides.' }
  }
  const remaining = step.seconds - elapsed
  return { beep: remaining <= COUNTDOWN_SECONDS ? 'countdown' : null, speech: null }
}
