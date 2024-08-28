'use client';

import { CheckIcon, CopyIcon } from '@storybook/icons';
import { renderToStaticMarkup } from 'react-dom/server';
import type { FC, ReactNode } from 'react';
import { useState } from 'react';
import copy from 'copy-to-clipboard';
import { decode } from 'he';

export const Copy: FC<{ content: ReactNode }> = ({ content }) => {
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
      className="ui-flex ui-h-8 ui-select-none ui-items-center ui-justify-between ui-gap-1 ui-rounded ui-px-2 ui-text-sm ui-text-slate-600 ui-transition-all hover:ui-border-zinc-300 hover:ui-bg-slate-200 hover:ui-text-slate-900 dark:ui-text-slate-400 dark:ui-hover:bg-slate-800"
      onClick={onClick}
      type="button"
      aria-label="Copy"
    >
      {state === 'idle' ? <CopyIcon /> : <CheckIcon />}
    </button>
  );
};
