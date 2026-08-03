/**
 * Authentication session management constants and utilities.
 * 
 * Provides frontend-only session expiration using localStorage timestamps.
 * Sessions expire after 24 hours of inactivity.
 * 
 * @module constants/auth
 */

/**
 * Session duration in milliseconds (24 hours).
 * 
 * @constant
 * @example
 * ```typescript
 * // To change session duration to 12 hours:
 * export const SESSION_DURATION_MS = 12 * 60 * 60 * 1000
 * ```
 */
export const SESSION_DURATION_MS = 24 * 60 * 60 * 1000

/**
 * Session warning threshold in milliseconds (30 minutes before expiry).
 * 
 * @constant
 * @remarks Currently defined but not implemented. Can be used in Phase 4
 * to show a warning notification before session expires.
 */
export const SESSION_WARNING_MS = 30 * 60 * 1000

/**
 * Calculates the expiration timestamp for a new session.
 * 
 * @returns Unix timestamp (milliseconds) when the session should expire
 * @example
 * ```typescript
 * const expiresAt = getSessionExpiration()
 * // Returns: 1722355200000 (24 hours from now)
 * ```
 */
export const getSessionExpiration = (): number => {
  return Date.now() + SESSION_DURATION_MS
}

/**
 * Checks if a session has expired.
 * 
 * @param expiresAt - Unix timestamp (milliseconds) when session expires, or undefined
 * @returns `true` if session is expired or expiresAt is undefined, `false` otherwise
 * @example
 * ```typescript
 * const expired = isSessionExpired(user.expiresAt)
 * if (expired) {
 *   logout()
 * }
 * ```
 */
export const isSessionExpired = (expiresAt: number | undefined): boolean => {
  if (!expiresAt) return true
  return Date.now() > expiresAt
}
