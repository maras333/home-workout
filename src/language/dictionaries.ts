import type { Difficulty, Equipment, MuscleGroup, WorkoutType } from '@/library'
import type { BlockName, RestLabel } from '@/workout/follow-along'
import type { Theme } from '@/theme/types'
import type { Language } from './types'

/** Every user-facing string, one dictionary per Language; the type checker keeps both complete. */
export type Dictionary = {
  languageSwitch: string
  theme: { name: string; choices: Record<Theme, string> }
  /** The domain's words, as shown in options, summaries and the detail dialog. */
  terms: {
    workoutTypes: Record<WorkoutType, string>
    difficulties: Record<Difficulty, { label: string; hint: string }>
    equipment: Record<Equipment, string>
    /** Shown in place of the Equipment list when there is none. */
    bodyweight: string
    muscleGroups: Record<MuscleGroup, string>
  }
  /** Counts, each with the Language's plural forms. */
  counts: {
    minutes: (count: number) => string
    seconds: (count: number) => string
    reps: (count: number) => string
    exercises: (count: number) => string
    rounds: (count: number) => string
    perSide: (amount: string) => string
  }
  request: {
    heading: string
    workoutType: string
    time: string
    difficulty: string
    equipment: string
    bodyweightIncluded: string
    generate: string
  }
  preview: {
    heading: string
    actions: string
    changeRequest: string
    generateAnother: string
    start: string
    plannedTotal: (duration: string, exercises: string) => string
    warmUp: string
    main: string
    coolDown: string
    lastRound: (exercises: string) => string
    swap: string
    swapExercise: (name: string) => string
  }
  exercise: {
    trains: (primary: string, secondary: string | null) => string
    equipment: string
    difficulty: string
    close: string
  }
  followAlong: {
    blocks: Record<BlockName, string>
    rests: Record<RestLabel, string>
    getReady: string
    upNext: string
    round: (round: number, rounds: number) => string
    /** e.g. "Side 1 of 2", "Side 2 of 2 — switch!" */
    side: (side: 1 | 2, switching: boolean) => string
    now: string
    timeLeft: string
    setProgress: string
    restProgress: string
    /** Read out before "1:05 / 2:35". */
    timeDone: string
    /** Read out before a finished Set in the Timeline. */
    done: string
    /** The Timeline's name: its button and its panel on a phone. */
    timeline: string
    /** Closes the Timeline's panel on a phone. */
    closeTimeline: string
    /** The group of Back, Pause/Resume and Skip. */
    controls: string
    back: string
    pause: string
    resume: string
    skip: string
    endWorkout: string
    endTitle: string
    endDescription: string
    keepGoing: string
    beeps: string
    voice: string
    soundTitle: (sound: string, on: boolean) => string
    complete: string
    planned: (clock: string) => string
    planAnother: string
  }
  /** The Exercise library page and its link in the header. */
  library: {
    link: string
    heading: string
    search: string
    searchPlaceholder: string
    muscleGroup: string
    equipment: string
    difficulty: string
    /** e.g. "12 of 144 Exercises" */
    count: (shown: number, total: number) => string
    clear: string
    empty: string
  }
  footer: {
    credit: string
    /** The title of the footer's AGPL-3.0 link, which leads to our source. */
    sourceCode: string
  }
  favourites: {
    heading: string
    start: string
    delete: string
    unavailable: string
    deleteTitle: string
    cancel: string
    save: string
    full: string
    /** The ✎ button's accessible name, e.g. "Rename “Leg day”". */
    rename: (name: string) => string
    renameTitle: string
    nameField: string
    nameHint: string
    /** Abbreviated, January first, for names like "14 Nov". */
    months: readonly string[]
  }
  /** What Follow-along says aloud. */
  speech: {
    /** The tag each utterance carries, and the voice it asks the browser for. */
    tag: string
    /** Whether the browser's default voice may speak when no voice matches the tag. */
    speaksWithDefaultVoice: boolean
    noVoice: string
    go: string
    switchSides: string
    complete: string
    next: (rest: string, exercise: string, target: string) => string
    /** Seconds in full words; reps and "per side" read as shown. */
    seconds: (count: number) => string
  }
}

const englishRules = new Intl.PluralRules('en')
const polishRules = new Intl.PluralRules('pl')

