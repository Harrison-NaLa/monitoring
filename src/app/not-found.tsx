import React from 'react';
import Image from 'next/image';
import {Link} from '@radix-ui/themes';

export default function NotFound() {
    return (
        <div className='flex flex-col items-center min-h-screen justify-center gap-3'>
            <h1 className='text-4xl font-bold'>Ha ocurrido un error</h1>
            <Image src='/error_def.jpg' alt='error' width={400} height={400} className='rounded-xl' />
            <Link href='/' size='5'>
                Regresar al inicio
            </Link>
        </div>
    );
}