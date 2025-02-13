'use client';
import {Avatar} from '@radix-ui/themes';
//import {Tooltip} from 'radix-ui';
import React from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';

export interface UserMenuProps {
    tooltip?: string;
    fallback: string;
    image?: string;
}

const UserMenu = ({tooltip, fallback, image}: UserMenuProps) => {
    if (image) {
        return (
            <Tooltip.Provider>
                <Tooltip.Root delayDuration={0}>
                    <Tooltip.Trigger>
                        <Avatar size="4" src={image ?? ''} fallback={fallback}/>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                        <Tooltip.Content className="TooltipContent" sideOffset={5}>
                            {tooltip}
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
                        {tooltip}
                        <Tooltip.Arrow/>
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>
        </Tooltip.Provider>
    );
};

export default UserMenu;