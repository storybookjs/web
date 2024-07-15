import { Header, Footer, Container } from '@repo/ui';
import Image from 'next/image';
import { fetchGithubCount } from '@repo/utils';
import { Sidebar } from '../../components/docs/sidebar/sidebar';
import { NavDocs } from '../../components/docs/sidebar/docs-nav';
import { DocsProvider } from './provider';
import { Submenu } from '../../components/docs/submenu';
import { DocsMainNav } from '../../components/docs/sidebar/docs-main-nav';
import { ReactNode } from 'react';
import { TOCSectionTitles } from '../../components/docs/toc-section-titles';
import { getAllTrees } from '../../lib/get-all-trees';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Docs | Storybook',
  };
}

export default async function Layout({ children }: { children: ReactNode }) {
  const { number: githubCount } = await fetchGithubCount();
  const listofTrees = getAllTrees();

  return (
    <DocsProvider>
      <Header
        algoliaApiKey={process.env.NEXT_PUBLIC_ALGOLIA_API_KEY as string}
        githubCount={githubCount}
        subMenu={<Submenu listOfTrees={listofTrees} />}
      />
      <Image
        alt="Storybook Docs"
        className="absolute left-0 top-0 -z-10 w-full"
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
