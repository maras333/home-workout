# Define the Exercise library shape

Type: grilling
Status: resolved
Blocked by: 01
Map: [Home Workout MVP](../map.md)

## Question

Given the dataset chosen in [Choose an exercise dataset with GIFs](01-choose-exercise-dataset.md), settle:
- which fields every Exercise carries (muscles, Equipment, difficulty, which workout types it suits, rep-based or time-based, unilateral?)
- how many Exercises the MVP ships
- how much hand curation or re-tagging the dataset needs

## Answer

**Size:** the MVP ships a hand-picked subset of about **120–150 Exercises** from the vendored ExerciseDB v1 snapshot. It does not ship all 814 home-fit ones. Every workout type must be fully servable with bodyweight alone, with several options at every Difficulty.

**Fields every Exercise carries:**
- id (the dataset's `exerciseId`), name, GIF
- **steps**: the dataset's instructions with the "Step:N " prefix removed
- **muscle groups**: primary and secondary, from 7 coarse groups: chest, back, shoulders, arms, core, glutes, legs. The dataset's 19 values map onto these; legs = quads + hamstrings + calves + adductors/abductors. Cardio is a workout type, not a muscle group.
- **Equipment**: zero or more of dumbbells, resistance band, kettlebell, chair or bench. None means bodyweight.
- **Difficulty**: exactly one of Beginner / Intermediate / Advanced. How generation uses it is left to [Design rule-based Workout generation](04-design-workout-generation.md).
- **workout types**: one or more of the six
- **Block roles**: one or more of warm-up, main, cool-down
- **measure**: reps or time
- **per side**: done once on each side, which doubles its duration

**Yoga mat is removed from the Equipment list.** No Exercise truly needs one, so the checkbox would filter nothing. This amends [Define the Workout Request](02-define-workout-request.md), which now has four Equipment checkboxes.

**Descriptions:** an Exercise card shows the dataset's steps plus a "Trains: …" line generated from its muscle groups. No prose is written by hand.

**Dataset gaps are accepted.** Every Exercise has a GIF; there are no text-only Exercises. Warm-up and mobility work is built from what the dataset has: joint circles, high knees, mountain climbers, light squats and lunges, and about 38 stretches. Classic moves like arm circles, jumping jacks and cat-cow are absent.

**Curation (build work, not a decision):** an agent drafts a curation file holding our tags, keyed by `exerciseId` and layered over the **unmodified** vendored dataset. The human reviews it. In the dataset, chair or bench shows up only in Exercise names ("bench", "chair", "incline", "decline") and has to be inferred from them.

Facts checked against `exercises.json` at commit `7cdc82e`:
- 814 home-fit Exercises, each with exactly one Equipment value
- target-muscle counts include abs 128, pectorals 99, glutes 81, quads 29, hamstrings 17
- 24 Exercises tagged cardio
