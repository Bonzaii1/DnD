import type { CredentialResponse } from "@react-oauth/google";
import { createContext } from "react";

export type User = {
    fname: string
    lname: string
    email: string
    churchId: number
    areaId: number
    picture: string
}

export type AuthContextType = {
    user: User | null
    loading: boolean
    error: string | null
    login: (res: CredentialResponse, signInKey: string) => Promise<void>
    logout: () => void
}

export const AuthContext = createContext<AuthContextType>(null!)
