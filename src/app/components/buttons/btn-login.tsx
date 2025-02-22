'use client';
import {login} from '@/actions/_auth';
import {Button} from '@radix-ui/themes';
import React from 'react';
import {AvatarIcon} from '@radix-ui/react-icons';

const BtnLogin = () => (
    <Button variant="ghost" className="p-0 grid w-[40px] h-[40px]" radius="full" onClick={login} color='grass'>
        <AvatarIcon width='24' height='24' className='text-gray-50'/>
    </Button>
);

export default BtnLogin;