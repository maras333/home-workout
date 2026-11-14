# 10: Favourites

Spec: [Home Workout MVP](../../home-workout-mvp/spec.md), sections "Screens" and "Browser storage"; decision in [Decide whether saved Workouts are in the MVP](../../home-workout-mvp/issues/09-decide-saved-workouts.md)

**What to build:** I can save a Workout I liked as a Favourite and later start exactly that Workout again from under the Workout Request form.

**Blocked by:** [03: Generate a basic Workout and preview it](03-generate-basic-workout-and-preview.md), [07: Follow-along: play a Workout end to end](07-follow-along-end-to-end.md)

**Status:** ready-for-agent

- [ ] ☆ Save in the Workout preview top bar and on the "Workout complete" screen; pressing it again on the same Workout removes it from Favourites
- [ ] A Favourite is a frozen copy of the whole Workout (Request, Blocks, Exercises, Set targets, Rounds, swaps) with an automatic name, e.g. "Full body · 30 min · Intermediate · 14 Nov"; no renaming
- [ ] A Favourites section under the form, hidden when empty; each row shows the name, Exercise count, Start, and Delete with confirmation
- [ ] Start copies the Favourite into the current Workout and opens the Workout preview; swaps there don't change the saved Favourite
- [ ] At most 20; when full, Save is disabled with the hint "Favourites full — delete one first"; nothing is removed automatically
- [ ] A Favourite with an Exercise id missing from the library is greyed out as "No longer available", with only Delete
- [ ] App tests for each of the above
