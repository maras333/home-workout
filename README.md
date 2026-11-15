# Home Workout

A virtual training partner for working out at home. You say what kind of Workout you want, how long it should take, how hard it should be and what Equipment you have, and the app builds a Workout and guides you through it in real time.

A hobby project for the author and a few friends: no accounts, no payments, no public launch.

**Live:** https://home-workout-mauve.vercel.app (deployed automatically from `main` by Vercel).

## Status

**MVP done and live.** Every build ticket is closed. What's deliberately left for later is listed under "Out of Scope" in the spec.

- [`.scratch/home-workout-mvp/spec.md`](.scratch/home-workout-mvp/spec.md) is the MVP spec: user stories, screens, behaviour, storage and testing decisions.
- [GitHub Issues](https://github.com/maras333/home-workout/issues?q=is%3Aissue) track the work: the MVP's decision tickets (#1–#10, label `decision`) and build tickets (#11–#22, label `mvp-build`), each closed with the choices made. Their original markdown files stay in `.scratch/` as an archive.
- [`.scratch/home-workout-mvp/map.md`](.scratch/home-workout-mvp/map.md) is the planning map.
- [`GLOSSARY.md`](GLOSSARY.md) defines the domain terms (Exercise, Workout Request, Workout, Block, Round, Set, Follow-along…).

## What it does

- **Workout Request:** pick a workout type (full body, upper body, lower body, core, cardio/HIIT, mobility/stretching), a total time (15/30/45/60 min), a Difficulty (Beginner/Intermediate/Advanced) and any Equipment you have (dumbbells, resistance band, kettlebell, chair or bench). Bodyweight is the default.
- **Rule-based generation:** a warm-up, a main Block repeated in Rounds, and a cool-down, sized to the time you chose. The logic is deterministic; no LLM.
- **Workout preview:** see the whole Workout, open any Exercise for its steps, Swap an Exercise you don't like, or generate another.
- **Follow-along:** lists the whole Workout on the left and plays the current Set on the right, with an animated GIF, a countdown and progress bar. Every Set and rest advances by itself.
  - Pause/Resume (Space), Skip (N) and Back (B), also as buttons; "End Workout" asks first.
  - Beeps and a spoken voice (each can be switched off), including "switch sides" on per-side Sets.
  - If the page reloads, it comes back paused where you left off.
- **Favourites:** save a Workout you liked (up to 20) and start exactly that Workout again from under the form.

Everything runs in the browser on a laptop. Anything saved stays in the browser.

## Stack

Vite, React, TypeScript, React Router, Tailwind CSS v4 with shadcn/ui, and Vitest, deployed as a static site on Vercel. See [Choose the stack on Vercel](.scratch/home-workout-mvp/issues/05-choose-stack-on-vercel.md).

## Branches

`main` holds the app and its planning documents. The cited research behind the choice of exercise dataset is in [`docs/research/exercise-dataset.md`](docs/research/exercise-dataset.md). The throwaway Follow-along prototype lived on its own branch, was never merged and was deleted once the MVP shipped; the layout chosen is recorded in [decision ticket 06](.scratch/home-workout-mvp/issues/06-prototype-follow-along.md).

## Credits

Exercise data and GIFs come from **ExerciseDB v1**, licensed AGPL-3.0, vendored from [`bootstrapping-lab/exercisedb-api` at commit `7cdc82e`](https://github.com/bootstrapping-lab/exercisedb-api/tree/7cdc82e).

## Licence

Licensed under the **GNU Affero General Public License v3.0 (AGPL-3.0)**, the same licence as the ExerciseDB data and GIFs it bundles. See [LICENSE](LICENSE), and [Choose the app's licence](.scratch/home-workout-mvp/issues/07-choose-app-licence.md) for why.

## Running locally

Requires Node 24.

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # Vitest + React Testing Library
npm run typecheck
npm run lint
npm run build      # static build in dist/
npm run check      # typecheck, lint, format check and tests, as CI runs them
```
