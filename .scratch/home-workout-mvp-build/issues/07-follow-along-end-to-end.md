# 07: Follow-along: play a Workout end to end

Spec: [Home Workout MVP](../../home-workout-mvp/spec.md), sections "Screens" (Follow-along) and "Follow-along behaviour"; prototype on branch `prototype/follow-along` (variant B, "Timeline")

**What to build:** I press Start Workout and the app walks me through the whole Workout hands-free, from a "Get ready" countdown to the "Workout complete" screen.

**Blocked by:** [03: Generate a basic Workout and preview it](03-generate-basic-workout-and-preview.md)

**Status:** ready-for-agent

- [ ] The current Workout is flattened into an ordered list of Sets and rests (shape from the prototype, see the spec's "Workout model")
- [ ] Start Workout opens Follow-along with a 5 s "Get ready" countdown showing the first Exercise as "up next"
- [ ] "Timeline" layout: left column lists the whole Workout by Block with "Round N of M" headings, each row with a small GIF, name and target; the current row highlighted, finished rows struck through; time done / planned total above the list
- [ ] Right side: the current Exercise's GIF, name and target; during rest the label ("Change-over", "Rest", "Rest between Rounds") with "up next" and the next Exercise's GIF and target; a large countdown and a progress bar
- [ ] Every Set and rest counts down and advances automatically, rep Sets included (3 s per rep, doubled per side)
- [ ] The next Exercise's GIF is preloaded; the screen is kept awake with the Wake Lock API while following along
- [ ] A "Workout complete" screen at the end
- [ ] App tests with fake timers: Get ready, automatic advance through Sets and rests, change-over between Blocks, rest labels and "up next", the complete screen