/** "1 Round", "3 Rounds" */
const english =
  (one: string, other: string) =>
  (count: number): string =>
    `${count} ${englishRules.select(count) === 'one' ? one : other}`

/** "1 runda", "3 rundy", "5 rund"; fractions never occur, so they take the "many" form. */
const polish =
  (one: string, few: string, many: string) =>
  (count: number): string => {
    const form = polishRules.select(count)
    return `${count} ${form === 'one' ? one : form === 'few' ? few : many}`
  }

const en: Dictionary = {
  languageSwitch: 'Language',
  theme: { name: 'Theme', choices: { system: 'System', light: 'Light', dark: 'Dark' } },
  terms: {
    workoutTypes: {
      'full body': 'Full body',
      'upper body': 'Upper body',
      'lower body': 'Lower body',
      core: 'Core',
      'cardio/HIIT': 'Cardio/HIIT',
      'mobility/stretching': 'Mobility/stretching',
    },
    difficulties: {
      beginner: { label: 'Beginner', hint: 'New to training, or coming back after a break.' },
      intermediate: {
        label: 'Intermediate',
        hint: 'You train now and then and know the basic moves.',
      },
      advanced: { label: 'Advanced', hint: 'You train regularly and want to be pushed.' },
    },
    equipment: {
      dumbbells: 'Dumbbells',
      'resistance band': 'Resistance band',
      kettlebell: 'Kettlebell',
      'chair or bench': 'Chair or bench',
    },
    bodyweight: 'Bodyweight',
    muscleGroups: {
      chest: 'chest',
      back: 'back',
      shoulders: 'shoulders',
      arms: 'arms',
      core: 'core',
      glutes: 'glutes',
      legs: 'legs',
    },
  },
  counts: {
    minutes: (count) => `${count} min`,
    seconds: (count) => `${count} s`,
    reps: english('rep', 'reps'),
    exercises: english('Exercise', 'Exercises'),
    rounds: english('Round', 'Rounds'),
    perSide: (amount) => `${amount} per side`,
  },
  request: {
    heading: 'Workout Request',
    workoutType: 'Workout type',
    time: 'Time',
    difficulty: 'Difficulty',
    equipment: 'Equipment',
    bodyweightIncluded: 'Bodyweight Exercises are always included.',
    generate: 'Generate',
  },
  preview: {
    heading: 'Workout preview',
    actions: 'Workout actions',
    changeRequest: '← Change request',
    generateAnother: 'Generate another',
    start: 'Start Workout',
    plannedTotal: (duration, exercises) => `Planned total: ${duration} · ${exercises}`,
    warmUp: 'Warm-up',
    main: 'Main',
    coolDown: 'Cool-down',
    lastRound: (exercises) => `last Round: ${exercises}`,
    swap: 'Swap',
    swapExercise: (name) => `Swap ${name}`,
  },
  exercise: {
    trains: (primary, secondary) => `Trains: ${primary}${secondary ? ` (also ${secondary})` : ''}`,
    equipment: 'Equipment:',
    difficulty: 'Difficulty:',
    close: 'Close',
  },
  followAlong: {
    blocks: { 'Warm-up': 'Warm-up', Main: 'Main', 'Cool-down': 'Cool-down' },
    rests: {
      'Change-over': 'Change-over',
      Rest: 'Rest',
      'Rest between Rounds': 'Rest between Rounds',
    },
    getReady: 'Get ready',
    upNext: 'Up next',
    round: (round, rounds) => `Round ${round} of ${rounds}`,
    side: (side, switching) => `Side ${side} of 2${switching ? ' — switch!' : ''}`,
    now: 'Now',
    timeLeft: 'Time left',
    setProgress: 'Set progress',
    restProgress: 'Rest progress',
    timeDone: 'Time done:',
    done: 'Done:',
    timeline: 'Timeline',
    closeTimeline: 'Close',
    controls: 'Controls',
    back: 'Back',
    pause: 'Pause',
    resume: 'Resume',
    skip: 'Skip',
    endWorkout: 'End Workout',
    endTitle: 'End this Workout?',
    endDescription: 'Your place in it is forgotten. You can start it again from the preview.',
    keepGoing: 'Keep going',
    beeps: 'Beeps',
    voice: 'Voice',
    soundTitle: (sound, on) => `${sound} ${on ? 'on' : 'off'}`,
    complete: 'Workout complete',
    planned: (clock) => `${clock} planned. Well done!`,
    planAnother: 'Plan another Workout',
  },
  library: {
    link: 'Exercises',
    heading: 'Exercise library',
    search: 'Search by name',
    searchPlaceholder: 'e.g. squat',
    muscleGroup: 'Muscle group',
    equipment: 'Equipment',
    difficulty: 'Difficulty',
    count: (shown, total) => `${shown} of ${total} ${total === 1 ? 'Exercise' : 'Exercises'}`,
    clear: 'Clear filters',
    empty: 'No Exercise matches the filters',
  },
  footer: {
    credit: 'Exercise data & GIFs:',
    sourceCode: 'Source code',
  },
  favourites: {
    heading: 'Favourites',
    start: 'Start',
    delete: 'Delete',
    unavailable: 'No longer available',
    deleteTitle: 'Delete this Favourite?',
    cancel: 'Cancel',
    save: 'Save',
    full: 'Favourites full — delete one first',
    rename: (name) => `Rename “${name}”`,
    renameTitle: 'Rename this Favourite',
    nameField: 'Name',
    nameHint: 'Leave empty for the automatic name',
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  },
  speech: {
    tag: 'en-US',
    speaksWithDefaultVoice: true,
    noVoice: 'No English voice in this browser',
    go: 'Go.',
    switchSides: 'Switch sides.',
    complete: 'Workout complete.',
    next: (rest, exercise, target) => `${rest}. Next: ${exercise}, ${target}.`,
    seconds: english('second', 'seconds'),
  },
}

