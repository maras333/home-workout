import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { App } from '@/App'

function renderAt(path: string) {
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

describe('app shell', () => {
  // Follow-along shows the footer too; see src/follow-along.test.tsx.
  it('shows the Workout Request form with the ExerciseDB credit footer', () => {
    renderAt('/')

    expect(screen.getByRole('heading', { level: 1, name: 'Workout Request' })).toBeInTheDocument()

    const footer = screen.getByRole('contentinfo')
    expect(footer).toHaveTextContent('Exercise data & GIFs: ExerciseDB (AGPL-3.0) · Source code')
    expect(within(footer).getByRole('link', { name: 'ExerciseDB (AGPL-3.0)' })).toHaveAttribute(
      'href',
      'https://github.com/bootstrapping-lab/exercisedb-api/tree/7cdc82e',
    )
    expect(within(footer).getByRole('link', { name: 'Source code' })).toHaveAttribute(
      'href',
      'https://github.com/maras333/home-workout',
    )
  })

  it('sends unknown routes to the Workout Request form', () => {
    renderAt('/no-such-page')

    expect(screen.getByRole('heading', { level: 1, name: 'Workout Request' })).toBeInTheDocument()
  })
})
