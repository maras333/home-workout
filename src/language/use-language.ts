import { createContext, useContext } from 'react'
import { dictionaries, type Dictionary } from './dictionaries'
import type { Language } from './types'

export type LanguageContextValue = {
  language: Language
  setLanguage: (language: Language) => void
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)

/** The current Language and a way to change it. */
export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage needs a LanguageProvider')
  return context
}

/** The current Language's dictionary. */
export function useText(): Dictionary {
  return dictionaries[useLanguage().language]
}
