import { Header, Footer, Container } from '@repo/ui';
import Image from 'next/image';
import { fetchGithubCount } from '@repo/utils';
import { Sidebar } from '../../components/docs/sidebar/sidebar';
import { TableOfContent } from '../../components/docs/table-of-content';
import { NavDocs } from '../../components/docs/sidebar/docs-nav';
import { generateDocsTree } from '../../lib/get-tree';
import { DocsProvider } from './provider';
import { Submenu } from '../../components/docs/submenu';
import { DocsMainNav } from '../../components/docs/sidebar/docs-main-nav';
import { docsVersions } from '@repo/utils';
import { ReactNode } from 'react';
import { TOCSectionTitles } from '../../components/docs/toc-section-titles';

export default async function Layout({ children }: { children: ReactNode }) {
  const { number: githubCount } = await fetchGithubCount();

  const listofTrees = docsVersions.map((version) => {
    return {
      version: version.id,
      tree: generateDocsTree(`content/docs/${version.id}`),
    };
  });

  return (
    <DocsProvider>
      <Header
        algoliaApiKey={process.env.NEXT_PUBLIC_ALGOLIA_API_KEY as string}
        githubCount={githubCount}
        subMenu={<Submenu listOfTrees={listofTrees} />}
      />
      <Image
        alt="Storybook Docs"
        className="absolute top-0 left-0 w-full -z-10"
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
          <TableOfContent />
        </>
      </Container>
      <Footer />
    </DocsProvider>
  );
}
