'use client'
import React from 'react';
import LoginForm, {loginFormModel} from '@/app/auth/login/present/login-form';
import {Button, Flex} from '@radix-ui/themes';
import Image from 'next/image';
import './login-layout.css';
import {requestPost} from '@/app/core/http-client';
import {createAuthStore} from '@/app/auth/store/auth.store';

export default function LoginLayout() {
    const onLogin = (data: loginFormModel) => {
        console.log(data);
        const payload = new URLSearchParams({
            'grant_type': 'client_credentials',
        })
        requestPost('/token', payload)
            .then(response => {
                console.log(response);
                const { setState } = createAuthStore();

            })
            .catch(error => {
                console.log(error);
            });
    }
    return (
        <div className="login_layout">
            <div className="login_layout_card w-full h-auto rounded-xl flex flex-col items-center">
                <Flex direction="column" align='center' gap="2" className='mt-8'>
                    <Image src="/svg/logo_spotify.png" alt="logo" width={48}
                           height={48}/>
                    <p className="text-3xl font-bold ">Inicia sesión en Spotify</p>
                </Flex>
                <div className="flex flex-col gap-3 items-center mt-9 buttons_container">
                    <Button color="gray" variant="outline" highContrast className="icon_alt_btn">
                        <span className="logo_bg_google"></span>
                        Google
                    </Button>
                    <Button color="gray" variant="outline" highContrast className="icon_alt_btn">
                        <span className="logo_bg_facebook"></span>
                        Facebook
                    </Button>
                    <Button color="gray" variant="outline" highContrast className="icon_alt_btn">
                        <span className="logo_bg_apple"></span>
                        Apple
                    </Button>
                    <Button color="gray" variant="outline" highContrast className="icon_alt_btn">
                        Numero de teléfono
                    </Button>
                </div>
                <div className="flex w-full flex-col gap-5 items-center mt-7">
                    <div className="divisor"></div>
                </div>
                <div className="w-[24rem]">
                    <LoginForm handleSubmit={($event) => onLogin($event)} />
                </div>
            </div>
        </div>
    );
}