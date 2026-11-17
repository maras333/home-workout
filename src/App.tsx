import { Link, Navigate, Outlet, Route, Routes, useMatch } from 'react-router'
import { CreditFooter } from '@/components/CreditFooter'
import { LanguageSwitch } from '@/components/LanguageSwitch'
import { ThemeSwitch } from '@/components/ThemeSwitch'
import { LanguageProvider, useText } from '@/language'
import { ExerciseLibrary } from '@/screens/ExerciseLibrary'
import { FollowAlong } from '@/screens/FollowAlong'
import { WorkoutPreview } from '@/screens/WorkoutPreview'
import { WorkoutRequestForm } from '@/screens/WorkoutRequestForm'

/** The app's name, the same in every Language. */
const APP_NAME = 'Home Workout'

const headerLink =
  'rounded px-1 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none'

function Layout() {
  const text = useText()
  // No links in Follow-along, so a stray click can't leave a running Workout.
  const followingAlong = useMatch('/follow-along') !== null
  return (
    // Below the sm breakpoint, leave room at the bottom for a bar fixed to the screen.
    <div className="flex min-h-svh flex-col max-sm:has-data-bottom-bar:pb-[calc(6rem+env(safe-area-inset-bottom))]">
      <header className="flex items-center justify-between gap-4 px-4 py-3">
        {followingAlong ? (
          <span />
        ) : (
          <nav className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
            <Link to="/" className={`${headerLink} font-semibold`}>
              {APP_NAME}
            </Link>
            <Link
              to="/exercises"
              className={`${headerLink} text-muted-foreground hover:text-foreground`}
            >
              {text.library.link}
            </Link>
          </nav>
        )}
        <div className="flex items-center gap-2">
          <ThemeSwitch />
          <LanguageSwitch />
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <CreditFooter />
    </div>
  )
}

export function App() {
  return (
    <LanguageProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<WorkoutRequestForm />} />
          <Route path="workout" element={<WorkoutPreview />} />
          <Route path="follow-along" element={<FollowAlong />} />
          <Route path="exercises" element={<ExerciseLibrary />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </LanguageProvider>
  )
}
