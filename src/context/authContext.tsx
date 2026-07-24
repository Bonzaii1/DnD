
import type { CredentialResponse } from "@react-oauth/google";
import { useState, useEffect } from "react";
import { api, ApiError } from "@/services/api";
import { AuthContext, type User } from "@/context/AuthContextValue";

export function AuthProvider({ children }: { children: React.ReactNode }) {

    const [user, setUser] = useState<User | null>(() => {
        // Initialize from localStorage
        const storedUser = localStorage.getItem('user')
        return storedUser ? JSON.parse(storedUser) : null
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // Persist user to localStorage whenever it changes
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user))
        } else {
            localStorage.removeItem('user')
        }
    }, [user])

    
    async function login(res: CredentialResponse, signInKey: string) {
        if (!res.credential) return

        setLoading(true)
        setError(null)

        try {
            const response = await api.post<User>("/api/user/auth", { credential: res.credential, signInKey: signInKey })
            setUser(response)
        } catch (err) {
            setError(err instanceof ApiError ? err.message : String(err))
        } finally {
            setLoading(false)
        }
    }


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


    async function isRegistered(user: User){
        if (!user) return false;
        setLoading(true)
        setError(null)
        var result = false
        try {
            const response = await api.get<{isRegistered: boolean}>(`/api/user/isRegistered/${user.id}`)
            result = response.isRegistered
        } catch (err) {
            setError(err instanceof ApiError ? err.message : String(err))
            return false
        } finally {
            setLoading(false)
            return result
        }
    }

    function logout() {
        setUser(null)
    }

    return <AuthContext.Provider value={{ user, loading, error, login, logout, updateUser, isRegistered }}>{children}</AuthContext.Provider>

}