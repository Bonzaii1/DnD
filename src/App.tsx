import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '@/pages/Login'
import RouteLayout from '@/layouts/RouteLayout'
import { useAuth } from '@/context/authContext'


function ProtectedRoute() {
  const { user } = useAuth()
  console.log(user)
  return user ? <RouteLayout /> : <Navigate to="/login" replace />
}


export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<ProtectedRoute />} />
    </Routes>
  )
}
