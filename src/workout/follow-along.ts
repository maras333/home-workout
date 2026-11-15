import type { Workout, WorkoutSet } from './types'
import { CHANGE_OVER_SECONDS, setSeconds } from './workout'

/** The "Get ready" countdown before the first Set; not part of the planned total. */
export const READY_SECONDS = 5

export type BlockName = 'Warm-up' | 'Main' | 'Cool-down'
export const BLOCK_NAMES: readonly BlockName[] = ['Warm-up', 'Main', 'Cool-down']

export type RestLabel = 'Change-over' | 'Rest' | 'Rest between Rounds'

export type WorkStep = {
  kind: 'work'
  block: BlockName
  /** Main-Block Sets only. */
  round?: number
  rounds?: number
  set: WorkoutSet
  /** Planned length: a rep counts 3 s, doubled per side. */
  seconds: number
}

export type RestStep = { kind: 'rest'; label: RestLabel; block: BlockName; seconds: number }
export type ReadyStep = { kind: 'ready'; block: BlockName; seconds: number }

/** One Set or rest of a Workout, in the order Follow-along plays it. */
export type Step = WorkStep | RestStep | ReadyStep

/**
 * The Workout as an ordered list of Steps, timed exactly like `plannedSeconds`
 * plus the leading "Get ready". Rests of 0 s are left out.
 */
export function flatten(workout: Workout): Step[] {
  const { warmUp, main, coolDown } = workout
  const firstBlock: BlockName =
    warmUp.length > 0 ? 'Warm-up' : main.sets.length > 0 && main.rounds > 0 ? 'Main' : 'Cool-down'
  const steps: Step[] = [{ kind: 'ready', block: firstBlock, seconds: READY_SECONDS }]

  const rest = (label: RestLabel, block: BlockName, seconds: number) => {
    if (seconds > 0) steps.push({ kind: 'rest', label, block, seconds })
  }
  const work = (block: BlockName, set: WorkoutSet, round?: number, rounds?: number) => {
    steps.push({ kind: 'work', block, round, rounds, set, seconds: setSeconds(set) })
  }

  warmUp.forEach((set, index) => {
    if (index > 0) rest('Change-over', 'Warm-up', CHANGE_OVER_SECONDS)
    work('Warm-up', set)
  })

  if (main.sets.length > 0 && main.rounds > 0) {
    rest('Change-over', 'Main', CHANGE_OVER_SECONDS)
    for (let round = 1; round <= main.rounds; round++) {
      const setsInRound = round === main.rounds ? main.lastRoundSets : main.sets.length
      if (round > 1) rest('Rest between Rounds', 'Main', main.roundRestSeconds)
      main.sets.slice(0, setsInRound).forEach((set, index) => {
        if (index > 0) rest('Rest', 'Main', main.restSeconds)
        work('Main', set, round, main.rounds)
      })
    }
  }

  coolDown.forEach((set) => {
    rest('Change-over', 'Cool-down', CHANGE_OVER_SECONDS)
    work('Cool-down', set)
  })

  return steps
}

/** The first Set after `index`, or null when none is left. */
export function nextWork(steps: readonly Step[], index: number): WorkStep | null {
  for (let i = index + 1; i < steps.length; i++) {
    const step = steps[i]
    if (step.kind === 'work') return step
  }
  return null
}

/** Seconds into a per-side Set at which the second side starts. */
export function switchSecond(step: WorkStep): number | null {
  return step.set.perSide ? step.seconds / 2 : null
}

/** How long "— switch!" stays up after the side switch. */
const SWITCH_SHOWN_SECONDS = 3

export type Side = { text: string; switching: boolean }

/** e.g. "Side 1 of 2", "Side 2 of 2 — switch!" just after the switch; null when not per side. */
export function sideAt(step: WorkStep, elapsed: number): Side | null {
  const half = switchSecond(step)
  if (half === null) return null
  if (elapsed < half) return { text: 'Side 1 of 2', switching: false }
  return elapsed < half + SWITCH_SHOWN_SECONDS
    ? { text: 'Side 2 of 2 — switch!', switching: true }
    : { text: 'Side 2 of 2', switching: false }
}

/** e.g. "1:05" */
export function clockText(seconds: number): string {
  const whole = Math.max(0, Math.ceil(seconds))
  return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, '0')}`
}
