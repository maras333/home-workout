# Spec: Home Workout MVP

Status: ready-for-agent
Map: [Home Workout MVP](map.md)

## Problem Statement

I train at home on my laptop, with my own body and maybe a pair of dumbbells, a band, a kettlebell or a chair. Every time, I have to decide what to do, for how long and in what order. Then I have to keep track of reps, Sets, rest and time myself while also trying to remember what an Exercise looks like. Ready-made video classes don't match the time I have, my level or the Equipment in the room. Fitness apps want an account, a subscription and a profile before they'll give me anything. I want to say "30 minutes, full body, Intermediate, I have dumbbells" and be walked through a sensible Workout, hands-free, from the first warm-up move to the last stretch.

## Solution

A small static web app for a laptop browser, in English, with no accounts and no server. Everything it keeps lives in the browser.

1. **Workout Request.** I pick a workout type, a total time, a Difficulty and the Equipment I have today. The form remembers my last Request.
2. **Workout preview.** The app generates a Workout with rule-based logic (no LLM): a warm-up, a main Block repeated in Rounds, and a cool-down, sized to my time. I can see the whole thing, open any Exercise to see how it's done, Swap Exercises I don't like, generate another, or save it as a Favourite.
3. **Follow-along.** I press Start and the app walks me through every Set and rest. It shows a Workout list on the left and the current Exercise's GIF with a big countdown on the right, and gives me beeps and spoken prompts so I don't have to look at the screen. If the page reloads, I pick up where I was.
4. **Favourites.** I can save a Workout I liked and start exactly that Workout again later.

Exercise data and GIFs come from the open ExerciseDB v1 dataset (AGPL-3.0), credited on every screen. The app itself is AGPL-3.0, with source on GitHub.

## User Stories

### Workout Request

1. As a user, I want to pick one of six workout types (full body, upper body, lower body, core, cardio/HIIT, mobility/stretching) shown as cards, so that I get the kind of training I want today.
2. As a user, I want full body to be selected by default, so that I can generate a Workout without choosing anything.
3. As a user, I want to choose a total time of 15, 30, 45 or 60 minutes, so that the Workout fits the time I have.
4. As a user, I want 30 minutes to be the default time, so that the common case needs no clicks.
5. As a user, I want the chosen time to be the whole Workout, including warm-up, cool-down and all rest, so that I know when I'll be done.
6. As a user, I want to choose Beginner, Intermediate or Advanced, so that the Workout matches how fit I am.
7. As a user, I want Intermediate to be the default Difficulty, so that I don't have to choose it each time.
8. As a user, I want a one-line hint under each Difficulty, so that I can tell which level is mine.
9. As a user, I want to tick any of dumbbells, resistance band, kettlebell and chair or bench, so that the Workout uses what I have today.
10. As a user, I want no Equipment ticked by default and bodyweight always available, so that I get a Workout even with nothing.
11. As a user, I want the form to be filled in with my last Workout Request when I come back, so that repeating my usual Workout takes one click.
12. As a user, I want a "Generate" button, so that I get a Workout built from my Request.

### Workout generation

13. As a user, I want every Workout to have a warm-up, a main Block and a cool-down, so that I warm up before working hard and cool down after.
14. As a user, I want the Workout's planned length to land within about ±10% of the time I chose, so that I can plan around it.
15. As a user, I want only Exercises I can do with my ticked Equipment, so that I'm never asked to use something I don't have.
16. As a user, I want only Exercises at or below my Difficulty, so that I'm not given moves beyond my level.
17. As a user, I want the main Block to favour Exercises at exactly my Difficulty, so that it's challenging enough.
18. As a user with Equipment ticked, I want at least half of the main Block to use it when possible, so that the Equipment I set up gets used.
19. As a user, I want the main Block to rotate through the Muscle groups of my workout type, with neighbouring Exercises never hitting the same primary group when that can be avoided, so that I don't burn out one area.
20. As a user, I want the main Block's Exercises repeated in Rounds until the time is used, so that the Workout has a simple, followable structure.
21. As a user, I want the last Round to be allowed to stop part-way, so that the Workout fits my time instead of overrunning.
22. As a user, I want warm-up and cool-down Exercises that work the same Muscle groups as my main Block, so that I prepare and recover the right areas.
23. As a user, I want rep counts, Set lengths and rest to follow my Difficulty, so that a Beginner gets more rest and an Advanced user gets more work.
24. As a user doing cardio/HIIT, I want work and rest intervals that suit my Difficulty, so that the intensity is right.
25. As a user doing mobility/stretching, I want gentle joint work, then stretches, then the calmest holds, so that the session stays easy on my body.
26. As a user, I want per-side Exercises to be one Set covering both sides, so that I don't have to track left and right myself.
27. As a user, I want a Workout even when few Exercises fit my Request, so that the app never leaves me with an error instead of a Workout.
28. As a user, I want "Generate another" to give me different main-Block Exercises than the Workout I just saw, when possible, so that rerolling actually changes something.

