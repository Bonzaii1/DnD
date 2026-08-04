/**
 * Protected route component with authentication checks and loading states.
 * 
 * Protects routes by checking authentication status and user activation.
 * Provides loading states, automatic redirects, and return URL support.
 * 
 * @module components/auth/ProtectedRoute
 */

import { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { USER_ACTIVE_STATUS } from '@/constants'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { ROUTES } from '@/routes'

/**
 * Props for the ProtectedRoute component.
 * 
 * @property children - The content to render if authentication checks pass
 * @property requiresActive - Whether to check if user has active status (default: true)
 */
interface ProtectedRouteProps {
  children: ReactNode
  requiresActive?: boolean
}

/**
 * Protects routes from unauthenticated or inactive users.
 * 
 * **Authentication Flow:**
 * 1. Shows loading spinner while checking auth status
 * 2. Redirects to login if not authenticated (with return URL)
 * 3. Redirects to signup if authenticated but inactive (when requiresActive=true)
 * 4. Renders children if all checks pass
 * 
 * **Return URL Support:**
 * When redirecting to login, includes current path as `?returnTo=` query param.
 * After successful login, user is returned to their intended destination.
 * 
 * @param props - Component props
 * @returns Protected content or redirect component
 * 
 * @example
 * ```tsx
 * // Protect a single route (requires active status)
 * <ProtectedRoute>
 *   <Dashboard />
 * </ProtectedRoute>
 * 
 * // Protect route without active status check
 * <ProtectedRoute requiresActive={false}>
 *   <Profile />
 * </ProtectedRoute>
 * 
 * // Wrap multiple routes
 * <ProtectedRoute>
 *   <Routes>
 *     <Route path="/" element={<Home />} />
 *     <Route path="/settings" element={<Settings />} />
 *   </Routes>
 * </ProtectedRoute>
 * ```
 */
export default function ProtectedRoute({ children, requiresActive = true }: ProtectedRouteProps) {
  const { user, loading } = useAuth()
  const location = useLocation()

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  // Not authenticated - redirect to login with return URL
  if (!user) {
    const returnTo = location.pathname !== ROUTES.LOGIN ? location.pathname : ROUTES.HOME
    return <Navigate to={`${ROUTES.LOGIN}?returnTo=${encodeURIComponent(returnTo)}`} replace />
  }

  // Authenticated but inactive - redirect to signup
  if (requiresActive && user.active !== USER_ACTIVE_STATUS) {
    return <Navigate to={ROUTES.SIGNUP} replace />
  }

  // All checks passed - render protected content
  return <>{children}</>
}
