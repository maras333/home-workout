import { Fragment } from 'react'
import { LANGUAGES, useLanguage, useText } from '@/language'
import { cn } from '@/lib/utils'

/** "EN | PL": the active Language is pressed and bold; the other switches to it. */
export function LanguageSwitch() {
  const { language, setLanguage } = useLanguage()
  const text = useText()
  return (
    <div role="group" aria-label={text.languageSwitch} className="flex items-center gap-1 text-sm">
      {LANGUAGES.map((option, index) => (
        <Fragment key={option}>
          {index > 0 && (
            <span aria-hidden="true" className="text-muted-foreground">
              {' | '}
            </span>
          )}
          <button
            type="button"
            aria-pressed={option === language}
            onClick={() => setLanguage(option)}
            className={cn(
              'rounded px-1 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none',
              option === language ? 'font-bold' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {option.toUpperCase()}
          </button>
        </Fragment>
      ))}
    </div>
  )
}
