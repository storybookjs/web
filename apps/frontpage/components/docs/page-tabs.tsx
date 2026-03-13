import { cn } from '@repo/utils';
import type { PageDataProps } from '../../lib/get-page';
import { A } from './mdx/a';

type PageTabsProps = Pick<PageDataProps, 'tabs' | 'path' | 'isIndexPage'>;

export const PageTabs = ({ tabs, path, isIndexPage }: PageTabsProps) => {
  return (
    <div className="mb-8 flex items-center gap-8 border-b border-zinc-200">
      {tabs.map((tab) => {
        const tabTitle = tab.tab?.title ?? tab.title;
        const isActive = tab.pathSegment === path;
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

        // Convert the path and tab's pathSegment to a pagePath and href for the A component

        const pagePath = path
          .replace('content/docs/', '')
          .replace(/\.mdx$/, '')
          .replace(/\/index$/, '')
          .split('/');

        const href = tab.pathSegment.endsWith('index.mdx')
          ? './'
          : `./${tab.pathSegment.split('/').at(-1)!}`;

        return (
          <A
            className={className}
            href={href}
            isIndexPage={isIndexPage}
            pagePath={pagePath}
            key={tab.name}
          >
            {tabTitle}
          </A>
        );
      })}
    </div>
  );
};
