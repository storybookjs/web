import { cn } from '@repo/utils';
import { SearchIcon } from '@storybook/icons';
import type { FC } from 'react';

interface SearchProps {
  variant?: 'home' | 'system';
  className?: string;
  isMobile?: boolean;
}

export const Search: FC<SearchProps> = ({
  variant,
  className,
  isMobile = false,
}) => {
  return (
    <button
      className={cn(
        'ui-h-8 ui-rounded-full ui-text-sm ui-flex ui-items-center ui-justify-between w-full',
        variant === 'home' &&
          !isMobile &&
          'ui-border ui-border-white/30 ui-text-white',
        variant === 'system' &&
          !isMobile &&
          'ui-border ui-border-zinc-200 dark:ui-border-slate-700 ui-text-zinc-500 dark:ui-text-white',
        isMobile && 'ui-bg-slate-100 dark:ui-bg-slate-800 ui-px-4 ui-mb-3',
        !isMobile && 'ui-px-3 ui-w-44',
        className,
      )}
      type="button"
    >
      <div className="ui-flex ui-items-center ui-gap-1.5">
        <SearchIcon className="ui-w-3 ui-h-3" />
        Search docs
      </div>
      {!isMobile && (
        <div
          className={cn(
            'ui-text-[11px] ui-px-1.5 ui-rounded',
            variant === 'home' && 'ui-bg-white/10 ui-text-white',
            variant !== 'home' &&
              'ui-bg-zinc-100 dark:ui-bg-slate-800 dark:ui-text-zinc-400',
          )}
        >
          ⌘K
        </div>
      )}
    </button>
  );
};
