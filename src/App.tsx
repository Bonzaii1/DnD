import { Routes, Route } from 'react-router-dom'
import Login from '@/pages/Login'
import SignUp from '@/pages/SignUp'
import RouteLayout from '@/layouts/RouteLayout'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import { ROUTES } from '@/routes'

export default function App() {
  return (
    <Routes>
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.SIGNUP} element={<SignUp />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <RouteLayout />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}
