import React from 'react';
import {Flex} from '@radix-ui/themes';
import './main-container.css';
import MainSidebar from '@/app/components/main-sidebar';
import {auth} from '@/auth';

const BodyContainer = async ({children}: Readonly<{ children: React.ReactNode }>) => {
    const session = await auth();

    return (
        <Flex gapX='2' className='w-full'>
            <MainSidebar parentClass='main_sidebar' logged={!!session}>
                Sidebar
            </MainSidebar>
            <div className='main_container_body grow'>
                {children}
            </div>
        </Flex>
    )
}

export default BodyContainer;