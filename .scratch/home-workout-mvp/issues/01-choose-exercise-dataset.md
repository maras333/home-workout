# Choose an exercise dataset with GIFs

> Archived: this ticket now lives in GitHub issue [#1](https://github.com/maras333/home-workout/issues/1).

Type: research
Status: resolved
Map: [Home Workout MVP](../map.md)

## Question

Which free or open exercise dataset should supply the Exercise library? Compare the candidates on:
- whether the licence allows a hobby web app to bundle or hotlink it
- GIF availability and quality
- muscle, Equipment and difficulty tags
- how well it covers bodyweight plus the fixed Equipment list (dumbbells, resistance band, kettlebell, chair or bench, yoga mat)
- description quality
- whether it can be bundled statically or needs a live API

Recommend one.

## Answer

**Use the open-source ExerciseDB v1 snapshot.** Copy its data and GIFs into this repo and serve them as static files on Vercel. Don't call any live API.

- It has 1,500 Exercises, each with its own animated GIF. 814 of them need only bodyweight, dumbbells, a band or a kettlebell.
- It is the only candidate whose licence clearly covers the GIFs.
- **Licence:** both the data and the GIFs are AGPL-3.0. Bundling them means shipping the licence text, crediting ExerciseDB and linking to the source. Publishing this repo under AGPL-3.0 as well is the zero-risk route; see [Choose the app's licence](07-choose-app-licence.md).
- **Source to copy from:** the original repo has been stripped. The full v1 data and GIFs survive in `bootstrapping-lab/exercisedb-api` at commit `7cdc82e`. Pin to that copy; don't rely on its CDN.
- **Gaps for [Define the Exercise library shape](03-define-exercise-library-shape.md):**
  - no difficulty tag, so the curated subset must be hand-tagged
  - GIFs are 180×180 px, blurry when scaled up
  - chair, bench and yoga mat aren't Equipment tags; they have to be inferred from Exercise names
- **Rejected:**
  - ExerciseDB v2 / RapidAPI: its terms forbid storing data or caching beyond an hour
  - free-exercise-db: still JPGs, unknown copyright
  - wger: only 5 GIFs
  - Everkinetic: no GIFs, no kettlebell

Full cited findings: [`docs/research/exercise-dataset.md`](../../../docs/research/exercise-dataset.md), brought into `main` from the deleted branch `research/exercise-dataset` (commit `e3f6a3c`).
