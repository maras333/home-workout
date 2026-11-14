# Prototype the Follow-along screen

Type: prototype
Status: resolved
Blocked by: 04
Map: [Home Workout MVP](../map.md)

## Question

What does the Follow-along screen look like and how does it behave on a laptop? Cover:
- the current and next Set with its GIF
- rep or timer display and the rest countdown
- Block progress
- pause, skip and back controls
- whether audio or voice cues are needed

Build a rough working screen driven by a hand-written sample Workout and react to it.

## Answer

**Use the "Timeline" layout** (variant B of the prototype).

### Layout

- **Left column, always visible:** the whole Workout, grouped by Block, with a "Round N of M" heading inside the main Block. Each Set shows a small GIF, the Exercise name and its target ("12 reps", "40 s per side"). The current Set is highlighted and finished Sets are struck through. Above the list: time done / planned total time. Below it: an **"End Workout"** button.
- **Main area:**
  - the Set being done (GIF, name, target), or during rest, "Rest / Change-over / Rest between Rounds — up next" with the next Exercise's GIF and target
  - a large countdown and a progress bar for the current Set or rest
  - controls below

### Behaviour

- **Every Set and every rest counts down**, including rep Sets, which are timed at 3 s per rep (doubled for per-side Exercises), as in [Design rule-based Workout generation](04-design-workout-generation.md). Each one advances automatically when its time runs out; there's no "Done" button.
- **Per-side Exercises** are one Set. A "Side 1 of 2" badge switches to "Side 2 of 2 — switch!" halfway through, with a double beep and the spoken cue "Switch sides".
- **Controls:**
  - Pause / Resume (Space)
  - Skip (N): jumps to the next Set or rest
  - Back (B): restarts the current Set if more than 3 s in, otherwise goes to the previous Exercise
- **Starting** needs one click on "Start Workout", which also unlocks browser audio. The screen is kept awake (Wake Lock) while you follow along.
- **Finishing** shows a "Workout complete" screen.
- **Ending early:** "End Workout" asks for confirmation, then returns to the Workout Request screen and clears the saved progress.

### Sound

- **Beeps** (on by default):
  - 3-2-1 before each Set or rest ends
  - a start tone when a Set begins
  - a double beep at the side switch
  - a finish tone
- **Voice** (on by default, the browser's built-in speech):
  - at each rest: "Rest. Next: push-up, 12 reps."
  - when a Set starts: "Go."
  - at the side switch: "Switch sides."
  - at the end: "Workout complete."
- Two small toggle icons (🔔 beeps, 🗣 voice) in the player's top-right corner, remembered in browser storage.

### Resuming after a reload

- The current Workout and the position in it are saved to browser storage after every Set and every rest.
- After a reload the screen returns **paused at the start of that Set or rest**, with a "Resume" button.
- The saved progress is cleared when the Workout finishes or is ended, and dropped if it's more than 12 hours old.

### Prototype

Three variants: A "Focus" (huge timer, colour change during rest), B "Timeline" (chosen) and C "Coach" (steps always shown, progress ring). All are on the throwaway branch `prototype/follow-along`, folder `prototype-app/`, at the route `/prototype/follow-along?variant=A|B|C` (run `npm install && npm run dev`). It's throwaway code; rewrite it properly when building.
