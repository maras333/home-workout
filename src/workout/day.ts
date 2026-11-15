/** A calendar day, month 1–12. */
export type Day = { year: number; month: number; day: number }

const pad = (value: number) => String(value).padStart(2, '0')

/** The local calendar day of a moment. */
export function dayOf(date: Date): Day {
  return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() }
}

/** A day as stored: "2026-11-14". */
export function formatDay({ year, month, day }: Day): string {
  return `${year}-${pad(month)}-${pad(day)}`
}

/** A stored day read back, or null when it is not a real "YYYY-MM-DD" day. */
export function parseDay(text: string): Day | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(text)
  if (!match) return null
  const [year, month, day] = match.slice(1).map(Number)
  const date = new Date(year, month - 1, day)
  return date.getMonth() === month - 1 && date.getDate() === day ? { year, month, day } : null
}
