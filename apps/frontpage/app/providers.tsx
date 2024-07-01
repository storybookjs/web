'use client';

import { ThemeProvider } from 'next-themes';
import type { FC, ReactNode } from 'react';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import PlausibleProvider from 'next-plausible';

interface ProvidersProps {
  children: ReactNode;
}

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY || '', {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    person_profiles: 'always', // or 'always' to create profiles for anonymous users as well
  });
}

export const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <PlausibleProvider domain="storybook.js.org">
      <PostHogProvider client={posthog}>
        <ThemeProvider attribute="class">{children}</ThemeProvider>
      </PostHogProvider>
    </PlausibleProvider>
  );
};
