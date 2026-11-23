import Link from 'next/link';
import { cn } from '@repo/utils';
import type { PageDataProps } from '../../lib/get-page';
import { getSlug } from '../../lib/get-slug';

type PageTabsProps = Pick<PageDataProps, 'tabs' | 'path'>;

export function PageTabs({ tabs, path }: PageTabsProps) {
  // Compare URLs, not file paths, so a directory tab matches its index page
  const currentSlug = getSlug(path);

  return (
    <div className="mb-8 flex items-center gap-8 border-b border-zinc-200">
      {tabs.map((tab) => {
        const tabTitle = tab.tab?.title ?? tab.title;
        // Each tab's file path includes its version, so its URL does too
        const href = getSlug(tab.pathSegment);
        const isActive = href === currentSlug;
        const className = cn(
          '-mb-px border-b px-2 pb-2 text-sm capitalize transition-colors hover:text-blue-500',
          isActive && 'border-b border-blue-500 text-blue-500',
        );

        if (isActive) {
          return (
            <span aria-current="page" className={className} key={tab.name}>
              {tabTitle}
            </span>
          );
        }

        return (
          <Link className={className} href={href} key={tab.name}>
            {tabTitle}
          </Link>
        );
      })}
    </div>
  );
}
