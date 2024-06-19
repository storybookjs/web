import type { Metadata } from 'next';
import { Header, Footer, Container } from '@repo/ui';
import Image from 'next/image';
import { fetchGithubCount, latestVersion } from '@repo/utils';
import { Sidebar } from '../../../components/docs/sidebar/sidebar';
import { TableOfContent } from '../../../components/docs/table-of-content';
import { NavDocs } from '../../../components/docs/sidebar/docs-nav';
import { generateDocsTree } from '../../../lib/get-tree';
import { DocsProvider } from '../provider';
import { getVersion } from '../../../lib/get-version';
import { getPageData } from '../../../lib/get-page';
import { Submenu } from '../../../components/docs/submenu';

export const metadata: Metadata = {
  title: 'Storybook',
  description:
    "Storybook is a frontend workshop for building UI components and pages in isolation. Thousands of teams use it for UI development, testing, and documentation. It's open source and free.",
};

export default async function Layout({
  children,
  params: { slug },
}: {
  children: React.ReactNode;
  params: { slug: string[] };
}) {
  const { number: githubCount } = await fetchGithubCount();
  const activeVersion = getVersion(slug);
  const path = `content/docs/${activeVersion.id}`;
  const tree = generateDocsTree(path);
  const isLatest = activeVersion.id === latestVersion.id;
  const slugToFetch = slug ? [...slug] : [];
  if (!isLatest) slugToFetch.shift();
  slugToFetch.unshift(activeVersion.id);

  const page = await getPageData(slugToFetch, activeVersion);

  return (
    <DocsProvider>
      <Header
        githubCount={githubCount}
        subMenu={<Submenu activeVersion={activeVersion} tree={tree} />}
        variant="system"
      />
      <Image
        alt="Storybook Docs"
        className="absolute left-0 top-0 -z-10 w-full"
        height={339}
        priority
        src="/bubbles.png"
        width={1800}
      />
      <Container asChild className="flex gap-4 md:pl-5 lg:gap-12 lg:pr-8">
        <main>
          <Sidebar>
            <NavDocs activeVersion={activeVersion} tree={tree} />
          </Sidebar>
          {children}
          <TableOfContent />
        </main>
      </Container>
      <Footer />
    </DocsProvider>
  );
}
