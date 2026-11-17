import { useText } from '@/language'

const DATASET_URL = 'https://github.com/bootstrapping-lab/exercisedb-api/tree/7cdc82e'

/** Credit for the bundled ExerciseDB data and its licence, AGPL-3.0. */
export function CreditFooter() {
  const text = useText().footer
  return (
    <footer className="px-4 py-3 text-center text-xs break-words text-muted-foreground">
      {text.credit}{' '}
      <a className="underline" href={DATASET_URL} target="_blank" rel="noreferrer">
        ExerciseDB
      </a>{' '}
      · AGPL-3.0
    </footer>
  )
}
