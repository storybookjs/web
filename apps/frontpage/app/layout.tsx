import type { Metadata } from 'next';
import { Nunito_Sans as nunitoSans } from 'next/font/google';
import { cn } from '@repo/utils';
import { Providers } from './providers';

import './globals.css';
import '@repo/ui/styles.css';

const fontSans = nunitoSans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Storybook: Frontend workshop for UI development',
  description:
    "Storybook is a frontend workshop for building UI components and pages in isolation. Thousands of teams use it for UI development, testing, and documentation. It's open source and free.",
  openGraph: {
    url: 'https://storybook.js.org',
    siteName: 'Storybook',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-white font-sans antialiased dark:bg-slate-950',
          fontSans.variable,
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
