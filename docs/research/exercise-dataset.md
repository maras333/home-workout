# Research: which exercise dataset should supply the Exercise library?

Ticket: [01-choose-exercise-dataset](../../.scratch/home-workout-mvp/issues/01-choose-exercise-dataset.md)
Researched: 2026-11-13. Counts below come from downloading each dataset and counting it myself, not from README claims, unless marked otherwise.

## Recommendation

**Use the open-source ExerciseDB v1 snapshot (AGPL-3.0): 1,500 exercises, each with its own animated GIF.** Vendor the JSON plus only the GIFs for our home subset into the repo and serve them as static files from Vercel. Do not call any live ExerciseDB API (neither RapidAPI/v2 nor the free `oss.exercisedb.dev`).

- It is the only candidate whose licence explicitly covers the GIFs. Every Exercise has a GIF. It covers our fixed Equipment list well: 814 Exercises need only bodyweight, dumbbells, bands or a kettlebell.
- **Licence caveat:** AGPL-3.0 is copyleft. Bundling it means shipping the licence text, crediting the source and making the source of the dataset (and, to be safe, the app) available. The simplest compliant route is to publish the app's repo under AGPL-3.0 too, or at least keep the vendored data in a clearly marked folder with its LICENSE and a link to the upstream source. See [Licence analysis](#licence-analysis-for-the-recommendation).
- **Gaps we must fill ourselves:**
  - There is no difficulty tag, so we hand-tag the curated subset.
  - GIFs are only 180x180 px.
  - There is no "chair" or "yoga mat" Equipment tag.
  - Exercises that need a bench are not tagged as such.

**Runner-up:** none is safe enough to recommend as-is.

- free-exercise-db has the best tags (it is the only one with difficulty), but its images are still JPGs, not GIFs, and they are scraped and of unknown copyright.
- wger and Everkinetic are cleanly licensed (CC-BY-SA) but have no GIFs and thin coverage.

## Comparison

|                            | ExerciseDB v1 (open source)                                                                   | ExerciseDB v2 / RapidAPI (AscendAPI)                          | free-exercise-db (yuhonas)                                           | wger                                                                       | Everkinetic                                             |
| -------------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------- |
| Exercises (verified)       | **1,500**                                                                                     | 11,000+ (claimed, not verified)                               | **876**                                                              | **967** (all have English text)                                            | **289**                                                 |
| Data licence               | AGPL-3.0                                                                                      | Proprietary, subscription-only                                | Unlicense (public domain)                                            | Per exercise: CC-BY-SA 4 (809), CC-BY-SA 3 (132), CC0 (26)                 | CC-BY-SA 4.0                                            |
| Media licence              | Same AGPL-3.0 repo; GIFs added in a commit titled "release ExerciseDB v1 GIFs as open source" | All media owned by AscendAPI; **storage forbidden**           | **Unknown / likely infringing**: maintainer says images were scraped | Per image CC licence + author attribution                                  | CC-BY-SA 4.0 (same repo)                                |
| Bundle or hotlink allowed? | Bundle: yes, under AGPL terms. Hotlinking the CDN works, but no terms cover it                | No bundling; real-time fetch only; paid key                   | Data yes; images at own risk                                         | Yes, with attribution + share-alike                                        | Yes, with attribution + share-alike                     |
| GIFs                       | **1,500/1,500**, animated, 180x180 px, ~97 KB each (145.5 MB total)                           | GIFs, videos, images (higher-res tiers claimed, not verified) | **None**: 2 still JPGs per exercise (850x567)                        | 389 images over 282 exercises; only **5 GIFs**                             | None: 2 SVG/PNG frames (start/end) per exercise         |
| Muscle tags                | target + secondary muscles, body part                                                         | target + secondary muscles, body part                         | primary + secondary muscles (17 muscles)                             | primary + secondary muscles (15), category                                 | primary + secondary                                     |
| Equipment tags             | Yes (28 values)                                                                               | Yes                                                           | Yes (12 values; 77 null)                                             | Yes (12 values; 228 untagged)                                              | Yes, free text, inconsistent                            |
| Difficulty tag             | **No**                                                                                        | No field (mentioned in prose `overview`)                      | **Yes**: beginner 525 / intermediate 294 / expert 57                 | No                                                                         | No                                                      |
| Home Equipment coverage    | bodyweight 372, dumbbell 319, band 67 + resistance band 10, kettlebell 46; no chair/mat tag   | n/a                                                           | body only 111, dumbbell 123, kettlebells 56, bands 20                | bodyweight 285, dumbbell 155, bench 54, band 21, kettlebell 18, gym mat 16 | body 33, dumbbell(s) 91, exercise band 7, no kettlebell |
| Instruction text           | 4-9 numbered steps (5-6 typical), clear, no overview paragraph                                | Overview + steps + tips + variations                          | 3-6 steps typical, decent                                            | Free-text HTML; median ~250 chars, 25 under 20 chars, variable quality     | Primer + steps (+ tips), good                           |
| Static bundle?             | **Yes**: JSON + GIFs in repo                                                                  | No: live API, RapidAPI key, rate limits, paid tiers           | Yes                                                                  | Yes (API dump) or live public API                                          | Yes                                                     |

