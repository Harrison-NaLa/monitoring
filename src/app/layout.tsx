import {Geist, Geist_Mono} from 'next/font/google';
import type {Metadata} from 'next';
import './globals.css';
import {Theme} from '@radix-ui/themes';
import MainHeader from '@/app/components/main-header';
import React from 'react';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Spotify clone',
    description: 'Aplicación basada en el reproductor de Spotify',
    applicationName: 'Spotify clone',
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <head>
            <title>Spotify clone</title>
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <main>
            <Theme appearance="dark">
                <div className="flex flex-col min-h-screen min-w-screen bg-black gap-2">
                    <MainHeader/>
                    <div className="px-3 py-2 layout_container w-full grow relative">
                        {children}
                    </div>
                </div>
            </Theme>
        </main>
        </body>
        </html>
    );
}
