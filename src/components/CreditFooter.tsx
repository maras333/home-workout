import { useText } from '@/language'

const DATASET_URL = 'https://github.com/bootstrapping-lab/exercisedb-api/tree/7cdc82e'
const SOURCE_URL = 'https://github.com/maras333/home-workout'

/**
 * Credit for the bundled ExerciseDB data and the offer of our source, both required by AGPL-3.0
 * (the Polish Exercise text is a modified version of the data). The licence's name links to the
 * source, to keep the footer short.
 */
export function CreditFooter() {
  const text = useText().footer
  return (
    <footer className="px-4 py-3 text-center text-xs break-words text-muted-foreground">
      {text.credit}{' '}
      <a className="underline" href={DATASET_URL} target="_blank" rel="noreferrer">
        ExerciseDB
      </a>{' '}
      ·{' '}
      <a
        className="underline"
        href={SOURCE_URL}
        target="_blank"
        rel="noreferrer"
        title={text.sourceCode}
      >
        AGPL-3.0
      </a>
    </footer>
  )
}
