'use client';

import { CheckIcon, CopyIcon } from '@storybook/icons';
import { renderToStaticMarkup } from 'react-dom/server';
import type { FC, ReactNode } from 'react';
import { useState } from 'react';
import copy from 'copy-to-clipboard';
import { decode } from 'he';
import { cn } from '@repo/utils';

export const Copy: FC<{ content: ReactNode, variant?: "default" | "new-users" }> = ({ content, variant = "default" }) => {
  const [state, setState] = useState<'idle' | 'copied'>('idle');

  const onClick = (): void => {
    const textToConvertIntoString = renderToStaticMarkup(content);
    const decodedText = decode(textToConvertIntoString);
    copy(decodedText);
    setState('copied');
    setTimeout(() => {
      setState('idle');
    }, 1000);
  };

  return (
    <button
      className={cn(
        "ui-flex ui-h-8 ui-select-none ui-items-center ui-gap-1 ui-rounded ui-px-2 ui-text-sm ui-transition-all",
        variant === "default" && "ui-justify-between",
        variant === "default" && "ui-text-slate-600 hover:ui-bg-slate-200 hover:ui-text-slate-900",
        variant === "default" && "dark:ui-text-slate-400 dark:hover:ui-bg-slate-800 dark:hover:ui-text-slate-400",
        variant === "new-users" && "ui-min-w-[10ch] ui-justify-center ui-font-bold",
        variant === "new-users" && "ui-bg-zinc-700 hover:ui-bg-zinc-900 ui-text-white",
        variant === "new-users" && "dark:ui-bg-slate-100 dark:hover:ui-bg-white dark:ui-text-slate-900  dark:hover:ui-text-black",
      )}
      onClick={onClick}
      type="button"
      aria-label="Copy"
    >
      {variant === "default" && (state === 'idle' ? <CopyIcon /> : <CheckIcon />)}
      {variant === "new-users" && (state === 'idle' ? <><CopyIcon /> Copy</> : <><CheckIcon /> Copied</>)}
    </button>
  );
};
