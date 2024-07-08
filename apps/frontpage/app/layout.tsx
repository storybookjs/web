import type { Metadata } from 'next';
import { Nunito_Sans as nunitoSans } from 'next/font/google';
import {
  GLOBAL_SEARCH_META_KEYS,
  GLOBAL_SEARCH_AGNOSTIC,
  GLOBAL_SEARCH_IMPORTANCE,
} from '@repo/ui';
import { cn } from '@repo/utils';
import { Providers } from './providers';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/react';

import '@docsearch/css';
import './globals.css';
import '@repo/ui/styles.css';

const fontSans = nunitoSans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://storybook.js.org'),
  title: 'Storybook: Frontend workshop for UI development',
  description:
    "Storybook is a frontend workshop for building UI components and pages in isolation. Thousands of teams use it for UI development, testing, and documentation. It's open source and free.",
  openGraph: {
    url: 'https://storybook.js.org',
    siteName: 'Storybook',
  },
  other: {
    // Set the docsearch index facets defaults
    [GLOBAL_SEARCH_META_KEYS.VERSION]: GLOBAL_SEARCH_AGNOSTIC,
    [GLOBAL_SEARCH_META_KEYS.IMPORTANCE]: GLOBAL_SEARCH_IMPORTANCE.AGNOSTIC,
  },
  verification: {
    google: '-w_VUF7WOagl6GeEjf5pVMsu8hJpvoMO84RYkZOmvJA',
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
        <SpeedInsights />
        <Analytics />
      </body>
      <GoogleAnalytics gaId="G-MN8NJ34M7T" />
    </html>
  );
}