### Workout preview

29. As a user, I want to see the generated Workout on its own screen before starting, so that I know what's coming.
30. As a user, I want a summary line of my Request at the top (e.g. "Full body · 30 min · Intermediate · Dumbbells"), so that I can check I asked for the right thing.
31. As a user, I want to see the planned total time and the number of Exercises, so that I know how big the Workout is.
32. As a user, I want the Workout listed by Block, each Exercise with a GIF, its name and its target ("12 reps", "40 s per side"), so that I can scan it quickly.
33. As a user, I want the main Block shown once with its Rounds noted ("5 Exercises × 4 Rounds (last Round: 2 Exercises)"), so that the list stays short.
34. As a user, I want to click any Exercise to open a detail dialog with a large GIF, the steps, "Trains: …", the Equipment and the Difficulty, so that I can learn a move I don't know.
35. As a user, I want to Swap a single Exercise I don't like for another that fits the same Block, so that I can fix one thing without rerolling everything.
36. As a user, I want a Swap to prefer an Exercise that trains the same primary Muscle group, so that the Workout stays balanced.
37. As a user, I want a Swap never to pick an Exercise already in the Workout, so that nothing repeats.
38. As a user, I want swapping a main-Block Exercise to change it in every Round, and the Rounds to be refitted to my time, so that the Workout still fits.
39. As a user, I want to press Swap again to get a different option, so that I can keep looking until I like it.
40. As a user, I want the Swap button disabled when no other Exercise fits, so that I'm not confused by a button that does nothing.
41. As a user, I want "Generate another" to replace the Workout straight away, so that rerolling is quick.
42. As a user, I want "← Change request" to take me back to the form with my Request filled in, so that I can adjust one field.
43. As a user, I want a prominent Start Workout button, so that beginning is obvious.
44. As a user, I want reloading the preview to show the same Workout, swaps included, so that I don't lose it.
45. As a user who opens the preview with nothing generated, I want to be sent to the Workout Request form, so that I'm never on an empty screen.

### Follow-along

46. As a user, I want to press Start Workout once and then get a 5-second "Get ready" countdown before the first Set, so that sound can play and I have time to get into position.
47. As a user, I want the whole Workout listed on the left, grouped by Block with "Round N of M" headings, so that I always know where I am.
48. As a user, I want the current Set highlighted and finished Sets struck through, so that I can see my progress.
49. As a user, I want time done out of the planned total shown above the list, so that I know how long is left.
50. As a user, I want the current Exercise's GIF, name and target large on the right, so that I can follow it from a few steps away.
51. As a user, I want a large countdown and a progress bar for every Set, so that I know how long to keep going.
52. As a user, I want rep Sets to count down too, timed at 3 seconds per rep, so that the Workout flows without me touching the laptop.
53. As a user, I want each Set and rest to move on by itself when its time runs out, so that I can train hands-free.
54. As a user, I want rest to show "Rest", "Change-over" or "Rest between Rounds" with a countdown and the next Exercise's GIF and target, so that I can get ready for it.
55. As a user doing a per-side Exercise, I want a "Side 1 of 2" badge that switches to "Side 2 of 2 — switch!" halfway through, with a double beep and the spoken cue "Switch sides", so that I know when to change sides.
56. As a user, I want 3-2-1 beeps before each Set or rest ends and a tone when a Set starts, so that I can follow by ear.
57. As a user, I want spoken prompts ("Rest. Next: push-up, 12 reps.", "Go.", "Workout complete."), so that I don't have to look at the screen.
58. As a user, I want beeps and voice on by default, with two small toggles (🔔, 🗣) that the browser remembers, so that I can silence either one.
59. As a user, I want to pause and resume, with Space as a shortcut, so that I can take a break.
60. As a user, I want to skip to the next Set or rest, with N as a shortcut, so that I can jump past something.
61. As a user, I want Back (B) to restart the current Set if I'm more than 3 seconds in, or otherwise go to the previous Exercise, so that I can redo something.
62. As a user, I want the laptop screen kept awake during Follow-along, so that it doesn't go dark mid-Set.
63. As a user, I want a "Workout complete" screen at the end, so that I know I'm done.
64. As a user, I want an "End Workout" button that asks me to confirm, then returns me to the Workout Request form, so that I can stop early without losing my place by accident.
65. As a user whose page reloaded mid-Workout, I want to come back paused at the start of the Set or rest I was on, with a Resume button, so that I can carry on.
66. As a user who abandoned a Workout yesterday, I want its saved progress dropped after 12 hours, so that an old session doesn't come back.

