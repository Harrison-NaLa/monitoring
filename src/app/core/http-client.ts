import {env} from '@/config/env';

export const httpClient = <R>(
    endpoint: string,
    options?: RequestInit,
    headers?: HeadersInit,
): Promise<R> => {
    const api = String(env.NEXT_PUBLIC_ACCOUNT_API_URL);
    console.log(api);
    return fetch(api + endpoint, {
        ...options,
        headers,
    }).then(response => response.json());
};

export const fetchPosts = async <T>(endpoint: string, options?: RequestInit, headers?: HeadersInit): Promise<T> => {
    const response = await fetch(endpoint, {
        ...options,
        headers,
    });
    return await response.json();
};

export const fetchApiPosts = async <T>(endpoint: string, options?: RequestInit, headers?: Headers): Promise<T> => {
    try {
        const response = await fetch(endpoint, {
            ...options,
            headers,
        });
        console.log(response);
        return await response.json();
    } catch (error) {
        console.log(error);
        return <T>{};
    }
};


export const requestPost = <T extends object>(
    endpoint: string,
    options?: RequestInit,
    headers: HeadersInit = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + (Buffer.from(env.AUTH_SPOTIFY_ID + ':' + env.AUTH_SPOTIFY_SECRET).toString('base64')),
    }),
) => {
    return httpClient<T>(endpoint, options, headers);
};