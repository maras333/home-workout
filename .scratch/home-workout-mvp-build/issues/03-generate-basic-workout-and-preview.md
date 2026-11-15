# 03: Generate a basic Workout and preview it

> Archived: this ticket now lives in GitHub issue [#13](https://github.com/maras333/home-workout/issues/13).

Spec: [Home Workout MVP](../../home-workout-mvp/spec.md), sections "Workout model", "Workout generation module", "Screens", "Browser storage"

**What to build:** the first end-to-end flow. I fill in the Workout Request form, press Generate, and land on the Workout preview showing a correctly sized Workout. Generation covers the core rules only; preferences and fallbacks come in [04: Generation preferences and fallbacks](04-generation-preferences-and-fallbacks.md).

**Blocked by:** [02: Exercise library pipeline with a starter set](02-exercise-library-pipeline.md)

**Status:** done

- [x] Form: six workout-type cards (default full body), time presets 15/30/45/60 (default 30), Difficulty with its one-line hints (default Intermediate), four Equipment checkboxes (all unchecked), Generate
- [x] The last Workout Request is saved in browser storage and prefills the form; a missing or corrupt value falls back to the defaults
- [x] `generate(request, library, random, previous?)` is a pure function with an injected random source; the same seed gives the same Workout
- [x] Time split per preset (15 → 3/10/2, 30 → 5/21/4, 45 → 6/34/5, 60 → 8/45/7) and total planned length within ±10% of the chosen time
- [x] Eligibility: workout type, Block role, all needed Equipment ticked, Difficulty at or below the requested one; no repeats within a Block
- [x] Main Block: 4/5/6/6 Exercises per preset, repeated in Rounds, last Round may stop part-way after the Set nearest the budget; warm-up and cool-down are a single pass
- [x] Reps or time per the spec; a rep counts 3 s, doubled per side; a per-side Exercise is one Set
- [x] Work/rest table per Difficulty, cardio/HIIT intervals, warm-up 30 s, cool-down and mobility 40 s holds, 10 s change-over between Exercises and between Blocks, rest between Rounds only between main-Block Rounds
- [x] Preview at `/workout`: Request summary line, planned total time, Exercise count, Workout list by Block (GIF, name, target), main Block compacted to "N Exercises × R Rounds (last Round: k Exercises)", no rest rows
- [x] The current Workout is saved in browser storage; reloading `/workout` shows the same Workout; opening `/workout` with nothing saved redirects to the form
- [x] Generation unit tests (seeded random, small hand-built libraries) and app tests for the form → preview flow

## Comments

Done in `ca15641` and the review-fix commit after it. The one open box is the `previous?` parameter only: `generate(request, library, random)` is pure and seeded, and ticket 04 adds `previous` together with the steering that uses it.

- **Timing interpretations:**
  - The 10 s change-over sits between warm-up Sets, into the main Block and before each cool-down Set.
  - In the main Block, the rest after a Round's last Set is replaced by the rest between Rounds.
  - Mobility uses 10 s change-overs both between Sets and between Rounds.
  - Per-side doubling applies to every timed Set.
  - The first main Round is always complete.
- **Fitting:** the main Block's Exercises are picked first. Warm-up and cool-down are then filled to their minutes. The main Block's Rounds fit the remaining time, so the total stays within ±10%.
- **For ticket 06:** `fitRounds` in `src/workout/generate.ts` is the piece Swap needs for refitting. Extract it then.

Ticket 05 added `previous?` and the steering (`548ff73`, `dd34111`), so the last box is ticked.
