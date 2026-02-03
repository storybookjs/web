'use client';

import Link from 'next/link';
import { Header, Footer, Container } from '@repo/ui';
import { Hero } from './hero/hero';
import { CommandButton } from './hero/command-button';
import { GenerateUI } from './generate-ui';
import { EnforceQuality } from './enforce-quality';
import { ShareContext } from './share-context/share-context';

interface AIProps {
  githubCount: number;
}

export function AI({ githubCount }: AIProps) {
  return (
    <div className="bg-homeBackground" id="page-top">
      <Header
        algoliaApiKey={process.env.NEXT_PUBLIC_ALGOLIA_API_KEY!}
        githubCount={githubCount}
        variant="home"
      />
      <Hero />
      <GenerateUI />
      <EnforceQuality />
      <ShareContext />
      <div className="border-t border-zinc-700 bg-[#82acff0d] py-12 lg:py-16">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row">
            <div className="flex flex-1 items-center text-2xl font-bold text-white md:text-3xl">
              Get agents to build with your components
            </div>
            <div className="flex flex-col gap-5 md:flex-row md:items-center">
              <CommandButton
                className="hidden text-sm sm:flex"
                command="npx storybook add @storybook/addon-mcp"
                variant="primary"
              />
              <Link
                className="flex h-12 items-center justify-center rounded-full border border-white bg-transparent px-6 text-sm font-bold text-white"
                href="/docs"
              >
                Go to docs
              </Link>
            </div>
          </div>
        </Container>
      </div>
      <Footer variant="home" />
    </div>
  );
}
