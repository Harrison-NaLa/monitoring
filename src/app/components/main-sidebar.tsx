'use client';
import React, {useState} from 'react';
import './main-container.css';
import {Button, Flex} from '@radix-ui/themes';
import {ArrowRightIcon, PlusIcon} from '@radix-ui/react-icons';
import './main-sidebar.css';

export interface MainSidebarProps {
    parentClass?: string;
    children: React.ReactNode;
    expanded?: boolean;
}

export type MainSidebarType = 'collapsed' | 'expanded' | 'extra-expanded';

const MainSidebar = ({children, parentClass}: Readonly<MainSidebarProps>) => {
    const [isExpanded, setIsExpanded] = useState<MainSidebarType>('expanded');

    const onClickExpand = () => {
        if (isExpanded === 'expanded') {
            setIsExpanded('extra-expanded');
        } else if (isExpanded === 'extra-expanded') {
            setIsExpanded('expanded');
        }
    };

    return (
        <aside className={`grid py-3 px-4 gap-2 ${parentClass ?? ''} ${isExpanded}`}>
            <Flex width="100%" align="center" justify="between" className='sidebar_header py-3'>
                <section>
                    <span className=" font-bold">
                        Tu biblioteca
                    </span>
                </section>
                <Flex gap="2" align="center">
                    <Button variant="outline" className="btn_add_list grid">
                        <PlusIcon className="size-4" />
                    </Button>
                    <Button variant="outline" className="btn_expand_panel grid" onClick={onClickExpand}>
                        <ArrowRightIcon className="size-4"/>
                    </Button>
                </Flex>
            </Flex>
            <Flex>
                {children}
            </Flex>
        </aside>
    );
};

export default MainSidebar;