# Map: Home Workout MVP

> Archived: planning is finished. Its decision tickets now live in GitHub issues #1–#10 (label `decision`).

Label: wayfinder:map

## Destination

An MVP spec for the home-workout web app, clear enough to hand to `/to-spec` → `/to-tickets` → `/implement` with nothing left to decide.

## Notes

- Hobby project, for the author and a few friends. No payments, no public launch.
- Used in a laptop browser; English only.
- Static web app hosted on Vercel. No accounts, no backend database, no server-side endpoint; anything saved lives in the browser.
- Workouts are generated **rule-based** (deterministic logic), not by an LLM.
- Equipment: bodyweight by default; the user may add any of a fixed list: dumbbells, resistance band, kettlebell, chair or bench.
- Workout types: full body, upper body, lower body, core, cardio/HIIT, mobility/stretching.
- Tailoring is per Workout Request only; there's no user profile.
- Exercise illustrations are GIFs from an existing open dataset.
- Use the vocabulary in `GLOSSARY.md` (Exercise, Equipment, Workout Request, Workout, Block, Set, Follow-along).
- Grilling tickets: call the Skill tool for "grilling" and "domain-modeling".

## Decisions so far

<!-- one line per closed ticket: [title](path): gist -->

- [Choose an exercise dataset with GIFs](issues/01-choose-exercise-dataset.md): vendor the AGPL-3.0 ExerciseDB v1 snapshot (1,500 Exercises with GIFs) as static files; no difficulty tags, small GIFs.
- [Define the Workout Request](issues/02-define-workout-request.md): four fields (type, total time 15/30/45/60, Beginner/Intermediate/Advanced, four Equipment checkboxes); last Request prefilled; "Generate another".
- [Define the Exercise library shape](issues/03-define-exercise-library-shape.md): curated ~120–150 Exercises tagged with 7 muscle groups, Equipment, one Difficulty, workout types, Block roles, reps/time, per side; yoga mat dropped; dataset steps, no hand-written text.
- [Design rule-based Workout generation](issues/04-design-workout-generation.md): warm-up/main/cool-down split per preset; main Block of 4–6 Exercises repeated in Rounds (last may be partial); work/rest table per Difficulty; filter + prefer rules; never fails.
- [Choose the app's licence](issues/07-choose-app-licence.md): whole repo AGPL-3.0, public on GitHub; ExerciseDB credited in the app footer, the data folder README and the root README.
- [Choose the stack on Vercel](issues/05-choose-stack-on-vercel.md): Vite + React + TS SPA, React Router, Tailwind v4 + shadcn/ui, Vitest with a seedable random source; curated data built into the bundle, GIFs in `public/gifs/`.
- [Prototype the Follow-along screen](issues/06-prototype-follow-along.md): "Timeline" layout (Workout list by Block on the left, current Set on the right); everything counts down and advances automatically; halfway side switch; beeps and voice on by default; resumes after reload; "End Workout".
- [Define the Workout preview screen](issues/08-define-workout-preview.md): own `/workout` screen; compact Workout list with Rounds folded; Swap per Exercise (applies to every Round, Rounds refitted); reusable Exercise detail dialog; current Workout saved in browser storage.
- [Decide whether saved Workouts are in the MVP](issues/09-decide-saved-workouts.md): Favourites only (no recent list); a frozen copy of the Workout, saved from the preview or the finish screen; max 20; listed under the Request form; Start opens the preview.

## Not yet specified

<!-- in-scope fog not yet sharp enough to ticket -->

## Out of scope

- Music during workouts (in-app or embedded playlists).
- Producing our own exercise videos or animations.
- User profiles, progression, and adapting from past Workouts.
- An automatic list of recent or finished Workouts (history); only Favourites are kept, see [Decide whether saved Workouts are in the MVP](issues/09-decide-saved-workouts.md).
- A browsable Exercise library page; Exercises are only seen inside a Workout, through the detail dialog. See [Decide whether a browsable Exercise library page is in the MVP](issues/10-decide-exercise-library-page.md).
- Accounts, a backend database, any server-side endpoint.
- LLM-generated Workouts.
- Mobile-first or PWA design.
- Languages other than English.
- Payments, public launch.
- Equipment beyond the fixed list (yoga mat dropped from it: no Exercise needs one).
- Hand-written Exercise descriptions, and Exercises without a GIF.
