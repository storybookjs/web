import { cn } from '@repo/utils';
import { SearchIcon } from '@storybook/icons';
import type { FC } from 'react';
import type { HeaderProps } from '.';

export const Search: FC<HeaderProps> = ({ variant }) => {
  return (
    <button
      className={cn(
        'ui-w-44 ui-h-8 ui-rounded-full ui-text-sm ui-flex ui-items-center ui-justify-between ui-px-3 max-[440px]:ui-hidden',
        variant === 'home' && 'ui-border ui-border-white/30 ui-text-white',
        variant === 'system' &&
          'ui-border ui-border-zinc-200 dark:ui-border-zinc-700 ui-text-zinc-500 dark:ui-text-white',
      )}
      type="button"
    >
      <div className="ui-flex ui-items-center ui-gap-1.5">
        <SearchIcon className="ui-w-3 ui-h-3" />
        Search docs
      </div>
      <div
        className={cn(
          'ui-text-[11px] ui-px-1.5 ui-rounded',
          variant === 'home' && 'ui-bg-white/10 ui-text-white',
          variant !== 'home' &&
            'ui-bg-zinc-100 dark:ui-bg-zinc-800 dark:ui-text-zinc-400',
        )}
      >
        ⌘K
      </div>
    </button>
  );
};
