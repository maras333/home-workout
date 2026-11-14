# 06: Swap an Exercise

Spec: [Home Workout MVP](../../home-workout-mvp/spec.md), sections "Workout generation module" (Swap) and "Screens"

**What to build:** in the Workout preview I can Swap one Exercise I don't like for another that fits, leaving the rest of the Workout as it was.

**Blocked by:** [03: Generate a basic Workout and preview it](03-generate-basic-workout-and-preview.md)

**Status:** ready-for-agent

- [x] `swap(workout, position, library, random)` is pure and picks at random among Exercises eligible for the same Block and not already in the Workout, preferring the same primary Muscle group
- [x] Swapping a main-Block Exercise changes it in every Round, then refits the Rounds to the time
- [x] `swap` reports when no other Exercise is eligible; the row's Swap button is then disabled
- [x] Each preview row has a Swap button; pressing it again gives another option; there's no undo
- [x] The swapped Workout is what's saved as the current Workout
- [x] Unit tests for every Swap rule; app test for swapping from the preview

## Comments

Done on `main`.

- **Interface:** `swap(workout, position, library, random)` returns `Workout | null`, where `null` means no other Exercise is eligible. It sits alongside `canSwap(workout, position, library)`, which the preview uses to disable the button before anyone presses it. The spec puts this report inside `swap`'s result; we split it out because the button state has to be known up front. `SetPosition` is `{ block: 'warmUp' | 'main' | 'coolDown', index }`.
- **Choices made:**
  - "Same primary Muscle group" means sharing any primary group.
  - Every swap refits the main Block's Rounds, not just main swaps. A per-side warm-up or cool-down Exercise doubles its Set, and the refit keeps the total near the chosen time. When the Set length doesn't change, the Rounds don't either.
  - A main swap doesn't re-apply the generation preferences (neighbours, exact Difficulty, Equipment), since the spec's Swap rule doesn't ask for them.
- **Refactors:** the Set for each Block is now built in one place, by `blockSet(exercise, role, request)` in `generate.ts`. `allSets(workout)` lives in `workout.ts`. The Exercise test fixtures are shared in `src/test/exercises.ts`.
