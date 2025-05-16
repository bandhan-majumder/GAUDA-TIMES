"use client";

import { SessionProvider } from "./SessionProvider";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        {children}
      </QueryClientProvider>
    </SessionProvider>
  );
}