const pl: Dictionary = {
  languageSwitch: 'Język',
  theme: { name: 'Motyw', choices: { system: 'systemowy', light: 'jasny', dark: 'ciemny' } },
  terms: {
    workoutTypes: {
      'full body': 'Całe ciało',
      'upper body': 'Góra ciała',
      'lower body': 'Dół ciała',
      core: 'Brzuch',
      'cardio/HIIT': 'Cardio/HIIT',
      'mobility/stretching': 'Mobilność i rozciąganie',
    },
    difficulties: {
      beginner: { label: 'Początkujący', hint: 'Dopiero zaczynasz albo wracasz po przerwie.' },
      intermediate: {
        label: 'Średni',
        hint: 'Trenujesz od czasu do czasu i znasz podstawowe ruchy.',
      },
      advanced: { label: 'Zaawansowany', hint: 'Trenujesz regularnie i chcesz się zmęczyć.' },
    },
    equipment: {
      dumbbells: 'Hantle',
      'resistance band': 'Guma oporowa',
      kettlebell: 'Kettlebell',
      'chair or bench': 'Krzesło lub ławka',
    },
    bodyweight: 'Bez sprzętu',
    muscleGroups: {
      chest: 'klatka piersiowa',
      back: 'plecy',
      shoulders: 'barki',
      arms: 'ręce',
      core: 'brzuch',
      glutes: 'pośladki',
      legs: 'nogi',
    },
  },
  counts: {
    minutes: (count) => `${count} min`,
    seconds: (count) => `${count} s`,
    reps: polish('powtórzenie', 'powtórzenia', 'powtórzeń'),
    exercises: polish('Ćwiczenie', 'Ćwiczenia', 'Ćwiczeń'),
    rounds: polish('Runda', 'Rundy', 'Rund'),
    perSide: (amount) => `${amount} na stronę`,
  },
  request: {
    heading: 'Jaki trening chcesz wykonać?',
    workoutType: 'Rodzaj treningu',
    time: 'Czas',
    difficulty: 'Poziom',
    equipment: 'Sprzęt',
    bodyweightIncluded: 'Ćwiczenia z masą ciała są zawsze uwzględnione.',
    generate: 'Generuj',
  },
  preview: {
    heading: 'Podgląd treningu',
    actions: 'Akcje treningu',
    changeRequest: '← Zmień wybór',
    generateAnother: 'Wygeneruj inny',
    start: 'Rozpocznij trening',
    plannedTotal: (duration, exercises) => `Planowany czas: ${duration} · ${exercises}`,
    warmUp: 'Rozgrzewka',
    main: 'Część główna',
    coolDown: 'Wyciszenie',
    lastRound: (exercises) => `ostatnia Runda: ${exercises}`,
    swap: 'Zamień',
    swapExercise: (name) => `Zamień ćwiczenie: ${name}`,
  },
  exercise: {
    trains: (primary, secondary) => `Ćwiczy: ${primary}${secondary ? ` (także ${secondary})` : ''}`,
    equipment: 'Sprzęt:',
    difficulty: 'Poziom:',
    close: 'Zamknij',
  },
  followAlong: {
    blocks: { 'Warm-up': 'Rozgrzewka', Main: 'Część główna', 'Cool-down': 'Wyciszenie' },
    rests: {
      'Change-over': 'Zmiana',
      Rest: 'Przerwa',
      'Rest between Rounds': 'Przerwa między rundami',
    },
    getReady: 'Przygotuj się',
    upNext: 'Następne',
    round: (round, rounds) => `Runda ${round} z ${rounds}`,
    side: (side, switching) => `Strona ${side} z 2${switching ? ' — zmiana!' : ''}`,
    now: 'Teraz',
    timeLeft: 'Pozostały czas',
    setProgress: 'Postęp serii',
    restProgress: 'Postęp przerwy',
    timeDone: 'Czas za tobą:',
    done: 'Zrobione:',
    timeline: 'Przebieg',
    closeTimeline: 'Zamknij',
    controls: 'Sterowanie',
    back: 'Wstecz',
    pause: 'Pauza',
    resume: 'Wznów',
    skip: 'Pomiń',
    endWorkout: 'Zakończ trening',
    endTitle: 'Zakończyć ten trening?',
    endDescription: 'Twoje miejsce w nim przepadnie. Możesz zacząć go od nowa z podglądu.',
    keepGoing: 'Trenuj dalej',
    beeps: 'Sygnały',
    voice: 'Głos',
    soundTitle: (sound, on) => `${sound}: ${on ? 'włączone' : 'wyłączone'}`,
    complete: 'Trening zakończony',
    planned: (clock) => `Zaplanowano ${clock}. Dobra robota!`,
    planAnother: 'Zaplanuj kolejny trening',
  },
  library: {
    link: 'Ćwiczenia',
    heading: 'Biblioteka ćwiczeń',
    search: 'Szukaj po nazwie',
    searchPlaceholder: 'np. przysiad',
    muscleGroup: 'Partia mięśni',
    equipment: 'Sprzęt',
    difficulty: 'Poziom',
    // "z" takes the genitive: "z 1 Ćwiczenia", "z 144 Ćwiczeń".
    count: (shown, total) => `${shown} z ${total} ${total === 1 ? 'Ćwiczenia' : 'Ćwiczeń'}`,
    clear: 'Wyczyść filtry',
    empty: 'Żadne ćwiczenie nie pasuje do filtrów',
  },
  footer: {
    credit: 'Dane ćwiczeń i GIF-y:',
    sourceCode: 'Kod źródłowy',
  },
  favourites: {
    heading: 'Ulubione',
    start: 'Start',
    delete: 'Usuń',
    unavailable: 'Niedostępny',
    deleteTitle: 'Usunąć z Ulubionych?',
    cancel: 'Anuluj',
    save: 'Zapisz',
    full: 'Ulubione pełne — usuń jeden',
    rename: (name) => `Zmień nazwę: ${name}`,
    renameTitle: 'Zmień nazwę Ulubionego',
    nameField: 'Nazwa',
    nameHint: 'Zostaw puste, by wrócić do nazwy automatycznej',
    months: ['sty', 'lut', 'mar', 'kwi', 'maj', 'cze', 'lip', 'sie', 'wrz', 'paź', 'lis', 'gru'],
  },
  speech: {
    tag: 'pl-PL',
    speaksWithDefaultVoice: false,
    noVoice: 'Brak polskiego głosu w tej przeglądarce',
    go: 'Start.',
    switchSides: 'Zmień stronę.',
    complete: 'Trening zakończony.',
    next: (rest, exercise, target) => `${rest}. Następne: ${exercise}, ${target}.`,
    seconds: polish('sekunda', 'sekundy', 'sekund'),
  },
}

export const dictionaries: Record<Language, Dictionary> = { en, pl }
