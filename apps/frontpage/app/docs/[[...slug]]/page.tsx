import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { TreeProps } from '@repo/utils';
import { GLOBAL_SEARCH_META_KEYS, GLOBAL_SEARCH_IMPORTANCE } from '@repo/ui';
import { latestVersion, cn } from '@repo/utils';
import { getVersion } from '../../../lib/get-version';
import { getPageData } from '../../../lib/get-page';
import { Renderers } from '../../../components/docs/renderers';
import { generateDocsTree } from '../../../lib/get-tree';
import { DocsFooter } from '../../../components/docs/footer/footer';
import { Metadata } from 'next';

interface PageProps {
  params: {
    slug: string[];
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
      [GLOBAL_SEARCH_META_KEYS.VERSION]: activeVersion.id,
      [GLOBAL_SEARCH_META_KEYS.IMPORTANCE]: GLOBAL_SEARCH_IMPORTANCE.DOCS,
    },
  };
}

const latestVersionId = latestVersion.id;

export const generateStaticParams = () => {
  const result: { slug: string[] }[] = [];
  const tree = generateDocsTree();

  const getSlugs = (data: TreeProps[]) => {
    data.forEach((item) => {
      if ('slug' in item) {
        const newSlug = item.slug.replace('/docs/', '').split('/');
        const { id: versionId, inSlug: versionInSlug } = getVersion(newSlug);

        const isLatest = versionId === latestVersionId;

        if (isLatest) {
          // Remove the version
          newSlug.shift();
        } else if (versionInSlug) {
          newSlug[0] = versionInSlug;
        }
        result.push({
          slug: newSlug,
        });
      }
      if (item.children) {
        getSlugs(item.children);
      }
    });
  };
  getSlugs(tree);

  return result;
};

export default async function Page({ params: { slug } }: PageProps) {
  const activeVersion = getVersion(slug);
  const isLatest = activeVersion.id === latestVersion.id;
  const slugToFetch = slug ? [...slug] : [];
  if (!isLatest) slugToFetch.shift();
  slugToFetch.unshift(activeVersion.id);

  const page = await getPageData(slugToFetch, activeVersion);

  if (!page) notFound();

  return (
    <div className="flex-1 w-full min-w-0 py-12">
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
          className="relative mt-0 mb-6 text-4xl font-bold text-black transition-colors duration-200 group-hover:text-blue-500 dark:text-white"
          data-docs-heading
        >
          {page.title || 'Title is missing'}
        </h1>
        {!page.hideRendererSelector && <Renderers />}
        {page.tabs && page.tabs.length > 0 ? (
          <div className="flex items-center gap-8 border-b border-zinc-200">
            {page.tabs.map((tab) => {
              const isActive = tab.slug === `/docs/${slug.join('/')}`;

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
        ) : null}
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
  );
}
