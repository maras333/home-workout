# Home Workout

A virtual training partner for working out at home. You say what kind of Workout you want, how long it should take, how hard it should be and what Equipment you have, and the app builds a Workout and guides you through it in real time.

A hobby project for the author and a few friends: no accounts, no payments, no public launch.

**Live:** https://home-workout-mauve.vercel.app (deployed automatically from `main` by Vercel).

## Status

**Building.** Planning is done: the MVP spec and its build tickets are in `.scratch/`. The app shell is in place; features land ticket by ticket.

- [`.scratch/home-workout-mvp/map.md`](.scratch/home-workout-mvp/map.md) is the planning map: the goal, decisions so far, and what's still open.
- [`.scratch/home-workout-mvp/issues/`](.scratch/home-workout-mvp/issues/) holds one file per decision ticket, with the question and its answer.
- [`GLOSSARY.md`](GLOSSARY.md) defines the domain terms (Exercise, Workout Request, Workout, Block, Round, Set, Follow-along…).

## What the MVP will do

- **Workout Request:** pick a workout type (full body, upper body, lower body, core, cardio/HIIT, mobility/stretching), a total time (15/30/45/60 min), a Difficulty (Beginner/Intermediate/Advanced) and any Equipment you have (dumbbells, resistance band, kettlebell, chair or bench). Bodyweight is the default.
- **Rule-based generation:** a warm-up, a main Block repeated in Rounds, and a cool-down, sized to the time you chose. The logic is deterministic; no LLM.
- **Follow-along:** a timed player that lists the whole Workout on the left and plays the current Set on the right, with an animated GIF, a countdown, beeps and spoken prompts. If the page reloads, it resumes where you left off.

Everything runs in the browser on a laptop. Anything saved stays in the browser.

## Stack

Vite, React, TypeScript, React Router, Tailwind CSS v4 with shadcn/ui, and Vitest, deployed as a static site on Vercel. See [Choose the stack on Vercel](.scratch/home-workout-mvp/issues/05-choose-stack-on-vercel.md).

## Branches

- `main`: the app and its planning documents.
- `research/exercise-dataset`: cited research behind the choice of exercise dataset. Never merged.
- `prototype/follow-along`: a throwaway prototype comparing three Follow-along layouts. Run it with `cd prototype-app && npm install && npm run dev`, then open `/prototype/follow-along?variant=A`. Never merged.

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
```
