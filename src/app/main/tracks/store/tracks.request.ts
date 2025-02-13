import AuthStore from '@/app/auth/store/auth.store';
import {ConfigUrls} from '@/config/urls';
import z from 'zod';

const schema = z
    .object({});


export const getTrackData = async <T>(id: string, token: string) => {
    try {
        const headers: HeadersInit = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        });
        console.log(token);
        const uri = ConfigUrls.album.all;
        console.log(uri);
        console.log(id);
        const response = await fetch(
            uri, {
                method: 'GET',
                headers,
            }
        );
        console.log(response);
        const data = await response.json();
        const isObject = (value: unknown) => schema.safeParse(value).success;

        if (isObject(data)) return data;
        return <T>{};
    } catch (error) {
        console.log({error});
    }
};