### Favourites

67. As a user, I want a ☆ Save button in the Workout preview and on the "Workout complete" screen, so that I can keep a Workout I liked.
68. As a user, I want a Favourite to keep the exact Workout (Exercises, Set targets, Rounds, swaps), so that starting it again gives me the same session.
69. As a user, I want Favourites named automatically (e.g. "Full body · 30 min · Intermediate · 14 Nov"), so that saving takes one click.
70. As a user, I want pressing Save again on the same Workout to remove it from Favourites, so that I can undo a save.
71. As a user, I want a Favourites section under the Workout Request form, hidden when I have none, so that my saved Workouts are easy to find.
72. As a user, I want each Favourite to show its name, Exercise count, a Start button and Delete, so that I can manage them.
73. As a user, I want Delete to ask for confirmation, so that I don't lose a Favourite by accident.
74. As a user, I want Start on a Favourite to open it in the Workout preview, so that I can check it or start Follow-along.
75. As a user, I want Swaps on a started Favourite to change only the current copy, so that my saved Favourite stays as it was.
76. As a user, I want at most 20 Favourites, with Save disabled and the hint "Favourites full — delete one first" when full, so that nothing is ever deleted behind my back.
77. As a user, I want a Favourite that uses an Exercise no longer in the library to be greyed out as "No longer available", with only Delete, so that I'm not given a broken Workout.

### Credits and source

78. As a user, I want a small footer on every screen reading "Exercise data & GIFs: ExerciseDB (AGPL-3.0) · Source code", with links to the dataset and to this repo, so that credit and source are always one click away.
79. As the author, I want the repo public on GitHub under AGPL-3.0, so that the app meets its licence for anyone who uses the deployment.

### Exercise library (author)

80. As the author, I want a curated library of about 120–150 Exercises copied from the pinned ExerciseDB v1 snapshot, so that the app only ships Exercises I've checked.
81. As the author, I want a one-off script that copies the chosen Exercises' records and GIFs from the pinned commit, given a list of Exercise ids, so that I can change the selection and run it again.
82. As the author, I want my own tags kept in a separate file keyed by Exercise id, so that the copied dataset files stay unmodified.
83. As the author, I want a test that fails when an Exercise has no GIF, has invalid tags, or a workout type × Difficulty has fewer than 6 bodyweight-only main-Block Exercises, so that bad curation can't be deployed.

## Implementation Decisions

### Stack and hosting

- A Vite + React + TypeScript (strict mode) single-page app, built to static files and deployed on Vercel. No server code, no server-side endpoint, no database.
- React Router, one route per screen, with a catch-all rewrite in the Vercel config so a page reload doesn't return 404. Routes: the Workout Request form (with the Favourites section), the Workout preview at `/workout`, and Follow-along on its own route. The "Workout complete" screen is the end of Follow-along.
- Tailwind CSS v4 (Vite plugin) with shadcn/ui, set up with an `@/` path alias for the source folder. Only the components actually used are added; they're copied in as our own code.
- Vitest and React Testing Library. npm, ESLint + Prettier, Node LTS.
- AGPL-3.0 for the whole repo (`LICENSE` already at the root). The README has a Credits section.

### Exercise library module

