import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { afterEach, beforeEach, expect, it } from 'vitest'
import { App } from '@/App'
import { library } from '@/library'
import { polish } from '@/library/polish'
import type { Workout } from '@/workout'

const PUSH_UP = 'I4hDWkc'
const pushUpPolish = polish[PUSH_UP]

// Every Exercise is translated now, so push-up stands in for one without Polish text.
beforeEach(() => {
  delete polish[PUSH_UP]
  localStorage.clear()
  localStorage.setItem('home-workout:language', '"pl"')
})

afterEach(() => {
  polish[PUSH_UP] = pushUpPolish
})

it('shows an Exercise without Polish text in English', async () => {
  const user = userEvent.setup()
  const pushUp = library.find((exercise) => exercise.id === PUSH_UP)!
  const workout: Workout = {
    request: { workoutType: 'upper body', minutes: 15, difficulty: 'beginner', equipment: [] },
    warmUp: [],
    main: {
      sets: [{ exercise: pushUp, target: { measure: 'reps', reps: 10 }, perSide: false }],
      rounds: 1,
      lastRoundSets: 1,
      restSeconds: 20,
      roundRestSeconds: 60,
    },
    coolDown: [],
  }
  localStorage.setItem('home-workout:current-workout', JSON.stringify(workout))
  render(
    <MemoryRouter initialEntries={['/workout']}>
      <App />
    </MemoryRouter>,
  )

  const main = screen.getByRole('region', { name: /^Część główna/ })
  expect(within(main).getByRole('img')).toHaveAttribute('alt', 'push-up')
  await user.click(within(main).getAllByRole('button')[0])

  const dialog = screen.getByRole('dialog', { name: 'push-up' })
  expect(within(dialog).getAllByRole('listitem')[0]).toHaveTextContent(
    'Start in a high plank position with your hands slightly wider than shoulder-width apart and your feet together.',
  )
})
