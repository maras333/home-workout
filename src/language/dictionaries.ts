import type { Difficulty, Equipment, MuscleGroup, WorkoutType } from '@/library'
import type { Language } from './types'

/** Every user-facing string, one dictionary per Language; the type checker keeps both complete. */
export type Dictionary = {
  languageSwitch: string
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
  footer: {
    credit: string
    sourceCode: string
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
  footer: {
    credit: 'Exercise data & GIFs:',
    sourceCode: 'Source code',
  },
}

const pl: Dictionary = {
  languageSwitch: 'Język',
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
    heading: 'Czego chcesz?',
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
    changeRequest: '← Zmień zgłoszenie',
    generateAnother: 'Wygeneruj inny',
    start: 'Rozpocznij trening',
    plannedTotal: (duration, exercises) => `Planowany czas: ${duration} · ${exercises}`,
    warmUp: 'Rozgrzewka',
    main: 'Część główna',
    coolDown: 'Wyciszenie',
    lastRound: (exercises) => `ostatnia Runda: ${exercises}`,
    swap: 'Zamień',
    swapExercise: (name) => `Zamień ${name}`,
  },
  exercise: {
    trains: (primary, secondary) => `Ćwiczy: ${primary}${secondary ? ` (także ${secondary})` : ''}`,
    equipment: 'Sprzęt:',
    difficulty: 'Poziom:',
    close: 'Zamknij',
  },
  footer: {
    credit: 'Dane ćwiczeń i GIF-y:',
    sourceCode: 'Kod źródłowy',
  },
}

export const dictionaries: Record<Language, Dictionary> = { en, pl }
