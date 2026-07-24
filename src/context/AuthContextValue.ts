import type { CredentialResponse } from "@react-oauth/google";
import { createContext } from "react";

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
    picture: string,
    // bootcamp_flag: string,
    // bootcamp_option: string
    google_sub: string
}

export type AuthContextType = {
    user: User | null
    loading: boolean
    error: string | null
    isRegistered: (user: User) => Promise<boolean>
    updateUser: (user: User) => Promise<void>
    login: (res: CredentialResponse, signInKey: string) => Promise<void>
    logout: () => void
}

export const AuthContext = createContext<AuthContextType>(null!)
