import React from 'react';
import BodyContainer from '@/app/components/body-container';
import NoActiveSession from '@/app/components/no-active-session';
import {auth } from '@/auth';
import Tracks from '@/app/tracks/music-control-list';


const MainPage = async () => {
    const session = await auth();

    return (
        <BodyContainer>
            <NoActiveSession />
            {session && <Tracks/>}
        </BodyContainer>
    )
}

export default MainPage;