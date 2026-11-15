# Home Workout

A virtual training partner for people who train at home: it builds a workout to fit what the user asks for and guides them through it.

## Language

**Exercise**:
One movement in the library (e.g. goblet squat), with its steps, Muscle groups, required Equipment, Difficulty and illustration.
_Avoid_: Move, drill
_Polish_: Ćwiczenie

**Muscle group**:
One of seven coarse body areas an Exercise trains: chest, back, shoulders, arms, core, glutes, legs.
_Avoid_: Body part, target muscle

**Equipment**:
A physical item an Exercise needs beyond the user's own body. Bodyweight (no Equipment) is the default.
_Avoid_: Gear, tools
_Polish_: Sprzęt

**Workout Request**:
What the user asks for: workout type, total time, Difficulty and the Equipment they have today.
_Avoid_: Preferences, settings, query
_Polish_: "Czego chcesz?" (the form's heading)

**Difficulty**:
How hard the user wants the Workout to be: Beginner, Intermediate or Advanced.
_Avoid_: Level, intensity, fitness level
_Polish_: Poziom (Początkujący, Średni, Zaawansowany)

**Workout**:
A generated training session that answers one Workout Request, made of Blocks.
_Avoid_: Session, routine, plan, class
_Polish_: Trening

**Block**:
An ordered phase of a Workout (warm-up, main, cool-down) holding Sets.
_Avoid_: Section, part, circuit
_Polish_: Rozgrzewka, Część główna, Wyciszenie

**Round**:
One pass through the Exercises of a main Block; the main Block repeats its Exercises for several Rounds.
_Avoid_: Circuit, lap
_Polish_: Runda

**Set**:
One Exercise done for a target number of reps or a target duration, followed by rest.
_Avoid_: Interval, rep (a Set holds many reps)
_Polish_: Seria

**Favourite**:
A Workout the user saved to start again later, kept exactly as it was generated.
_Avoid_: Saved workout, bookmark, template
_Polish_: Ulubiony (the section: Ulubione)

**Swap**:
Replacing one Exercise in a generated Workout with another Exercise that fits the same Block, leaving the rest of the Workout unchanged.
_Avoid_: Replace, reroll (that's "Generate another", which rebuilds the whole Workout)
_Polish_: Zamień

**Follow-along**:
The guided mode in which the app walks the user through a Workout in real time.
_Avoid_: Player, training mode, coach mode
_Polish_: Trening na żywo

**Language**:
The language the app speaks to the user, on screen and aloud: English or Polish.
_Avoid_: Locale, i18n, translation setting
_Polish_: Język
