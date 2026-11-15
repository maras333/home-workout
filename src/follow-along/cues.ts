import type { Dictionary, Language } from '@/language'
import { dictionaries } from '@/language/dictionaries'
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
function spokenTarget({ target, perSide }: WorkoutSet, { counts, speech }: Dictionary): string {
  const amount =
    target.measure === 'reps' ? counts.reps(target.reps) : speech.seconds(target.seconds)
  return perSide ? counts.perSide(amount) : amount
}

/** The cue for the moment Follow-along arrives at `position`, in `language`. */
export function cueAt(
  steps: readonly Step[],
  { index, elapsed }: Position,
  language: Language,
): Cue {
  const text = dictionaries[language]
  const { speech, followAlong } = text
  const step = steps[index]
  if (!step) return { beep: 'finish', speech: speech.complete }

  if (elapsed === 0) {
    if (step.kind === 'work') return { beep: 'start', speech: speech.go }
    const next = nextWork(steps, index)
    if (step.kind === 'rest' && next) {
      const { set } = next
      return {
        beep: null,
        speech: speech.next(
          followAlong.rests[step.label],
          exerciseText(set.exercise, language).name,
          spokenTarget(set, text),
        ),
      }
    }
    return { beep: null, speech: null }
  }

  if (step.kind === 'work' && elapsed === switchSecond(step)) {
    return { beep: 'switch', speech: speech.switchSides }
  }
  const remaining = step.seconds - elapsed
  return { beep: remaining <= COUNTDOWN_SECONDS ? 'countdown' : null, speech: null }
}
