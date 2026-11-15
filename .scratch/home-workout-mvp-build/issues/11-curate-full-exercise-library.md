# 11: Curate the full Exercise library

Spec: [Home Workout MVP](../../home-workout-mvp/spec.md), section "Exercise library module" and "Further Notes"

**What to build:** the real library of about 120–150 Exercises the MVP ships with, tagged and reviewed, so every workout type is fully servable with bodyweight alone at every Difficulty. HITL: an agent drafts, the human reviews.

**Blocked by:** [02: Exercise library pipeline with a starter set](02-exercise-library-pipeline.md)

**Status:** done

- [x] An agent drafts the id list and tags for about 120–150 home-fit Exercises from the pinned snapshot; chair or bench inferred from names ("bench", "chair", "incline", "decline"); Difficulty hand-tagged
- [x] The human reviews and corrects the tags
- [x] The copy script is rerun with the final list
- [x] The data-check test gains the curation target: at least 6 bodyweight-only main-Block Exercises for every workout type × Difficulty, and passes

## Comments

Done. An agent drafted 144 tagged Exercises (105 bodyweight, 39 with Equipment) in `66c8a1d`, with the review aid in `5d50b94` (`.scratch/home-workout-mvp-build/curation-review.md`). The human reviewed the draft and its open questions and accepted the tags. The data-check test asserts at least 6 bodyweight-only main-Block Exercises for every workout type × Difficulty, and passes.
