/** The user's Theme choice: follow the system, or always Light or Dark. */
export const THEMES = ['system', 'light', 'dark'] as const

export type Theme = (typeof THEMES)[number]
