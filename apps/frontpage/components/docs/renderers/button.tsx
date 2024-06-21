'use client';

import { cn } from '@repo/utils';
import type { ForwardedRef } from 'react';
import { forwardRef } from 'react';
import { ChevronSmallDownIcon } from '@storybook/icons';

interface ButtonProps {
  onClick?: () => void;
  children: string;
  active?: boolean;
  arrow?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { onClick, children = '', active = false, arrow = false, ...props },
    ref: ForwardedRef<HTMLButtonElement>,
  ) => {
    return (
      <button
        className={cn(
          'outline-offset-3 inline-flex h-7 items-center justify-center gap-1 rounded border border-zinc-300 px-2 text-sm text-zinc-800 outline-blue-500 transition-colors hover:border-blue-500 hover:text-blue-500 data-[state=open]:border-blue-500 data-[state=open]:text-blue-500',
          active &&
            'border-blue-500 text-blue-500 dark:border-blue-500 dark:text-blue-500',
          !active &&
            'dark:border-slate-700 dark:text-slate-500 dark:hover:border-slate-500',
        )}
        onClick={onClick}
        ref={ref}
        type="button"
        {...props}
      >
        {children}
        {arrow ? <ChevronSmallDownIcon /> : null}
      </button>
    );
  },
);

Button.displayName = 'Button';
