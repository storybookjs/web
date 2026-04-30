'use client';

import { CheckIcon, CopyIcon } from '@storybook/icons';
import { renderToStaticMarkup } from 'react-dom/server';
import type { FC, ReactNode } from 'react';
import { useState } from 'react';
import copy from 'copy-to-clipboard';
import { decode } from 'he';
import { cn } from '../cn';
import { Button } from '../button';

export const Copy: FC<{
  content: ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'new-users';
}> = ({ content, onClick, variant = 'default' }) => {
  const [state, setState] = useState<'idle' | 'copied'>('idle');

  const wrappedOnClick = (): void => {
    const textToConvertIntoString = renderToStaticMarkup(content);
    const decodedText = decode(textToConvertIntoString);
    copy(decodedText);
    setState('copied');
    onClick?.();
    setTimeout(() => {
      setState('idle');
    }, 1000);
  };

  return (
    <Button
      variant={variant === 'new-users' ? 'solid' : 'ghost'}
      size="md"
      className={cn(
        'ui-gap-1',
        variant === 'default' &&
          'ui-text-slate-600 hover:ui-bg-slate-200 hover:ui-text-slate-900 dark:ui-text-slate-400 dark:hover:ui-bg-slate-800 dark:hover:ui-text-slate-400',
        variant === 'new-users' &&
          'ui-min-w-[10ch] ui-bg-zinc-700 hover:ui-bg-zinc-900 dark:ui-bg-slate-100 dark:hover:ui-bg-white dark:ui-text-slate-900 dark:hover:ui-text-black',
      )}
      onClick={wrappedOnClick}
      type="button"
      aria-label="Copy"
    >
      {variant === 'default' &&
        (state === 'idle' ? <CopyIcon /> : <CheckIcon />)}
      {variant === 'new-users' &&
        (state === 'idle' ? (
          <>
            <CopyIcon /> Copy
          </>
        ) : (
          <>
            <CheckIcon /> Copied
          </>
        ))}
    </Button>
  );
};
