'use client';
import React, {useEffect, useState} from 'react';
import Auth from './auth/page';

export default function Home() {
  
    return (
        <div className="flex flex-col items-center min-h-screen sm:items-start">
            <Auth/>
        </div>

    );
}
