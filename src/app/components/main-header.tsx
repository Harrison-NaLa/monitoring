import Image from 'next/image';
import React from 'react';
import UserMenu from '@/app/components/user-menu';
import {BellIcon, HomeIcon } from '@radix-ui/react-icons';
import {Button, Flex} from '@radix-ui/themes';
import './main-header.css';
import BtnLogout from '@/app/components/buttons/btn-logout';
import BtnLogin from '@/app/components/buttons/btn-login';
import {auth} from '@/auth';

export interface MainHeaderProps {
    isPremium: boolean;
}

const MainHeader = async () => {
    const session = await auth()

    return (
        <Flex align='center' justify='between' className='px-5 min-h-16'>
            <section>
                <Image src="/png/logo_spotify.png" alt="logo" width={32}
                       height={32}/>
            </section>
            <section>
                <Button variant='solid' highContrast className='header_home_btn header_btn'>
                    <HomeIcon color='white'/>
                </Button>
            </section>
            <Flex gapX='4'>
                {/*{false && (<Button variant="outline" size="3" radius="full" highContrast className="header_premium_btn">
                    Explorar premium
                </Button>)}*/}
                <Button variant='ghost' className='header_btn'>
                    <BellIcon color='white'/>
                </Button>
                <UserMenu fallback='S' tooltip='Juan' />
                {session ? <BtnLogout /> : <BtnLogin />}
            </Flex>

        </Flex>
    )
}

export default MainHeader;