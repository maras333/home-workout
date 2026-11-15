# 05: Preview actions and the Exercise detail dialog

> Archived: this ticket now lives in GitHub issue [#15](https://github.com/maras333/home-workout/issues/15).

Spec: [Home Workout MVP](../../home-workout-mvp/spec.md), section "Screens"

**What to build:** from the Workout preview I can reroll the Workout, go back to change my Request, and click any Exercise to see how it's done.

**Blocked by:** [03: Generate a basic Workout and preview it](03-generate-basic-workout-and-preview.md)

**Status:** done

- [x] Top bar: "← Change request" on the left; "Generate another" (secondary) and Start Workout (primary) on the right (Start may point at the Follow-along placeholder until ticket 07)
- [x] "Generate another" replaces the Workout immediately, without confirmation, passing the previous Workout so generation steers away from its main-Block Exercises when the pool allows
- [x] "← Change request" returns to the form with the current Request filled in
- [x] Clicking an Exercise row opens a reusable Exercise detail dialog: large GIF, steps, "Trains: …", Equipment, Difficulty
- [x] Generation test for steering away from the previous Workout; app tests for each action and the dialog

## Comments

Done on `main`.

- `generate` takes an optional previous Workout. `pickMain` ranks "not in the previous main Block" just below the Equipment-half rule and above neighbours, Difficulty and rotation. So "Generate another" keeps the ticked-Equipment promise but swaps everything else when the pool allows.
- "← Change request" saves the Workout's Request as the remembered Request before going to the form. This also changes what the form prefills next time.
- `ExerciseDetailDialog` (`src/components/ExerciseDetailDialog.tsx`) takes `exercise | null` and `onClose`, so Follow-along or Favourites can reuse it. It is built on the shadcn `ui/dialog`.
- `equipmentText` was pulled out of `requestSummary` in `src/workout/text.ts`.
