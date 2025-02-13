import React from 'react';
import MainHeader from '@/app/components/main-header';
import {SpotifyContextProvider} from '@/contex/spotify-context';
import {SessionProvider} from 'next-auth/react';
import {logout} from '@/actions/_auth';

const MainLayout = ({children}: Readonly<{ children: React.ReactNode }>) => {

    const onLogout = async () => {
        await logout();
    };
    return (
        <SessionProvider>
            <SpotifyContextProvider>
                <div className="flex flex-col min-h-screen min-w-screen bg-black gap-2">
                    <MainHeader/>
                    <div className="px-3 py-2 layout_container w-full grow">
                        <div className="layout_inner rounded-xl w-ful">
                            {children}
                        </div>
                    </div>
                </div>
            </SpotifyContextProvider>
        </SessionProvider>
    );
};

export default MainLayout;