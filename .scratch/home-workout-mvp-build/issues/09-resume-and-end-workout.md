# 09: Resume after reload and End Workout

Spec: [Home Workout MVP](../../home-workout-mvp/spec.md), sections "Follow-along behaviour" and "Browser storage"

**What to build:** if the page reloads mid-Workout I come back where I was, and I can end a Workout early without it haunting me later.

**Blocked by:** [07: Follow-along: play a Workout end to end](07-follow-along-end-to-end.md)

**Status:** done

- [x] Follow-along progress (position in the Workout plus a timestamp) is saved to browser storage after every Set and rest
- [x] After a reload, Follow-along returns paused at the start of that Set or rest, with a Resume button
- [x] Saved progress older than 12 hours is ignored and cleared
- [x] "End Workout" below the Workout list asks for confirmation, then clears the saved progress and goes to the Workout Request form
- [x] Finishing a Workout clears the saved progress
- [x] App tests: resume after a remount, the 12 h cut-off, End Workout with confirm and cancel, cleared on finish

## Comments

Done on `main`; see the commit that closes this ticket.

- **Choices made:**
  - Progress is `{ index, savedAt }` under `home-workout:follow-along-progress`. It is written on every move to a new Step, Get ready included, and on opening Follow-along. It is cleared on finish and on End Workout.
  - Saving a new current Workout clears the progress. That covers Generate, "Generate another" and Swap, so saved progress always belongs to the current Workout.
  - Start Workout on the preview starts from the top and clears any progress. Resuming happens only when the Follow-along page itself is reloaded or reopened.
  - Progress for a Step beyond the Workout, or a corrupt value, starts from the top. Progress more than 12 hours old is ignored, and the fresh start then overwrites it.
  - A Workout resumed after a reload plays its Step's cue on Resume ("Go.", or the rest announcement).
  - The Workout pauses while "End this Workout?" asks. "Keep going" picks up where it was and stays paused if it was paused before. The control keys are off while the dialog is open.
  - End Workout keeps the current Workout; only the progress goes.
