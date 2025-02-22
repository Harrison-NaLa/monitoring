'use client';

import {SpotifyAlbumItem, SpotifyResponseApi, TopArtistsInterface, TopTracksInterface} from '../../types';
import {createContext, useCallback, useEffect, useMemo, useState} from 'react';
import {useSession} from 'next-auth/react';
import {getUserAccessToken, logout} from '@/actions/_auth';
import {getCurrentUserTopAlbums, getCurrentUserTopArtists, getCurrentUserTopTracks} from '@/actions/_spotify';

export type SpotifyContextDataInterface = SpotifyResponseApi | TopArtistsInterface | object;

interface SpotifyContextInterface {
    datos: SpotifyContextDataInterface;
    setDatos: React.Dispatch<React.SetStateAction<TopTracksInterface | TopArtistsInterface>>;
    albumsData: SpotifyResponseApi<SpotifyAlbumItem[]> | object;
    setAlbumsData: React.Dispatch<React.SetStateAction<SpotifyAlbumItem | object>>;
    filterType: 'tracks' | 'artists';
    setFilterType: React.Dispatch<React.SetStateAction<'tracks' | 'artists'>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    dateRange: 'short_term' | 'medium_term' | 'long_term';
    setDateRange: React.Dispatch<React.SetStateAction<'short_term' | 'medium_term' | 'long_term'>>;
}

export const SpotifyContext = createContext<SpotifyContextInterface>({
    datos: {},
    setDatos: () => {
    },
    albumsData: {},
    setAlbumsData: () => {
    },
    filterType: 'tracks',
    setFilterType: () => {
    },
    loading: false,
    setLoading: () => {
    },
    dateRange: 'short_term',
    setDateRange: () => {
    },
});

export const SpotifyContextProvider = ({children}: { children: React.ReactNode }) => {
    const [datos, setDatos] = useState<SpotifyContextDataInterface>({});
    const [filterType, setFilterType] = useState<'tracks' | 'artists'>('tracks');
    const [loading, setLoading] = useState(false);
    const [dateRange, setDateRange] = useState<'short_term' | 'medium_term' | 'long_term'>('short_term');
    const {status} = useSession();
    const [albumsData, setAlbumsData] = useState<SpotifyAlbumItem | object>({});

    const fetchDatos = useCallback(async () => {
        if (status !== 'authenticated') return;
        try {
            setLoading(true);
            const accessToken = await getUserAccessToken();
            if (!accessToken) {
                throw new Error('Access token is undefined');
            }

            try {
                console.log({accessToken});
                const data = filterType === 'tracks'
                    ? await getCurrentUserTopTracks(accessToken as string)
                    : await getCurrentUserTopArtists(accessToken as string, dateRange);
                console.log({data});
                if (data && 'items' in data) {
                    setDatos(data);
                } else {
                    console.error('Invalid data structure', data);
                    setDatos({});
                }

                const albumsData = await getCurrentUserTopAlbums(accessToken as string);
                if (albumsData && 'items' in albumsData) {
                    setAlbumsData(albumsData);
                } else {
                    console.error('Invalid data structure', data);
                    setAlbumsData({});
                }
            } catch (fetchError) {
                console.log({fetchError});
                console.log(fetchError instanceof Error ? fetchError.message : 'Unknown error');
                await logout();
            }
        } catch (tokenError) {
            console.error(tokenError);
        } finally {
            setLoading(false);
        }
    }, [filterType, status, dateRange]);

    useEffect(() => {
        fetchDatos();
    }, [fetchDatos]);

    const contextValue = useMemo(() => ({
        datos,
        setDatos,
        filterType,
        setFilterType,
        loading,
        setLoading,
        dateRange,
        setDateRange,
        albumsData,
        setAlbumsData,
    }), [datos, filterType, loading, dateRange, albumsData]);


    return (
        <SpotifyContext.Provider value={contextValue}>
            {children}
        </SpotifyContext.Provider>
    );
};