## Candidates in detail

### 1. ExerciseDB v1, the open-source release

**Where it lives.** The ExerciseDB GitHub repo `ExerciseDB/exercisedb-api` was reduced to just a README and LICENSE on 2025-11-25. Its three commits are "Initial commit", "Create EXERCISEDB README.md" and "Update LICENSE". It now advertises the paid 11,000+-exercise v2 ([repo](https://github.com/ExerciseDB/exercisedb-api)).

The full v1 source, data and GIFs survive in [`bootstrapping-lab/exercisedb-api`](https://github.com/bootstrapping-lab/exercisedb-api). That repo carries the same author's history (commits by Anmol Gangwar), including:

- `736813a` "chore(license): switching to AGPL-3.0" (2025-08-01)
- `be74918` "feat(exercisedb_v1): release ExerciseDB v1 GIFs as open source", whose message reads "Makes ExerciseDB v1 fully open source and self-deployable / Includes complete GIF library for exercises" (2025-08-01)
- `7cdc82e` "deploy media cdn using github pages"

Its [LICENSE](https://github.com/bootstrapping-lab/exercisedb-api/blob/main/LICENSE) is the GNU AGPL v3, and the repo has no separate media licence. The vendor's homepage advertises "ExerciseDB V1 API (Free Version)", "1,500 exercises with GIFs", "No sign-up, no API key" ([exercisedb.dev](https://exercisedb.dev/)).

**Data (verified).**

- [`src/data/exercises.json`](https://github.com/bootstrapping-lab/exercisedb-api/blob/main/src/data/exercises.json) holds **1,500** exercises. Fields: `exerciseId, name, gifUrl, targetMuscles, secondaryMuscles, bodyParts, equipments, instructions`.
- `media/` holds **1,500** GIFs (145.5 MB total). Sampled GIFs are 180x180 px GIF89a anatomical renders with the worked muscles highlighted in red.
- Every `gifUrl` points to `https://static.exercisedb.dev/media/<id>.gif`, which was live and byte-identical to the repo copy on 2026-11-13.
- Equipment counts: body weight 372, dumbbell 319, cable 181, barbell 170, leverage machine 91, band 67, smith machine 56, kettlebell 46, weighted 41, stability ball 34, … resistance band 10, roller 8.
- **814** Exercises need only bodyweight/dumbbell/band/kettlebell.
- Bodyweight Exercises by body part: waist 102, upper legs 81, back 67, chest 44, upper arms 34, cardio 23, lower legs 14.
- 67 names contain "stretch", which helps the mobility Workout type.
- Name matches: "bench" 83, "chair" 5. There is no `bench`, `chair` or `mat` Equipment value. Bench use is implied only by the name (e.g. "dumbbell incline bench press"), so we would derive a "chair or bench" flag from names.
- Instructions: 5-6 steps typically (range 4-11), prefixed `"Step:1 "` etc., which we would strip. There is **no difficulty field**.

**Live v1 API.** [`oss.exercisedb.dev/api/v1`](https://oss.exercisedb.dev/api/v1/exercises?limit=1) works without a key, sends `access-control-allow-origin: *` and reports `total: 1500`. Its data has drifted from the repo snapshot:

- equipment renamed (`bodyweight` instead of `body weight`)
- muscles renamed (`erector spinae`, `latissimus dorsi`)
- some instructions rewritten

The README warns that the playground endpoints are "for exploration only and not recommended for production integration — strict rate limits and potential instability may apply". No numeric limits are published, and no terms for the free endpoint were found. So bundle the snapshot instead.

**Unverified:** who drew the GIFs and whether the releaser held the rights to relicense them. The AGPL release is the only rights statement found. AscendAPI's paid terms (below) claim exclusive ownership of "images, GIFs", which suggests the same company owns them. That would make the AGPL grant theirs to give, but I could not confirm it.

### 2. ExerciseDB v2 / RapidAPI (AscendAPI)

The README claims "11,000+ structured exercises", "15,000+ high-quality videos", "20,000+ exercise images", "5,000+ GIF animations" ([repo](https://github.com/ExerciseDB/exercisedb-api)). `docs.exercisedb.dev` redirects to [docs.ascendapi.com](https://docs.ascendapi.com/). Those docs describe access through a RapidAPI subscription and API key, with "flexible rate limits"; no plan prices or quotas appeared in the fetched docs or the RapidAPI pricing page (it rendered empty), so pricing is **unverified**.

The [ExerciseDB API Terms of Use](https://exercisedb.notion.site/ExerciseDB-API-Terms-of-Use-226983b728ca8090bf7be79564e4b356) (last updated July 2025) rule it out for us:

- §1: "All data and content served by the ExerciseDB API are the exclusive property of AscendAPI. This includes … images, GIFs, videos…"
- §3: subscribers may not store data "Locally on devices, computers, or mobile applications" or "In cache beyond temporary operational needs (not exceeding 1 hour)". "All data and content must be freshly requested from the API for every use."
- §4: rights end immediately when the subscription stops.

A static site with no backend would also have to expose the RapidAPI key in the browser. **Rejected.**

### 3. free-exercise-db (yuhonas)

- [Repo](https://github.com/yuhonas/free-exercise-db) licence: Unlicense ([LICENSE.md](https://github.com/yuhonas/free-exercise-db/blob/main/LICENSE.md)). It is a restructuring of [wrkout/exercises.json](https://github.com/wrkout/exercises.json), which is also Unlicense.
- [`dist/exercises.json`](https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json) holds **876** exercises.
- Tags:
  - level: beginner 525, intermediate 294, expert 57
  - category: strength 584, stretching 123, plyometrics 61, cardio 14, …
  - force and mechanic
  - primary and secondary muscles (17 muscles)
  - equipment: barbell 170, dumbbell 123, other 122, body only 111, cable 81, _null_ 77, machine 67, kettlebells 56, bands 20, …
- Home subset: 387 Exercises, including the 77 with no equipment value.
- Images: 873 of 876 exercises have **two still JPGs** (start/end, 850x567); 3 have none. There are **no GIFs**. You could fake motion by alternating the two frames.

**Image licence problem:**

- The maintainer wrote: "I actually have no idea where the images are from or if they are royalty free so usage would be at your own risk" ([issue #2](https://github.com/yuhonas/free-exercise-db/issues/2)).
- The upstream CONTRIBUTING says the images "have been scraped off the internet, therefore I do not own the copyright for these images and would advise against using them in commercial projects", as quoted in [wrkout/exercises.json#305](https://github.com/wrkout/exercises.json/issues/305). That thread reports that a reverse image search points to bodybuilding.com, whose terms forbid reuse. A commenter in [free-exercise-db#13](https://github.com/yuhonas/free-exercise-db/issues/13) also suggests ExRx.net as a source.
- These sourcing claims come from issue commenters and are **not verified**.
- The instruction text may share that provenance. The Unlicense can only release rights the author actually held.

### 4. wger

Public REST API, no key needed for reads. Verified 2026-11-13:

- [`/api/v2/exerciseinfo/`](https://wger.de/api/v2/exerciseinfo/?limit=2000): `count: 967`, all with English translations.
- Licences ([`/api/v2/license/`](https://wger.de/api/v2/license/)): CC-BY-SA 4 on 809 exercises, CC-BY-SA 3 on 132, CC0 on 26. Each exercise and image carries `license_author`.
- Equipment ([`/api/v2/equipment/`](https://wger.de/api/v2/equipment/)): Barbell, Bench, Cable machine, Dumbbell, Gym mat, Incline bench, Kettlebell, Pull-up bar, Resistance band, SZ-Bar, Swiss Ball, none (bodyweight).
  - Counts: bodyweight 285, dumbbell 155, bench 54, resistance band 21, kettlebell 18, gym mat 16.
  - 228 exercises have no equipment value.
  - 506 tagged Exercises fit the home list.
- Media: only **282 of 967** exercises have an image, and only 158 of the 506 home-fit ones do. Of the 389 images ([`/api/v2/exerciseimage/`](https://wger.de/api/v2/exerciseimage/?limit=2000)), **5 are GIFs**; the rest are PNG/JPG/WebP in mixed styles. There are 46 videos.
- No difficulty field. Descriptions are crowd-sourced HTML of uneven quality: median ~250 characters, and 25 are under 20 characters.

The licence is clean but the illustrations are too sparse. **Rejected.**

### 5. Everkinetic

- [Repo](https://github.com/everkinetic/data) licence: CC-BY-SA 4.0 ([LICENSE.md](https://github.com/everkinetic/data/blob/master/LICENSE.md)).
- [`dist/exercises.json`](https://raw.githubusercontent.com/everkinetic/data/master/dist/exercises.json) holds **289** exercises, with primer, steps, tips, primary/secondary muscles and free-text equipment. Each exercise has 2 SVG/PNG line drawings (relaxation/tension).
- Coverage is gym-heavy: body 33, dumbbell(s) 91, exercise band 7, no kettlebell. About 122 Exercises fit the home list.
- No GIFs and no difficulty.

It is cleanly licensed and well written, but too small and has no animation. **Rejected.**

### Others glanced at, not pursued

- [Glowupp-app/open-exercisedb](https://github.com/Glowupp-app/open-exercisedb): MIT, ~300 exercises, no media.
- [exercisedb-pro/exercisedb-dataset](https://github.com/exercisedb-pro/exercisedb-dataset): no licence on GitHub, MP4 not GIF.
- [wrkout.xyz](https://wrkout.xyz/): commercial.

## Licence analysis for the recommendation

- AGPL-3.0 §2 grants are "irrevocable provided the stated conditions are met", so a pinned copy of the v1 snapshot stays usable even if the vendor changes course. **Vendor the files; do not depend on the vendor's repo or CDN staying up.** The relevant commit is `7cdc82e` in `bootstrapping-lab/exercisedb-api`.
- Conveying the GIFs and JSON on a public website counts as distribution. Obligations:
  - keep the AGPL licence text with the files
  - credit ExerciseDB
  - offer the corresponding source (link to the upstream repo, and to our own repo if we modify the data)
- Whether our app code becomes a "work based on" the dataset or merely an aggregate is debatable; I have not verified it legally. The low-effort, zero-risk path for a hobby app is to publish the app repo under AGPL-3.0 as well.
- Applying a software licence to images is unusual. Its validity depends on the releaser owning the GIF rights, which I could not independently verify (see above).
- The AscendAPI Terms of Use govern paid API subscribers. They do not grant or restrict anything about the AGPL repo copy, but don't mix the two: no RapidAPI key and no v2 data.

## Practical notes for the spec

- **Size:** 1,500 GIFs come to ~145 MB, so bundle only the curated home subset (≤814 GIFs, roughly 80 MB) and lazy-load per Set.
- **Display:** at 180x180 px the GIFs look fine as a card thumbnail but blurry if scaled up on a laptop. Render at 1x-2x with `image-rendering` left at its default.
- **Difficulty:** must be hand-assigned in our curated subset. This fits the map's open question about writing our own descriptions and "what it trains" text, since v1 has steps but no overview.
- **Chair or bench:** derive from names ("bench", "chair", "incline", "decline"). **Yoga mat:** treat as implied for floor Exercises; no dataset tags it except wger ("Gym mat", 16).

## Not verified

- RapidAPI/AscendAPI plan prices and rate-limit numbers: the pages did not render.
- The 11,000+ v2 count, and the higher-resolution GIF tiers mentioned in search results.
- Who created the ExerciseDB GIFs, and whether the AGPL releaser held the media rights.
- The provenance of free-exercise-db images (bodybuilding.com / ExRx); these are claims by issue commenters.
- Rate limits and terms for the free `oss.exercisedb.dev` endpoint.
