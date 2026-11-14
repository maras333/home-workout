import { Navigate, Outlet, Route, Routes } from 'react-router'
import { CreditFooter } from '@/components/CreditFooter'

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

function Placeholder({ title }: { title: string }) {
  return <h1 className="p-8 text-3xl font-bold">{title}</h1>
}

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Placeholder title="Workout Request" />} />
        <Route path="workout" element={<Placeholder title="Workout preview" />} />
        <Route path="follow-along" element={<Placeholder title="Follow-along" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
