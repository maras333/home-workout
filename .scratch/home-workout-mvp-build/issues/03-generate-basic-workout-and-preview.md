# 03: Generate a basic Workout and preview it

Spec: [Home Workout MVP](../../home-workout-mvp/spec.md), sections "Workout model", "Workout generation module", "Screens", "Browser storage"

**What to build:** the first end-to-end flow. I fill in the Workout Request form, press Generate, and land on the Workout preview showing a correctly sized Workout. Generation covers the core rules only; preferences and fallbacks come in [04: Generation preferences and fallbacks](04-generation-preferences-and-fallbacks.md).

**Blocked by:** [02: Exercise library pipeline with a starter set](02-exercise-library-pipeline.md)

**Status:** ready-for-agent

- [ ] Form: six workout-type cards (default full body), time presets 15/30/45/60 (default 30), Difficulty with its one-line hints (default Intermediate), four Equipment checkboxes (all unchecked), Generate
- [ ] The last Workout Request is saved in browser storage and prefills the form; a missing or corrupt value falls back to the defaults
- [ ] `generate(request, library, random, previous?)` is a pure function with an injected random source; the same seed gives the same Workout
- [ ] Time split per preset (15 → 3/10/2, 30 → 5/21/4, 45 → 6/34/5, 60 → 8/45/7) and total planned length within ±10% of the chosen time
- [ ] Eligibility: workout type, Block role, all needed Equipment ticked, Difficulty at or below the requested one; no repeats within a Block
- [ ] Main Block: 4/5/6/6 Exercises per preset, repeated in Rounds, last Round may stop part-way after the Set nearest the budget; warm-up and cool-down are a single pass
- [ ] Reps or time per the spec; a rep counts 3 s, doubled per side; a per-side Exercise is one Set
- [ ] Work/rest table per Difficulty, cardio/HIIT intervals, warm-up 30 s, cool-down and mobility 40 s holds, 10 s change-over between Exercises and between Blocks, rest between Rounds only between main-Block Rounds
- [ ] Preview at `/workout`: Request summary line, planned total time, Exercise count, Workout list by Block (GIF, name, target), main Block compacted to "N Exercises × R Rounds (last Round: k Exercises)", no rest rows
- [ ] The current Workout is saved in browser storage; reloading `/workout` shows the same Workout; opening `/workout` with nothing saved redirects to the form
- [ ] Generation unit tests (seeded random, small hand-built libraries) and app tests for the form → preview flow
