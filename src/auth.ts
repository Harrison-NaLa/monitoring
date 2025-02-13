import NextAuth, { Session } from 'next-auth';
import { Provider } from 'next-auth/providers';
import Spotify from 'next-auth/providers/spotify';
import {JWT} from '@auth/core/jwt';
import {env} from '@/env';

export interface ESession extends Session {
    accessToken?: string;
}

export interface EJWT extends JWT {
    accesstoken?: string;
}

export const providers: Provider[] = [
    Spotify({
        clientId: env.AUTH_SPOTIFY_ID,
        clientSecret: env.AUTH_SPOTIFY_SECRET,
        authorization: {
            url: 'https://accounts.spotify.com/authorize',
            params: {
                scope: 'user-top-read',
            },
        },
    }),
]


export const {handlers, signIn, signOut, auth} = NextAuth({
    providers,
    callbacks: {
        jwt: async ({token, account}) => {
            if (account?.provider === 'spotify') {
                return {
                    ...token,
                    accesstoken: account.access_token,
                }
            }
            return token;
        },
        session: async ({session, token}: {session: ESession, token: EJWT}) => {
            session.accessToken = token.accesstoken;
            return session;
        },
    }
});