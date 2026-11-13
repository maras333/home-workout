# Map: Home Workout MVP

Label: wayfinder:map

## Destination

An MVP spec for the home-workout web app, clear enough to hand to `/to-spec` → `/to-tickets` → `/implement` with nothing left to decide.

## Notes

- Hobby project, for the author and a few friends. No payments, no public launch.
- Used in a laptop browser; English only.
- Static web app hosted on Vercel. No accounts, no backend database, no server-side endpoint; anything saved lives in the browser.
- Workouts are generated **rule-based** (deterministic logic), not by an LLM.
- Equipment: bodyweight by default; the user may add any of a fixed list: dumbbells, resistance band, kettlebell, chair or bench, yoga mat.
- Workout types: full body, upper body, lower body, core, cardio/HIIT, mobility/stretching.
- Tailoring is per Workout Request only; there's no user profile.
- Exercise illustrations are GIFs from an existing open dataset.
- Use the vocabulary in `GLOSSARY.md` (Exercise, Equipment, Workout Request, Workout, Block, Set, Follow-along).
- Grilling tickets: call the Skill tool for "grilling" and "domain-modeling".

## Decisions so far

<!-- one line per closed ticket: [title](path): gist -->

- [Choose an exercise dataset with GIFs](issues/01-choose-exercise-dataset.md): vendor the AGPL-3.0 ExerciseDB v1 snapshot (1,500 Exercises with GIFs) as static files; no difficulty tags, small GIFs.

## Not yet specified

- Saving favourite or recent Workouts in the browser: whether it's in the MVP, and what gets saved.
- A browsable Exercise library page (descriptions, muscles, GIF) outside a Workout: whether it's in the MVP and how it's navigated.
- How Exercise descriptions and "what it trains" explanations are written, if the chosen dataset's text is thin.

## Out of scope

- Music during workouts (in-app or embedded playlists).
- Producing our own exercise videos or animations.
- User profiles, progression, and adapting from past Workouts.
- Accounts, a backend database, any server-side endpoint.
- LLM-generated Workouts.
- Mobile-first or PWA design.
- Languages other than English.
- Payments, public launch.
- Equipment beyond the fixed list.
