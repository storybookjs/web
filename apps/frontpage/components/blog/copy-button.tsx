'use client';

import { cn } from '@repo/utils';
import { CopyIcon } from '@storybook/icons';
import copy from 'copy-to-clipboard';
import { useState } from 'react';

export default function CopyButton({ postUrl }: { postUrl: string }) {
  const [copied, setCopied] = useState(false);

  const onClick = () => {
    copy(postUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <button
      className={cn(
        'cursor-pointertransition-colors flex h-10 w-[140px] items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white/80 font-bold text-black backdrop-blur hover:border-blue-500 hover:text-blue-500',
        copied && 'border-blue-500 text-blue-500',
      )}
      onClick={onClick}
    >
      {copied ? (
        'Copied!'
      ) : (
        <>
          Copy link
          <CopyIcon />
        </>
      )}
    </button>
  );
}
