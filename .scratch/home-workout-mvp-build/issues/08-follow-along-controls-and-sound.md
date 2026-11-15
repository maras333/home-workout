# 08: Follow-along controls and sound

> Archived: this ticket now lives in GitHub issue [#18](https://github.com/maras333/home-workout/issues/18).

Spec: [Home Workout MVP](../../home-workout-mvp/spec.md), section "Follow-along behaviour"

**What to build:** during Follow-along I can pause, skip and go back, I'm told when to switch sides, and I can follow by ear with beeps and a voice that I can switch off.

**Blocked by:** [07: Follow-along: play a Workout end to end](07-follow-along-end-to-end.md)

**Status:** done

- [x] Pause/Resume (Space), Skip (N) to the next Set or rest, Back (B): restart the current Set if more than 3 s in, otherwise go to the previous Exercise; all also as buttons
- [x] Per-side Sets show "Side 1 of 2", switching to "Side 2 of 2 — switch!" at half time, with a double beep and the spoken "Switch sides"
- [x] Beeps generated in the browser (no audio files): 3-2-1 before each Set or rest ends, a start tone when a Set begins, a double beep at the side switch, a finish tone
- [x] Voice via the browser's built-in speech: "<rest label>. Next: <Exercise>, <target>." at each rest, "Go." when a Set starts, "Switch sides.", "Workout complete."
- [x] 🔔 and 🗣 toggles in the player's top-right corner, both on by default, remembered in browser storage
- [x] App tests with fakes for audio and speech: each control by button and key, the side switch, beeps and voice as calls on the fakes, toggles remembered across a remount

## Comments

Done on `main`; see the commit that closes this ticket.

- **Choices made:**
  - Back during a rest works like during a Set. More than 3 s in, it restarts the rest. Otherwise it goes to the previous Exercise. With no earlier Exercise (Get ready, or the first Set), it restarts the current Step.
  - Space always pauses and resumes, even when a control has focus. Its key-up click is stopped. Enter still presses a focused button.
  - "Side 2 of 2 — switch!" shows for 3 s after the switch, then reads "Side 2 of 2".
  - The 5 s Get ready also counts down with 3-2-1. Get ready is not spoken.
  - The voice reads targets in full ("10 seconds per side"), not "10 s".
  - Cues fire when Follow-along reaches a new position, never for the position it opens on. A position reached by Skip/Back while paused plays its cue on Resume.
  - Beeps are dropped while the browser holds audio back. The next tap or key on Follow-along resumes it. Start Workout's click normally unlocks it already.
  - Sound settings are stored under `home-workout:sound-settings` (`loadSoundSettings`/`saveSoundSettings` in `src/workout/storage.ts`).
- **For ticket 09:**
  - The player state is `{ index, elapsed, paused }` (`src/follow-along/player.ts`), with `tick`, `toggle-pause`, `skip` and `back` actions. Resume "paused at the start" means starting it with `paused: true, elapsed: 0`.
  - `useCues` stays silent for the position it opens on. On Resume after a reload, the Set's "Go." plays.
  - The remount test in `src/follow-along.test.tsx` ("silences the beeps and the voice separately, and remembers it") expects a fresh start after a remount. It will need updating once progress resumes.
  - The test `wait` helper ticks one second per `act`, because cues only fire for positions that actually render.
