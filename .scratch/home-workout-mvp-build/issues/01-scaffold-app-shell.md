# 01: Scaffold the app shell with the credit footer

Spec: [Home Workout MVP](../../home-workout-mvp/spec.md)

**What to build:** a deployable, empty app on the decided stack. Opening it shows placeholder screens for the Workout Request form, the Workout preview (`/workout`) and Follow-along, each with the ExerciseDB credit footer. Reloading any route works on Vercel. The test setup and one passing app-level test exist, so later tickets only add tests.

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [x] Vite + React + TypeScript (strict mode) app at the repo root; `npm run dev`, `npm run build`, `npm test` and `npm run lint` all work
- [x] Tailwind CSS v4 through its Vite plugin; shadcn/ui set up with the `@/` alias to the source folder (no components added beyond what this ticket uses)
- [x] React Router with three placeholder routes: the Workout Request form, `/workout`, and Follow-along; unknown routes go to the form
- [x] A Vercel config with a catch-all rewrite to the app, so a reload on any route doesn't return 404
- [x] A footer on every screen: "Exercise data & GIFs: ExerciseDB (AGPL-3.0) · Source code", linking to `bootstrapping-lab/exercisedb-api` at commit `7cdc82e` and to this repo
- [x] Vitest + React Testing Library configured with jsdom; one app test renders each route and finds the footer
- [x] ESLint + Prettier configured; Node LTS noted in the project config