- The library is a curated subset (about 120–150) of the ExerciseDB v1 snapshot, pinned to `bootstrapping-lab/exercisedb-api` at commit `7cdc82e`. Only the subset's records and GIFs are copied into the repo, unmodified, by a one-off script that takes a list of Exercise ids. The folder holding the copied files has a README naming the source repo and commit, stating that the files are an unmodified subset, and pointing to the licence.
- Our tags live in a separate curation file keyed by Exercise id, layered over the unmodified dataset. An agent drafts it; the human reviews it.
- The library is a typed module built into the app bundle (not loaded at runtime). Each Exercise exposes:
  - **id:** the dataset's `exerciseId`
  - **name**
  - **steps:** the dataset's instructions with the "Step:N " prefix removed
  - **Muscle groups:** primary and secondary, from the seven groups chest, back, shoulders, arms, core, glutes, legs. The dataset's 19 values map onto these; legs = quads + hamstrings + calves + adductors/abductors.
  - **Equipment:** zero or more of dumbbells, resistance band, kettlebell, chair or bench. None means bodyweight. Chair or bench is inferred from Exercise names, since the dataset has no tag for it.
  - **Difficulty:** exactly one of Beginner, Intermediate, Advanced (hand-tagged; the dataset has none)
  - **workout types:** one or more of the six
  - **Block roles:** one or more of warm-up, main, cool-down
  - **measure:** reps or time
  - **per side:** yes or no
- "Trains: …" text on an Exercise is generated from its Muscle groups. No description is written by hand.
- GIFs are served as static files named by Exercise id, from Vercel's CDN, loaded only when shown. Follow-along preloads the next Exercise's GIF. They are never hotlinked from the dataset or its CDN, and never embedded in the bundle.

### Workout model

- **Workout Request:** workout type, total time (15/30/45/60), Difficulty, ticked Equipment (a set of the four).
- **Workout:** the Request it answers and three Blocks (warm-up, main, cool-down). The main Block holds a list of Exercises and a number of Rounds, where the last Round may be partial (stop after Set k). Each Set has an Exercise, a target (reps or seconds) and whether it's per side. Rest lengths follow from the rules below.
- For Follow-along, a Workout is flattened into an ordered list of Sets and rests. This shape comes from the prototype (trimmed):

  ```ts
  type Step =
    | { kind: 'work'; block: BlockName; round?: number; rounds?: number;
        exercise: Exercise; measure: 'time' | 'reps'; reps?: number;
        perSide: boolean; seconds: number } // planned: a rep = 3 s, doubled per side
    | { kind: 'rest'; label: 'Change-over' | 'Rest' | 'Rest between Rounds';
        block: BlockName; seconds: number }
    | { kind: 'ready'; block: BlockName; seconds: number }
  ```

### Workout generation module (seam 1)

- Interface: **generate**(Workout Request, library, random source, previous Workout optional) → Workout, and **swap**(Workout, position of an Exercise, library, random source) → Workout. Both are pure; the random source is passed in, so tests can reproduce a Workout and "Generate another" just uses a new seed.
- **Time split per preset** (minutes, warm-up / main / cool-down): 15 → 3/10/2, 30 → 5/21/4, 45 → 6/34/5, 60 → 8/45/7. Target: total planned length within ±10% of the chosen time.
- **Main Block:** a fixed number of Exercises per preset (15 → 4, 30 → 5, 45 → 6, 60 → 6), repeated in Rounds until its time is used. The last Round stops after the Set that lands nearest the budget. Warm-up and cool-down are a single pass holding as many Exercises as fit.
- **Reps or time:** warm-up, cool-down, cardio/HIIT and mobility/stretching always use timed Sets. In the main Block of full body, upper body, lower body and core, a Set uses the Exercise's own measure. For time fitting, a rep counts as 3 s, doubled for per-side Exercises. A per-side Exercise is one Set with doubled time or "N reps per side".
- **Work and rest by Difficulty (main Block):**

  | | Beginner | Intermediate | Advanced |
  |---|---|---|---|
  | Strength reps | 8 | 12 | 15 |
  | Strength timed Set | 30 s | 40 s | 45 s |
  | Rest after each Set | 30 s | 20 s | 15 s |
  | Rest between Rounds | 60 s | 60 s | 45 s |
  | Cardio/HIIT work / rest | 20 / 40 s | 30 / 30 s | 40 / 20 s |

  Independent of Difficulty: warm-up 30 s per Exercise; cool-down and mobility 40 s holds (per side where it applies); 10 s change-over between Exercises, **including between Blocks** (warm-up → main, main → cool-down). Rest between Rounds applies only between Rounds of the main Block.
