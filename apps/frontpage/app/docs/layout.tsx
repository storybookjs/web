import { Header, Footer, Container } from '@repo/ui';
import Image from 'next/image';
import { fetchGithubCount } from '@repo/utils';
import { type ReactNode, Suspense } from 'react';
import { Sidebar } from '../../components/docs/sidebar/sidebar';
import { NavDocs } from '../../components/docs/sidebar/docs-nav';
import { Submenu } from '../../components/docs/submenu';
import { DocsMainNav } from '../../components/docs/sidebar/docs-main-nav';
import { TOCSectionTitles } from '../../components/docs/toc-section-titles';
import { getAllTrees } from '../../lib/get-all-trees';
import { DocsProvider } from './provider';
import { RendererCookie } from './renderer-cookie';

export default async function Layout({ children }: { children: ReactNode }) {
  const { number: githubCount } = await fetchGithubCount();
  const listofTrees = getAllTrees();

  return (
    <DocsProvider>
      {/*
        We have to wrap it with suspense to use useSearchParams() while still make the rest statically generated.
        https://nextjs.org/docs/app/api-reference/functions/use-search-params#static-rendering
      */}
      <Suspense fallback={null}>
        <RendererCookie />
      </Suspense>
      <Header
        algoliaApiKey={process.env.NEXT_PUBLIC_ALGOLIA_API_KEY!}
        githubCount={githubCount}
        subMenu={<Submenu listOfTrees={listofTrees} />}
      />
      <Image
        alt="Storybook Docs"
        // TODO: 40px is height of eyebrow. Find way to not hard-code this.
        className="absolute left-0 top-[40px] -z-10 w-full"
        height={339}
        priority
        src="/bubbles.png"
        width={1800}
      />
      <TOCSectionTitles listOfTrees={listofTrees} />
      <Container className="flex gap-4 md:pl-5 lg:gap-12 lg:pr-8">
        <>
          <Sidebar>
            <DocsMainNav />
            <NavDocs listOfTrees={listofTrees} />
          </Sidebar>
          {children}
        </>
      </Container>
      <Footer />
    </DocsProvider>
  );
}
