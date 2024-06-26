import type { Metadata } from 'next';
import { cn, fetchGithubCount } from '@repo/utils';
import { Nunito_Sans as nunitoSans } from 'next/font/google';
import { Header, Footer, Container } from '@repo/ui';
import { GoogleAnalytics } from '@next/third-parties/google';

import '@docsearch/css';
import './globals.css';
import '@repo/ui/styles.css';

const fontSans = nunitoSans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://storybook.js.org/tutorials'),
  title: 'Tutorials | Storybook: Frontend workshop for UI development',
  description:
    'Learn how to develop UIs with components and design systems. Our in-depth frontend guides are created by Storybook maintainers and peer-reviewed by the open source community.',
  openGraph: {
    url: 'https://storybook.js.org/tutorials',
    siteName: 'Storybook',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { number: githubCount } = await fetchGithubCount();

  return (
    <html lang="en">
      <head>
        <script
          defer
          data-domain="storybook.js.org"
          data-api="/sb/api/event"
          src="/sb/js/script.js"
        ></script>
      </head>
      <body
        className={cn(
          'min-h-screen bg-white font-sans antialiased dark:bg-slate-950',
          fontSans.variable,
        )}
      >
        <Header
          algoliaApiKey={process.env.NEXT_PUBLIC_ALGOLIA_API_KEY as string}
          githubCount={githubCount}
        />
        <Container>{children}</Container>
        <Footer />
      </body>
      <GoogleAnalytics gaId="G-MN8NJ34M7T" />
    </html>
  );
}
