'use client';

import { CheckIcon, CopyIcon } from '@storybook/icons';
import { type FC, useState } from 'react';
import copy from 'copy-to-clipboard';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@repo/utils';
import { useAnalytics } from '../lib/analytics';

const PROMPT_TEXT =
  'Install Storybook in this project with `npx storybook@latest init` and follow its instructions';

interface CopyPromptButtonProps {
  className?: string;
  variant?: 'dark' | 'light';
}

export const CopyPromptButton: FC<CopyPromptButtonProps> = ({
  className,
  variant = 'dark',
}) => {
  const [copied, setCopied] = useState(false);
  const track = useAnalytics();

  const onClick = () => {
    copy(PROMPT_TEXT);
    setCopied(true);
    track('CopyPromptClick', {
      prompt: PROMPT_TEXT,
    });
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <button
      className={cn(
        'text-sm relative flex h-10 items-center gap-2 overflow-hidden rounded-full px-4 font-medium transition-colors',
        variant === 'dark' &&
          'border border-white/30 text-white hover:border-white/60',
        variant === 'light' &&
          'border border-zinc-300 text-zinc-700 hover:border-zinc-400 dark:border-zinc-600 dark:text-zinc-300 dark:hover:border-zinc-500',
        className,
      )}
      onClick={onClick}
      title="Copy AI prompt to install Storybook"
      type="button"
    >
      <CopyIcon className="h-3.5 w-3.5 shrink-0" />
      <span className="truncate">Copy AI prompt</span>
      <AnimatePresence>
        {copied ? (
          <motion.div
            animate={{ opacity: 1 }}
            className={cn(
              'absolute left-0 top-0 flex h-full w-full items-center justify-center gap-2 text-sm font-medium',
              variant === 'dark' && 'bg-white text-black',
              variant === 'light' &&
                'bg-blue-500 text-white dark:bg-blue-600',
            )}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
          >
            <CheckIcon className="h-3.5 w-3.5" /> Copied!
          </motion.div>
        ) : null}
      </AnimatePresence>
    </button>
  );
};
