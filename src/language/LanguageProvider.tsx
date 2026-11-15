import { useEffect, useState, type ReactNode } from 'react'
import { loadLanguage, saveLanguage } from '@/workout'
import type { Language } from './types'
import { LanguageContext } from './use-language'

/** Polish when the browser's first preferred language is Polish, otherwise English. */
function browserLanguage(): Language {
  const first = navigator.languages?.[0] ?? navigator.language
  return first?.toLowerCase().startsWith('pl') ? 'pl' : 'en'
}

/** Provides the current Language to the whole app and keeps the page's lang attribute in step. */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => loadLanguage() ?? browserLanguage())

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  function setLanguage(next: Language) {
    saveLanguage(next)
    setLanguageState(next)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}
