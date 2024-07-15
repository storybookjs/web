import { notFound } from 'next/navigation';
import { globalSearchMetaKeys, globalSearchImportance } from '@repo/ui';
import { latestVersion, cn } from '@repo/utils';
import { getPageData } from '../../lib/get-page';
import { Renderers } from '../../components/docs/renderers';
import { DocsFooter } from '../../components/docs/footer/footer';
import { Metadata } from 'next';
import { TableOfContent } from '../../components/docs/table-of-content';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Storybook',
    description:
      "Storybook is a frontend workshop for building UI components and pages in isolation. Thousands of teams use it for UI development, testing, and documentation. It's open source and free.",
    alternates: {
      canonical: '/docs',
    },
    other: {
      [globalSearchMetaKeys.version]: latestVersion.id,
      [globalSearchMetaKeys.importance]: globalSearchImportance.docs,
    },
  };
}

export default async function Page() {
  const page = await getPageData([latestVersion.id], latestVersion);

  if (!page) notFound();

  return (
    <>
      <div className="w-full min-w-0 flex-1 py-12">
        <main className="mx-auto max-w-[720px]">
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
