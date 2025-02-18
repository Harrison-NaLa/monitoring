import React from 'react';
import {Theme} from '@radix-ui/themes';
import MainPage from '@/app/main/page';
import {SessionProvider} from 'next-auth/react';
import {SpotifyContextProvider} from '@/contexts/spotify-context';
import MainHeader from '@/app/components/main-header';

export default async function Home() {
    return (
        <SessionProvider>
            <SpotifyContextProvider>
                {/*<div className="flex flex-col min-h-screen min-w-screen bg-black gap-2">
                    <MainHeader/>
                    <div className="px-3 py-2 layout_container w-full grow relative">*/}
                        <div className="layout_inner rounded-xl w-ful">
                            <MainPage/>
                        </div>
                    {/*</div>
                </div>*/}
            </SpotifyContextProvider>
        </SessionProvider>
    );
}
