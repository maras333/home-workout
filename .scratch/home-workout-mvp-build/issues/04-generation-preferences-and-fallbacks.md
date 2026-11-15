# 04: Generation preferences and fallbacks

Spec: [Home Workout MVP](../../home-workout-mvp/spec.md), section "Workout generation module"

**What to build:** Workouts that feel well put together and never fail. The main Block favours my exact Difficulty, uses my Equipment, rotates Muscle groups; warm-up and cool-down match the main Block; and a tiny pool still yields a Workout.

**Blocked by:** [03: Generate a basic Workout and preview it](03-generate-basic-workout-and-preview.md)

**Status:** done

- [x] The main Block prefers Exercises at exactly the requested Difficulty
- [x] If any Equipment is ticked, at least half the main Block uses it when the pool allows
- [x] Muscle rotation per workout type (full body, upper body, lower body with core as filler, core with variety instead of rotation, cardio/HIIT and mobility rotating where possible); neighbouring Exercises never share a primary Muscle group where avoidable
- [x] Warm-up and cool-down prefer Exercises that work the main Block's Muscle groups
- [x] Mobility/stretching: gentle joint work, then stretches, then the calmest holds
- [x] Never fails; degrades in order: drop the Equipment preference → shrink the main Block to as few as 3 Exercises and add Rounds → let warm-up or cool-down Exercises repeat
- [x] Unit tests for each preference and each fallback step, including "never throws" on an almost-empty library

## Comments

Done in `ae5abd3` and the review-fix commit after it.

- **Main Block selection:** slot by slot, ranked strongest first:
  1. at least half on ticked Equipment, when the remaining slots only just allow it;
  2. no primary group shared with the neighbour, counting the wrap between Rounds;
  3. the exact Difficulty;
  4. the workout type's rotation group;
  5. a primary group not used yet.

  A final reorder of the picks (at most 720 orders) minimises neighbour clashes.
- **Lower body "core as a filler":** core isn't in the lower-body rotation, so it only wins a slot when it avoids a clash.
- **Mobility "joint work → stretches → calmest holds":** this comes from the Block roles in curation; generation keeps each Block to its role.
- **Fewer than 3 eligible main Exercises:** the main Block holds whatever exists, even 0. `generate` never throws.
- **Real-library run:** every type × Difficulty × time × Equipment subset, 20 seeds each.
  - Totals always land within ±10%, and main Blocks are always full.
  - **Remaining neighbour clashes are curation gaps:**
    - Core has one group by design.
    - Beginner cardio/HIIT is all legs.
    - Lower body has no main-Block core Exercise tagged lower body, so the core filler never appears.
  - **Warm-up and cool-down still repeat** in 60-minute upper body and core Workouts. Their pools are small.
  - **Equipment is often under half** wherever few Equipment Exercises exist at that type × Difficulty.
