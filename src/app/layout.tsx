import {Geist, Geist_Mono} from 'next/font/google';
import type {Metadata} from 'next';
import './globals.css';

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
    applicationName: 'Spotify clone'
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
            {children}
        </main>
        </body>
        </html>
    );
}
