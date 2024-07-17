'use client';

import type { FC } from 'react';
import { DocSearch } from '@docsearch/react';
import { cn, getVersion } from '@repo/utils';
import { useSelectedLayoutSegment } from 'next/navigation';
import type { HeaderProps } from '../header';
import { globalSearchAgnostic } from '../constants';

interface SearchProps extends Pick<HeaderProps, 'algoliaApiKey' | 'variant'> {
  className?: string;
  isMobile?: boolean;
}

const algoliaDocSearchConfig = {
  appId: '6L6UWBTLCK',
  indexName: 'storybook-js',
};

export const Search: FC<SearchProps> = ({
  algoliaApiKey,
  className,
  isMobile = false,
  variant = 'system',
}) => {
  const label = 'Search docs';
  const segment = useSelectedLayoutSegment();
  const slug: string[] = segment ? segment.split('/') : [];
  const activeVersion = getVersion(slug);

  return (
    <div
      className={cn(
        '[&_.DocSearch-Button]:ui-bg-transparent',
        '[&_.DocSearch-Button]:max-[440px]:ui-bg-slate-100',
        '[&_.DocSearch-Button]:max-[440px]:ui-w-full',
        '[&_.DocSearch-Button]:ui-rounded-full',
        '[&_.DocSearch-Button]:ui-h-8',
        '[&_.DocSearch-Button]:ui-px-3',
        '[&_.DocSearch-Button]:ui-m-0',
        '[&_.DocSearch-Button_.DocSearch-Search-Icon]:ui-w-[14px]',
        '[&_.DocSearch-Button_.DocSearch-Search-Icon]:ui-h-[14px]',
        '[&_.DocSearch-Button-Placeholder]:ui-text-sm',
        'max-[768px]:[&_.DocSearch-Button-Placeholder]:ui-flex',
        '[&_.DocSearch-Button-Keys]:ui-bg-red-500',
        '[&_.DocSearch-Button-Keys]:ui-min-w-0',
        '[&_.DocSearch-Button-Keys]:ui-flex',
        '[&_.DocSearch-Button-Keys]:ui-items-center',
        '[&_.DocSearch-Button-Keys]:ui-gap-1',
        '[&_.DocSearch-Button-Keys]:ui-px-1.5',
        '[&_.DocSearch-Button-Keys]:ui-rounded-sm',
        '[&_.DocSearch-Button-Key]:ui-mr-0',
        '[&_.DocSearch-Button-Key]:ui-bg-none',
        '[&_.DocSearch-Button-Key]:ui-rounded-none',
        '[&_.DocSearch-Button-Key]:ui-shadow-none',
        '[&_.DocSearch-Button-Key]:ui-top-0',
        '[&_.DocSearch-Button-Key]:ui-p-0',
        '[&_.DocSearch-Button-Key]:ui-w-auto',
        '[&_.DocSearch-Button-Key]:ui-text-[11px]',
        variant === 'home' &&
          !isMobile &&
          '[&_.DocSearch-Button]:ui-border [&_.DocSearch-Button]:ui-border-solid [&_.DocSearch-Button]:ui-border-white/30 [&_.DocSearch-Button]:ui-text-white [&_.DocSearch-Button_.DocSearch-Search-Icon]:ui-text-white',
        variant === 'system' &&
          !isMobile &&
          '[&_.DocSearch-Button]:ui-border [&_.DocSearch-Button]:ui-border-solid [&_.DocSearch-Button]:ui-border-zinc-200 [&_.DocSearch-Button]:dark:ui-border-slate-700 [&_.DocSearch-Button]:ui-text-zinc-500 [&_.DocSearch-Button]:dark:ui-text-white [&_.DocSearch-Button_.DocSearch-Search-Icon]:ui-text-zinc-500 [&_.DocSearch-Button]:dark:[&_.DocSearch-Button_.DocSearch-Search-Icon]:ui-text-white',
        isMobile &&
          '[&_.DocSearch-Button]:ui-bg-slate-100 [&_.DocSearch-Button]:dark:ui-bg-slate-800 [&_.DocSearch-Button]:ui-px-4 [&_.DocSearch-Button]:ui-mb-3',
        !isMobile &&
          '[&_.DocSearch-Button]:ui-px-3 [&_.DocSearch-Button]:ui-w-44',
        variant === 'home' &&
          '[&_.DocSearch-Button-Keys]:ui-bg-white/10 [&_.DocSearch-Button-Key]:ui-text-white',
        variant !== 'home' &&
          '[&_.DocSearch-Button-Keys]:ui-bg-zinc-100 [&_.DocSearch-Button-Keys]:dark:ui-bg-slate-800 [&_.DocSearch-Button-Key]:dark:ui-text-zinc-400',
        className,
      )}
      style={{
        // TODO: These are the defaults: replace with our values
        // @ts-expect-error - TS doesn't like the custom properties
        '--docsearch-primary-color': '#5468ff',
        '--docsearch-text-color': '#1c1e21',
        '--docsearch-spacing': '12px',
        '--docsearch-icon-stroke-width': '1.4',
        '--docsearch-highlight-color': 'var(--docsearch-primary-color)',
        '--docsearch-muted-color': '#969faf',
        '--docsearch-container-background': 'rgba(101,108,133,0.8)',
        '--docsearch-logo-color': '#5468ff',
        '--docsearch-modal-width': '560px',
        '--docsearch-modal-height': '600px',
        '--docsearch-modal-background': '#f5f6f7',
        '--docsearch-modal-shadow':
          'inset 1px 1px 0 0 hsla(0,0%,100%,0.5),0 3px 8px 0 #555a64',
        '--docsearch-hit-height': '56px',
        '--docsearch-hit-color': '#444950',
        '--docsearch-hit-active-color': '#fff',
        '--docsearch-hit-background': '#fff',
        '--docsearch-hit-shadow': '0 1px 3px 0 #d4d9e1',
        '--docsearch-key-gradient': 'linear-gradient(-225deg,#d5dbe4,#f8f8f8)',
        '--docsearch-key-shadow':
          'inset 0 -2px 0 0 #cdcde6,inset 0 0 1px 1px #fff,0 1px 2px 1px rgba(30,35,90,0.4)',
        '--docsearch-key-pressed-shadow':
          'inset 0 -2px 0 0 #cdcde6,inset 0 0 1px 1px #fff,0 1px 1px 0 rgba(30,35,90,0.4)',
        '--docsearch-footer-height': '44px',
        '--docsearch-footer-background': '#fff',
        '--docsearch-footer-shadow':
          '0 -1px 0 0 #e0e3e8,0 -3px 6px 0 rgba(69,98,155,0.12)',
      }}
    >
      <DocSearch
        apiKey={algoliaApiKey}
        {...algoliaDocSearchConfig}
        placeholder={label}
        searchParameters={{
          facetFilters: [
            /*
             * Used to allow recipes to come through global search
             * along with docs. Values inside an array act as an OR
             * between the containing values
             */
            [`tags:docs`, `tags:recipes`],
            [`version:${activeVersion.id}`, `version:${globalSearchAgnostic}`],
          ],
        }}
        translations={{
          button: {
            buttonAriaLabel: label,
            buttonText: label,
          },
        }}
      />
    </div>
  );
};
