import type { Metadata } from "next";
import localFont from "next/font/local";
import './globals.css';
import "@repo/tailwind-config/styles";
import { Providers } from "../components/Providers";

// core styles shared by all of react-notion-x (required)
import "react-notion-x/src/styles.css";
import { Toaster } from "react-hot-toast";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "THE GAUDA TIMES",
  description: "because everything has a story",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Providers>
        <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-neutral-50 dark:bg-neutral-950 overflow-x-hidden antialiased`}>
          <Toaster />
          {children}
        </body>
      </Providers>
    </html>
  );
}
