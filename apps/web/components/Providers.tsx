"use client";

import React from 'react'
import SessionProvider from './SessionProvider';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}