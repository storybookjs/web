import type { Metadata, ResolvingMetadata } from 'next';
import {
  Header,
  Footer,
  Container,
  GLOBAL_SEARCH_META_KEYS,
  GLOBAL_SEARCH_AGNOSTIC,
  GLOBAL_SEARCH_IMPORTANCE,
} from '@repo/ui';
import Image from 'next/image';
import { TreeProps, fetchGithubCount, latestVersion } from '@repo/utils';
import { Sidebar } from '../../../components/docs/sidebar/sidebar';
import { TableOfContent } from '../../../components/docs/table-of-content';
import { NavDocs } from '../../../components/docs/sidebar/docs-nav';
import { generateDocsTree } from '../../../lib/get-tree';
import { DocsProvider } from '../provider';
import { getVersion } from '../../../lib/get-version';
import { Submenu } from '../../../components/docs/submenu';

interface PageProps {
  children: React.ReactNode;
  params: { slug: string[] };
}

export async function generateMetadata({
  params: { slug },
}: PageProps): Promise<Metadata> {
  const activeVersion = getVersion(slug);

  return {
    title: 'Storybook',
    description:
      "Storybook is a frontend workshop for building UI components and pages in isolation. Thousands of teams use it for UI development, testing, and documentation. It's open source and free.",
    other: {
      [GLOBAL_SEARCH_META_KEYS.VERSION]: activeVersion.id,
      [GLOBAL_SEARCH_META_KEYS.IMPORTANCE]: GLOBAL_SEARCH_IMPORTANCE.DOCS,
    },
  };
}

function TOCSectionTitles({
  tree,
  slug,
}: {
  tree: TreeProps[];
  slug?: string[];
}) {
  function getTocSectionTitles() {
    const title: string[] = [];

    function buildTitle(items: TreeProps[], pathPartIndex: number) {
      const item = items.find(
        (item) =>
          item.name.replace('.mdx', '') === (slug as string[])[pathPartIndex],
      );
      if (item) {
        title.push(item.sidebar?.title || item.title);
        if (item.children) {
          buildTitle(item.children, pathPartIndex + 1);
        }
      }
    }

    if (slug) buildTitle(tree, 0);

    return title.join(' » ');
  }

  const tocSectionTitles = getTocSectionTitles();

  return tocSectionTitles ? (
    <span hidden id="toc-section-titles">{`Docs » ${tocSectionTitles}`}</span>
  ) : null;
}

export default async function Layout({
  children,
  params: { slug },
}: PageProps) {
  const { number: githubCount } = await fetchGithubCount();
  const activeVersion = getVersion(slug);
  const path = `content/docs/${activeVersion.id}`;
  const tree = generateDocsTree(path);
  const isLatest = activeVersion.id === latestVersion.id;
  const slugToFetch = slug ? [...slug] : [];
  if (!isLatest) slugToFetch.shift();
  slugToFetch.unshift(activeVersion.id);

  return (
    <DocsProvider>
      <Header
        algoliaApiKey={process.env.NEXT_PUBLIC_ALGOLIA_API_KEY as string}
        githubCount={githubCount}
        subMenu={<Submenu activeVersion={activeVersion} tree={tree} />}
        version={activeVersion.id}
      />
      <Image
        alt="Storybook Docs"
        className="absolute left-0 top-0 -z-10 w-full"
        height={339}
        priority
        src="/bubbles.png"
        width={1800}
      />
      <TOCSectionTitles tree={tree} slug={slug} />
      <Container className="flex gap-4 md:pl-5 lg:gap-12 lg:pr-8">
        <>
          <Sidebar>
            <NavDocs activeVersion={activeVersion} tree={tree} />
          </Sidebar>
          {children}
          <TableOfContent />
        </>
      </Container>
      <Footer />
    </DocsProvider>
  );
}
