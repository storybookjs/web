import type { Metadata } from "next";
import { Nunito_Sans as FontSans } from "next/font/google";
import { cn } from "../lib/utils";
import { Providers } from "./providers";
import "./globals.css";
import { CookieClient } from "@/components/cookieClient";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Storybook",
  description:
    "Storybook is a frontend workshop for building UI components and pages in isolation. Thousands of teams use it for UI development, testing, and documentation. It's open source and free.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-white dark:bg-zinc-900 font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers>
          <CookieClient />
          {children}
        </Providers>
      </body>
    </html>
  );
}
