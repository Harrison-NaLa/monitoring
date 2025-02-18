'use server';
import axios from 'axios';
import {AccessTokenResponseInterface, TimeRangeInterface} from '@/types';

const SPOTIFY_TOKEN_URI = "https://accounts.spotify.com/api/token"
const SPOTIFY_ENDPOINT = "https://api.spotify.com/v1"


export const getSpotifyToken = async (): Promise<AccessTokenResponseInterface> => {
    const response = await axios.post(SPOTIFY_TOKEN_URI, {
        grant_type: "client_credentials",
        client_id: process.env.AUTH_SPOTIFY_ID,
        client_secret: process.env.AUTH_SPOTIFY_SECRET
    }, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })

    return <AccessTokenResponseInterface>response.data;
}

export const getCurrentUserTopTracks = async (access_token: string) => {
    console.log({SPOTIFY_ENDPOINT});
    const endpoint = `${SPOTIFY_ENDPOINT}/me/tracks?offset=0&limit=8`;
    console.log({endpoint});
    const response = await axios.get(`${endpoint}`, {
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    })

    return response.data
}

export const getCurrentUserTopArtists = async (access_token: string, time_range?: TimeRangeInterface) => {
    const response = await axios.get(`${SPOTIFY_ENDPOINT}/me/top/artists?time_range=${time_range}&limit=8`, {
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    })
    return response.data
}



