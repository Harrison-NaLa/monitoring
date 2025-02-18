import {fetchApiPosts, fetchPosts} from '@/app/core/http-client';
import {env} from '@/env';
import {ConfigUrls} from '@/config/urls';


export const doAutenticate = <T>() => {
    const headers: HeadersInit = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + (Buffer.from(env.AUTH_SPOTIFY_ID + ':' + env.AUTH_SPOTIFY_SECRET).toString('base64')),
    });
    const options: RequestInit = {
        method: 'POST',
        body: new URLSearchParams({
            'grant_type': 'client_credentials',
        }),
    };
    return fetchPosts<T>(
        ConfigUrls.auth.login,
        options,
        headers,
    );
};

export const getUserProfile = <T>() => {
    const headers: HeadersInit = new Headers();
    headers.set('Content-Type', 'application/json');
    //headers.set('Authorization', `Bearer ${accessToken}`);
    const options: RequestInit = {
        method: 'GET',
        body: null
    };
    return fetchApiPosts<T>(
        ConfigUrls.auth.login,
        options,
        headers,
    );
};