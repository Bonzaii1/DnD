
import type { CredentialResponse } from "@react-oauth/google";
import { useState } from "react";
import { api, ApiError } from "@/services/api";
import { AuthContext, type User, type userObj } from "@/context/AuthContextValue";

type ApiResponse = {
    result: string,
    fname: string
    lname: string
    email: string
    phone_number: string
    date_of_birth: Date
    active: number
    churchId: number
    areaId: number
    picture: string
    bootcamp_flag: string
    bootcamp_option: string
    google_sub: string
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
                phone_number: payload.phone_number,
                date_of_birth: payload.date_of_birth,
                churchId: payload.churchId,
                areaId: payload.areaId,
                picture: payload.picture,
                active: payload.active,
                bootcamp_flag: payload.bootcamp_flag,
                bootcamp_option: payload.bootcamp_option,
                google_sub: payload.google_sub
            })
        } catch (err) {
            setError(err instanceof ApiError ? err.message : String(err))
        } finally {
            setLoading(false)
        }
    }


    async function updateUser(userObj: userObj){
        if (!userObj) return;

        setLoading(true)
        setError(null)

        try {
            const payload = await api.post<ApiResponse>("/api/user/updateUser", { userObj: userObj })

            setUser({
                fname: payload.fname,
                lname: payload.lname,
                email: payload.email,
                phone_number: payload.phone_number,
                date_of_birth: payload.date_of_birth,
                churchId: payload.churchId,
                areaId: payload.areaId,
                picture: payload.picture,
                active: payload.active,
                bootcamp_flag: payload.bootcamp_flag,
                bootcamp_option: payload.bootcamp_option,
                google_sub: payload.google_sub
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

    return <AuthContext.Provider value={{ user, loading, error, login, logout, updateUser }}>{children}</AuthContext.Provider>

}