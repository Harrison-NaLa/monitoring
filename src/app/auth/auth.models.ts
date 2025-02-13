export interface AuthenticationResponse {
    access_token: string;
    token_type: string | 'Bearer';
    expires_in: number;
}

export type AuthStatePropType = {
    token: string;
    tokenData: object | null;
    tokenExpiration: number | null;
    isAuthenticated: boolean;
}

export interface AuthGrantAccess {
    token: string;
    isAuthenticated: boolean;
}

export type AuthStoreActions = {
    setToken: (token: string) => void;
    grantAccess: (param: AuthGrantAccess) => void;
}

export type AuthStoreType = AuthStatePropType & AuthStoreActions
