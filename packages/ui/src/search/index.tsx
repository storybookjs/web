'use client';

import { cn } from '@repo/utils';
import type { FC } from 'react';
import { DocSearch } from '@docsearch/react';
import type { HeaderProps } from '../header';
import { GLOBAL_SEARCH_AGNOSTIC } from '../constants';

interface SearchProps
  extends Pick<HeaderProps, 'algoliaApiKey' | 'variant' | 'version'> {
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
  version,
}) => {
  const label = 'Search docs';

  return (
    <div
      className={className}
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
        '--docsearch-searchbox-height': '56px',
        '--docsearch-searchbox-background': '#ebedf0',
        '--docsearch-searchbox-focus-background': '#fff',
        '--docsearch-searchbox-shadow':
          'inset 0 0 0 2px var(--docsearch-primary-color)',
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
          // prettier-ignore
          facetFilters: [
            /*
             * Used to allow recipes to come through global search
             * along with docs. Values inside an array act as an OR
             * between the containing values
             */
            [`tags:docs`, `tags:recipes`],
            [`version:${version}`, `version:${GLOBAL_SEARCH_AGNOSTIC}`],
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
