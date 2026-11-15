# Choose the stack on Vercel

> Archived: this ticket now lives in GitHub issue [#5](https://github.com/maras333/home-workout/issues/5).

Type: grilling
Status: resolved
Map: [Home Workout MVP](../map.md)

## Question

Which framework, language, styling approach and test tooling does this static web app on Vercel use? How are the Exercise data and GIFs served: bundled, hotlinked, or as static assets?

## Answer

**A Vite + React + TypeScript single-page app, built to static files and deployed on Vercel.** No server code.

### Stack

- **Framework and language:** Vite, React, TypeScript in strict mode. We rejected Next.js static export (unused server features), SvelteKit and plain TypeScript.
- **Moving between screens:** React Router, one route per screen (Workout Request, Workout preview, Follow-along, and later possibly an Exercise library). A catch-all rewrite in `vercel.json` stops a page reload from returning 404. Whether a reload mid-Workout resumes where you were is for [Prototype the Follow-along screen](06-prototype-follow-along.md) to decide.
- **Styling and components:** Tailwind CSS v4 (the `@tailwindcss/vite` plugin) plus **shadcn/ui**, set up with `npx shadcn@latest init -t vite` and an `@/` → `src/` path alias. We add only the components we use; they're copied into `src/components/ui/` as our own code. We rejected Mantine (its own styling system would clash with Tailwind) and MUI/Chakra (too heavy).
- **Tests:** Vitest, mostly on Workout generation, plus a few React Testing Library tests. No end-to-end tests in the MVP. **The generator takes its source of randomness as an input** (a seedable random generator), so tests give the same result every time and "Generate another" just uses a new seed.
- **Tooling:** npm, ESLint + Prettier, Node LTS.

### Exercise data and GIFs

- **Vendored:** only the curated subset (~150 Exercise records and their GIFs), copied from the pinned `bootstrapping-lab/exercisedb-api@7cdc82e` by a one-off script that takes a list of Exercise ids. Changing the selection means editing the list and rerunning the script.
- **Our own tags** (Difficulty, workout types, Block roles and so on) live in a separate file, keyed by Exercise id. The vendored files stay unmodified.
- **Exercise data:** a typed file built into the app bundle, so it's there at startup and the type checker catches malformed tags at build time. We rejected loading JSON at runtime and a server API.
- **GIFs:** static files at `public/gifs/<exerciseId>.gif`, served by Vercel's CDN and loaded only when shown; Follow-along preloads the next Exercise's GIF. A Vitest check makes sure every curated Exercise has a GIF. We rejected Vite-imported hashed GIFs, hotlinking and embedding them in the bundle as data URLs.
