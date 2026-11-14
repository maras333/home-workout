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
  it.each([
    ['/', 'Workout Request'],
    ['/follow-along', 'Follow-along'],
  ])('shows the %s screen with the ExerciseDB credit footer', (path, heading) => {
    renderAt(path)

    expect(screen.getByRole('heading', { level: 1, name: heading })).toBeInTheDocument()

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
