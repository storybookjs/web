'use client';

import { ThemeProvider } from 'next-themes';
import type { FC, ReactNode } from 'react';
import PlausibleProvider from 'next-plausible';

interface ProvidersProps {
  children: ReactNode;
}

export const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <PlausibleProvider domain="storybook.js.org">
      <ThemeProvider attribute="class">{children}</ThemeProvider>
    </PlausibleProvider>
  );
};
