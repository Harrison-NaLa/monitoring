import { SpotifyContextProvider } from "@/contexts/spotify-context"
import { SessionProvider } from "next-auth/react"
import BodyContainer from '@/app/components/body-container';
import NoActiveSession from '@/app/components/no-active-session';
import MusicControlList from '@/app/tracks/music-control-list';
import React from 'react';

const HomeContainer = async () => {

  return (
    <SessionProvider>
      <SpotifyContextProvider>
        <div className='w-full flex flex-col flex-1 h-full bg-background gap-4 overflow-hidden'>
          <div className='flex-1 flex items-center'>
            <BodyContainer>
              <NoActiveSession />
              <MusicControlList/>
            </BodyContainer>
          </div>
        </div>
      </SpotifyContextProvider>
    </SessionProvider>
  )
}

export default HomeContainer