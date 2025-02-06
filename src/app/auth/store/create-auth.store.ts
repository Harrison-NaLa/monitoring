'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import {type AuthStoreType, createAuthStore, defaultInitState} from './auth.store';

export type AuthStoreApi = ReturnType<typeof createAuthStore>

export const AuthStoreContext = createContext<AuthStoreApi | undefined>(
    undefined,
)

export interface AuthStoreProviderProps {
    children: ReactNode
}

export const AuthStoreProvider = ({
                                         children,
                                     }: AuthStoreProviderProps) => {
    const storeRef = useRef<AuthStoreApi>(undefined)
    if (!storeRef.current) {
        storeRef.current = createAuthStore()
    }

    return (
        <AuthStoreContext.Provider value={storeRef.current}>
            {children}
        </AuthStoreContext.Provider>
    )
}

export const useAuthStore = <T,>(
    selector: (store: AuthStoreType) => T,
): T => {
    const authStoreContext = useContext(AuthStoreContext)

    if (!authStoreContext) {
        throw new Error(`useCounterStore must be used within CounterStoreProvider`)
    }

    return useStore(authStoreContext, selector)
}
