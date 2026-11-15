# 02: Exercise library pipeline with a starter set

> Archived: this ticket now lives in GitHub issue [#12](https://github.com/maras333/home-workout/issues/12).

Spec: [Home Workout MVP](../../home-workout-mvp/spec.md), section "Exercise library module"

**What to build:** the full path from the pinned ExerciseDB snapshot to a typed Exercise library inside the app, proven with a small starter set (about 20–30 Exercises) that covers every workout type and Block role well enough to generate a Workout. Later the full library ([11: Curate the full Exercise library](11-curate-full-exercise-library.md)) only grows the id list and the tags.

**Blocked by:** [01: Scaffold the app shell with the credit footer](01-scaffold-app-shell.md)

**Status:** done

- [x] A one-off script that, given a list of Exercise ids, copies their records and GIFs unmodified from `bootstrapping-lab/exercisedb-api` at commit `7cdc82e`; rerunning it with a changed list updates the copy
- [x] The folder holding the copied files has a README naming the source repo and commit, stating the files are an unmodified subset, and pointing to the AGPL-3.0 licence
- [x] A separate curation file of our tags keyed by Exercise id: Muscle groups (primary and secondary, from chest, back, shoulders, arms, core, glutes, legs), Equipment (dumbbells, resistance band, kettlebell, chair or bench; none = bodyweight), one Difficulty, workout types, Block roles, measure (reps or time), per side
- [x] A typed library module, built into the bundle, joining dataset records with our tags; steps have the "Step:N " prefix removed; "Trains: …" text is derived from Muscle groups
- [x] GIFs served as static files named by Exercise id
- [x] A data-check test over the real library: every Exercise has a GIF file and valid tags (the per-type × Difficulty curation target is added in ticket 11, not here)

## Comments

Done in `32b31a4` and `506d408`.

- **Copy:** `npm run copy-exercisedb` (`scripts/copy-exercisedb.ts`). The id list is the keys of `src/library/curation.ts`. It writes the records to `src/library/exercisedb/` and the GIFs to `public/exercisedb/<id>.gif`. Each folder gets the generated README. The records live outside `public/` because Vite warns when JavaScript imports files from there.
- **Starter set:** 34 Exercises. The data check also asserts that every workout type × Block role can be filled with Beginner bodyweight Exercises (at least 3 for main, 1 otherwise). Ticket 11 replaces this with the 6-per-type × Difficulty target.
- **Notes for ticket 11:**
  - Eligibility matches workout types and Block roles independently. So a stretch tagged `main` would also be a main-Block pick for every other type it lists. Main-Block stretches are tagged mobility/stretching only.
  - Muscle-group tags are judgement calls for the human review. Jack jump has shoulders as secondary, and burpee has core, though the dataset lists neither. World greatest stretch is tagged as a Beginner warm-up.
  - The copy script skips GIFs that already exist without re-checking them. Delete a GIF to force a re-download.
