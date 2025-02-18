'use server'

import { auth, ESession, signIn, signOut } from "@/auth";

export const login = async () => {
    await signIn('spotify', { redirectTo: "/" });
}

export const logout = async () => {
    await signOut({ redirectTo: "/" });
}

export const getUserAccessToken = async () => {
    const session = await auth() as ESession
    return session.accessToken
}