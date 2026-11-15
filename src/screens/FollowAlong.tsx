import { useId, useMemo, useState } from 'react'
import { preload } from 'react-dom'
import { Link, Navigate, useNavigate } from 'react-router'
import { cn } from 'cn'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { SaveFavouriteButton } from '@/favourites/SaveFavouriteButton'
import { useControlKeys } from '@/follow-along/keys'
import { usePlayer, type Player } from '@/follow-along/player'
import { startingState, useSaveProgress } from '@/follow-along/progress'
import { useCues, useSoundSettings } from '@/follow-along/sound'
import { useWakeLock } from '@/follow-along/wake-lock'
import {
  clearProgress,
  loadWorkout,
  plannedSeconds,
  targetText,
  type SoundSettings,
  type Workout,
  type WorkoutSet,
} from '@/workout'
import {
  BLOCK_NAMES,
  clockText,
  flatten,
  nextWork,
  sideAt,
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
  const [start] = useState(() => startingState(steps))
  const player = usePlayer(steps, start)
  useSaveProgress(player.index, player.finished)
  useWakeLock(!player.finished)
  // While End Workout asks, the Workout waits; cancelling carries on as it was.
  const [ending, setEnding] = useState<{ resumeAfter: boolean } | null>(null)
  useControlKeys(player, !player.finished && ending === null)
  const askToEnd = (open: boolean) => {
    if (open && !ending) {
      if (!player.paused) player.togglePause()
      setEnding({ resumeAfter: !player.paused })
    } else if (!open && ending) {
      if (ending.resumeAfter) player.togglePause()
      setEnding(null)
    }
  }
  const [sound, setSound] = useSoundSettings()
  useCues(steps, player, sound)

  const upNext = nextWork(steps, player.index)
  if (upNext) preload(upNext.set.exercise.gifUrl, { as: 'image' })

  if (player.finished) return <WorkoutComplete workout={workout} total={total} />

  return (
    <div className="flex flex-col gap-4 p-6">
      <SoundToggles settings={sound} onChange={setSound} />
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        <aside className="flex w-full shrink-0 flex-col gap-6 lg:w-80">
          <Timeline steps={steps} player={player} total={total} />
          <EndWorkout open={ending !== null} onOpenChange={askToEnd} />
        </aside>
        <NowPlaying player={player} upNext={upNext} />
      </div>
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
    <div className="flex flex-col gap-4">
      <p className="text-muted-foreground text-sm tabular-nums">
        <span className="sr-only">Time done: </span>
        {clockText(timeDone(steps, player))} / {clockText(total)}
      </p>
      {BLOCK_NAMES.map((block) => {
        const groups = timelineGroups(steps, block)
        if (groups.length === 0) return null
        return <TimelineBlock key={block} block={block} groups={groups} current={player.index} />
      })}
    </div>
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
      <span className="tabular-nums">{targetText(set, 'en')}</span>
    </li>
  )
}

function NowPlaying({ player, upNext }: { player: Player; upNext: WorkStep | null }) {
  const step = player.step
  if (!step) return null
  const isWork = step.kind === 'work'
  const shown = isWork ? step : upNext
  const progress = Math.round((player.elapsed / step.seconds) * 100)
  const side = isWork ? sideAt(step, player.elapsed) : null

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
              <p className="text-xl">{targetText(step.set, 'en')}</p>
              {side && (
                <p
                  className={cn(
                    'w-fit rounded-full px-3 py-1 text-sm font-semibold',
                    side.switching
                      ? 'bg-amber-400 text-amber-950'
                      : 'bg-muted text-muted-foreground',
                  )}
                >
                  {side.text}
                </p>
              )}
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
                  <p className="text-xl">{targetText(shown.set, 'en')}</p>
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
      <Controls player={player} />
    </section>
  )
}

function Controls({ player }: { player: Player }) {
  return (
    <div className="flex items-center gap-3">
      <ControlButton label="Back" shortcut="B" onClick={player.back} variant="outline" />
      <ControlButton
        label={player.paused ? 'Resume' : 'Pause'}
        shortcut="Space"
        onClick={player.togglePause}
      />
      <ControlButton label="Skip" shortcut="N" onClick={player.skip} variant="outline" />
    </div>
  )
}

function ControlButton({
  label,
  shortcut,
  onClick,
  variant = 'default',
}: {
  label: string
  shortcut: string
  onClick: () => void
  variant?: 'default' | 'outline'
}) {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      aria-keyshortcuts={shortcut === 'Space' ? 'Space' : shortcut.toLowerCase()}
      className="h-12 min-w-28 px-5 text-base"
    >
      {label}
      <kbd aria-hidden="true" className="text-xs opacity-60">
        {shortcut}
      </kbd>
    </Button>
  )
}

/** Ends the Workout early, after asking: the saved progress goes, the Workout stays. */
function EndWorkout({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const navigate = useNavigate()
  const end = () => {
    clearProgress()
    navigate('/')
  }
  return (
    <>
      <Button variant="destructive" className="self-start" onClick={() => onOpenChange(true)}>
        End Workout
      </Button>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>End this Workout?</DialogTitle>
            <DialogDescription>
              Your place in it is forgotten. You can start it again from the preview.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Keep going</Button>
            </DialogClose>
            <Button variant="destructive" onClick={end}>
              End Workout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

function SoundToggles({
  settings,
  onChange,
}: {
  settings: SoundSettings
  onChange: (settings: SoundSettings) => void
}) {
  return (
    <div className="flex justify-end gap-2">
      <SoundToggle
        label="Beeps"
        icon="🔔"
        on={settings.beeps}
        onToggle={() => onChange({ ...settings, beeps: !settings.beeps })}
      />
      <SoundToggle
        label="Voice"
        icon="🗣"
        on={settings.voice}
        onToggle={() => onChange({ ...settings, voice: !settings.voice })}
      />
    </div>
  )
}

function SoundToggle({
  label,
  icon,
  on,
  onToggle,
}: {
  label: string
  icon: string
  on: boolean
  onToggle: () => void
}) {
  return (
    <Button
      variant={on ? 'secondary' : 'ghost'}
      size="icon-lg"
      aria-label={label}
      aria-pressed={on}
      title={`${label} ${on ? 'on' : 'off'}`}
      onClick={onToggle}
      className={cn('text-lg', !on && 'opacity-40 grayscale')}
    >
      <span aria-hidden="true">{icon}</span>
    </Button>
  )
}

function WorkoutComplete({ workout, total }: { workout: Workout; total: number }) {
  return (
    <div className="flex flex-col items-center gap-4 p-16 text-center">
      <h1 className="text-5xl font-bold">Workout complete</h1>
      <p className="text-muted-foreground">{clockText(total)} planned. Well done!</p>
      <SaveFavouriteButton workout={workout} />
      <Link to="/" className="text-primary underline-offset-4 hover:underline">
        Plan another Workout
      </Link>
    </div>
  )
}
