# Research: can the follow-along screen show smoother, sharper Exercise animations?

Follows up: [exercise-dataset.md](exercise-dataset.md) (2026-11-13), which chose the ExerciseDB v1 open-source snapshot.
Researched: 2026-11-17. Every measurement below comes from files I downloaded and measured myself (Pillow, ffmpeg 9.0, libwebp 1.6.0). Claims I could not check against a primary source are marked **unverified**. Sample files are in the session scratchpad, not in the repo.

## Recommendation

**The choppiness comes from how the source was drawn, not from the GIF format. No free source has real motion, a clean licence and coverage of our Exercises, so keep the ExerciseDB v1 art and change how we play it.**

- **What we have.** Each of our 144 vendored GIFs is drawn from **2 key poses** (up to 9 for multi-step moves). In between, each transition is **5 cross-faded (dissolved) frames at 10 fps**, with a 0.5-1 s hold on each pose. 105 of the 144 GIFs have exactly 12 frames. Nothing actually moves between the poses: one picture fades into the next. On a phone the GIF is drawn full width, so the 180 px source is scaled up roughly 4-6x in device pixels.
- **Do now (free, low risk): play the key poses with a CSS cross-fade instead of the GIF.** Pull the 2-9 key-pose frames out of each GIF into WebP, then fade between them in the browser at the display's frame rate, with easing and a hold time we set ourselves (it could even follow the rep tempo).
  - **Size:** all 144 Exercises come to **0.98 MB**, against 13.9 MB of GIFs today.
  - **What it fixes:** the visible 10 fps stepping in the dissolve, and the fixed timing.
  - **What it does not fix:** sharpness (still 180 px), and there is still no real in-between motion.
  - **Simpler fallback:** re-encode each GIF to a muted, looping `<video>`. H.264 MP4 brings the 144 down to **2.1 MB (−85%)** and looks the same, but is no smoother.
  - **Either way we modify AGPL media.** That needs a modification notice, and the "Unmodified subset" line in `public/exercisedb/README.md` would have to change. See [Modifying the AGPL media](#modifying-the-agpl-media).
- **Sharper costs money and runs into licence trouble.** The same art exists at 360, 480, 720 and 1080 px, but only for sale. Two parties claim it:
  - AscendAPI sells the full v1 media as a one-time package for $300-600, and its redistribution terms are not published.
  - Gym visual sells single GIFs at $0.90-3.60 each. Its licence allows use in apps and websites but forbids redistributing the files, so they could not go into our public AGPL repo.
  - The higher-resolution GIFs I measured are **the same 12-frame cross-fades**: sharper, not smoother.
- **Real motion exists in the same art style, but I found no source we may use.** I measured a 1920x1080, 29.97 fps H.264 MP4 of this art with real, continuous motion (195 distinct frames in 6.6 s) in an unlicensed GitHub mirror. The legitimate sources are Gym visual's "Videos" (specs and prices **unverified**: the site blocks automated access) and ExerciseDB v2 (ruled out on 2026-11-13: storing media is forbidden).
- **Not worth it:**
  - LottieFiles: the licence is fine, but the animations come from mixed artists and cover few exercises.
  - wger videos: 46 exercises, filmed live in gyms.
  - MuscleWiki: re-hosting is forbidden.
  - GitHub mirrors: none grants any rights to the media.
  - Upscaling or AI frame interpolation of our GIFs: untested, and probably forbidden if Gym visual owns the art (see below).
- **New licence red flag on the current GIFs, to settle before investing further.** A 1,324-exercise dataset ships GIFs **byte-for-byte identical** to ours, labelled "© Gym visual … redistributed here with permission". That dataset is [hasaneyldrm/exercises-dataset](https://github.com/hasaneyldrm/exercises-dataset); I checked 5 of our files. Gym visual's terms say all its media is owned by Aliaksandr Makatserchyk. If so, AscendAPI may not have had the right to release the GIFs under AGPL. The prior research already listed "who drew the GIFs" as unverified; this is the first concrete evidence on it. See [Licence findings](#licence-findings-new-since-2026-11-13).

## Comparison

|                                                                                                                                                   | Media licence                                                                                                                                   | Bundle / hotlink                               | Home Equipment coverage                                         | Resolution and motion (measured)                                                  | Size (measured)                                                      | Style vs. today                                                      | Maps to our Exercise ids                                           |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------ |
| **Today: ExerciseDB v1 GIFs** (vendored)                                                                                                          | AGPL-3.0 per repo, but see the Gym visual claim                                                                                                 | Bundled                                        | All 144 curated                                                 | 180x180; 2 key poses + 10 fps cross-fade, 0.5-1 s holds                           | 13.9 MB for 144 (median ~97 KB)                                      | n/a                                                                  | Yes                                                                |
| **A. Key poses + CSS cross-fade** (derived from v1)                                                                                               | Same as today, plus AGPL §5 modification notice                                                                                                 | Bundled                                        | All 144                                                         | 180x180 stills; fade runs at the display's frame rate, eased, with our own timing | **0.98 MB** for 144 (WebP q85)                                       | Same                                                                 | Yes                                                                |
| **B. Re-encode v1 GIFs** to MP4 / WebM / animated WebP                                                                                            | Same as A                                                                                                                                       | Bundled                                        | All 144                                                         | Unchanged, timing kept                                                            | MP4 H.264 **2.1 MB**; WebM VP9 2.4 MB; animated WebP 4.8 MB          | Same                                                                 | Yes                                                                |
| **C. Upscale or AI-interpolate v1 GIFs**                                                                                                          | Same as A; AI derivation is banned by Gym visual's licence if its claim holds                                                                   | Bundled                                        | All 144                                                         | **Untested**                                                                      | n/a                                                                  | Same, with possible artefacts                                        | Yes                                                                |
| **D. ExerciseDB v1 hi-res** ([AscendAPI shop](https://shop.ascendapi.com/))                                                                       | One-time purchase, "commercial use"; redistribution terms **not published**                                                                     | Unclear; a public repo is probably not allowed | 1,500 Exercises (claimed)                                       | 360 / 480 / 720 / 1080 px samples; **same 12-frame cross-fade**                   | 720 px GIF 1.14 MB, as MP4 94 KB; 1080 px GIF 1.77 MB, as MP4 252 KB | Same                                                                 | **Unverified**: none of the shop's sample ids is in the open 1,500 |
| **E. Gym visual hi-res GIFs** ([product page](https://web.archive.org/web/20260712084613/https://gymvisual.com/animated-gifs/1769-dead-bug.html)) | N-CRFL: apps and websites allowed; no redistribution and no making files available for download                                                 | Deploy-only, kept out of the public repo       | Large catalogue, not counted                                    | 180 / 360 / 720 / 1080 px; motion presumably the same as D (**unverified**)       | Like D                                                               | Same                                                                 | No: Gym visual's own product ids; map by name by hand              |
| **F. Same art as 1080p video** (Gym visual "Videos" or ExerciseDB v2)                                                                             | Gym visual: N-CRFL (specs **unverified**); v2: storage forbidden                                                                                | Gym visual: deploy-only                        | **Unverified**                                                  | Mirror sample: 1920x1080, 29.97 fps, **real motion**                              | 635 KB for 6.6 s                                                     | Same family (also has female models)                                 | No                                                                 |
| **G. LottieFiles free** ([exercise tag](https://lottiefiles.com/free-animations/exercise))                                                        | [Lottie Simple License](https://lottiefiles.com/page/license): commercial use, modification and redistribution allowed; no attribution required | Bundle yes                                     | 133 "exercise" results across ~14 artists; mostly generic moves | Vector, 25-30 fps, 250-1080 px canvases                                           | 6-28 KB each (6 samples)                                             | **Very different**: flat cartoon, no muscle highlights               | No                                                                 |
| **H. wger videos** ([API](https://wger.de/api/v2/video/))                                                                                         | CC-BY-SA 4 (all 78)                                                                                                                             | Bundle yes, with attribution and share-alike   | 46 exercises; 14-16 bodyweight, 13 dumbbell                     | 1920x1080 (71), 4K (5); 30 fps live action                                        | Median 30 MB per clip (HEVC MOV)                                     | **Very different**: one person filming in a gym, bystanders in frame | No                                                                 |
| **I. MuscleWiki API** ([terms](https://api.musclewiki.com/api-terms))                                                                             | Proprietary                                                                                                                                     | **No**: no download, storage or re-hosting     | 1,700+ (claimed)                                                | Video (not measured)                                                              | n/a                                                                  | Different                                                            | No                                                                 |
| **J. GitHub mirrors** (hasaneyldrm, akajdid-mostafa, mohamedatef90)                                                                               | None that covers the media                                                                                                                      | **No**                                         | n/a                                                             | 180 px GIFs, or 1080p MP4                                                         | n/a                                                                  | Same art                                                             | Partly                                                             |

## Candidates in detail

### What is actually wrong with today's GIFs

Measured over all 144 files in `public/exercisedb/`:

- **Size:** every GIF is 180x180. They total 13,892 KB.
- **Frame structure:**
  - 105 GIFs have 12 frames with delays `[1000, 100, 100, 100, 100, 100, 1000, 100, …]` ms.
  - 20 have 24 frames, 10 have 18 frames, and the rest have 30-54 frames.
  - In every case the pattern is a hold on a key pose followed by 100 ms frames.
- **What the in-between frames are:** I laid frame strips side by side and looked at them. The 100 ms frames are **dissolves**: both poses are visible, semi-transparent, at once. They are not intermediate positions of the body. The 720 px sample from AscendAPI's shop (`Ec7u4jR`) has the identical structure, so the hi-res tiers do not add motion.
- **How big it is drawn:**
  - Phone layout: `src/screens/FollowAlong.tsx` draws the GIF at `w-full flex-1 object-contain`, i.e. full width.
  - Wider layout: `size-72` (288 CSS px). On a DPR-3 phone that is ~860-1,200 device pixels from a 180 px source.

So "smoother" can only mean one of two things:

1. Better playback of the same two poses: a dissolve at the display's frame rate with easing, and timing we control (options A and B).
2. A source with real in-between motion: video (option F) or 3D/vector (option G).

### A. Key poses with a CSS cross-fade (recommended now)

- **Extraction:** frames whose GIF delay is ≥500 ms are the key poses. Per GIF:
  - 107 have 2 poses
  - 20 have 4
  - 10 have 3
  - 7 others have 1, 5, 6 or 9
- **Size:** saved as WebP q85, all 144 total **977 KB**.
- **Playback:** stack 2-9 `<img>`s and animate opacity with CSS keyframes or the Web Animations API. The fade then runs at the screen's frame rate, can be eased, and the hold time can follow the Set's rep tempo or pause with the Workout.
- **Respect `prefers-reduced-motion`:** show only the first pose.
- **Limits:**
  - Still 180 px, so still soft on a phone.
  - Still a dissolve, with no real movement.
  - The single 1-pose Exercise would show a still.
  - 9-pose Exercises need per-Exercise hold timings, which can be read from the GIF delays.
- **Licence:** we would be conveying a modified form of the AGPL media (see below).

### B. Re-encode the GIFs (same look, much smaller)

Converted all 144 with the original frame timing preserved (`-fps_mode passthrough`; the MP4 of `01qpYSe` is 3.00 s, like its GIF):

| Format        | Settings                                                         | Total for 144 |
| ------------- | ---------------------------------------------------------------- | ------------- |
| GIF (today)   | n/a                                                              | 13,892 KB     |
| Animated WebP | `gif2webp -lossy -q 75 -m 6` (`-mixed` produced identical files) | 4,796 KB      |
| WebM VP9      | `-crf 34 -b:v 0`, yuv420p                                        | 2,420 KB      |
| **MP4 H.264** | `-crf 23 -preset slow`, yuv420p, `+faststart`                    | **2,068 KB**  |

- MP4 plays as `<video autoplay muted loop playsinline>` in every current browser, including iOS Safari.
- It looks the same and is no smoother. It is worth doing only for download size and offline-cache size, or as the container for hi-res media later (a 1080 px GIF of 1.77 MB is 252 KB as MP4).
- I did not compare visual quality frame by frame. yuv420p chroma subsampling may slightly soften the red muscle highlights at 180 px (**unverified**).

### C. Upscaling or frame interpolation of our GIFs

- **Not tested:** no Real-ESRGAN/RIFE/FILM run was done.
- **Expected quality:** the in-between frames are dissolves, not motion, so an interpolator would be guessing a body morph between two distant poses. That is the case where these models warp limbs (**unverified**).
- **Licence:** upscaling and interpolation are modifications under AGPL (allowed with notice). But if Gym visual's ownership claim holds, its licence forbids using the media "as a basis for creating and generating content … using Artificial Intelligence (AI) tools" ([licence](https://web.archive.org/web/20260807223235/https://gymvisual.com/content/9-license)). **Not recommended.**

### D. ExerciseDB v1 high-resolution media (AscendAPI shop)

- **Where it is sold:** the free v1 API's OpenAPI description links "Need full v1 Dataset Access → Download Now" to `go.exercisedb.dev/shop` ([spec](https://oss.exercisedb.dev/swagger)). That redirects to [shop.ascendapi.com](https://shop.ascendapi.com/).
- **Tiers:**

  | Tier     | Price (one-time) | GIFs and PNGs                  |
  | -------- | ---------------- | ------------------------------ |
  | Starter  | $300             | 1,500 Exercises; 180p and 360p |
  | Standard | $500             | up to 720p                     |
  | Premium  | $600             | up to 1080p                    |

- **Shop wording:** "One-Time Purchase. Yours Forever." and "Commercial Use".
- **Gaps:** no licence text says whether the files may be redistributed or bundled into a public repo or site (**unverified**).
- **Samples measured** (served from `assets.exercisedb.dev/media/`):

  | Sample        | Size      | Frames | Timing | File size |
  | ------------- | --------- | ------ | ------ | --------- |
  | `qU7GQpl.gif` | 360x360   | 12     | 3.0 s  | 338 KB    |
  | `bqZjg7F.gif` | 480x480   | 12     | 3.0 s  | 827 KB    |
  | `Ec7u4jR.gif` | 720x720   | 12     | 3.0 s  | 1,142 KB  |
  | `q61OKxC.gif` | 1080x1080 | 12     | 3.0 s  | 1,771 KB  |
  - All four have the same `[1000, 100×5, 1000, 100×5]` timing as ours.
  - The art style matches ours (compared visually).
  - Key poses at 720 px are ~33-36 KB each as WebP. So option A at 720 px would cost about 70 KB per Exercise, less than one of today's 180 px GIFs.

- **Ids:** none of the 6 sample ids is in the open 1,500. Whether purchased files keep our ids is **unverified**.
- **Verdict:** sharper, not smoother. Buy only after the rights question below is settled, and only with written redistribution terms.

### E. Gym visual high-resolution GIFs

- **Product page** (Wayback Machine copy, 2026-07-12): [Dead Bug](https://web.archive.org/web/20260712084613/https://gymvisual.com/animated-gifs/1769-dead-bug.html) is offered as a GIF at 180x180, 360x360, 720x720 and 1080x1080. It costs **$3.60**, or "$0.9 per 1 animated GIF after 10 items in cart". That would be roughly $130 for our 144 if all map (**unverified**: the live site returns HTTP 403 to automated clients).
- **[Licence (N-CRFL)](https://web.archive.org/web/20260807223235/https://gymvisual.com/content/9-license):**
  - Allowed: the high-res media may illustrate "Android or iOS mobile application (apps)" and "website pages".
  - Not allowed: "to resell or redistribute", "to make available on a website for download", "to assign rights to third parties", and AI derivation.
  - The licence is "granted ONLY for the non-watermarked Media you buy; all the other versions (small … non-watermarked thumbnails which are visible on the public site) are entirely copyrighted".
  - Per §5 of the [terms](https://web.archive.org/web/2026/https://gymvisual.com/content/3-terms-and-conditions-of-use), it is a one-person licence that "cannot be transmitted to another party".
- **What that means for us:** purchased files could be served by the deployed app but **not committed to our public AGPL repo**, and they would not be AGPL. That splits our media pipeline (a private store fetched at build time).
- **Ids:** Gym visual uses its own product ids, so each Exercise must be matched to a product by hand.

### F. The same art as real video

- **Sample measured:** a mirror on GitHub, [akajdid-mostafa/exercises-media](https://github.com/akajdid-mostafa/exercises-media). It has no licence, gives no provenance, and holds 593 MP4s (male and female). Its sample `45-degree-bycicle-twisting-crunch.mp4` measured:
  - 1920x1080 H.264 at 29.97 fps
  - 6.57 s and 635 KB
  - `mpdecimate` kept 195 distinct frames, and a contact sheet shows continuous motion
  - same anatomical render style as our GIFs
- **Who uses it:** another project's issue tracker reports the same repo as its HD source, under permission its owner says it obtained ([your-fitness-coach#986](https://github.com/MikeMoore1337/your-fitness-coach/issues/986)). That is not a licence for anyone else.
- **Legitimate origins:**
  - Gym visual's "Videos" category: format, resolution, fps and price **unverified**. The live site and the Wayback Machine were unavailable for those pages.
  - ExerciseDB v2: `videoUrl: "….mp4"` in the [README sample](https://github.com/ExerciseDB/exercisedb-api). Already rejected: its terms forbid storing media.
- **Verdict:** this is the only real fix for smoothness, but no licensable source is confirmed. Worth one email to Gym visual if smooth motion matters enough to pay for.

### G. LottieFiles

- **Licence:** the [Lottie Simple License](https://lottiefiles.com/page/license) (FL 9.13.21) allows anyone "to download, reproduce, modify, publish, distribute, publicly display…" for commercial purposes, with attribution optional. It forbids compiling files from LottieFiles to build "a similar or competing service".
- **Coverage:** the [exercise tag](https://lottiefiles.com/free-animations/exercise) lists 133 free animations by ~14 creators. Examples: "Dumbbell Sumo Squat", "Military Push Ups", "T Plank Exercise".
- **Six samples measured:** 5.7-28 KB `.lottie` files, 25-30 fps, 2.5-8 s loops, canvases from 250x250 to 1080x1080.
- **Problems:**
  - Styles differ between creators.
  - No muscle highlighting.
  - Coverage of our 144 would be a small fraction, and matching is by hand.
  - It needs a player library such as `@lottiefiles/dotlottie-web`; not evaluated.
  - Paid marketplace packs exist (e.g. [workout animation pack](https://lottiefiles.com/marketplace/workout-animation-pack_429956)); their terms were not checked.
- **Verdict:** fine for decoration, such as a rest-screen animation. Not a replacement for the Exercise library.

### H. wger videos

- **Licence and count:** [`/api/v2/video/`](https://wger.de/api/v2/video/?limit=200) returns 78 videos, all licence 2 (CC-BY-SA 4), and all by one author ("Goulart").
- **Coverage:** they cover 46 exercises. Equipment: none/bodyweight 16, dumbbell 13, barbell 8, cable 6, bench 6, …
- **Format:** 71 are 1920x1080 and 5 are 4K; 54 HEVC and 24 H.264; median 15.6 s and 30 MB.
- **One sample viewed:** a phone video in a commercial gym with other people in frame.
- **Verdict:** clean licence, but thin coverage, inconsistent style and large files. Rejected.

### I. MuscleWiki API

The [terms](https://api.musclewiki.com/api-terms) (last updated October 8, 2026) say: "You may NOT download, export, copy, store, or otherwise retrieve MuscleWiki videos…". They also forbid "Re-host or upload videos or images to your own servers, CDNs", and say "Permanent storage or long-term caching of any media is prohibited". That is incompatible with an offline-capable static PWA. Rejected.

### J. GitHub mirrors and Kaggle re-hosts

- **[hasaneyldrm/exercises-dataset](https://github.com/hasaneyldrm/exercises-dataset)** and its forks (e.g. [animagr](https://github.com/animagr/exercises-dataset)):
  - 1,324 Exercises, 180x180 GIFs.
  - MIT for the data, but "This repository does not grant you any rights to the media" ([NOTICE.md](https://github.com/hasaneyldrm/exercises-dataset/blob/main/NOTICE.md)).
- **[mohamedatef90/exercise-library](https://github.com/mohamedatef90/exercise-library):** 1,112 GIFs. It has no LICENSE file, and the README claims MIT.
- **[akajdid-mostafa/exercises-media](https://github.com/akajdid-mostafa/exercises-media):** no licence.
- **Verdict:** none adds rights. Rejected.

### Not pursued

- **Mixamo or 3D game-asset packs** (e.g. "100 Workout Animations No Equipment" on the Unreal/Fab marketplace): we would render our own videos. That is a large art project; it has no muscle highlights and no equipment props, and the licences were not checked (**unverified**).
- **Darebee:** "All of the materials on this website are unique, copyrighted and are exclusive to darebee.com" ([site footer](https://darebee.com/terms.html)).

## Licence findings (new since 2026-11-13)

1. **Gym visual claims the same GIFs.**
   - All 1,324 `media_id`s in [hasaneyldrm/exercises-dataset](https://github.com/hasaneyldrm/exercises-dataset) are ExerciseDB v1 `exerciseId`s, and 144 of them are ours. I compared 5 (`1ZFqTDN`, `qaZVsGk`, `uL9CsKm`, `A9qxk2F`, `fNGumX0`) and all were **byte-identical** to our vendored files.
   - That repo first attributed them to AscendAPI. AscendAPI requested this in [issue #5](https://github.com/hasaneyldrm/exercises-dataset/issues/5) (June 2026), saying "We're fine with people building on the v1 dataset — it's free and public".
   - From 2026-07-08 on, the repo labels the same files "© Gym visual … redistributed here with permission" ([NOTICE.md](https://github.com/hasaneyldrm/exercises-dataset/blob/main/NOTICE.md)).
   - Gym visual's [terms §2](https://web.archive.org/web/2026/https://gymvisual.com/content/3-terms-and-conditions-of-use) state that all its media is owned by Aliaksandr Makatserchyk, and that even the free public thumbnails "are entirely copyrighted".
   - Other projects treat the media as Gym visual's and will not bundle it without written permission ([GymX#3](https://github.com/abdullahalhaddadalsayed-arch/GymX/issues/3)).
   - **Unverified:**
     - Whether Gym visual drew these exact files, or licensed them to AscendAPI.
     - Whether AscendAPI's AGPL release (`be74918`, 2025-08-01) was within its rights.
     - Gym visual's ownership is asserted only by Gym visual's own terms and by a third party claiming permission. I could not compare our files with Gym visual's public 180 px previews because the site blocks automated access.
   - If Gym visual is the owner, the AGPL grant on the GIFs may be void, and every option above built on these GIFs (A-E) inherits that risk. Suggested next step: email Gym visual (contact form on gymvisual.com) and AscendAPI (`hello@ascendapi.com`, per the [spec](https://oss.exercisedb.dev/swagger)) and ask who holds the rights.
2. **AscendAPI now states usage restrictions on the free v1 API.**
   - The live [OpenAPI description](https://oss.exercisedb.dev/swagger) (also surfaced by Context7) says:
     - Allowed: "Personal projects, prototypes, educational tools, non-commercial apps".
     - Not allowed: "Commercial products … without a paid plan".
     - "Media: Limited to 180p GIF format only".
     - "Credit to AscendAPI is required when using this dataset in any project".
   - The pinned AGPL snapshot we vendor (`7cdc82e`) has no such text: its README has no restriction and the only licence is the AGPL ([README at 7cdc82e](https://github.com/bootstrapping-lab/exercisedb-api/blob/7cdc82e1a14b06799d16c819d1082f3debb425ce/README.md)).
   - AGPL §7 lets a recipient remove "further restrictions" ([AGPL-3.0](https://www.gnu.org/licenses/agpl-3.0.html)).
   - Our app is non-commercial anyway. Adding "by AscendAPI" to the credit in `src/components/CreditFooter.tsx` costs nothing and covers both readings.
3. **The static CDN still serves our files unchanged.** `static.exercisedb.dev/media/01qpYSe.gif` returned HTTP 200, 67,084 bytes, the same size as our copy. The hi-res sample ids return a Cloudflare 404 page there; they are served only from `assets.exercisedb.dev`.

## Modifying the AGPL media

Options A, B and C convey a modified version of the vendored GIFs. Under [AGPL-3.0 §5](https://www.gnu.org/licenses/agpl-3.0.html):

- §5(a): the work must carry "prominent notices stating that you modified it, and giving a relevant date".
- §5(c): the whole stays under AGPL.

Corresponding source would be the original GIFs (linked upstream at `7cdc82e`) plus the conversion script, which already lives in our public repo. Concretely:

- `public/exercisedb/README.md`, which `scripts/copy-exercisedb.ts` generates, would have to drop "Unmodified subset … nothing is edited".
- It would have to describe the conversion instead.

All of this is moot if the Gym visual claim holds.

## Context7: what it did and did not have

- **Found:**
  - `/websites/oss_exercisedb_dev` and `/websites/exercisedb_dev`: the free v1 docs. These surfaced the "180p GIF only / non-commercial / credit AscendAPI" usage table, which I then verified at `/swagger`.
  - `/exercisedb/exercisedb-api`: the v2 README sample with `videoUrl` MP4s, and the AGPL notice "Copyright (C) 2025 AscendAPI".
  - `/wger-project/wger`: source code, including the `exercisevideo_set` prefetch. Nothing on actual video counts or licences.
- **Did not have:**
  - any page on hi-res tiers or the AscendAPI shop
  - anything on Gym visual
  - any Lottie fitness pack or exercise-animation library: a search for "exercise animations" returned only generic UI animation libraries (Anime.js, Animate UI)
  - any licence text for media
- Everything else came from primary sources: GitHub API and raw files, the live OpenAPI spec, the AscendAPI shop, wger's API, LottieFiles, MuscleWiki's terms, Wayback Machine copies of Gym visual, and downloaded media.

## Not verified

- Gym visual's ownership of the ExerciseDB v1 art, and the validity of the AGPL grant on the GIFs.
- AscendAPI shop redistribution terms, and whether purchased files keep v1 ids.
- Gym visual "Videos" specs and prices, and whether Gym visual's catalogue covers all 144 of our Exercises.
- Visual quality of upscaling or frame interpolation (C), and chroma loss in MP4/WebM at 180 px (B).
- Mixamo and Fab pack licences and exercise coverage.
