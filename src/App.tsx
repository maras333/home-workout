import { Navigate, Outlet, Route, Routes } from 'react-router'
import { CreditFooter } from '@/components/CreditFooter'
import { LanguageSwitch } from '@/components/LanguageSwitch'
import { LanguageProvider } from '@/language'
import { FollowAlong } from '@/screens/FollowAlong'
import { WorkoutPreview } from '@/screens/WorkoutPreview'
import { WorkoutRequestForm } from '@/screens/WorkoutRequestForm'

function Layout() {
  return (
    // Below the sm breakpoint, leave room at the bottom for a bar fixed to the screen.
    <div className="flex min-h-svh flex-col max-sm:has-data-bottom-bar:pb-[calc(6rem+env(safe-area-inset-bottom))]">
      <header className="flex justify-end px-4 py-3">
        <LanguageSwitch />
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
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </LanguageProvider>
  )
}
