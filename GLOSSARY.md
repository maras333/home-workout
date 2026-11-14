# Home Workout

A virtual training partner for people who train at home: it builds a workout to fit what the user asks for and guides them through it.

## Language

**Exercise**:
One movement in the library (e.g. goblet squat), with its steps, Muscle groups, required Equipment, Difficulty and illustration.
_Avoid_: Move, drill

**Muscle group**:
One of seven coarse body areas an Exercise trains: chest, back, shoulders, arms, core, glutes, legs.
_Avoid_: Body part, target muscle

**Equipment**:
A physical item an Exercise needs beyond the user's own body. Bodyweight (no Equipment) is the default.
_Avoid_: Gear, tools

**Workout Request**:
What the user asks for: workout type, total time, Difficulty and the Equipment they have today.
_Avoid_: Preferences, settings, query

**Difficulty**:
How hard the user wants the Workout to be: Beginner, Intermediate or Advanced.
_Avoid_: Level, intensity, fitness level

**Workout**:
A generated training session that answers one Workout Request, made of Blocks.
_Avoid_: Session, routine, plan, class

**Block**:
An ordered phase of a Workout (warm-up, main, cool-down) holding Sets.
_Avoid_: Section, part, circuit

**Round**:
One pass through the Exercises of a main Block; the main Block repeats its Exercises for several Rounds.
_Avoid_: Circuit, lap

**Set**:
One Exercise done for a target number of reps or a target duration, followed by rest.
_Avoid_: Interval, rep (a Set holds many reps)

**Follow-along**:
The guided mode in which the app walks the user through a Workout in real time.
_Avoid_: Player, training mode, coach mode
