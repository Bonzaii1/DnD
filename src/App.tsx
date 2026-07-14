import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '@/pages/Login'
import RouteLayout from '@/layouts/RouteLayout'
import { useAuth } from '@/hooks/useAuth'
import SignUp from './pages/SignUp'


function ProtectedRoute() {
  const { user } = useAuth()
  return user ? (user.active === 1 ? <RouteLayout /> : <Navigate to="/signup" replace />) : <Navigate to="/login" replace />
}


export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/*" element={<ProtectedRoute />} />
    </Routes>
  )
}
