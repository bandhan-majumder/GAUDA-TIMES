import type { Metadata } from "next";
import localFont from "next/font/local";
import './globals.css';
import "@repo/tailwind-config/styles";
import { Providers } from "../components/Providers";

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
    <html lang="en">
      <Providers>
        <body className={`${geistSans.variable} ${geistMono.variable} bg-gradient-to-b from-[#1D222E] to-[#22252c]`}>
          {children}
        </body>
      </Providers>
    </html>
  );
}
