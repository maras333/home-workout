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
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { SaveFavouriteButton } from '@/favourites/SaveFavouriteButton'
import { useLanguage, useText } from '@/language'
import { exerciseText, keyPoses } from '@/library'
import { useControlKeys } from '@/follow-along/keys'
import { usePhoneLayout } from '@/follow-along/layout'
import { usePlayer, type Player } from '@/follow-along/player'
import { startingState, useSaveProgress } from '@/follow-along/progress'
import { useCues, useSoundSettings } from '@/follow-along/sound'
import { useSpeaker, type Speaker } from '@/follow-along/voice'
import { useWakeLock } from '@/follow-along/wake-lock'
import { ExercisePicture } from '@/follow-along/ExercisePicture'
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
  const speaker = useSpeaker()
  useCues(steps, player, sound, speaker)
  const phone = usePhoneLayout()

  const upNext = nextWork(steps, player.index)
  if (upNext) {
    const poses = keyPoses(upNext.set.exercise)
    const urls = poses.length > 0 ? poses.map((pose) => pose.url) : [upNext.set.exercise.gifUrl]
    for (const url of urls) preload(url, { as: 'image' })
  }

  if (player.finished) return <WorkoutComplete workout={workout} total={total} />

  if (phone) {
    // The whole screen, without the page's header and footer, so nothing scrolls: the Timeline,
    // 🔔, 🗣 and End Workout as small buttons at the top; the Exercise and a large clock in the
    // middle; Back, Pause/Resume and Skip at the bottom, or under the clock on its side (see
    // PHONE_LOOK). It scrolls only if it must, which no phone from 360 px wide should need.
    return (
      <div className="fixed inset-0 z-10 flex flex-col gap-3 overflow-y-auto bg-background pt-[env(safe-area-inset-top)]">
        <div className="flex shrink-0 flex-wrap items-center gap-2 px-4 pt-3">
          <TimelinePanel steps={steps} player={player} total={total} />
          <SoundToggles settings={sound} onChange={setSound} speaker={speaker} phone />
          <EndWorkout open={ending !== null} onOpenChange={askToEnd} className="self-center" />
        </div>
        <NowPlaying player={player} upNext={upNext} phone />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 p-6">
      <SoundToggles settings={sound} onChange={setSound} speaker={speaker} phone={false} />
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        <aside className="flex w-full shrink-0 flex-col gap-6 lg:w-80">
          <Timeline steps={steps} player={player} total={total} />
          <EndWorkout open={ending !== null} onOpenChange={askToEnd} />
        </aside>
        <NowPlaying player={player} upNext={upNext} phone={false} />
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
  const text = useText()
  return (
    <div className="flex flex-col gap-4">
      <p className="text-muted-foreground text-sm tabular-nums">
        <span className="sr-only">{text.followAlong.timeDone} </span>
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

/**
 * The Timeline on a phone: hidden behind a button, it opens as a panel from the bottom. Unlike
 * End Workout, it leaves the Workout running, so the current Set moves on in it.
 */
function TimelinePanel({
  steps,
  player,
  total,
}: {
  steps: readonly Step[]
  player: Player
  total: number
}) {
  const text = useText().followAlong
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="mr-auto">
          {text.timeline}
        </Button>
      </SheetTrigger>
      <SheetContent closeLabel={text.closeTimeline} aria-describedby={undefined}>
        <SheetTitle className="pr-10">{text.timeline}</SheetTitle>
        <div ref={scrollToCurrentSet} className="-mx-4 overflow-y-auto px-4">
          <Timeline steps={steps} player={player} total={total} />
        </div>
      </SheetContent>
    </Sheet>
  )
}

/** Brings the current Set into view once, when the panel opens (jsdom has no scrolling). */
function scrollToCurrentSet(panel: HTMLElement | null) {
  const current = panel?.querySelector('[aria-current="step"]')
  current?.scrollIntoView?.({ block: 'center' })
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
  const text = useText().followAlong
  return (
    <section aria-labelledby={headingId} className="flex flex-col gap-1">
      <h2 id={headingId} className="text-sm font-semibold tracking-wide uppercase">
        {text.blocks[block]}
      </h2>
      {groups.map((group) => (
        <div key={group.round ?? 0} className="flex flex-col gap-1">
          {group.round !== undefined && (
            <h3 className="text-muted-foreground mt-1 text-xs">
              {text.round(group.round, group.rounds ?? group.round)}
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
  const { language } = useLanguage()
  const text = useText().followAlong
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
        className="size-8 rounded bg-white dark:brightness-95"
      />
      {state === 'done' && <span className="sr-only">{text.done} </span>}
      <span className="flex-1 first-letter:uppercase">
        {exerciseText(set.exercise, language).name}
      </span>
      <span className="tabular-nums">{targetText(set, language)}</span>
    </li>
  )
}

/** How the current Set or rest is laid out: the class names of each part, and the key hints. */
type Look = {
  section: string
  main: string
  gif: string
  details: string
  heading: string
  upNextName: string
  target: string
  clock: string
  progress: string
  controls: string
  control: string
  /** Shows each control's key (B, Space, N) on the button. */
  keyHints: boolean
}

/** On a laptop, read from close by, with the keys shown on the buttons. */
const LAPTOP_LOOK: Look = {
  section: 'items-center gap-6',
  main: 'w-full max-w-3xl gap-8 md:flex-row',
  gif: 'size-72',
  details: 'flex-1 gap-3',
  heading: 'text-4xl',
  upNextName: 'text-2xl',
  target: 'text-xl',
  clock: 'text-7xl',
  progress: 'w-full max-w-3xl',
  controls: 'flex items-center gap-3',
  control: 'h-12 min-w-28 px-5 text-base',
  keyHints: true,
}

/**
 * On a phone everything is sized to be read from about two metres. Upright, the GIF takes the
 * height the text and the clock leave over, and the controls are a bar along the bottom. On its
 * side (`landscape:`), the GIF is on the left and the text, clock and controls on the right.
 */
const PHONE_LOOK: Look = {
  section:
    'min-h-0 gap-3 landscape:grid landscape:grid-cols-[minmax(0,42%)_1fr] landscape:grid-rows-[1fr_auto_auto] landscape:gap-x-4 landscape:gap-y-2 landscape:px-4 landscape:pb-3',
  // Upright, a column of its own; on its side, its children join the section's grid.
  main: 'min-h-0 flex-1 gap-3 px-4 landscape:contents',
  gif: 'min-h-0 w-full flex-1 object-contain landscape:row-span-3 landscape:h-full',
  details: 'w-full shrink-0 gap-1 landscape:min-h-0 landscape:justify-center landscape:gap-0.5',
  heading: 'text-2xl break-words landscape:text-xl',
  upNextName: 'text-xl break-words landscape:text-lg',
  target: 'text-2xl landscape:text-lg',
  // About 100 px tall on an upright 360 px phone, 80 px on its side: readable from two metres.
  clock:
    'text-center text-[min(28vw,14dvh)] leading-none landscape:text-left landscape:text-[min(12vw,22dvh)]',
  progress: 'mx-4 landscape:mx-0',
  controls:
    'grid shrink-0 grid-cols-3 gap-2 border-t p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] landscape:border-t-0 landscape:p-0',
  // At least 44 px tall.
  control: 'h-14 min-w-0 text-lg landscape:h-12',
  // No keyboard to press.
  keyHints: false,
}

/** The current Set or rest with its clock and controls. */
function NowPlaying({
  player,
  upNext,
  phone,
}: {
  player: Player
  upNext: WorkStep | null
  phone: boolean
}) {
  const { language } = useLanguage()
  const text = useText().followAlong
  const step = player.step
  if (!step) return null
  const look = phone ? PHONE_LOOK : LAPTOP_LOOK
  const isWork = step.kind === 'work'
  const shown = isWork ? step : upNext
  const shownName = shown && exerciseText(shown.set.exercise, language).name
  const progress = Math.round((player.elapsed / step.seconds) * 100)
  const side = isWork ? sideAt(step, player.elapsed) : null

  return (
    <section aria-label={text.now} className={cn('flex flex-1 flex-col', look.section)}>
      <div className={cn('flex flex-col items-center', look.main)}>
        {shown && (
          <ExercisePicture
            exercise={shown.set.exercise}
            alt={shownName ?? ''}
            paused={player.paused}
            className={look.gif}
          />
        )}
        <div className={cn('flex flex-col', look.details)}>
          {isWork ? (
            <>
              <p className="text-muted-foreground text-sm tracking-widest uppercase">
                {text.blocks[step.block]}
                {step.round !== undefined &&
                  ` · ${text.round(step.round, step.rounds ?? step.round)}`}
              </p>
              <h1 className={cn('font-bold first-letter:uppercase', look.heading)}>{shownName}</h1>
              <p className={look.target}>{targetText(step.set, language)}</p>
              {side && (
                <p
                  className={cn(
                    'w-fit rounded-full px-3 py-1 text-sm font-semibold',
                    side.switching
                      ? 'bg-amber-400 text-amber-950'
                      : 'bg-muted text-muted-foreground',
                  )}
                >
                  {text.side(side.side, side.switching)}
                </p>
              )}
            </>
          ) : (
            <>
              <h1 className={cn('font-bold', look.heading)}>
                {step.kind === 'ready' ? text.getReady : text.rests[step.label]}
              </h1>
              {shown && (
                <>
                  <p className="text-muted-foreground text-sm tracking-widest uppercase">
                    {text.upNext}
                  </p>
                  <p className={cn('font-semibold first-letter:uppercase', look.upNextName)}>
                    {shownName}
                  </p>
                  <p className={look.target}>{targetText(shown.set, language)}</p>
                </>
              )}
            </>
          )}
          <p
            role="timer"
            aria-label={text.timeLeft}
            className={cn('font-mono font-bold tabular-nums', look.clock)}
          >
            {clockText(player.remaining)}
          </p>
        </div>
      </div>
      <div
        role="progressbar"
        aria-label={isWork ? text.setProgress : text.restProgress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
        className={cn('bg-muted h-3 shrink-0 overflow-hidden rounded-full', look.progress)}
      >
        <div
          className={cn('h-full transition-[width]', isWork ? 'bg-primary' : 'bg-muted-foreground')}
          style={{ width: `${progress}%` }}
        />
      </div>
      <Controls player={player} look={look} />
    </section>
  )
}

/** Back, Pause/Resume and Skip. */
function Controls({ player, look }: { player: Player; look: Look }) {
  const text = useText().followAlong
  return (
    <div role="group" aria-label={text.controls} className={look.controls}>
      <ControlButton
        look={look}
        label={text.back}
        shortcut="B"
        onClick={player.back}
        variant="outline"
      />
      <ControlButton
        look={look}
        label={player.paused ? text.resume : text.pause}
        shortcut="Space"
        onClick={player.togglePause}
      />
      <ControlButton
        look={look}
        label={text.skip}
        shortcut="N"
        onClick={player.skip}
        variant="outline"
      />
    </div>
  )
}

function ControlButton({
  look,
  label,
  shortcut,
  onClick,
  variant = 'default',
}: {
  look: Look
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
      className={look.control}
    >
      {label}
      {look.keyHints && (
        <kbd aria-hidden="true" className="text-xs opacity-60">
          {shortcut}
        </kbd>
      )}
    </Button>
  )
}

/** Ends the Workout early, after asking: the saved progress goes, the Workout stays. */
function EndWorkout({
  open,
  onOpenChange,
  className,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  className?: string
}) {
  const navigate = useNavigate()
  const text = useText().followAlong
  const end = () => {
    clearProgress()
    navigate('/')
  }
  return (
    <>
      <Button
        variant="destructive"
        className={cn('self-start', className)}
        onClick={() => onOpenChange(true)}
      >
        {text.endWorkout}
      </Button>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>{text.endTitle}</DialogTitle>
            <DialogDescription>{text.endDescription}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">{text.keepGoing}</Button>
            </DialogClose>
            <Button variant="destructive" onClick={end}>
              {text.endWorkout}
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
  speaker,
  phone,
}: {
  settings: SoundSettings
  onChange: (settings: SoundSettings) => void
  speaker: Speaker
  phone: boolean
}) {
  const { followAlong: text, speech } = useText()
  return (
    // On a phone the toggles join the row of small buttons at the top, and the "no Polish
    // voice" hint takes a line of its own under that row rather than squeezing it.
    <div className={phone ? 'contents' : 'flex items-center justify-end gap-2'}>
      <SoundToggle
        label={text.beeps}
        icon="🔔"
        on={settings.beeps}
        onToggle={() => onChange({ ...settings, beeps: !settings.beeps })}
      />
      <SoundToggle
        label={text.voice}
        icon="🗣"
        on={settings.voice && !speaker.voiceMissing}
        disabled={speaker.voiceMissing}
        onToggle={() => onChange({ ...settings, voice: !settings.voice })}
      />
      {speaker.voiceMissing && (
        <p
          className={cn(
            'text-muted-foreground',
            phone ? 'order-last basis-full text-right text-xs' : 'text-sm',
          )}
        >
          {speech.noVoice}
        </p>
      )}
    </div>
  )
}

function SoundToggle({
  label,
  icon,
  on,
  disabled = false,
  onToggle,
}: {
  label: string
  icon: string
  on: boolean
  disabled?: boolean
  onToggle: () => void
}) {
  const text = useText().followAlong
  return (
    <Button
      variant={on ? 'secondary' : 'ghost'}
      size="icon-lg"
      aria-label={label}
      aria-pressed={on}
      disabled={disabled}
      title={text.soundTitle(label, on)}
      onClick={onToggle}
      className={cn('text-lg', !on && 'opacity-40 grayscale')}
    >
      <span aria-hidden="true">{icon}</span>
    </Button>
  )
}

function WorkoutComplete({ workout, total }: { workout: Workout; total: number }) {
  const text = useText().followAlong
  return (
    <div className="flex flex-col items-center gap-4 p-16 text-center">
      <h1 className="text-5xl font-bold">{text.complete}</h1>
      <p className="text-muted-foreground">{text.planned(clockText(total))}</p>
      <SaveFavouriteButton workout={workout} />
      <Link
        to="/"
        className="underline decoration-primary decoration-2 underline-offset-4 hover:decoration-foreground"
      >
        {text.planAnother}
      </Link>
    </div>
  )
}
