
import type { CredentialResponse } from "@react-oauth/google";
import { createContext, useContext, useState } from "react";
import { api } from "@/services/api";

type User = {
    name: string
    email: string
    picture: string
}

type AuthContextType = {
    user: User | null
    login: (res: CredentialResponse) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType>(null!)

// function decodeJwt(token: string): Record<string, unknown> {
//     const payload = token.split('.')[1]
//     return JSON.parse(atob(payload))
// }

export function AuthProvider({ children }: { children: React.ReactNode }) {

    const [user, setUser] = useState<User | null>(null)

    function login(res: CredentialResponse) {
        if (!res.credential) return

        // const payload = decodeJwt(res.credential)
        // setUser({
        //     name: payload.name as string,
        //     email: payload.email as string,
        //     picture: payload.picture as string,
        // })

        api.post("/api/user/auth", { credential: res.credential })
    }

    function logout() {
        setUser(null)
    }

    return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>

}

export const useAuth = () => useContext(AuthContext)