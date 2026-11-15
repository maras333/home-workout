# Define the Workout Request

> Archived: this ticket now lives in GitHub issue [#2](https://github.com/maras333/home-workout/issues/2).

Type: grilling
Status: resolved
Map: [Home Workout MVP](../map.md)

## Question

What exactly does the user fill in? Settle these:
- the workout type picker (the six types)
- the available-time options (free number or presets?)
- the difficulty scale and what each level means to the user
- the Equipment checkboxes
- whether any free-text input exists (likely not, since generation is rule-based)

## Answer

A Workout Request has exactly four fields. There is no free text and nothing else.

- **Workout type:** required, single-select, shown as six cards (full body, upper body, lower body, core, cardio/HIIT, mobility/stretching). Default: full body.
- **Time:** presets of 15 / 30 / 45 / 60 min. Default: 30. This is the **total** length of the Workout, including the warm-up and cool-down Blocks and all rest. Generation aims to land within about ±10% of it.
- **Difficulty:** Beginner / Intermediate / Advanced. Default: Intermediate. Each level shows a one-line hint:
  - Beginner: "New to training, or coming back after a break."
  - Intermediate: "You train now and then and know the basic moves."
  - Advanced: "You train regularly and want to be pushed."
  
  Difficulty applies to every workout type, mobility/stretching included. How it changes the Workout is left to [Design rule-based Workout generation](04-design-workout-generation.md).
- **Equipment:** ~~five~~ four plain checkboxes (dumbbells, resistance band, kettlebell, chair or bench; yoga mat removed by [Define the Exercise library shape](03-define-exercise-library-shape.md)), all unchecked by default. Bodyweight is implied and has no checkbox. There is no weight input, so Workouts never prescribe a load.

Not in the Request: free text, focus muscle, injuries, excluding Exercises.

Behaviour around the form:
- The last Workout Request is saved in localStorage and prefills the form on the next visit.
- After a Workout is generated, **Generate another** builds a different Workout from the same Request. Variation comes from the generation rules.
