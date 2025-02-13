'use client';
import React, {useEffect} from 'react';
import {getTrackData} from '@/app/main/tracks/store/tracks.request';

const Tracks = () => {

    const handleFetch = async () => {
        const track = await getTrackData<{name: string, artists: any[]}>('/5oFX4zn4CIDN0l2RCVuObT', 'state.token');
        console.log(track);
    };
    useEffect(() => {
        //handleFetch().then();
    }, []);
    return (
        <div className="flex flex-col items-center h-full">
            <h1>Tracks</h1>
        </div>
    );
}
export default Tracks;