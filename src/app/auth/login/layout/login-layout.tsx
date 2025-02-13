'use client'
import React, {useEffect, useState} from 'react';
import LoginForm, {loginFormModel} from '@/app/auth/login/present/login-form';
import {Button, Flex} from '@radix-ui/themes';
import Image from 'next/image';
import './login-layout.css';
import AuthStore from '@/app/auth/store/auth.store';
import {AuthenticationResponse} from '@/app/auth/auth.models';
import {doAutenticate} from '@/app/core/services/auth/auth.request';
import {useRouter} from 'next/navigation';
import {auth, signIn} from '@/auth';
import { login } from '@/actions/_auth';
import {Session} from 'next-auth';

export default function LoginLayout() {
    const {grantAccess} = AuthStore();
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        setCurrentUser().then()
    }, []);

    const setCurrentUser = async () => {
        setSession(null);
    };


    const onLogin = async (data: loginFormModel) => {
        console.log(data);
        await login()/*

            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });*/
/*        doAutenticate<AuthenticationResponse>()
            .then((response: AuthenticationResponse) => {
                console.log(response);
                grantAccess({token: response.access_token, isAuthenticated: true});
                router.push("/tracks");
                /!*getUserProfile()
                    .then(response => {
                        console.log(response);
                    })
                    .catch(error => {
                        console.log(error);
                    });*!/
            })
            .catch(error => {
                console.log(error);
            });*/
    };

    return (
        <div className="login_layout">
            <div className="login_layout_card w-full h-auto rounded-xl flex flex-col items-center">
                <Flex direction="column" align="center" gap="2" className="mt-8">
                    <Image src="/png/logo_spotify.png" alt="logo" width={48}
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
                    <LoginForm/>
                </div>
            </div>
        </div>
    );
}