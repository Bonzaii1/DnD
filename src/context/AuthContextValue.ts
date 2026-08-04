/**
 * Type definitions for authentication context.
 * 
 * Defines the structure of user data and authentication context value.
 * 
 * @module context/AuthContextValue
 */

import type { CredentialResponse } from "@react-oauth/google";
import { createContext } from "react";

/**
 * User type representing authenticated user data.
 * 
 * **Core Fields:**
 * @property id - Unique user identifier
 * @property fname - First name
 * @property lname - Last name
 * @property email - Email address
 * @property phone_number - Phone number (format: ###-###-####)
 * @property date_of_birth - Date of birth
 * @property role - User's level/role (e.g., "Pathfinder", "Staff")
 * @property active - User activation status (1 = active, 0 = inactive)
 * @property churchId - Associated church ID
 * @property areaId - Associated area ID
 * @property picture - Google profile picture URL
 * @property google_sub - Google OAuth subject identifier
 * 
 * **Session Fields (Phase 3 addition):**
 * @property loginAt - Timestamp (ms) when user logged in (optional)
 * @property expiresAt - Timestamp (ms) when session expires (optional)
 * 
 * @remarks
 * Session fields (loginAt, expiresAt) are set during login and used for
 * frontend-only session expiration checks. Sessions expire after 24 hours.
 */
export type User = {
    id: number
    fname: string
    lname: string
    email: string
    phone_number: string
    date_of_birth: Date
    role: string
    active: number
    churchId: number
    areaId: number
    picture: string
    google_sub: string
    loginAt?: number
    expiresAt?: number
}

export type AuthContextType = {
    user: User | null
    loading: boolean
    error: string | null
    updateUser: (user: User) => Promise<void>
    login: (res: CredentialResponse, signInKey: string) => Promise<void>
    logout: () => void
}

export const AuthContext = createContext<AuthContextType>(null!)
