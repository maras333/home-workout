import { useId, useMemo, useState } from 'react'
import { preload } from 'react-dom'
import { Link, Navigate } from 'react-router'
import { cn } from 'cn'
import { usePlayer, type Player } from '@/follow-along/player'
import { useWakeLock } from '@/follow-along/wake-lock'
import { loadWorkout, plannedSeconds, targetText, type Workout, type WorkoutSet } from '@/workout'
import {
  BLOCK_NAMES,
  clockText,
  flatten,
  nextWork,
  type BlockName,
  type Step,
  type WorkStep,
} from '@/workout/follow-along'

export function FollowAlong() {
  const [workout] = useState(loadWorkout)
  if (!workout) return <Navigate to="/" replace />
  return <FollowAlongSession workout={workout} />
}

function FollowAlongSession({ workout }: { workout: Workout }) {
  const steps = useMemo(() => flatten(workout), [workout])
  const total = plannedSeconds(workout)
  const player = usePlayer(steps)
  useWakeLock(!player.finished)

  const upNext = nextWork(steps, player.index)
  if (upNext) preload(upNext.set.exercise.gifUrl, { as: 'image' })

  if (player.finished) return <WorkoutComplete total={total} />

  return (
    <div className="flex flex-col gap-8 p-6 lg:flex-row lg:items-start">
      <Timeline steps={steps} player={player} total={total} />
      <NowPlaying player={player} upNext={upNext} />
    </div>
  )
}

/** Seconds of the Workout behind us; "Get ready" does not count. */
function timeDone(steps: readonly Step[], player: Player): number {
  const before = steps.slice(0, player.index).filter((step) => step.kind !== 'ready')
  const current = player.step?.kind === 'ready' ? 0 : player.elapsed
  return before.reduce((sum, step) => sum + step.seconds, 0) + current
}

type Row = { step: WorkStep; index: number }
type RowGroup = { round?: number; rounds?: number; rows: Row[] }

/** Each Block's Sets, the main Block's split by Round. */
function timelineGroups(steps: readonly Step[], block: BlockName): RowGroup[] {
  const groups: RowGroup[] = []
  steps.forEach((step, index) => {
    if (step.kind !== 'work' || step.block !== block) return
    const last = groups[groups.length - 1]
    if (last && last.round === step.round) last.rows.push({ step, index })
    else groups.push({ round: step.round, rounds: step.rounds, rows: [{ step, index }] })
  })
  return groups
}

function Timeline({
  steps,
  player,
  total,
}: {
  steps: readonly Step[]
  player: Player
  total: number
}) {
  return (
    <aside className="flex w-full shrink-0 flex-col gap-4 lg:w-80">
      <p className="text-muted-foreground text-sm tabular-nums">
        <span className="sr-only">Time done: </span>
        {clockText(timeDone(steps, player))} / {clockText(total)}
      </p>
      {BLOCK_NAMES.map((block) => {
        const groups = timelineGroups(steps, block)
        if (groups.length === 0) return null
        return <TimelineBlock key={block} block={block} groups={groups} current={player.index} />
      })}
    </aside>
  )
}

function TimelineBlock({
  block,
  groups,
  current,
}: {
  block: BlockName
  groups: RowGroup[]
  current: number
}) {
  const headingId = useId()
  return (
    <section aria-labelledby={headingId} className="flex flex-col gap-1">
      <h2 id={headingId} className="text-sm font-semibold tracking-wide uppercase">
        {block}
      </h2>
      {groups.map((group) => (
        <div key={group.round ?? 0} className="flex flex-col gap-1">
          {group.round !== undefined && (
            <h3 className="text-muted-foreground mt-1 text-xs">
              Round {group.round} of {group.rounds}
            </h3>
          )}
          <ol className="flex flex-col gap-1">
            {group.rows.map(({ step, index }) => (
              <TimelineRow
                key={index}
                set={step.set}
                state={index < current ? 'done' : index === current ? 'now' : 'todo'}
              />
            ))}
          </ol>
        </div>
      ))}
    </section>
  )
}

function TimelineRow({ set, state }: { set: WorkoutSet; state: 'done' | 'now' | 'todo' }) {
  return (
    <li
      aria-current={state === 'now' ? 'step' : undefined}
      className={cn(
        'flex items-center gap-2 rounded-md px-2 py-1 text-sm',
        state === 'now' && 'bg-primary text-primary-foreground font-semibold',
        state === 'done' && 'text-muted-foreground line-through',
      )}
    >
      <img
        src={set.exercise.gifUrl}
        alt=""
        loading="lazy"
        width={32}
        height={32}
        className="size-8 rounded bg-white"
      />
      {state === 'done' && <span className="sr-only">Done: </span>}
      <span className="flex-1 capitalize">{set.exercise.name}</span>
      <span className="tabular-nums">{targetText(set)}</span>
    </li>
  )
}

function NowPlaying({ player, upNext }: { player: Player; upNext: WorkStep | null }) {
  const step = player.step
  if (!step) return null
  const isWork = step.kind === 'work'
  const shown = isWork ? step : upNext
  const progress = Math.round((player.elapsed / step.seconds) * 100)

  return (
    <section aria-label="Now" className="flex flex-1 flex-col items-center gap-6">
      <div className="flex w-full max-w-3xl flex-col items-center gap-8 md:flex-row">
        {shown && (
          <img
            src={shown.set.exercise.gifUrl}
            alt={shown.set.exercise.name}
            width={288}
            height={288}
            className="size-72 rounded-2xl bg-white"
          />
        )}
        <div className="flex flex-1 flex-col gap-3">
          {isWork ? (
            <>
              <p className="text-muted-foreground text-sm tracking-widest uppercase">
                {step.block}
                {step.round !== undefined && ` · Round ${step.round} of ${step.rounds}`}
              </p>
              <h1 className="text-4xl font-bold capitalize">{step.set.exercise.name}</h1>
              <p className="text-xl">{targetText(step.set)}</p>
            </>
          ) : (
            <>
              <h1 className="text-4xl font-bold">
                {step.kind === 'ready' ? 'Get ready' : step.label}
              </h1>
              {shown && (
                <>
                  <p className="text-muted-foreground text-sm tracking-widest uppercase">Up next</p>
                  <p className="text-2xl font-semibold capitalize">{shown.set.exercise.name}</p>
                  <p className="text-xl">{targetText(shown.set)}</p>
                </>
              )}
            </>
          )}
          <p
            role="timer"
            aria-label="Time left"
            className="font-mono text-7xl font-bold tabular-nums"
          >
            {clockText(player.remaining)}
          </p>
        </div>
      </div>
      <div
        role="progressbar"
        aria-label={isWork ? 'Set progress' : 'Rest progress'}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
        className="bg-muted h-3 w-full max-w-3xl overflow-hidden rounded-full"
      >
        <div
          className={cn('h-full transition-[width]', isWork ? 'bg-primary' : 'bg-sky-500')}
          style={{ width: `${progress}%` }}
        />
      </div>
    </section>
  )
}

function WorkoutComplete({ total }: { total: number }) {
  return (
    <div className="flex flex-col items-center gap-4 p-16 text-center">
      <h1 className="text-5xl font-bold">Workout complete</h1>
      <p className="text-muted-foreground">{clockText(total)} planned. Well done!</p>
      <Link to="/" className="text-primary underline-offset-4 hover:underline">
        Plan another Workout
      </Link>
    </div>
  )
}
