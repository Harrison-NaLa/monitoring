import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import {AuthGrantAccess, AuthStatePropType, AuthStoreType} from '@/app/auth/auth.models';

export const defaultInitState: AuthStatePropType = {
    token: '',
    tokenData: null,
    tokenExpiration: null,
    isAuthenticated: false,
};

const AuthStore = create<AuthStoreType>()(
    persist((set) => ({
            ...defaultInitState,
            setToken: (token: string) => set(() => ({token})),
            // grantAccess: (param: AuthGrantAccess) => set(() => ({token: param.token, isAuthenticated: param.isAuthenticated})),
            grantAccess: (param: AuthGrantAccess) => set(() => ({ token: param.token, isAuthenticated: param.isAuthenticated}))
        }),
        {name: 'auth-store'},
    ),
);

export default AuthStore;
