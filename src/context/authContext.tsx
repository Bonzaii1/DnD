
import type { CredentialResponse } from "@react-oauth/google";
import { useState } from "react";
import { api, ApiError } from "@/services/api";
import { AuthContext, type User } from "@/context/AuthContextValue";

export function AuthProvider({ children }: { children: React.ReactNode }) {

    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)


    
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


    function logout() {
        setUser(null)
    }

    return <AuthContext.Provider value={{ user, loading, error, login, logout, updateUser }}>{children}</AuthContext.Provider>

}