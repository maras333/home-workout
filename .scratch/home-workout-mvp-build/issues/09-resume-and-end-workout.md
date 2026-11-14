# 09: Resume after reload and End Workout

Spec: [Home Workout MVP](../../home-workout-mvp/spec.md), sections "Follow-along behaviour" and "Browser storage"

**What to build:** if the page reloads mid-Workout I come back where I was, and I can end a Workout early without it haunting me later.

**Blocked by:** [07: Follow-along: play a Workout end to end](07-follow-along-end-to-end.md)

**Status:** ready-for-agent

- [ ] Follow-along progress (position in the Workout plus a timestamp) is saved to browser storage after every Set and rest
- [ ] After a reload, Follow-along returns paused at the start of that Set or rest, with a Resume button
- [ ] Saved progress older than 12 hours is ignored and cleared
- [ ] "End Workout" below the Workout list asks for confirmation, then clears the saved progress and goes to the Workout Request form
- [ ] Finishing a Workout clears the saved progress
- [ ] App tests: resume after a remount, the 12 h cut-off, End Workout with confirm and cancel, cleared on finish
