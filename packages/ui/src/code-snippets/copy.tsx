'use client';

import { CheckIcon, CopyIcon } from '@storybook/icons';
import { useState } from 'react';
import copy from 'copy-to-clipboard';

export const Copy = () => {
  const [state, setState] = useState<'idle' | 'copied'>('idle');

  const onClick = () => {
    copy('Text Boom!');
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
