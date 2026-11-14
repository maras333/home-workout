# 05: Preview actions and the Exercise detail dialog

Spec: [Home Workout MVP](../../home-workout-mvp/spec.md), section "Screens"

**What to build:** from the Workout preview I can reroll the Workout, go back to change my Request, and click any Exercise to see how it's done.

**Blocked by:** [03: Generate a basic Workout and preview it](03-generate-basic-workout-and-preview.md)

**Status:** ready-for-agent

- [ ] Top bar: "← Change request" on the left; "Generate another" (secondary) and Start Workout (primary) on the right (Start may point at the Follow-along placeholder until ticket 07)
- [ ] "Generate another" replaces the Workout immediately, without confirmation, passing the previous Workout so generation steers away from its main-Block Exercises when the pool allows
- [ ] "← Change request" returns to the form with the current Request filled in
- [ ] Clicking an Exercise row opens a reusable Exercise detail dialog: large GIF, steps, "Trains: …", Equipment, Difficulty
- [ ] Generation test for steering away from the previous Workout; app tests for each action and the dialog
