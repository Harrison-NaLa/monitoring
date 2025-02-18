'use client';
import React, {useState} from 'react';
import './main-container.css';
import {Button, Flex, Grid, Text} from '@radix-ui/themes';
import {ArrowRightIcon, GlobeIcon, PlusIcon} from '@radix-ui/react-icons';
import './main-sidebar.css';
import SidebarCard from '@/app/components/sidebar-card';

export interface MainSidebarProps {
    parentClass?: string;
    children: React.ReactNode;
    expanded?: boolean;
    logged?: boolean;
}

export type MainSidebarType = 'collapsed' | 'expanded' | 'extra-expanded';

const MainSidebar = ({children, parentClass, logged}: Readonly<MainSidebarProps>) => {
    const [isExpanded, setIsExpanded] = useState<MainSidebarType>('expanded');

    const onClickExpand = () => {
        if (isExpanded === 'expanded') {
            setIsExpanded('extra-expanded');
        } else if (isExpanded === 'extra-expanded') {
            setIsExpanded('expanded');
        }
    };

    return (
        <aside className={`flex flex-col py-3 px-4 gap-2 ${parentClass ?? ''} ${isExpanded}`}>
            <Flex width="100%" align="center" justify="between" className="sidebar_header py-3 h-fit flex-none">
                <section>
                    <Text weight="bold" className="text-gray-50">
                        Tu biblioteca
                    </Text>
                </section>
                <Flex gap="2" align="center">
                    {
                        logged && (
                            <Button variant="soft" className="btn_expand_panel grid" color='gray'>
                                <PlusIcon className="size-4"/>
                            </Button>
                        )
                    }
                    <Button variant="soft" className="btn_expand_panel grid" onClick={onClickExpand} color='gray'>
                        <ArrowRightIcon className="size-4"/>
                    </Button>
                </Flex>
            </Flex>
            <Grid className='grow'>
                <SidebarCard />
                {children}
            </Grid>
            <Flex className='h-fit flex-none'>
                <Button variant="outline" className="" radius='full' >
                    <GlobeIcon className="size-4"/>
                    Español de Latinoamérica
                </Button>
            </Flex>
        </aside>
    );
};

export default MainSidebar;