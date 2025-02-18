'use client';
import {Avatar} from '@radix-ui/themes';
import React from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import {User} from 'next-auth';

export interface UserMenuProps {
    tooltip?: string;
    fallback: string;
    image?: string;
    data?: User;
}

const UserMenu = ({tooltip, fallback, image, data}: UserMenuProps) => {
    if (image) {
        return (
            <Tooltip.Provider>
                <Tooltip.Root delayDuration={0}>
                    <Tooltip.Trigger>
                        <Avatar size="3" radius='full' src={image ?? ''} fallback={fallback}/>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                        <Tooltip.Content className="TooltipContent" sideOffset={5}>
                            {data?.name}
                            <Tooltip.Arrow offset={5}/>
                        </Tooltip.Content>
                    </Tooltip.Portal>
                </Tooltip.Root>
            </Tooltip.Provider>
        );
    }

    return (
        <Tooltip.Provider>
            <Tooltip.Root delayDuration={0}>
                <Tooltip.Trigger>
                    <Avatar highContrast variant="solid" color="gray" radius="full" fallback={fallback} size="3"/>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                    <Tooltip.Content className="tooltipContent" sideOffset={5}>
                        {data?.name}
                        <Tooltip.Arrow/>
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>
        </Tooltip.Provider>
    );
};

export default UserMenu;