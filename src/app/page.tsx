import React from 'react';
import Auth from './auth/page';
import {Theme} from '@radix-ui/themes';
import {TooltipProvider} from '@radix-ui/react-tooltip';

export default function Home() {
    return (
        <Theme appearance="dark">
                <div className="flex flex-col items-center min-h-screen sm:items-start">
                    <Auth/>
                </div>
        </Theme>
    );
}
