'use client';

import { ThemeProvider } from 'next-themes';
import type { FC, ReactNode } from 'react';
import PlausibleProvider from 'next-plausible';

interface ProvidersProps {
  children: ReactNode;
}

// Intentionally no PostHog provider here — frontpage wraps in PHProvider,
// addon-catalog does not. useAnalytics() still calls posthog.capture, but
// without a provider it's a no-op, so events from this app are Plausible-
// only by design.
// TODO: Decide whether addon-catalog should also report to PostHog. If
// yes, add PHProvider here to mirror frontpage. If no, delete this TODO.
export const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <PlausibleProvider
      domain="storybook.js.org"
      taggedEvents
      pageviewProps={{
        experiment: 'Grow-SB-website-acquisition:A',
      }}
    >
      <ThemeProvider attribute="class">{children}</ThemeProvider>
    </PlausibleProvider>
  );
};
