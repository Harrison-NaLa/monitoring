import { createStore } from 'zustand/vanilla'

export type AuthStatePropType = {
    token: string;
    tokenData: object | null;
    tokenExpiration: number | null;
    isAuthenticated: boolean;
}

export type AuthStoreActions = {
    decrementCount: () => void;
    incrementCount: () => void;
    setToken: (token: string) => void;
}

export type AuthStoreType = AuthStatePropType & AuthStoreActions

export const defaultInitState: AuthStatePropType = {
    token: '',
    tokenData: null,
    tokenExpiration: null,
    isAuthenticated: false,
}

export const createAuthStore = (
    initState: AuthStatePropType = defaultInitState,
) => {
    return createStore<AuthStoreType>()((set) => ({
        ...initState,
        decrementCount: () => set((state) => ({ token: state.token + '1' })),
        incrementCount: () => set((state) => ({ token: state.token + '1' })),
        setToken: () => set((state) => ({ token: state.token })),
    }))
}
