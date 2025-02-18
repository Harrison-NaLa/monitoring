import Image from 'next/image';
import React from 'react';
import UserMenu from '@/app/components/user-menu';
import {BellIcon, HomeIcon} from '@radix-ui/react-icons';
import {Button, Flex, Link} from '@radix-ui/themes';
import './main-header.css';
import BtnLogout from '@/app/components/buttons/btn-logout';
import BtnLogin from '@/app/components/buttons/btn-login';
import {auth} from '@/auth';

export interface MainHeaderProps {
    isPremium: boolean;
}

const MainHeader = async () => {
    const session = await auth();
    console.log({session});

    const validUserMenu = () => {
        if (session && session.user) return (<UserMenu fallback={(session.user.name ?? ' ')[0]} image={session.user.image ?? ''} tooltip={session.user.name ?? ''} data={session?.user}/>);
        return (
            <UserMenu fallback="J" tooltip="Jhon"/>
        )
    }
    return (
        <Flex align="center" justify="between" className="px-5 min-h-16">
            <section>
                <Link href="#">
                    <Image src="/png/logo_spotify.png" alt="logo" width={40}
                           height={40}/>
                </Link>
            </section>
            <section>
                <Button variant="ghost" className="header_btn p-0 grid" color="grass">
                    <HomeIcon color="white"/>
                </Button>
            </section>
            <Flex gapX="4" align="center">
                {/*{session && (<Button variant="outline" size="3" radius="full" highContrast className="header_premium_btn">
                    Explorar premium
                </Button>)}*/}
                {session && (
                    <>
                        <Button variant="ghost" className="header_btn p-0 grid" color="grass">
                            <BellIcon color="white"/>
                        </Button>
                        {validUserMenu()}
                    </>
                )}

                {session ? <BtnLogout/> : <BtnLogin/>}
            </Flex>

        </Flex>
    );
};

export default MainHeader;