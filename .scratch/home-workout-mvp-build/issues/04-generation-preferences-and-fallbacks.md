# 04: Generation preferences and fallbacks

Spec: [Home Workout MVP](../../home-workout-mvp/spec.md), section "Workout generation module"

**What to build:** Workouts that feel well put together and never fail. The main Block favours my exact Difficulty, uses my Equipment, rotates Muscle groups; warm-up and cool-down match the main Block; and a tiny pool still yields a Workout.

**Blocked by:** [03: Generate a basic Workout and preview it](03-generate-basic-workout-and-preview.md)

**Status:** ready-for-agent

- [ ] The main Block prefers Exercises at exactly the requested Difficulty
- [ ] If any Equipment is ticked, at least half the main Block uses it when the pool allows
- [ ] Muscle rotation per workout type (full body, upper body, lower body with core as filler, core with variety instead of rotation, cardio/HIIT and mobility rotating where possible); neighbouring Exercises never share a primary Muscle group where avoidable
- [ ] Warm-up and cool-down prefer Exercises that work the main Block's Muscle groups
- [ ] Mobility/stretching: gentle joint work, then stretches, then the calmest holds
- [ ] Never fails; degrades in order: drop the Equipment preference → shrink the main Block to as few as 3 Exercises and add Rounds → let warm-up or cool-down Exercises repeat
- [ ] Unit tests for each preference and each fallback step, including "never throws" on an almost-empty library
