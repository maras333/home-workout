# Curation review: full Exercise library (ticket 11)

Draft by an agent on branch `curation/full-library`; the tags live in `src/library/curation.ts`. Please correct tags there, then rerun `npm run copy-exercisedb` if the id list changes and `npm test` to recheck the curation target.

How the draft was made:

- Only dataset equipment `body weight`, `dumbbell`, `band`, `resistance band` and `kettlebell`. No bars, rings, straps, boxes, wall kick-ups or partners.
- The 34 starter Exercises are kept with their tags unchanged.
- Near-duplicates were left out ("v. 2", "(male)" clones, "- X variation", the second of two moves with the same steps).
- Muscle groups follow the dataset's target muscle, mapped onto the seven groups (abs/obliques/lower back/spine → core; lats/upper back/traps → back; delts → shoulders; biceps/triceps/forearms → arms; pectorals/serratus → chest; quads/hamstrings/calves/abductors/adductors → legs).
- Chair or bench comes from the name or from steps that need one (dips, incline/decline push-ups, bench press, step-up, Bulgarian split squat, seated band abduction).

## Please check

Tags I was unsure about, most important first:

1. **Towel rows as bodyweight** (`uTv34oq` bodyweight standing row (with towel), `BReCuOn` bodyweight squatting row (with towel)). They are 2 of the 3 Beginner bodyweight back Exercises for upper body and full body. A towel isn't one of the four Equipment items, so they're tagged bodyweight. Drop them if a towel counts as Equipment. Without them, back is covered only by `wbUYILZ` elbow lift - reverse push-up.
2. **Shoulders are thin without Equipment.** The only bodyweight main Exercise with shoulders as primary for upper/full body is `XPUDTt7` pike-to-cobra push-up (Advanced). The dataset's target is glutes, which I read as clearly wrong. The upper-body rotation (chest, back, shoulders, arms) can't put a bodyweight shoulders Exercise in a Beginner or Intermediate Workout.
3. **Primary Muscle group overrides:** `UVo2Qs2` flutter kicks (dataset: glutes → tagged core), `XPUDTt7` pike-to-cobra push-up (glutes → shoulders), `hCjGsRQ` power point plank, `h1ezqSu` kneeling plank tap shoulder and `yRpV5TC` shoulder tap (core primary, shoulders secondary; they're also tagged upper body).
4. **`ANbbry2` lower back curl** is a back extension (superman-like). By the mapping rule (lower back/spine → core) it's core, not back.
5. **Weak-value fillers:** `2jl9K55` spine twist, `NKJ8o6x` pelvic tilt, `jV65tKx` scapula push-up (its steps describe a push-up, the GIF may differ) and `ia6kIIl` half knee bends (a slow half squat, tagged warm-up + main for full body/lower body/cardio).
6. **Difficulty calls:** push-up stays Intermediate (as in the starter set), so every harder push-up is Advanced (`i5cEhka` decline, `qEse6fe` shoulder tap push-up, `4GqRrAk` superman, `A9qxk2F` archer). `ZgsNQ6d` inchworm is a Beginner warm-up. `0jp9Rlz` one leg floor calf raise is Intermediate. `WL4EmxJ` side bridge hip abduction is Advanced.
7. **perSide on one-sided moves:** `hoXt6wv` left hook. boxing (the dataset only shows the left side; tagged per side), `PdmaD0N` dumbbell standing triceps extension (one dumbbell, one arm), `g9AsZ8P` kettlebell one arm row, `rg59QCH` kettlebell one arm floor press, `IpONWYv` dumbbell side bend, `5VXmnV5` side plank. Alternating moves (lunges, shoulder taps, heel touchers) are counted in total reps, so `perSide: false`.
8. **Mobility has no Advanced stretches** and only 4 Intermediate (`2Dk4xQV` rocking frog, `pZwUsKB` iron cross, `HIgYKAB` seated wide angle pose sequence, `01qpYSe` upward facing dog). An Advanced mobility Workout passes the target only because of the "at or below" rule, and draws on Beginner stretches.
9. **Cardio/HIIT leans on legs:** 13 of 19 bodyweight main Exercises have legs as primary, so the "rotate groups where possible" rule has little to rotate.
10. **`O95afRA` monster walk** is `body weight` in the dataset, but its steps need a band around the ankles, so it's tagged resistance band.
11. **Every-type warm-ups:** `tnaj0mT` swing 360, `BbfB8Gb` basic toe touch and `ErqK3UL` posterior step to overhead reach are warm-ups for every type, including core and mobility. `6sYyrRX` bent knee lying twist and `znP9SIh` hug knees to chest are warm-up + main (core/mobility and mobility).

## Counts

Total: **144 Exercises** (105 bodyweight, 39 with Equipment).

### Bodyweight-only main-Block Exercises per workout type × Difficulty

"Eligible" = Difficulty at or below the requested one (the spec's eligibility rule; this is what the data check asserts, minimum 6). "Exactly" = tagged at that Difficulty, which is what the generator's exact-Difficulty preference draws from first.

| Workout type | Beginner eligible (exactly) | Intermediate eligible (exactly) | Advanced eligible (exactly) |
|---|---|---|---|
| full body | 19 (19) | 36 (17) | 47 (11) |
| upper body | 8 (8) | 13 (5) | 18 (5) |
| lower body | 11 (11) | 21 (10) | 25 (4) |
| core | 10 (10) | 22 (12) | 26 (4) |
| cardio/HIIT | 7 (7) | 15 (8) | 19 (4) |
| mobility/stretching | 9 (9) | 13 (4) | 13 (0) |

### All Exercises per workout type × Difficulty × Block role (eligible, any Equipment / bodyweight only)

| Workout type | Block role | Beginner | Intermediate | Advanced |
|---|---|---|---|---|
| full body | warm-up | 14 / 14 | 14 / 14 | 14 / 14 |
| full body | main | 23 / 19 | 53 / 36 | 68 / 47 |
| full body | cool-down | 9 / 9 | 9 / 9 | 9 / 9 |
| upper body | warm-up | 9 / 9 | 9 / 9 | 9 / 9 |
| upper body | main | 16 / 8 | 31 / 13 | 37 / 18 |
| upper body | cool-down | 9 / 9 | 9 / 9 | 9 / 9 |
| lower body | warm-up | 12 / 12 | 12 / 12 | 12 / 12 |
| lower body | main | 16 / 11 | 32 / 21 | 38 / 25 |
| lower body | cool-down | 9 / 9 | 9 / 9 | 9 / 9 |
| core | warm-up | 10 / 10 | 10 / 10 | 10 / 10 |
| core | main | 11 / 10 | 24 / 22 | 30 / 26 |
| core | cool-down | 9 / 9 | 9 / 9 | 9 / 9 |
| cardio/HIIT | warm-up | 14 / 14 | 14 / 14 | 14 / 14 |
| cardio/HIIT | main | 7 / 7 | 18 / 15 | 23 / 19 |
| cardio/HIIT | cool-down | 9 / 9 | 9 / 9 | 9 / 9 |
| mobility/stretching | warm-up | 12 / 12 | 12 / 12 | 12 / 12 |
| mobility/stretching | main | 9 / 9 | 13 / 13 | 13 / 13 |
| mobility/stretching | cool-down | 15 / 15 | 16 / 16 | 16 / 16 |

### Primary Muscle groups among bodyweight-only main-Block Exercises (all Difficulties; Beginner-eligible in brackets)

| Workout type | chest | back | shoulders | arms | core | glutes | legs |
|---|---|---|---|---|---|---|---|
| full body | 9 (3) | 3 (3) | 1 (0) | 3 (1) | 12 (3) | 7 (2) | 12 (7) |
| upper body | 9 (3) | 3 (3) | 1 (0) | 3 (1) | 2 (1) | – | – |
| lower body | – | – | – | – | – | 8 (2) | 17 (9) |
| core | – | – | – | – | 26 (10) | – | – |
| cardio/HIIT | 1 (0) | – | 1 (1) | – | 2 (0) | 2 (0) | 13 (6) |
| mobility/stretching | – | 1 (1) | – | – | 3 (2) | 4 (2) | 5 (4) |

### Every Exercise

Grouped as in `src/library/curation.ts`. "every type" = all six workout types. Equipment "–" = bodyweight.


#### Warm-up

| id | name | primary | secondary | Equipment | Difficulty | workout types | Block roles | measure | perSide |
|---|---|---|---|---|---|---|---|---|---|
| `uL9CsKm` | ankle circles | legs | – | – | beginner | every type | warm-up | time | yes |
| `QChZi3x` | squat to overhead reach | legs | glutes, shoulders, core | – | beginner | every type | warm-up | time | no |
| `2zNKRUB` | wrist circles | arms | – | – | beginner | every type | warm-up | time | no |
| `X7jbxra` | circles knee stretch | legs | – | – | beginner | every type | warm-up | time | no |
| `tnaj0mT` | swing 360 | shoulders | core | – | beginner | every type | warm-up | time | no |
| `3uj0Ozg` | dynamic chest stretch (male) | chest | shoulders | – | beginner | every type | warm-up | time | no |
| `BbfB8Gb` | basic toe touch (male) | legs | glutes, back | – | beginner | every type | warm-up | time | no |
| `ErqK3UL` | posterior step to overhead reach | legs | glutes, shoulders, core | – | beginner | every type | warm-up | time | no |
| `ZgsNQ6d` | inchworm | core | shoulders, legs | – | beginner | full body, upper body, core, cardio/HIIT, mobility/stretching | warm-up | time | no |

#### Warm-up and main

| id | name | primary | secondary | Equipment | Difficulty | workout types | Block roles | measure | perSide |
|---|---|---|---|---|---|---|---|---|---|
| `ealLwvX` | high knee against wall | legs | glutes, core | – | beginner | full body, lower body, cardio/HIIT | warm-up, main | time | no |
| `oLrKqDH` | run | legs | – | – | beginner | full body, lower body, cardio/HIIT | warm-up, main | time | no |
| `1g5bPpA` | jack jump (male) | legs | shoulders | – | beginner | full body, cardio/HIIT | warm-up, main | time | no |
| `mweqJin` | quick feet v. 2 | legs | – | – | beginner | full body, lower body, cardio/HIIT | warm-up, main | time | no |
| `ia6kIIl` | half knee bends (male) | legs | glutes | – | beginner | full body, lower body, cardio/HIIT | warm-up, main | reps | no |
| `DFGXwZr` | world greatest stretch | legs | glutes, back | – | beginner | mobility/stretching | warm-up, main | time | yes |
| `6sYyrRX` | bent knee lying twist (male) | core | glutes | – | beginner | core, mobility/stretching | warm-up, main | reps | no |
| `znP9SIh` | hug keens to chest | glutes | legs, back | – | beginner | mobility/stretching | warm-up, main | time | no |

#### Main: upper body

| id | name | primary | secondary | Equipment | Difficulty | workout types | Block roles | measure | perSide |
|---|---|---|---|---|---|---|---|---|---|
| `I4hDWkc` | push-up | chest | arms, shoulders, core | – | intermediate | full body, upper body | main | reps | no |
| `ZOuKWir` | kneeling push-up (male) | chest | arms, shoulders | – | beginner | full body, upper body | main | reps | no |
| `LEH9jxP` | push-up (wall) | chest | arms, shoulders | – | beginner | full body, upper body | main | reps | no |
| `B1EVP9F` | incline push-up | chest | arms, shoulders | chair or bench | beginner | full body, upper body | main | reps | no |
| `jV65tKx` | scapula push-up | chest | shoulders, arms | – | beginner | full body, upper body | main | reps | no |
| `JmMVpR3` | wide hand push up | chest | arms, shoulders | – | intermediate | full body, upper body | main | reps | no |
| `epOSYUZ` | modified hindu push-up (male) | chest | shoulders, arms, core | – | intermediate | full body, upper body | main | reps | no |
| `i5cEhka` | decline push-up | chest | shoulders, arms | chair or bench | advanced | full body, upper body | main | reps | no |
| `4GqRrAk` | superman push-up | chest | core, shoulders | – | advanced | full body, upper body | main | reps | no |
| `qEse6fe` | shoulder tap push-up | chest | arms, core | – | advanced | full body, upper body | main | reps | no |
| `A9qxk2F` | archer push up | chest | arms, shoulders, core | – | advanced | upper body | main | reps | no |
| `soIB2rj` | diamond push-up | arms | chest, shoulders | – | advanced | full body, upper body | main | reps | no |
| `RrLske5` | bench dip (knees bent) | arms | chest, shoulders | chair or bench | beginner | upper body | main | reps | no |
| `v3vLFW0` | close-grip push-up (on knees) | arms | chest, shoulders | – | beginner | full body, upper body | main | reps | no |
| `x6KpKpq` | close-grip push-up | arms | chest, shoulders | – | intermediate | full body, upper body | main | reps | no |
| `7aVz15j` | triceps dips floor | arms | chest, shoulders | chair or bench | intermediate | upper body | main | reps | no |
| `wbUYILZ` | elbow lift - reverse push-up | back | arms, shoulders | – | beginner | full body, upper body | main | reps | no |
| `uTv34oq` | bodyweight standing row (with towel) | back | arms, shoulders | – | beginner | full body, upper body | main | reps | no |
| `BReCuOn` | bodyweight squatting row (with towel) | back | legs, arms | – | beginner | full body, upper body | main | reps | no |
| `XPUDTt7` | pike-to-cobra push-up | shoulders | arms, core | – | advanced | full body, upper body | main | reps | no |
| `h1ezqSu` | kneeling plank tap shoulder (male) | core | shoulders, arms | – | beginner | full body, upper body, core | main | reps | no |
| `yRpV5TC` | shoulder tap | core | shoulders, arms | – | intermediate | full body, upper body, core | main | reps | no |
| `BJ0Hz5L` | dumbbell bent over row | back | arms | dumbbells | intermediate | full body, upper body | main | reps | no |
| `peAeMR3` | band shoulder press | shoulders | arms, back | resistance band | beginner | full body, upper body | main | reps | no |
| `DsgkuIt` | dumbbell lateral raise | shoulders | – | dumbbells | beginner | full body, upper body | main | reps | no |
| `A6wtbuL` | dumbbell standing overhead press | shoulders | arms | dumbbells | intermediate | full body, upper body | main | reps | no |
| `FS63wTN` | dumbbell push press | shoulders | arms, legs | dumbbells | intermediate | full body, upper body | main | reps | no |
| `EAs3xL9` | dumbbell reverse fly | shoulders | back | dumbbells | intermediate | upper body | main | reps | no |
| `SpYC0Kp` | dumbbell bench press | chest | arms, shoulders | dumbbells, chair or bench | intermediate | full body, upper body | main | reps | no |
| `NbVPDMW` | dumbbell biceps curl | arms | – | dumbbells | beginner | upper body | main | reps | no |
| `slDvUAU` | dumbbell hammer curl | arms | – | dumbbells | beginner | upper body | main | reps | no |
| `W6PxUkg` | dumbbell kickback | arms | shoulders | dumbbells | intermediate | upper body | main | reps | no |
| `PdmaD0N` | dumbbell standing triceps extension | arms | shoulders | dumbbells | intermediate | upper body | main | reps | yes |
| `3omWx6P` | band alternating biceps curl | arms | – | resistance band | beginner | upper body | main | reps | no |
| `aHDy5O5` | band y-raise | shoulders | back | resistance band | beginner | upper body | main | reps | no |
| `g9AsZ8P` | kettlebell one arm row | back | arms | kettlebell | intermediate | full body, upper body | main | reps | yes |
| `rg59QCH` | kettlebell one arm floor press | chest | arms, shoulders | kettlebell | intermediate | upper body | main | reps | yes |

#### Main: lower body

| id | name | primary | secondary | Equipment | Difficulty | workout types | Block roles | measure | perSide |
|---|---|---|---|---|---|---|---|---|---|
| `u0cNiij` | low glute bridge on floor | glutes | legs, core | – | beginner | full body, lower body | main | reps | no |
| `kMzUs9Y` | forward lunge (male) | glutes | legs | – | beginner | full body, lower body | main | reps | no |
| `bJYHBIN` | bodyweight standing calf raise | legs | – | – | beginner | lower body | main | reps | no |
| `6YUfHPL` | quads | legs | glutes | – | beginner | full body, lower body | main | reps | no |
| `7WaDzyL` | side hip abduction | legs | glutes | – | beginner | lower body | main | reps | no |
| `mQ1tBXn` | straight leg outer hip abductor | legs | glutes | – | beginner | lower body | main | reps | yes |
| `C5jncD2` | standing single leg curl | legs | glutes | – | beginner | lower body | main | reps | yes |
| `9E25EOx` | split squats | legs | glutes | – | intermediate | full body, lower body | main | reps | yes |
| `gUjqdei` | curtsey squat | glutes | legs | – | intermediate | full body, lower body | main | reps | no |
| `GibBPPg` | glute bridge march | glutes | legs, core | – | intermediate | full body, lower body | main | reps | no |
| `rmEukuS` | single leg bridge with outstretched leg | glutes | legs, core | – | intermediate | full body, lower body | main | reps | yes |
| `0jp9Rlz` | one leg floor calf raise | legs | – | – | intermediate | lower body | main | reps | yes |
| `sVQCCeG` | march sit (wall) | legs | glutes, core | – | intermediate | lower body | main | time | no |
| `LIlE5Tn` | jump squat | glutes | legs | – | intermediate | full body, lower body, cardio/HIIT | main | reps | no |
| `uZKq7lo` | forward jump | legs | glutes | – | intermediate | lower body, cardio/HIIT | main | reps | no |
| `PM1PZjg` | lunge with jump | glutes | legs | – | advanced | full body, lower body, cardio/HIIT | main | reps | no |
| `C31LMnP` | one leg squat | glutes | legs, core | – | advanced | lower body | main | reps | yes |
| `xdYPUtE` | sissy squat | legs | glutes | – | advanced | lower body | main | reps | no |
| `WL4EmxJ` | side bridge hip abduction | legs | glutes, core | – | advanced | full body, lower body | main | reps | yes |
| `yn8yg1r` | dumbbell goblet squat | legs | glutes | dumbbells | intermediate | full body, lower body | main | reps | no |
| `UHJlbu3` | kettlebell swing | glutes | legs, core | kettlebell | intermediate | full body, lower body, cardio/HIIT | main | reps | no |
| `rR0LJzx` | dumbbell romanian deadlift | glutes | legs, core | dumbbells | intermediate | full body, lower body | main | reps | no |
| `SSsBDwB` | dumbbell rear lunge | glutes | legs | dumbbells | intermediate | full body, lower body | main | reps | no |
| `aXtJhlg` | dumbbell step-up | glutes | legs | dumbbells, chair or bench | intermediate | lower body | main | reps | yes |
| `qx4fgX7` | dumbbell single leg split squat | legs | glutes | dumbbells, chair or bench | advanced | lower body | main | reps | yes |
| `TUZLh71` | band squat | glutes | legs | resistance band | beginner | full body, lower body | main | reps | no |
| `E4R8Hz1` | band hip lift | glutes | legs | resistance band | beginner | lower body | main | reps | no |
| `kuMiR2T` | band stiff leg deadlift | glutes | legs, core | resistance band | beginner | lower body | main | reps | no |
| `O95afRA` | monster walk | glutes | legs | resistance band | beginner | lower body | main | reps | no |
| `0xDpB4L` | resistance band seated hip abduction | legs | glutes | resistance band, chair or bench | beginner | lower body | main | reps | no |
| `ZA8b5hc` | kettlebell goblet squat | legs | glutes | kettlebell | intermediate | full body, lower body | main | reps | no |
| `WKMQzCD` | kettlebell lunge pass through | glutes | legs, core | kettlebell | advanced | full body, lower body | main | reps | no |

#### Main: core

| id | name | primary | secondary | Equipment | Difficulty | workout types | Block roles | measure | perSide |
|---|---|---|---|---|---|---|---|---|---|
| `iny3m5y` | dead bug | core | – | – | beginner | full body, core | main | reps | no |
| `TFqbd8t` | crunch floor | core | – | – | beginner | core | main | reps | no |
| `nCU1Ekp` | reverse crunch | core | – | – | beginner | core | main | reps | no |
| `NKJ8o6x` | pelvic tilt | core | – | – | beginner | core | main | reps | no |
| `qaZVsGk` | alternate heel touchers | core | – | – | beginner | core | main | reps | no |
| `rbu5UUb` | cross body crunch | core | – | – | beginner | core | main | reps | no |
| `2jl9K55` | spine twist | core | – | – | beginner | core | main | reps | no |
| `ANbbry2` | lower back curl | core | glutes | – | beginner | full body, core | main | reps | no |
| `XVDdcoj` | russian twist | core | – | – | intermediate | core | main | reps | no |
| `1ZFqTDN` | air bike | core | – | – | intermediate | full body, core | main | reps | no |
| `AQIhRjM` | lying elbow to knee | core | – | – | intermediate | core | main | reps | no |
| `9IxJdtC` | lying leg-hip raise | core | – | – | intermediate | core | main | reps | no |
| `BMMolZ3` | tuck crunch | core | – | – | intermediate | core | main | reps | no |
| `UVo2Qs2` | flutter kicks | core | legs | – | intermediate | core | main | time | no |
| `5VXmnV5` | bodyweight incline side plank | core | shoulders | – | intermediate | full body, core | main | time | yes |
| `CosupLu` | front plank with twist | core | shoulders | – | intermediate | full body, core | main | reps | no |
| `hCjGsRQ` | power point plank | core | shoulders, arms, glutes | – | intermediate | full body, core | main | time | no |
| `ZuXu4Eq` | v-sit on floor | core | – | – | advanced | core | main | reps | no |
| `tFToB7l` | reverse plank with leg lift | core | glutes, legs, shoulders | – | advanced | full body, core | main | reps | no |
| `UpWmA5E` | l-sit on floor | core | arms | – | advanced | core | main | time | no |
| `KhHJ338` | push-up to side plank | core | chest, shoulders, arms | – | advanced | full body, core | main | reps | no |
| `IpONWYv` | dumbbell side bend | core | – | dumbbells | beginner | core | main | reps | yes |
| `L4ay0PW` | kettlebell figure 8 | core | shoulders, arms | kettlebell | intermediate | full body, core | main | reps | no |
| `9Tkqa9O` | kettlebell windmill | core | shoulders | kettlebell | advanced | core | main | reps | yes |
| `Ha7SZ3y` | kettlebell turkish get up (squat style) | core | glutes, legs, shoulders | kettlebell | advanced | full body, core | main | reps | yes |

#### Main: cardio/HIIT

| id | name | primary | secondary | Equipment | Difficulty | workout types | Block roles | measure | perSide |
|---|---|---|---|---|---|---|---|---|---|
| `RJgzwny` | mountain climber | core | shoulders, legs | – | intermediate | full body, core, cardio/HIIT | main | time | no |
| `zfNHMN9` | skater hops | legs | glutes | – | intermediate | lower body, cardio/HIIT | main | time | no |
| `dK9394r` | burpee | legs | chest, shoulders, core | – | advanced | full body, cardio/HIIT | main | reps | no |
| `fNGumX0` | back and forth step | legs | glutes | – | beginner | full body, cardio/HIIT | main | time | no |
| `hoXt6wv` | left hook. boxing | shoulders | arms, core | – | beginner | cardio/HIIT | main | time | yes |
| `HtfCpfi` | star jump (male) | legs | shoulders | – | intermediate | full body, cardio/HIIT | main | time | no |
| `Eh2v5Iu` | scissor jumps (male) | legs | – | – | intermediate | cardio/HIIT | main | time | no |
| `J9zIWig` | walking high knees lunge | legs | glutes, core | – | intermediate | lower body, cardio/HIIT | main | time | no |
| `0Yz8WdV` | bear crawl | core | shoulders, legs | – | intermediate | full body, core, cardio/HIIT | main | time | no |
| `mr7pkqP` | jack burpee | legs | chest, shoulders, core | – | advanced | full body, cardio/HIIT | main | reps | no |
| `PrQbjvB` | push to run | chest | core, legs | – | advanced | full body, cardio/HIIT | main | time | no |
| `0JtKWum` | dumbbell burpee | legs | chest, shoulders, core | dumbbells | advanced | full body, cardio/HIIT | main | reps | no |
| `yWxMvB5` | kettlebell thruster | shoulders | legs, glutes, core | kettlebell | intermediate | full body, cardio/HIIT | main | reps | no |
| `8ARQ9Hw` | kettlebell sumo high pull | back | shoulders, glutes, legs | kettlebell | intermediate | full body, cardio/HIIT | main | reps | no |

#### Main and cool-down: mobility/stretching only

| id | name | primary | secondary | Equipment | Difficulty | workout types | Block roles | measure | perSide |
|---|---|---|---|---|---|---|---|---|---|
| `BWnJR72` | lying (side) quads stretch | legs | – | – | beginner | mobility/stretching | main, cool-down | time | yes |
| `QY39eBr` | seated piriformis stretch | glutes | back | – | beginner | mobility/stretching | main, cool-down | time | yes |
| `bWlZvXh` | butterfly yoga pose | legs | glutes | – | beginner | mobility/stretching | main, cool-down | time | no |
| `0mB6wHO` | runners stretch | legs | – | – | beginner | mobility/stretching | main, cool-down | time | yes |
| `f38OEuO` | kneeling lat stretch | back | shoulders | – | beginner | mobility/stretching | main, cool-down | time | yes |
| `DIVyqrU` | sphinx | core | back | – | beginner | mobility/stretching | main, cool-down | time | no |
| `2Dk4xQV` | rocking frog stretch | glutes | legs | – | intermediate | mobility/stretching | main | time | no |
| `pZwUsKB` | iron cross stretch | glutes | core, back | – | intermediate | mobility/stretching | main | time | no |
| `HIgYKAB` | seated wide angle pose sequence | legs | back | – | intermediate | mobility/stretching | main, cool-down | time | no |
| `01qpYSe` | upward facing dog | core | chest, shoulders | – | intermediate | mobility/stretching | main | time | no |

#### Cool-down for every workout type

| id | name | primary | secondary | Equipment | Difficulty | workout types | Block roles | measure | perSide |
|---|---|---|---|---|---|---|---|---|---|
| `99rWm7w` | hamstring stretch | legs | glutes | – | beginner | every type | cool-down | time | yes |
| `DeDThfG` | seated glute stretch | glutes | legs | – | beginner | every type | cool-down | time | yes |
| `Uto7l43` | chest and front of shoulder stretch | chest | shoulders | – | beginner | every type | cool-down | time | no |
| `1jXLYEw` | standing lateral stretch | back | shoulders, core | – | beginner | every type | cool-down | time | yes |
| `m0tCHqc` | calf stretch with hands against wall | legs | – | – | beginner | every type | cool-down | time | yes |
| `uOV3Itw` | triceps stretch | arms | shoulders | – | beginner | every type | cool-down | time | yes |
| `xifhB5W` | rear deltoid stretch | shoulders | back | – | beginner | every type | cool-down | time | yes |
| `x2chWLO` | neck side stretch | back | – | – | beginner | every type | cool-down | time | yes |
| `GSDioYu` | upper back stretch | back | shoulders | – | beginner | every type | cool-down | time | no |
