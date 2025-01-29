import { type FC } from 'react';
import Link from 'next/link';
import { cn } from '@repo/utils';
import { type PageDataProps } from '../../lib/get-page';
import { Renderers } from './renderers';
import { DocsFooter } from './footer/footer';
import { TableOfContent } from './table-of-content';

export const Content: FC<{ page: PageDataProps }> = ({ page }) => {
  return (
    <>
      <div className="w-full min-w-0 flex-1 py-12">
        <main className="mx-auto max-w-[720px]">
          <h1
            className="relative mb-6 mt-0 text-4xl font-bold text-black transition-colors duration-200 group-hover:text-blue-500 dark:text-white"
            data-docs-heading
          >
            {page.title ?? 'Title is missing'}
          </h1>
          {!page.hideRendererSelector && <Renderers />}
          {page.tabs && page.tabs.length > 0 ? (
            <div className="mb-8 flex items-center gap-8 border-b border-zinc-200">
              {page.tabs.map((tab) => {
                const tabTitle = tab.tab?.title ?? tab.title;
                const isActive = tab.pathSegment === page.path;
                const className = cn(
                  '-mb-px border-b px-2 pb-2 text-sm capitalize transition-colors hover:text-blue-500',
                  isActive && 'border-b border-blue-500 text-blue-500',
                );

                if (isActive) {
                  return (
                    <span className={className} key={tab.name}>
                      {tabTitle}
                    </span>
                  );
                }

                const relevantPathSegments = (
                  tab.name === 'index.mdx'
                    ? tab.pathSegment.split('/').slice(-2, -1)
                    : tab.pathSegment.split('/').slice(-2)
                )
                  .join('/')
                  .replace('.mdx', '');
                const href = page.isIndexPage
                  ? `./${relevantPathSegments}`
                  : `../${relevantPathSegments}`;

                return (
                  <Link
                    className={className}
                    href={href}
                    key={tab.name}
                  >
                    {tabTitle}
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
      <TableOfContent />
    </>
  );
};
