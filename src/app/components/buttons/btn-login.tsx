import {login} from '@/actions/_auth';
import {Button} from '@radix-ui/themes';
import {LogInIcon} from 'lucide-react';
import React from 'react';

const BtnLogin = () => {
    return (
        <Button variant='ghost' className='header_btn' onClick={login}>
            <LogInIcon color='white'/>
        </Button>
    )
}
export default BtnLogin;