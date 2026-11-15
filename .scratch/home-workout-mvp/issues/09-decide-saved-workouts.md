# Decide whether saved Workouts are in the MVP

> Archived: this ticket now lives in GitHub issue [#9](https://github.com/maras333/home-workout/issues/9).

Type: grilling
Status: resolved
Map: [Home Workout MVP](../map.md)

## Question

Are favourite or recent Workouts saved in the browser for the MVP? If yes:
- what is saved: the whole generated Workout or only its Workout Request
- how many are kept
- where the user finds them again

Prefilling the last Workout Request ([Define the Workout Request](02-define-workout-request.md)) and resuming a Workout in progress ([Prototype the Follow-along screen](06-prototype-follow-along.md)) are already decided. The **current** Workout, swaps included, is already saved in browser storage ([Define the Workout preview screen](08-define-workout-preview.md)); this ticket is about keeping more than that one.

## Answer

**Yes, as Favourites only.** You save a Workout you liked yourself, and nothing is kept unless you ask. There's no automatic list of recent Workouts: it leans towards history and progression, which are out of scope.

- **What a Favourite holds:** a frozen copy of the whole Workout: its Workout Request, Blocks, Exercises, Set targets, Rounds and any swaps. Starting it again gives exactly the same Workout. If a later app update removes one of its Exercises from the library, the Favourite is greyed out as "No longer available", with only Delete. It is not silently repaired.
- **Saving:** a **☆ Save** button in the [Workout preview](08-define-workout-preview.md) top bar and on the "Workout complete" screen. The Favourite gets an automatic name, e.g. "Full body · 30 min · Intermediate · 14 Nov", and can't be renamed. Pressing the button again on the same Workout removes it from Favourites.
- **Limit:** at most **20** Favourites. When full, Save is disabled with the hint "Favourites full — delete one first". Nothing is ever removed automatically.
- **Finding them:** a **Favourites** section under the Workout Request form, hidden when empty. Each row shows the name, the Exercise count, a **Start** button and Delete (with a confirmation). Start loads the Favourite as the current Workout and opens the Workout preview. Swapping Exercises there changes only the current copy, not the saved Favourite; saving again keeps the changed version as a new Favourite.
- **Storage:** browser storage, next to the current Workout and the last Workout Request.