- **Mobility/stretching:** warm-up is gentle joint work, the main Block is stretches, the cool-down is the calmest holds.
- **Eligibility:** an Exercise is eligible when its workout types include the requested type, its Block roles include the Block being filled, all the Equipment it needs is ticked, and its Difficulty is at or below the requested one.
- **Preferences:**
  - the main Block prefers Exercises at exactly the requested Difficulty
  - if any Equipment is ticked, at least half the main Block uses it when the pool allows
  - the main Block rotates through the type's Muscle groups, and neighbouring Exercises never share a primary group where avoidable:
    - full body: legs, glutes, chest, back, shoulders, core (arms optional)
    - upper body: chest, back, shoulders, arms
    - lower body: legs, glutes, with core as a filler
    - core: core only, with no rotation; Exercises vary instead
    - cardio/HIIT and mobility: any Exercise tagged with that type, rotating groups where possible
  - warm-up and cool-down prefer Exercises that work the main Block's Muscle groups
- **Randomness:** picks are random among eligible Exercises, with no repeats within a Block. Given a previous Workout, generation steers away from its main-Block Exercises when the pool allows.
- **Never fails.** When the pool is too small, it degrades in this order: (1) drop the Equipment preference; (2) shrink the main Block to as few as 3 Exercises and add Rounds; (3) let warm-up or cool-down Exercises repeat.
- **Swap:** picks at random from Exercises that are eligible for the same Block and not already in the Workout, preferring the same primary Muscle group. A main-Block swap changes the Exercise in every Round, then the Rounds are refitted to the time. The result reports when no other Exercise is eligible, so the UI can disable the button.

### Screens

- **Workout Request form:** six workout-type cards, time presets, Difficulty with its one-line hints, four Equipment checkboxes, Generate. Below it, the Favourites section (hidden when empty).
- **Workout preview (`/workout`):**
  - a top bar with "← Change request" on the left, and "Generate another" (secondary), ☆ Save and Start Workout (primary) on the right
  - the Request summary line, then the planned total time and Exercise count
  - the Workout list by Block, with the main Block compacted to "N Exercises × R Rounds (last Round: k Exercises)"
  - no rest rows; rest is included in the total
  - a Swap button per row, and the Exercise detail dialog on row click
- **Exercise detail dialog:** a large GIF, steps, "Trains: …", Equipment, Difficulty. Built as a reusable component.
- **Follow-along ("Timeline" layout):**
  - **Left column:** the full Workout by Block with "Round N of M" headings; each row has a small GIF, name and target; the current row is highlighted and finished rows are struck through. Time done / planned total above it, "End Workout" below it.
  - **Right side:** the current Set, or during rest the label plus "up next"; a large countdown, a progress bar, and Back / Pause / Skip.
  - **Corner:** the 🔔 and 🗣 toggles.
  - A "Start Workout" click begins the session (which also unlocks browser audio) with a 5-second "Get ready" countdown showing the first Exercise as "up next".
- **Workout complete:** a completion message and ☆ Save.
- **Footer** on every screen: "Exercise data & GIFs: ExerciseDB (AGPL-3.0) · Source code", linking to the pinned dataset commit and to this repo.

### Follow-along behaviour

