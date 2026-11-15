# 07: Follow-along: play a Workout end to end

Spec: [Home Workout MVP](../../home-workout-mvp/spec.md), sections "Screens" (Follow-along) and "Follow-along behaviour"; prototype on branch `prototype/follow-along` (variant B, "Timeline")

**What to build:** I press Start Workout and the app walks me through the whole Workout hands-free, from a "Get ready" countdown to the "Workout complete" screen.

**Blocked by:** [03: Generate a basic Workout and preview it](03-generate-basic-workout-and-preview.md)

**Status:** done

- [x] The current Workout is flattened into an ordered list of Sets and rests (shape from the prototype, see the spec's "Workout model")
- [x] Start Workout opens Follow-along with a 5 s "Get ready" countdown showing the first Exercise as "up next"
- [x] "Timeline" layout: left column lists the whole Workout by Block with "Round N of M" headings, each row with a small GIF, name and target; the current row highlighted, finished rows struck through; time done / planned total above the list
- [x] Right side: the current Exercise's GIF, name and target; during rest the label ("Change-over", "Rest", "Rest between Rounds") with "up next" and the next Exercise's GIF and target; a large countdown and a progress bar
- [x] Every Set and rest counts down and advances automatically, rep Sets included (3 s per rep, doubled per side)
- [x] The next Exercise's GIF is preloaded; the screen is kept awake with the Wake Lock API while following along
- [x] A "Workout complete" screen at the end
- [x] App tests with fake timers: Get ready, automatic advance through Sets and rests, change-over between Blocks, rest labels and "up next", the complete screen

## Comments

Done on `feature/follow-along` (`0de63d7`, `ed66fc9`) and merged in `fce37bc`.

- `flatten` (`src/workout/follow-along.ts`) follows the same rest rules as `plannedSeconds`. A test checks that the totals match for every generated type × time × Difficulty Workout.
- **Choices made:**
  - A work step holds the whole `WorkoutSet` instead of separate fields.
  - Rests of 0 s are left out.
  - No Timeline row is highlighted during a rest, as in the prototype.
  - The complete screen links to "Plan another Workout".
- **For ticket 08/09:**
  - The player is a reducer over `{ index, elapsed }` with a `tick` action (`src/follow-along/player.ts`). Pause, skip, back and saving progress become more actions on it.
  - The countdown uses a 1 s `setInterval`, so it can drift slightly.
  - `src/follow-along.test.tsx` stubs a global `jest` so Testing Library works with Vitest's fake timers.
- **For ticket 05:** the minimal Start Workout button sits in the preview header. Move it into the top bar.
