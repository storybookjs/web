'use client';

import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';
import { useEffect, type FC, type ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import PlausibleProvider from 'next-plausible';

interface ProvidersProps {
  children: ReactNode;
}

export const Providers: FC<ProvidersProps> = ({ children }) => {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      cookieless_mode: 'always',
      api_host: '/ingest',
      ui_host: 'https://us.posthog.com',
      defaults: '2025-05-24',
      capture_exceptions: true,
      disable_compression: true,
      debug: process.env.NODE_ENV === 'development',
    });
  }, []);

  return (
    <PHProvider client={posthog}>
      <PlausibleProvider
        domain="storybook.js.org"
        taggedEvents
        pageviewProps={{
          experiment: 'Grow-SB-website-acquisition:A',
        }}
      >
        <ThemeProvider attribute="class">{children}</ThemeProvider>
      </PlausibleProvider>
    </PHProvider>
  );
};
