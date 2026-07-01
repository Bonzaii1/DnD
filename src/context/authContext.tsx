
import type { CredentialResponse } from "@react-oauth/google";
import { createContext, useContext, useState } from "react";
import { api } from "@/services/api";

type User = {
    fname: string,
    lname: string,
    email: string
    picture: string
}

type AuthContextType = {
    user: User | null
    login: (res: CredentialResponse) => Promise<void>
    logout: () => void
}

type ApiResponse = {
    result: string,
    fname: string,
    lname: string,
    email: string,
    picture: string,
}

const AuthContext = createContext<AuthContextType>(null!)

// function decodeJwt(token: string): Record<string, unknown> {
//     const payload = token.split('.')[1]
//     return JSON.parse(atob(payload))
// }

export function AuthProvider({ children }: { children: React.ReactNode }) {

    const [user, setUser] = useState<User | null>(null)

    async function login(res: CredentialResponse) {
        if (!res.credential) return

        const payload = await api.post<ApiResponse>("/api/user/auth", { credential: res.credential })

        console.log(payload)
        setUser({
            fname: payload.fname,
            lname: payload.lname,
            email: payload.email,
            picture: payload.picture,
        })


    }

    function logout() {
        setUser(null)
    }

    return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>

}

export const useAuth = () => useContext(AuthContext)