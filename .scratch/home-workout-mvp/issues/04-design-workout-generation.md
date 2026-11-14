# Design rule-based Workout generation

Type: grilling
Status: resolved
Blocked by: 02, 03
Map: [Home Workout MVP](../map.md)

## Question

What are the rules that turn a Workout Request into a Workout? Settle:
- the Block structure per workout type (warm-up, main, cool-down)
- how Exercises are selected (muscle balance, Equipment filter, difficulty, no repeats)
- reps vs duration, and rest lengths per difficulty
- how the time budget is met
- how much randomness, so repeated requests vary
- what happens when the filters leave too few Exercises

## Answer

### Blocks and time split

Every workout type has three Blocks: warm-up, main and cool-down. The time chosen is the total Workout length, and generation aims to land within ±10% of it.

| Time (min) | Warm-up | Main | Cool-down |
|---|---|---|---|
| 15 | 3 | 10 | 2 |
| 30 | 5 | 21 | 4 |
| 45 | 6 | 34 | 5 |
| 60 | 8 | 45 | 7 |

For mobility/stretching the warm-up is gentle joint work, the main Block is stretches, and the cool-down is the calmest holds.

### Main Block format

- The main Block picks a fixed number of Exercises per preset: **15 → 4, 30 → 5, 45 → 6, 60 → 6**.
- It repeats them in **Rounds** (one pass through those Exercises) until its time is used up.
- The **last Round may be partial**: it stops after the Set that lands nearest the budget.
- Warm-up and cool-down are a single pass, holding as many Exercises as fit in their minutes.

### Reps or time

- Warm-up, cool-down, cardio/HIIT and mobility/stretching always use **timed** Sets.
- In the main Block of full body, upper body, lower body and core Workouts, a Set uses the Exercise's own measure (reps or time).
- To fit the time budget, a rep counts as **3 s**, doubled for per-side Exercises.
- A **per-side Exercise is one Set** covering both sides, with doubled time or "N reps per side". [Prototype the Follow-along screen](06-prototype-follow-along.md) decides how the switch is signalled.

### Work and rest by Difficulty (main Block)

| | Beginner | Intermediate | Advanced |
|---|---|---|---|
| Strength reps | 8 | 12 | 15 |
| Strength timed Set | 30 s | 40 s | 45 s |
| Rest after each Set | 30 s | 20 s | 15 s |
| Rest between Rounds | 60 s | 60 s | 45 s |
| Cardio/HIIT work / rest | 20 / 40 s | 30 / 30 s | 40 / 20 s |

Warm-up, cool-down and mobility don't change with Difficulty:
- warm-up: 30 s per Exercise
- cool-down and mobility: 40 s holds, per side where it applies
- 10 s change-over between Exercises

### Selection

**Eligibility.** An Exercise is eligible when all of these hold:
- its workout types include the requested type
- its Block roles include the Block being filled
- all the Equipment it needs is ticked
- its Difficulty is **at or below** the requested one

**Preferences:**
- **Difficulty:** the main Block prefers Exercises at exactly the requested Difficulty.
- **Equipment:** if any Equipment is ticked, at least half the main Block uses it when the pool allows.
- **Muscle balance:** the main Block rotates through the type's Muscle groups. Two Exercises next to each other never share a primary group where avoidable.
  - Full body: legs, glutes, chest, back, shoulders, core (arms optional)
  - Upper body: chest, back, shoulders, arms
  - Lower body: legs, glutes, plus core as a filler
  - Core: core only. No rotation; Exercises vary instead.
  - Cardio/HIIT and mobility: any Exercise tagged with that type, rotating groups where possible
- **Warm-up and cool-down** prefer Exercises that work the main Block's Muscle groups.

**Randomness:**
- Picks are random among eligible Exercises, with no repeats within a Block.
- **Generate another** steers away from the previous Workout's main-Block Exercises when the pool allows.
- The random source is injectable, so tests can reproduce a Workout.

### Too few Exercises

Generation never fails. When the pool is too small, it degrades in this order:
1. Drop the Equipment preference.
2. Shrink the main Block to as few as 3 Exercises and add Rounds.
3. Let warm-up or cool-down Exercises repeat.

**Curation target** (a review check for the curation file in [Define the Exercise library shape](03-define-exercise-library-shape.md)): at least **6 bodyweight-only main-Block Exercises for every workout type × Difficulty**.
