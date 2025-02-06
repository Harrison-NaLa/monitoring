import {NEXT_PUBLIC_ACCOUNT_API_URL, NEXT_PUBLIC_CLIENT_ID, NEXT_PUBLIC_CLIENT_SECRET} from '../../../env.config';


export const httpClient = <T extends BodyInit, R = unknown>(
    endpoint: string,
    payload?: T,
    method = 'POST',
    headers?: HeadersInit
    ): Promise<R> => {
    const api = String(NEXT_PUBLIC_ACCOUNT_API_URL);
    console.log(api);
    return fetch(api + endpoint, {
        method,
        body: payload ?? null,
        headers
    }).then(response => response.json())
}


export const requestPost = <T extends BodyInit>(
    endpoint: string,
    payload: T,
    headers: HeadersInit = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + (Buffer.from(NEXT_PUBLIC_CLIENT_ID + ':' + NEXT_PUBLIC_CLIENT_SECRET).toString('base64')),
    })
    ) => {
    return httpClient(endpoint, payload, 'POST', headers);
}