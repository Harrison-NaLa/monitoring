import React from 'react';
import {Flex} from '@radix-ui/themes';
import './main-container.css';
import MainSidebar from '@/app/components/main-sidebar';

const MainContainer = ({children}: Readonly<{ children: React.ReactNode }>) => {


    return (
        <Flex gapX='2'>
            <MainSidebar parentClass='main_sidebar'>
                Sidebar
            </MainSidebar>
            <div className='main_container_body'>
                {children}
            </div>
        </Flex>
    )
}

export default MainContainer;