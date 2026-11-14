# 08: Follow-along controls and sound

Spec: [Home Workout MVP](../../home-workout-mvp/spec.md), section "Follow-along behaviour"

**What to build:** during Follow-along I can pause, skip and go back, I'm told when to switch sides, and I can follow by ear with beeps and a voice that I can switch off.

**Blocked by:** [07: Follow-along: play a Workout end to end](07-follow-along-end-to-end.md)

**Status:** ready-for-agent

- [ ] Pause/Resume (Space), Skip (N) to the next Set or rest, Back (B): restart the current Set if more than 3 s in, otherwise go to the previous Exercise; all also as buttons
- [ ] Per-side Sets show "Side 1 of 2", switching to "Side 2 of 2 — switch!" at half time, with a double beep and the spoken "Switch sides"
- [ ] Beeps generated in the browser (no audio files): 3-2-1 before each Set or rest ends, a start tone when a Set begins, a double beep at the side switch, a finish tone
- [ ] Voice via the browser's built-in speech: "<rest label>. Next: <Exercise>, <target>." at each rest, "Go." when a Set starts, "Switch sides.", "Workout complete."
- [ ] 🔔 and 🗣 toggles in the player's top-right corner, both on by default, remembered in browser storage
- [ ] App tests with fakes for audio and speech: each control by button and key, the side switch, beeps and voice as calls on the fakes, toggles remembered across a remount
