# Define the Workout preview screen

> Archived: this ticket now lives in GitHub issue [#8](https://github.com/maras333/home-workout/issues/8).

Type: grilling
Status: resolved
Map: [Home Workout MVP](../map.md)

## Question

What does the screen between "Generate" and Follow-along show, and what can the user do there?
- how a generated Workout is listed (Blocks, Rounds, Sets, total time) and how much it reuses from the Follow-along Workout list
- whether single Exercises can be swapped, and if so, how a swap picks its replacement within the rules in [Design rule-based Workout generation](04-design-workout-generation.md)
- where "Generate another", "Start Workout" and "Change request" sit

## Answer

**The Workout preview is its own screen at `/workout`**, reached by pressing "Generate" on the Workout Request form.

### Layout

- **Top bar:** "← Change request" on the left, which goes back to the form with the current Request filled in. On the right: "Generate another" (secondary) and **Start Workout** (primary). "Generate another" replaces the Workout straight away, with no confirmation.
- **Summary line** of the Request: e.g. "Full body · 30 min · Intermediate · Dumbbells".
- **Totals:** the planned total time and the number of Exercises.
- **Workout list**, built from the same pieces as the Follow-along Workout list in [Prototype the Follow-along screen](06-prototype-follow-along.md): Blocks, and one row per Exercise with a GIF, name and target ("12 reps", "40 s per side"). The **main Block is compacted**: its Exercises appear once under a heading like "Main · 5 Exercises × 4 Rounds (last Round: 2 Exercises)". Rest isn't shown as rows; it's included in the total time.

### Swap

Each Exercise row has a **Swap** button that replaces that Exercise with another, chosen at random from those that are:
- eligible for the same Block under the rules in [Design rule-based Workout generation](04-design-workout-generation.md) (workout type, Block role, Equipment, Difficulty)
- not already in the Workout
- preferably sharing the same primary Muscle group

Swapping a main-Block Exercise changes it **in every Round**, and the Rounds are then **refitted** to the time, because a rep Exercise and a timed one last differently. The button is disabled when no other Exercise is eligible. There's no undo; press Swap again to get another option.

### Exercise details

Clicking a row opens an **Exercise detail dialog**: a large GIF, the steps, "Trains: …", the Equipment and the Difficulty. It's built so other screens can reuse it, such as an Exercise library page or Follow-along while paused.

### Saving

The current Workout, swaps included, is saved in browser storage. Reloading `/workout` shows the same Workout, and Follow-along (and its resume) reads that same saved Workout. If `/workout` is opened with nothing saved, it redirects to the Workout Request form.
