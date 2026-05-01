'use client';

import { CheckIcon, CopyIcon } from '@storybook/icons';
import { useState } from 'react';
import copy from 'copy-to-clipboard';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@repo/utils';
import { useAnalytics } from '@repo/utils/analytics';

interface CommandButtonProps {
  command: string;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export function CommandButton({
  className = '',
  command,
  variant = 'primary',
}: CommandButtonProps) {
  const [copied, setCopied] = useState(false);
  const track = useAnalytics();

  const onClick = () => {
    copy(command);
    setCopied(true);
    track('CodeSnippetCopy', {
      language: 'sh',
      snippetPath: command,
    });
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <button
      className={cn(
        'text-md relative flex h-12 items-center justify-center gap-3 overflow-hidden rounded-full px-6 font-bold',
        variant === 'primary' && 'bg-blue-500 text-white',
        variant === 'secondary' && 'border border-zinc-500 text-white',
        className,
      )}
      onClick={onClick}
      type="button"
    >
      <span>{command}</span>
      <span className="hidden">Copy</span>
      <CopyIcon />
      <AnimatePresence>
        {copied ? (
          <motion.div
            animate={{ opacity: 1 }}
            className={cn(
              'absolute left-0 top-0 flex h-full w-full items-center justify-center gap-2',
              variant === 'primary' && 'bg-blue-500 text-white',
              variant === 'secondary' && 'bg-zinc-800 text-white',
            )}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
          >
            <CheckIcon /> Copied!
          </motion.div>
        ) : null}
      </AnimatePresence>
    </button>
  );
}
