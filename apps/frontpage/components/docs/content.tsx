import { type FC } from 'react';
import { cn } from '@repo/utils';
import { type PageDataProps } from '../../lib/get-page';
import { Renderers } from './renderers';
import { DocsFooter } from './footer/footer';
import { PageTabs } from './page-tabs';
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
            <PageTabs {...page} />
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
