import type { Difficulty, Equipment, WorkoutType } from '@/library'
import type { Language } from './types'

/** Every user-facing string, one dictionary per Language; the type checker keeps both complete. */
export type Dictionary = {
  languageSwitch: string
  request: {
    heading: string
    workoutType: string
    time: string
    difficulty: string
    equipment: string
    bodyweightIncluded: string
    generate: string
    minutes: (minutes: number) => string
    workoutTypes: Record<WorkoutType, string>
    difficulties: Record<Difficulty, { label: string; hint: string }>
    equipmentItems: Record<Equipment, string>
  }
  footer: {
    credit: string
    sourceCode: string
  }
}

const en: Dictionary = {
  languageSwitch: 'Language',
  request: {
    heading: 'Workout Request',
    workoutType: 'Workout type',
    time: 'Time',
    difficulty: 'Difficulty',
    equipment: 'Equipment',
    bodyweightIncluded: 'Bodyweight Exercises are always included.',
    generate: 'Generate',
    minutes: (minutes) => `${minutes} min`,
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
    equipmentItems: {
      dumbbells: 'Dumbbells',
      'resistance band': 'Resistance band',
      kettlebell: 'Kettlebell',
      'chair or bench': 'Chair or bench',
    },
  },
  footer: {
    credit: 'Exercise data & GIFs:',
    sourceCode: 'Source code',
  },
}

const pl: Dictionary = {
  languageSwitch: 'Język',
  request: {
    heading: 'Czego chcesz?',
    workoutType: 'Rodzaj treningu',
    time: 'Czas',
    difficulty: 'Poziom',
    equipment: 'Sprzęt',
    bodyweightIncluded: 'Ćwiczenia z masą ciała są zawsze uwzględnione.',
    generate: 'Generuj',
    minutes: (minutes) => `${minutes} min`,
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
    equipmentItems: {
      dumbbells: 'Hantle',
      'resistance band': 'Guma oporowa',
      kettlebell: 'Kettlebell',
      'chair or bench': 'Krzesło lub ławka',
    },
  },
  footer: {
    credit: 'Dane ćwiczeń i GIF-y:',
    sourceCode: 'Kod źródłowy',
  },
}

export const dictionaries: Record<Language, Dictionary> = { en, pl }
