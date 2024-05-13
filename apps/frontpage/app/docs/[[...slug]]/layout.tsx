import type { Metadata } from 'next';
import { Header, Footer, Container } from '@repo/ui';
import Image from 'next/image';
import { fetchGithubCount } from '@repo/utils';
import { Sidebar } from '../../../components/docs/sidebar/sidebar';
import { TableOfContent } from '../../../components/docs/table-of-content';
import { NavDocs } from '../../../components/docs/sidebar/nav-docs';
import { generateDocsTree } from '../../../lib/get-tree';
import { DocsProvider } from '../provider';
import { getVersion } from '../../../lib/get-version';
import { slugHasVersion } from '../../../lib/slug-has-version';
import { getPageData } from '../../../lib/get-page';

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
  const hasVersion = slugHasVersion(slug);
  const newSlug = slug ? [...slug] : [];
  if (!hasVersion) newSlug.unshift(activeVersion.id);

  const page = await getPageData(newSlug, activeVersion);

  return (
    <DocsProvider>
      <Header
        activeVersion={activeVersion}
        githubCount={githubCount}
        tree={tree}
        variant="system"
      />
      <Image
        alt="Storybook Docs"
        className="absolute top-0 left-0 w-full -z-10"
        height={339}
        src="/bubbles.png"
        width={1800}
      />
      <Container asChild className="md:pl-5 lg:pr-8 flex gap-4 lg:gap-12">
        <main>
          <Sidebar>
            <NavDocs activeVersion={activeVersion} tree={tree} />
          </Sidebar>
          {children}
          <TableOfContent headings={page?.headings} />
        </main>
      </Container>
      <Footer />
    </DocsProvider>
  );
}
