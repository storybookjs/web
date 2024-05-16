'use client';

import { CheckIcon, CopyIcon } from '@storybook/icons';
import { renderToStaticMarkup } from 'react-dom/server';
import type { ReactNode } from 'react';
import { useState } from 'react';
import copy from 'copy-to-clipboard';

export const Copy = ({ content }: { content: ReactNode }) => {
  const [state, setState] = useState<'idle' | 'copied'>('idle');

  const onClick = () => {
    const textToConvertIntoString = renderToStaticMarkup(content);
    copy(textToConvertIntoString, {
      debug: true,
      // format: 'text/html',
    });
    setState('copied');
    setTimeout(() => {
      setState('idle');
    }, 1000);
  };

  return (
    <button
      className="h-8 gap-1 px-2 flex items-center justify-between text-sm text-zinc-600 hover:text-zinc-900 hover:border-zinc-300 transition-all select-none hover:bg-slate-200 rounded"
      onClick={onClick}
      type="button"
    >
      {state === 'idle' ? <CopyIcon /> : <CheckIcon />}
    </button>
  );
};
