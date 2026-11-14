# Choose the app's licence

Type: grilling
Status: resolved
Map: [Home Workout MVP](../map.md)

## Question

The chosen dataset (ExerciseDB v1 data and GIFs) is AGPL-3.0; see [Choose an exercise dataset with GIFs](01-choose-exercise-dataset.md). Should this repo be published under AGPL-3.0 too, which is the zero-risk route?

If not, how is the bundled dataset kept clearly separate, and what are the risks? Also settle where and how the app credits ExerciseDB and links to the source.

## Answer

**Publish the whole repo under AGPL-3.0**, the same licence as the bundled ExerciseDB data and GIFs.

- **Licence:** AGPL-3.0 for everything, with a `LICENSE` file at the repo root. We rejected splitting into MIT code plus an AGPL data folder. Whether a static bundle counts as one combined work is unclear, and a hobby app gains nothing from taking that risk.
- **Source offer:** the repo is public on GitHub and the app links to it. That satisfies AGPL's network clause for anyone who uses the Vercel deployment.
- **Credit**, in three places (no About page):
  - **App footer**, small, on every screen: "Exercise data & GIFs: ExerciseDB (AGPL-3.0) · Source code". The first part links to the pinned `bootstrapping-lab/exercisedb-api@7cdc82e` copy, the second to this repo.
  - **Vendored data folder:** a `README` naming the origin repo and the pinned commit, stating the files are an unmodified subset of the original, and pointing to the licence.
  - **Root README:** a "Credits" section with the same links.
