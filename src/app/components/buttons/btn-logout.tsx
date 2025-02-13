'use client';
import {LogOutIcon} from 'lucide-react';
import {Button} from '@radix-ui/themes';
import React from 'react';
import {logout} from '@/actions/_auth';

const BtnLogout = () => {
    return (
    <Button variant='ghost' className='header_btn' onClick={logout}>
        <LogOutIcon color='white'/>
    </Button>
    )
}
export default BtnLogout;