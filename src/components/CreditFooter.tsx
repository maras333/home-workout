import { useText } from '@/language'

const DATASET_URL = 'https://github.com/bootstrapping-lab/exercisedb-api/tree/7cdc82e'
const SOURCE_URL = 'https://github.com/maras333/home-workout'

/** Credit for the bundled ExerciseDB data and a link to our source, required by AGPL-3.0. */
export function CreditFooter() {
  const text = useText().footer
  return (
    <footer className="px-4 py-3 text-center text-xs text-muted-foreground">
      {text.credit}{' '}
      <a className="underline" href={DATASET_URL} target="_blank" rel="noreferrer">
        ExerciseDB (AGPL-3.0)
      </a>{' '}
      ·{' '}
      <a className="underline" href={SOURCE_URL} target="_blank" rel="noreferrer">
        {text.sourceCode}
      </a>
    </footer>
  )
}
