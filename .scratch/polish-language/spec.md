# Polish Language

Issues: [#28](https://github.com/maras333/home-workout/issues/28) (languages other than English), [#34](https://github.com/maras333/home-workout/issues/34) (add Polish and let the user choose the Language). Builds on the [Home Workout MVP spec](../home-workout-mvp/spec.md).

## Problem Statement

The app speaks only English, on screen and aloud. Some of the friends who use it would rather train in Polish. Today they read English Exercise steps and hear "Rest. Next: band stiff leg deadlift, 12 reps." while they're out of breath, and there is no way to change that.

## Solution

The app speaks English or Polish, and the user picks the Language with an "EN | PL" switch in the header of every screen. The first visit follows the browser's language. The choice is remembered.

In Polish, everything the user sees or hears is Polish:
- the screens, with correct Polish plural forms;
- the Workout Request options;
- the Exercises' names, steps and the "Ćwiczy: …" line;
- Follow-along's spoken cues, with a Polish voice.

The Workouts themselves don't change: a saved Workout or Favourite is the same Workout in either Language. When the browser has no Polish voice, the voice stays off with a hint, and the beeps carry on.

## User Stories

### Choosing the Language

1. As a user, I want an "EN | PL" switch in the header of every screen, so that I can change the Language wherever I am.
2. As a user whose browser is in Polish, I want the app to start in Polish on my first visit, so that I don't have to find the switch.
3. As a user whose browser is in any other language, I want the app to start in English, so that I get the Language the app was written in.
4. As a user, I want my Language choice remembered in this browser, so that the app opens in it next time.
5. As a user, I want a corrupt or missing saved Language to fall back to the browser's language, so that the app always opens in a sensible Language.
6. As a user, I want the switch to show which Language is active, so that I can tell at a glance.
7. As a user of a screen reader, I want the page's language attribute to follow the Language, so that Polish text is read with Polish pronunciation.

### Screens in Polish

8. As a Polish-speaking user, I want every label, button, heading, hint and dialog in Polish, so that nothing on screen is in English.
9. As a Polish-speaking user, I want the domain terms to use one Polish word each (Trening, Ćwiczenie, Rozgrzewka / Część główna / Wyciszenie, Runda, Seria, Sprzęt, Poziom, Ulubione, Zamień, Trening na żywo), so that the app is consistent.
10. As a Polish-speaking user, I want the Workout Request form headed "Czego chcesz?", with Polish workout types (Całe ciało, Góra ciała, Dół ciała, Brzuch, Cardio/HIIT, Mobilność i rozciąganie), so that I understand my choices.
11. As a Polish-speaking user, I want the Difficulty options and their hints in Polish (Początkujący, Średni, Zaawansowany), so that I can pick the right one.
12. As a Polish-speaking user, I want the Equipment options in Polish (hantle, guma oporowa, kettlebell, krzesło lub ławka), so that I know what to tick.
13. As a Polish-speaking user, I want counts with correct Polish plural forms ("1 powtórzenie", "3 powtórzenia", "12 powtórzeń", "1 runda", "3 rundy", "5 rund", "5 Ćwiczeń × 4 Rundy"), so that the text reads naturally.
14. As a Polish-speaking user, I want targets such as "40 s na stronę" and the Workout summary and totals in Polish, so that the preview and Follow-along make sense.
15. As a Polish-speaking user, I want Follow-along's labels in Polish ("Przygotuj się", "Zmiana", "Przerwa", "Przerwa między rundami", "Następne", "Strona 1 z 2", "Strona 2 z 2 — zmiana!", "Trening zakończony"), so that I can follow along at a glance.
16. As a Polish-speaking user, I want the controls and their dialogs in Polish (Pauza, Wznów, Pomiń, Wstecz, Zakończ trening), so that I can operate Follow-along.
17. As a Polish-speaking user, I want the keyboard shortcuts unchanged (Space, N, B), so that the controls work the same in either Language.
18. As a Polish-speaking user, I want the Favourites section, its hints and its dialogs in Polish, including "Ulubione pełne — usuń jeden" and "Niedostępny", so that I can manage Favourites.
19. As a Polish-speaking user, I want the footer credit in Polish around the names it credits, so that the licence notice is readable and still names ExerciseDB and AGPL-3.0.

### Exercises in Polish

20. As a Polish-speaking user, I want every Exercise's name in Polish, so that I know what I'm about to do.
21. As a Polish-speaking user, I want every Exercise's steps in Polish in the detail dialog, so that I can learn the movement.
22. As a Polish-speaking user, I want the Muscle groups in Polish ("Ćwiczy: nogi, pośladki"), so that I know what an Exercise trains.
23. As the maintainer, I want to review every Polish Exercise name and step before it ships, side by side with the English, so that the translations are correct.
24. As the maintainer, I want a check that fails when an Exercise has no Polish name or a different number of steps in Polish, so that new Exercises can't ship half-translated.

### Voice in Polish

25. As a Polish-speaking user, I want the spoken cues in Polish ("Go." → "Start.", "Switch sides." → "Zmień stronę.", "Workout complete." → "Trening zakończony."), so that I can follow by ear.
26. As a Polish-speaking user, I want each rest announced as "<rest label>. Następne: <Exercise>, <target>.", with the Exercise's Polish name and the target in full words ("czterdzieści sekund na stronę" read from "40 sekund na stronę"), so that I know what's coming without looking.
27. As a Polish-speaking user, I want the cues spoken with a Polish voice, so that the words are pronounced properly.
28. As a Polish-speaking user whose browser has no Polish voice, I want the voice switched off with a hint by the 🗣 toggle, so that I'm never read Polish in an English voice.
29. As a Polish-speaking user without a Polish voice, I want the beeps to keep working, so that I can still follow by ear.
30. As a Polish-speaking user, I want the voice to come back on its own once a Polish voice is available or I switch to English, so that I don't have to reset anything.

### Changing the Language mid-Workout

31. As a user, I want to switch the Language during Follow-along without the Workout pausing or restarting, so that the switch never costs me my place.
32. As a user, I want the screen to change Language at once and whatever was being said to stop, so that I don't hear the old Language after switching.
33. As a user, I want every cue after the switch in the new Language, so that the voice follows my choice.

### Saved Workouts and Favourites

34. As a user, I want my current Workout and my Favourites shown in the Language I've chosen, whichever Language they were saved in, so that switching never leaves English text behind.
35. As a user, I want a Workout to stay the same Workout (Exercises, Set targets, Rounds, swaps) in either Language, so that the Language never changes my training.
36. As a user, I want a Favourite's name built in the current Language from its Workout and the day it was saved ("Całe ciało · 30 min · Średni · 14 lis"), so that its name matches the rest of the screen.
37. As a user with Favourites saved before this change, I want them to keep their old name, so that nothing I saved breaks.
38. As a user, I want a saved Workout whose Exercise has left the library to still show that Exercise's saved name and steps, so that the frozen copy still works as a fallback.
39. As a user, I want switching the Language to keep saved Follow-along progress, the current Workout, Favourites and sound settings, so that the switch only changes words.

## Implementation Decisions

- **Two Languages, English and Polish.** The dictionaries are shaped so a third Language could be added by adding one more dictionary, but nothing is built for one now.
- **The Language** is a new domain term (`GLOSSARY.md`), with a Polish word for every existing term recorded there. Those words are the single source for the Polish dictionary's domain terms.
- **Choosing the Language:**
  - The "EN | PL" switch sits in the header on every screen.
  - The default comes from the browser's preferred languages: Polish when the first one is Polish, otherwise English.
  - The choice is stored in browser storage next to the sound settings and read defensively: a missing or unknown value falls back to the default.
  - The page's language attribute follows the Language.
- **Dictionaries:**
  - Every user-facing string moves out of the screens and components into one dictionary per Language, with the same keys.
  - The type checker enforces that both dictionaries hold every key.
  - Strings with a count take the count, and the Polish forms are picked with the browser's built-in plural rules (one / few / many).
  - The existing text helpers (target, Round summary, request summary, duration, Favourite name) take the Language.
- **The current Language** is provided to the whole app from one place. Every screen re-renders when it changes; nothing reloads.
- **Exercise translations:**
  - The Polish names, steps and Muscle group words live as data in the repo next to the curation, keyed by Exercise id.
  - The library hands out an Exercise's text in the requested Language. The Muscle-group line ("Trains: …" / "Ćwiczy: …") is built from the tags and translated words, not stored as text.
  - A side-by-side review file, English and Polish for each Exercise, is generated for the maintainer to review before the translations ship, like the curation review in the MVP.
- **Saved data stays the same:**
  - A saved Workout and a Favourite are still frozen copies, and their Exercise data stays as saved.
  - On screen and in speech, an Exercise's text is looked up in the library by id, in the current Language. The frozen copy is used only when the id is no longer in the library.
  - Sameness of Workouts (the Favourite Save toggle) is unchanged.
- **Favourite names:**
  - A new Favourite stores the day it was saved, and its name is built for display from its Workout's Request and that day, in the current Language.
  - The month is abbreviated per Language ("14 Nov" / "14 lis").
  - A Favourite saved before this change has no saved day and keeps showing its stored name.
- **Voice:**
  - The cues are built per Language from the same cue rules.
  - Each utterance is tagged with the Language (`en-US` / `pl-PL`) and given a matching voice from the browser's list.
  - The browser fills that list asynchronously, so availability is re-checked when it changes.
  - With Polish chosen and no Polish voice, speech is not attempted: the 🗣 toggle shows a "no Polish voice in this browser" hint and the saved voice setting is left untouched, so it applies again once a voice is available.
- **Changing the Language mid-Workout:**
  - Switching cancels the utterance in progress.
  - The next cue uses the new Language.
  - The player state, progress and timers are untouched.

## Testing Decisions

- **What a good test is:** as in the MVP spec, tests check behaviour a user can see or hear: what's on screen, what's in browser storage, and which speech calls were made with which text and language, all after real user actions. There are no tests of internal state, dictionaries or component structure.
- **Seam 1: the whole app** (React Testing Library, fake timers, the jsdom browser storage, fakes for speech, audio and the Wake Lock). The fake speech gains a voice list that a test can fill or leave without Polish. Existing app tests stay in English, the default for jsdom's browser language. A new Polish suite covers:
  - the default from the browser's language, Polish and not;
  - the switch, and the choice remembered across a remount;
  - a corrupt saved Language falling back to the default;
  - the page's language attribute;
  - sample screens in Polish: the form, the preview with Polish Exercise names, the detail dialog with Polish steps and "Ćwiczy", Follow-along labels;
  - Polish plural forms on screen ("1 powtórzenie", "3 powtórzenia", "12 powtórzeń"; Rounds likewise);
  - Polish cues with language `pl-PL`, including a rest announcement with a Polish Exercise name and target;
  - no Polish voice: no speech, the hint shown, beeps still played;
  - switching mid-Workout: the speech cancelled, the next cue Polish, the countdown unchanged;
  - a Favourite's name in Polish, and an old Favourite keeping its stored name;
  - a saved Workout whose Exercise left the library showing the saved text.
- **Seam 2: the data check** over the real curated library (the existing library suite). Every curated Exercise has a Polish name and the same number of Polish steps as English ones.
- **Not tested:** the quality of the translations (the maintainer's review) and how a real browser voice sounds.
- **Prior art:** the Follow-along app tests (fakes for speech and audio, sound settings remembered across a remount) and the library data check.

## Out of Scope

- Languages other than English and Polish.
- Translating content outside the app: the README, the spec, the issues and the licence text.
- Translating the GIFs or recording Polish audio; the voice is the browser's built-in speech only.
- Choosing a specific voice, speech rate or voice gender.
- Detecting the Language from anything but the browser's preferred languages (no geolocation, no URL prefix such as `/pl/`).
- Translating Favourite names saved before this change.

## Further Notes

- The Polish words were agreed in the grilling for #28 and recorded in `GLOSSARY.md` (`_Polish_:` lines). Workout types, Muscle groups and Equipment use these words: Całe ciało, Góra ciała, Dół ciała, Brzuch, Cardio/HIIT, Mobilność i rozciąganie; klatka piersiowa, plecy, barki, ręce, brzuch, pośladki, nogi; hantle, guma oporowa, kettlebell, krzesło lub ławka.
- The Exercise text is about 144 names and roughly 69,000 characters of steps. Drafting it is a one-off job, and the review is the slow part. Ticket it so the app can switch Language before every translation is final: until then an Exercise without a Polish text shows its English text, and the data check for complete translations lands with the reviewed translations.
- Once this ships, #28 and #34 close together.
