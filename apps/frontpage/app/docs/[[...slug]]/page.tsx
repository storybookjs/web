import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { globalSearchMetaKeys, globalSearchImportance } from '@repo/ui';
import { latestVersion, cn, docsVersions } from '@repo/utils';
import { getVersion } from '../../../lib/get-version';
import { getPageData } from '../../../lib/get-page';
import { Renderers } from '../../../components/docs/renderers';
import { DocsFooter } from '../../../components/docs/footer/footer';
import { Metadata } from 'next';
import { TableOfContent } from '../../../components/docs/table-of-content';
import { getAllTrees } from '../../../lib/get-all-trees';
import {
  FlatTreeNode,
  getFlatTreeSitemap,
} from '../../../lib/get-flat-tree-sitemap';

interface PageProps {
  params: {
    slug?: string[];
  };
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
      [globalSearchMetaKeys.version]: activeVersion.id,
      [globalSearchMetaKeys.importance]: globalSearchImportance.docs,
    },
  };
}

export const generateStaticParams = () => {
  const listofTrees = getAllTrees();

  const flatTree: FlatTreeNode[] = [];
  listofTrees.forEach((list) => {
    const newTree = list.children ? getFlatTreeSitemap(list.children) : [];
    const treeWithVersion = newTree.map((node) => {
      node.version = docsVersions.find((version) => version.id === list.name);
      return node;
    });

    flatTree.push(...treeWithVersion);
  });

  const listOfSlugs: { slug: string[] }[] = flatTree.map((node) => ({
    slug: node.slug.replace('/docs/', '').split('/'),
  }));

  return listOfSlugs;
};

export default async function Page({ params: { slug } }: PageProps) {
  const activeVersion = getVersion(slug);
  const isLatest = activeVersion.id === latestVersion.id;
  const slugToFetch = slug ? [...slug] : [];
  if (!isLatest) slugToFetch.shift();
  slugToFetch.unshift(activeVersion.id);

  const page = await getPageData(slugToFetch, activeVersion);

  const isIndex = slug && slug[slug.length - 1] === 'index';
  const pathWithoutIndex = `/docs/${slug?.slice(0, -1).join('/')}`;

  // If the page is an index page, redirect to the parent page
  if (isIndex) redirect(pathWithoutIndex);

  if (!page) notFound();

  return (
    <>
      <div className="w-full min-w-0 flex-1 py-12">
        <main className="mx-auto max-w-[720px]">
          {!isLatest && (
            <div className="mb-8 flex flex-col items-start gap-4 rounded-md bg-red-200 p-4 text-sm text-red-900 md:flex-row md:items-center md:justify-between md:gap-6 md:py-3 md:pl-5 md:pr-3">
              You are viewing documentation for a previous version of Storybook
              <Link
                href="/docs"
                className="shadow-b-red-300 relative flex h-8 flex-shrink-0 items-center justify-center rounded-md bg-white px-3 text-sm text-black transition-transform hover:-translate-y-0.5"
              >
                Switch to latest version
              </Link>
            </div>
          )}
          <h1
            className="relative mb-6 mt-0 text-4xl font-bold text-black transition-colors duration-200 group-hover:text-blue-500 dark:text-white"
            data-docs-heading
          >
            {page.title || 'Title is missing'}
          </h1>
          {!page.hideRendererSelector && <Renderers />}
          {/* TODO: Bring back tabs */}
          {/* {page.tabs && page.tabs.length > 0 ? (
            <div className="flex items-center gap-8 border-b border-zinc-200">
              {page.tabs.map((tab) => {
                const isActive = tab.slug === `/docs/${slug?.join('/')}`;

                return (
                  <Link
                    className={cn(
                      '-mb-px border-b px-2 pb-2 text-sm capitalize transition-colors hover:text-blue-500',
                      isActive && 'border-b border-blue-500 text-blue-500',
                    )}
                    href={tab.slug}
                    key={tab.name}
                  >
                    {tab.tab?.title || tab.title}
                  </Link>
                );
              })}
            </div>
          ) : null} */}
          <div
            className={cn(
              '[&>details]:my-6',
              '[&>details]:relative',
              '[&>details[open]>summary]:mb-4',
              "[&>details[open]]:before:content-['']",
              '[&>details[open]]:before:absolute',
              '[&>details[open]]:before:border-l',
              '[&>details[open]]:before:border-l-zinc-200',
              '[&>details[open]]:before:left-1',
              '[&>details[open]]:before:top-[calc(28px+1em)]',
              '[&>details[open]]:before:h-[calc(100%-2.4rem)]',
              '[&>details[open]>*]:ml-7',
              '[&>details[open]>summary]:ml-0',
              '[&>details>summary]:text-blue-600',
              '[&>details>summary]:cursor-pointer',
              '[&>details>summary>h3]:inline',
              '[&>details>summary>h3]:text-xl',
              '[&>code]:text-sm',
            )}
          >
            {page.content}
          </div>
          <DocsFooter isIndexPage={page.isIndexPage} />
        </main>
      </div>
      <TableOfContent />
    </>
  );
}
