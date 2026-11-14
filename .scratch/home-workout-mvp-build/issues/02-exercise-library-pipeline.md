# 02: Exercise library pipeline with a starter set

Spec: [Home Workout MVP](../../home-workout-mvp/spec.md), section "Exercise library module"

**What to build:** the full path from the pinned ExerciseDB snapshot to a typed Exercise library inside the app, proven with a small starter set (about 20–30 Exercises) that covers every workout type and Block role well enough to generate a Workout. Later the full library ([11: Curate the full Exercise library](11-curate-full-exercise-library.md)) only grows the id list and the tags.

**Blocked by:** [01: Scaffold the app shell with the credit footer](01-scaffold-app-shell.md)

**Status:** ready-for-agent

- [ ] A one-off script that, given a list of Exercise ids, copies their records and GIFs unmodified from `bootstrapping-lab/exercisedb-api` at commit `7cdc82e`; rerunning it with a changed list updates the copy
- [ ] The folder holding the copied files has a README naming the source repo and commit, stating the files are an unmodified subset, and pointing to the AGPL-3.0 licence
- [ ] A separate curation file of our tags keyed by Exercise id: Muscle groups (primary and secondary, from chest, back, shoulders, arms, core, glutes, legs), Equipment (dumbbells, resistance band, kettlebell, chair or bench; none = bodyweight), one Difficulty, workout types, Block roles, measure (reps or time), per side
- [ ] A typed library module, built into the bundle, joining dataset records with our tags; steps have the "Step:N " prefix removed; "Trains: …" text is derived from Muscle groups
- [ ] GIFs served as static files named by Exercise id
- [ ] A data-check test over the real library: every Exercise has a GIF file and valid tags (the per-type × Difficulty curation target is added in ticket 11, not here)
