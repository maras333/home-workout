import { Navigate, Outlet, Route, Routes } from 'react-router'
import { CreditFooter } from '@/components/CreditFooter'
import { FollowAlong } from '@/screens/FollowAlong'
import { WorkoutPreview } from '@/screens/WorkoutPreview'
import { WorkoutRequestForm } from '@/screens/WorkoutRequestForm'

function Layout() {
  return (
    <div className="flex min-h-svh flex-col">
      <main className="flex-1">
        <Outlet />
      </main>
      <CreditFooter />
    </div>
  )
}

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<WorkoutRequestForm />} />
        <Route path="workout" element={<WorkoutPreview />} />
        <Route path="follow-along" element={<FollowAlong />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
