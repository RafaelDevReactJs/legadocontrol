import type { Metadata } from "next";
import { Geist, Geist_Mono, Oswald } from "next/font/google";
import MuiProvider from "./providers/MuiProvider";
import StoreProvider from "./providers/StoreProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "CT Legado — Login",
  description: "Acesse sua conta no CT Legado Jiu-Jitsu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${oswald.variable}`}
      >
        <StoreProvider>
          <MuiProvider>{children}</MuiProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
