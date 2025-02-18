'use client';
import {LogOutIcon} from 'lucide-react';
import {Button} from '@radix-ui/themes';
import React from 'react';
import {logout} from '@/actions/_auth';

const BtnLogout = () => (
    <Button variant="ghost" className="p-0 grid w-[40px] h-[40px]" radius="full" onClick={logout} color='grass'>
        <LogOutIcon color="white"/>
    </Button>
);
export default BtnLogout;