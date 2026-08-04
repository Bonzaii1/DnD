
/**
 * Authentication context provider with session management.
 * 
 * Manages user authentication state, persists to localStorage,
 * and implements frontend session expiration (24-hour timeout).
 * 
 * @module context/authContext
 */

import type { CredentialResponse } from "@react-oauth/google";
import { useState, useEffect } from "react";
import { api, ApiError } from "@/services/api";
import { AuthContext, type User } from "@/context/AuthContextValue";
import { getSessionExpiration, isSessionExpired } from "@/constants/auth";

/**
 * Provides authentication context to child components.
 * 
 * **Features:**
 * - User state management (login, logout, update)
 * - localStorage persistence across page reloads
 * - Session expiration (24 hours from login)
 * - Periodic expiration checks (every 60 seconds)
 * - Automatic logout on session expiry
 * 
 * @param props - Component props
 * @param props.children - Child components that need auth context
 * @returns Provider component
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {

    /**
     * User state with lazy initialization from localStorage.
     * 
     * On mount:
     * 1. Reads user from localStorage
     * 2. Checks if session is expired
     * 3. Clears expired sessions
     * 4. Returns valid user or null
     */
    const [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem('user')
        if (!storedUser) return null
        
        const parsedUser = JSON.parse(storedUser)
        
        // Phase 3: Check if session is expired on mount
        if (isSessionExpired(parsedUser.expiresAt)) {
            console.log('Session expired, clearing user')
            localStorage.removeItem('user')
            return null
        }
        
        return parsedUser
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    /**
     * Persist user to localStorage whenever it changes.
     * 
     * Ensures authentication state survives page reloads.
     * Clears localStorage when user logs out (user = null).
     */
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user))
        } else {
            localStorage.removeItem('user')
        }
    }, [user])

    /**
     * Phase 3: Periodic session expiration check.
     * 
     * Checks every 60 seconds if the current session has expired.
     * If expired, automatically logs the user out.
     * 
     * This ensures sessions expire even if user stays on the same page
     * without navigating or refreshing.
     */
    useEffect(() => {
        if (!user) return

        const checkExpiration = () => {
            if (isSessionExpired(user.expiresAt)) {
                console.log('Session expired during use, logging out')
                logout()
            }
        }

        // Check every minute
        const interval = setInterval(checkExpiration, 60 * 1000)
        return () => clearInterval(interval)
    }, [user])

    /**
     * Authenticates user with Google OAuth credentials.
     * 
     * **Flow:**
     * 1. Validates Google credential exists
     * 2. Sends credential to backend for verification
     * 3. Adds session timestamps (loginAt, expiresAt)
     * 4. Stores user in state and localStorage
     * 
     * **Phase 3 Enhancement:**
     * Now adds session expiration timestamps to enable frontend
     * session timeout after 24 hours.
     * 
     * @param res - Google OAuth credential response
     * @param signInKey - Optional registration sign-in key
     * @throws {ApiError} If authentication fails
     */
    async function login(res: CredentialResponse, signInKey: string) {
        if (!res.credential) return

        setLoading(true)
        setError(null)

        try {
            const response = await api.post<User>("/api/user/auth", { credential: res.credential, signInKey: signInKey })
            
            // Phase 3: Add session timestamps for expiration tracking
            const userWithSession: User = {
                ...response,
                loginAt: Date.now(),
                expiresAt: getSessionExpiration()
            }
            
            setUser(userWithSession)
        } catch (err) {
            setError(err instanceof ApiError ? err.message : String(err))
        } finally {
            setLoading(false)
        }
    }


    /**
     * Updates user profile information.
     * 
     * Sends updated user data to backend and refreshes local state.
     * Used when user completes signup or edits their profile.
     * 
     * @param user - Updated user object with new information
     * @throws {ApiError} If update fails
     */
    async function updateUser(user: User){
        if (!user) return;

        setLoading(true)
        setError(null)

        try {
            const response = await api.post<User>("/api/user/updateUser", user)
            setUser(response)
        } catch (err) {
            setError(err instanceof ApiError ? err.message : String(err))
        } finally {
            setLoading(false)
        }
    }

    /**
     * Logs out the current user.
     * 
     * Clears user state and removes data from localStorage.
     * Session timestamps are also cleared.
     */
    function logout() {
        setUser(null)
    }

    return <AuthContext.Provider value={{ user, loading, error, login, logout, updateUser }}>{children}</AuthContext.Provider>

}