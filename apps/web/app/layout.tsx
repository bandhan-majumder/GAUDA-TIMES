import type { Metadata } from "next";
import localFont from "next/font/local";
import './globals.css';
import "@repo/tailwind-config/styles";
import { Providers } from "../components/Providers";
import "react-notion-x/src/styles.css";
import { Appbar } from "../components/Navbar";
import Footer from "../components/Footer";

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
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[#16161d] overflow-x-hidden antialiased`}>
        <Providers>
          <Appbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}