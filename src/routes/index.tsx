/**
 * Centralized route path constants.
 * 
 * Provides a single source of truth for all application routes.
 * Use these constants instead of hardcoded strings to ensure type safety
 * and make route refactoring easier.
 * 
 * @example
 * ```tsx
 * // Instead of:
 * navigate('/login')
 * 
 * // Use:
 * navigate(ROUTES.LOGIN)
 * ```
 */
export const ROUTES = {
  // Public routes
  LOGIN: '/login',
  SIGNUP: '/signup',
  
  // Protected routes
  HOME: '/',
  REGISTER: '/register',
  PROGRESS: '/progress',
  
  // Error routes
  NOT_FOUND: '*'
} as const

/**
 * Type definition for route configuration objects.
 * 
 * @property path - The URL path for the route
 * @property element - The React component to render for this route
 * @property protected - Whether the route requires authentication
 * @property requiresActive - Whether the route requires an active user status (optional)
 */
export type RouteConfig = {
  path: string
  element: React.ReactElement
  protected: boolean
  requiresActive?: boolean
}

/**
 * Array of route configurations.
 * Populated after imports to avoid circular dependencies.
 */
export let routeConfigs: RouteConfig[] = []

/**
 * Sets the route configurations array.
 * 
 * @param configs - Array of route configuration objects
 */
export const setRouteConfigs = (configs: RouteConfig[]) => {
  routeConfigs = configs
}
