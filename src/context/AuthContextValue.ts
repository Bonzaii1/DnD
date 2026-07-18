import type { CredentialResponse } from "@react-oauth/google";
import { createContext } from "react";

export type User = {
    fname: string
    lname: string
    email: string
    phone_number: string
    date_of_birth: Date
    active: number
    churchId: number
    areaId: number
    picture: string,
    // bootcamp_flag: string,
    // bootcamp_option: string
    google_sub: string
}

export type userObj = {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    dateOfBirth: string,
    // bootcamp_flag: number,
    // bootcamp_option: string,
    google_sub: string
}

export type AuthContextType = {
    user: User | null
    loading: boolean
    error: string | null
    updateUser: (userObj: userObj) => Promise<void>
    login: (res: CredentialResponse, signInKey: string) => Promise<void>
    logout: () => void
}

export const AuthContext = createContext<AuthContextType>(null!)
