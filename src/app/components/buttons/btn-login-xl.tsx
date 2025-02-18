'use client';
import {login} from '@/actions/_auth';
import {Button} from '@radix-ui/themes';
import React from 'react';
import {AvatarIcon} from '@radix-ui/react-icons';

const BtnXlLogin = () => (
    <Button className="color_white" size="3" radius="full" onClick={login}>
        Iniciar sesión
        <AvatarIcon width='24' height='24' className='text-gray-50'/>
    </Button>
);

export default BtnXlLogin;