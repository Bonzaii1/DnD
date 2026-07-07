
import type { CredentialResponse } from "@react-oauth/google";
import { useState } from "react";
import { api, ApiError } from "@/services/api";
import { AuthContext, type User } from "@/context/AuthContextValue";

type ApiResponse = {
    result: string,
    fname: string,
    lname: string,
    email: string,
    picture: string,
}

// function decodeJwt(token: string): Record<string, unknown> {
//     const payload = token.split('.')[1]
//     return JSON.parse(atob(payload))
// }

export function AuthProvider({ children }: { children: React.ReactNode }) {

    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)


    async function login(res: CredentialResponse, signInKey: string) {
        if (!res.credential) return

        setLoading(true)
        setError(null)

        try {
            const payload = await api.post<ApiResponse>("/api/user/auth", { credential: res.credential, signInKey: signInKey })

            setUser({
                fname: payload.fname,
                lname: payload.lname,
                email: payload.email,
                picture: payload.picture,
            })
        } catch (err) {
            setError(err instanceof ApiError ? err.message : String(err))
        } finally {
            setLoading(false)
        }
    }

    function logout() {
        setUser(null)
    }

    return <AuthContext.Provider value={{ user, loading, error, login, logout }}>{children}</AuthContext.Provider>

}