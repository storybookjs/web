'use client';

import { Header, Footer } from '@repo/ui';
import { Hero } from './hero/hero';
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
      <Footer variant="home" />
    </div>
  );
}
