# 06: Swap an Exercise

Spec: [Home Workout MVP](../../home-workout-mvp/spec.md), sections "Workout generation module" (Swap) and "Screens"

**What to build:** in the Workout preview I can Swap one Exercise I don't like for another that fits, leaving the rest of the Workout as it was.

**Blocked by:** [03: Generate a basic Workout and preview it](03-generate-basic-workout-and-preview.md)

**Status:** ready-for-agent

- [ ] `swap(workout, position, library, random)` is pure and picks at random among Exercises eligible for the same Block and not already in the Workout, preferring the same primary Muscle group
- [ ] Swapping a main-Block Exercise changes it in every Round, then refits the Rounds to the time
- [ ] `swap` reports when no other Exercise is eligible; the row's Swap button is then disabled
- [ ] Each preview row has a Swap button; pressing it again gives another option; there's no undo
- [ ] The swapped Workout is what's saved as the current Workout
- [ ] Unit tests for every Swap rule; app test for swapping from the preview
