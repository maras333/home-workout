/** The Languages the app speaks, on screen and aloud. */
export const LANGUAGES = ['en', 'pl'] as const
export type Language = (typeof LANGUAGES)[number]
