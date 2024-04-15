import type { Metadata } from 'next';
import { Header, Footer } from '@ui';
import Image from 'next/image';
import { Sidebar } from '../../../components/docs/sidebar/sidebar';
import { TableOfContent } from '../../../components/docs/table-of-content';
import { cn, container, fetchGithubCount } from '@utils';
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
  const githubCount = await fetchGithubCount();
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
        variant="system"
        tree={tree}
        activeVersion={activeVersion}
        githubCount={githubCount}
      />
      <Image
        src="/bubbles.png"
        alt="Storybook Docs"
        width={1800}
        height={339}
        className="absolute top-0 left-0 w-full -z-10"
      />
      <main className={cn(container, 'md:pl-5 lg:pr-8 flex gap-4 lg:gap-12')}>
        <Sidebar>
          <NavDocs tree={tree} activeVersion={activeVersion} />
        </Sidebar>
        {children}
        <TableOfContent headings={page?.headings} />
      </main>
      <Footer />
    </DocsProvider>
  );
}
