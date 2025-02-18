import Image from 'next/image';
import React from 'react';
import {auth} from '@/auth';
import BtnXlLogin from '@/app/components/buttons/btn-login-xl';

const NoActiveSession = async () => {
    const session = await auth();

    return (
        <>
            <span>&nbsp;</span>
            {!session && (
                <>
                    <section className="skeleton_guest grid place-items-center">
                        <BtnXlLogin />
                    </section>
                    <Image
                        src="/panel_skeleton.png"
                        alt="panel"
                        className="h-auto w-full"
                        width={100}
                        height={100}
                    />
                </>
            )}
        </>
    );
};

export default NoActiveSession;