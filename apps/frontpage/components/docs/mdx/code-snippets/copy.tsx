'use client';

import { CheckIcon, CopyIcon } from '@storybook/icons';
import { renderToStaticMarkup } from 'react-dom/server';
import type { ReactNode } from 'react';
import { useState } from 'react';
import copy from 'copy-to-clipboard';
import { decode } from 'he';

export const Copy = ({ content }: { content: ReactNode }) => {
  const [state, setState] = useState<'idle' | 'copied'>('idle');

  const onClick = () => {
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
      className="flex h-8 select-none items-center justify-between gap-1 rounded px-2 text-sm text-slate-600 transition-all hover:border-zinc-300 hover:bg-slate-200 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800"
      onClick={onClick}
      type="button"
    >
      {state === 'idle' ? <CopyIcon /> : <CheckIcon />}
    </button>
  );
};