- Every Set and rest counts down and advances automatically when it reaches zero, rep Sets included (3 s per rep, doubled per side). There's no "Done" button.
- Per-side Sets: the side badge switches at half time, with a double beep and the spoken "Switch sides".
- Controls and keys: Space pauses and resumes; N skips to the next Set or rest; B restarts the current Set if more than 3 s in, otherwise goes to the previous Exercise. "End Workout" asks for confirmation, then clears the saved progress and goes to the Workout Request form.
- **Beeps:** 3-2-1 before each Set or rest ends, a start tone when a Set begins, a double beep at the side switch, a finish tone. Generated in the browser; no audio files.
- **Voice** (the browser's built-in speech):
  - at each rest: "<rest label>. Next: <Exercise>, <target>."
  - when a Set starts: "Go."
  - at the side switch: "Switch sides."
  - at the end: "Workout complete."
- The screen is kept awake with the Wake Lock API while following along.

### Browser storage

Everything is stored in `localStorage`, read defensively (a missing or corrupt value falls back to the default):

- **Last Workout Request:** prefills the form.
- **Current Workout,** swaps included: shown by the preview and played by Follow-along.
- **Follow-along progress:** the position in the Workout plus when it was saved, written after every Set and rest. On load it resumes paused at the start of that Set or rest. It's cleared on finish or "End Workout", and ignored once older than 12 hours.
- **Sound settings:** beeps on/off and voice on/off, both on by default.
- **Favourites:**
  - up to 20, each a frozen copy of the whole Workout plus its automatic name
  - starting one copies it into the current Workout
  - one is "No longer available" when any of its Exercise ids is missing from the library

## Testing Decisions

- **What a good test is:** tests check behaviour a user or caller can see, never internals. For generation that means the Workout returned. For the app it means what's on screen, what's in browser storage and which audio/speech calls were made, all after real user actions. No snapshot tests of markup, and no tests of internal state or component structure.
- **Seam 1: Workout generation.** Unit tests call `generate` and `swap` directly, with a seeded random source and small hand-built Exercise libraries made for each case. Cases to cover:
  - the time split and ±10% fitting for every preset
  - the partial last Round
  - the work/rest tables per Difficulty, and cardio/HIIT intervals
  - timed Sets for warm-up, cool-down, cardio/HIIT and mobility
  - per-side doubling
  - each eligibility rule
  - each preference: exact Difficulty, Equipment at least half, Muscle rotation with no neighbours sharing a primary group, warm-up/cool-down matching
  - no repeats within a Block
  - steering away from the previous Workout
  - each fallback step when the pool is small, and that generation never throws
  - Swap: eligibility, no duplicates, same-group preference, applied to every Round, Rounds refitted, and reporting when nothing else fits
  - the same seed gives the same Workout
- **Seam 2: the whole app.** React Testing Library renders the app, with fake timers, the jsdom `localStorage`, and fakes for browser audio, speech and the Wake Lock API. Cases to cover:
  - form defaults and prefilling from the last Request
  - Generate → preview: summary, totals, compact main Block, Swap, the detail dialog, "Generate another", "Change request", redirect when nothing is saved
  - Follow-along: the 5 s "Get ready" countdown, countdown and automatic advance, the 10 s change-over between Blocks, rest labels and "up next", the side switch at half time, pause/skip/back by button and key, beeps and voice as calls on the fakes, the sound toggles remembered, "End Workout" with confirmation, the complete screen
  - resume after a remount, paused at the start of the Set or rest; progress ignored after 12 hours
  - Favourites: save and un-save from both places, the section hidden when empty, Start → preview, Swap not changing the saved copy, the 20 cap with its hint, Delete with confirmation, "No longer available"
  - the footer credit present on every screen
- **Data check** (not a seam): a Vitest suite over the real curated library asserts:
  - every Exercise has a GIF file
  - every Exercise has valid tags (known Muscle groups, Equipment, Difficulty, workout types, Block roles, measure)
  - every workout type × Difficulty has at least 6 bodyweight-only main-Block Exercises
- **Prior art:** none in this repo yet; these are the first tests. The Follow-along prototype (branch `prototype/follow-along`) shows the behaviour to reproduce, but its code is throwaway and untested.

## Out of Scope

- A browsable Exercise library page; Exercises are only seen inside a Workout, through the detail dialog.
- An automatic list of recent or finished Workouts (history); only Favourites are kept.
- Renaming Favourites.
- User profiles, progression, and adapting from past Workouts.
- Accounts, a backend database, any server-side endpoint.
- LLM-generated Workouts.
- Mobile-first or PWA design.
- Languages other than English.
- Payments, public launch.
- Music during workouts.
- Producing our own exercise videos or animations; hand-written Exercise descriptions; Exercises without a GIF.
- Equipment beyond dumbbells, resistance band, kettlebell, chair or bench (no yoga mat); weight inputs or prescribed loads.
- Free text, focus muscle, injuries or excluded Exercises in the Workout Request.
- A "Done" button for rep Sets; per-side Exercises as two separate Sets.
- End-to-end (Playwright) tests.

## Further Notes

- **Decision record:** every decision here comes from a resolved ticket on the [Home Workout MVP](map.md) map. The full reasoning is in each ticket's Answer.
- **Settled while writing this spec** (not in any ticket): the pause between Blocks is the normal 10 s change-over, and Follow-along opens with a 5 s "Get ready" countdown. Both match the prototype.
- **Curation is build work, not a decision:** drafting the curation file, inferring chair or bench from names, and hand-tagging Difficulty. It must pass the data check before release.
- **Known dataset limits, accepted:** GIFs are 180×180 px and blurry when scaled up. Classic warm-up moves like arm circles, jumping jacks and cat-cow aren't in the dataset; warm-up and mobility are built from what is there.
- **Research and prototype:** the cited dataset research is on branch `research/exercise-dataset`; the three Follow-along layouts are on branch `prototype/follow-along`.
- **Before deploying:** the repo is already public, and the footer and README credits must ship with the first deploy.
