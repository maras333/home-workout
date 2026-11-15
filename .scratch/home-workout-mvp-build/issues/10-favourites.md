# 10: Favourites

> Archived: this ticket now lives in GitHub issue [#20](https://github.com/maras333/home-workout/issues/20).

Spec: [Home Workout MVP](../../home-workout-mvp/spec.md), sections "Screens" and "Browser storage"; decision in [Decide whether saved Workouts are in the MVP](../../home-workout-mvp/issues/09-decide-saved-workouts.md)

**What to build:** I can save a Workout I liked as a Favourite and later start exactly that Workout again from under the Workout Request form.

**Blocked by:** [03: Generate a basic Workout and preview it](03-generate-basic-workout-and-preview.md), [07: Follow-along: play a Workout end to end](07-follow-along-end-to-end.md)

**Status:** done

- [x] ☆ Save in the Workout preview top bar and on the "Workout complete" screen; pressing it again on the same Workout removes it from Favourites
- [x] A Favourite is a frozen copy of the whole Workout (Request, Blocks, Exercises, Set targets, Rounds, swaps) with an automatic name, e.g. "Full body · 30 min · Intermediate · 14 Nov"; no renaming
- [x] A Favourites section under the form, hidden when empty; each row shows the name, Exercise count, Start, and Delete with confirmation
- [x] Start copies the Favourite into the current Workout and opens the Workout preview; swaps there don't change the saved Favourite
- [x] At most 20; when full, Save is disabled with the hint "Favourites full — delete one first"; nothing is removed automatically
- [x] A Favourite with an Exercise id missing from the library is greyed out as "No longer available", with only Delete
- [x] App tests for each of the above

## Comments

Done on `main`; see the commit that closes this ticket.

- **Choices made:**
  - Favourites are stored as `{ id, name, workout }`, newest first, under `home-workout:favourites`. A corrupt list reads as none, and a corrupt entry is skipped.
  - "The same Workout" means structurally equal (`sameWorkout` in `src/workout/workout.ts`): key order and undefined fields are ignored, and every Set, target and stored Exercise is compared. A swapped copy is a different Workout, so saving it adds a new Favourite.
  - The name uses the local date of saving, with English month abbreviations ("14 Nov"). It is built by `favouriteName` next to `requestSummary`.
  - Start saves the Favourite as the current Workout, which also clears Follow-along progress (ticket 09), and opens the preview. The Workout keeps the Favourite's frozen Exercise data.
  - When the list is full, Save uses `aria-disabled`, not `disabled`. Keyboard and screen-reader users can still reach it and its hint. Un-saving still works when full.
  - A "No longer available" row keeps its name and Exercise count, greyed, with only Delete.
  - Each change re-reads storage first, so a Favourite saved in another tab is never written over.
  - Ids come from `crypto.randomUUID`, with a time-based fallback for plain-HTTP pages.
