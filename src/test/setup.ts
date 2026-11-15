import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach, vi } from 'vitest'
import { seededRandom } from '@/workout'

// The screens generate and swap with Math.random; a fixed seed makes app tests reproducible.
beforeEach(() => {
  vi.spyOn(Math, 'random').mockImplementation(seededRandom(1))
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})
