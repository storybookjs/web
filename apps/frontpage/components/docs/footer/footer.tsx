'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

import { cn } from '@repo/utils';
import { Form } from './form';

export type ReactionsProps = null | 'up' | 'down';
const githubDocsBaseUrl = 'https://github.com/storybookjs/storybook/tree/next';

export const DocsFooter = () => {
  const [reaction, setReaction] = useState<ReactionsProps>(null);
  const pathname = usePathname();

  const selectReaction = (r: 'up' | 'down') => {
    if (reaction === null) setReaction(r);
    if (reaction === r) setReaction(null);
    if (reaction && reaction !== r) setReaction(r);
  };

  const duration = 0.2;
  const ease = 'easeInOut';

  useEffect(() => {
    if (reaction) {
      setTimeout(() => {
        document.getElementById('feedback')?.focus();
      }, duration * 1000);
    }
  }, [reaction]);

  return (
    <div className="flex flex-wrap justify-between gap-4 pb-6 pt-12">
      <motion.div
        initial={{ width: 'auto', height: 48, borderRadius: 24 }}
        animate={{
          width: reaction ? 340 : 'auto',
          height: reaction ? 202 : 48,
          borderRadius: reaction ? 4 : 24,
        }}
        transition={{ duration, ease }}
        className="flex flex-col overflow-hidden rounded-3xl border border-zinc-200"
      >
        <div className="flex flex-shrink-0 h-12 items-center gap-2 pl-5 pr-3 text-sm">
          Was this page useful?
          <div className="flex items-center gap-1">
            <button
              className={cn(
                'h-8 w-8 rounded-full hover:bg-blue-100',
                reaction === 'up' && 'bg-blue-100',
              )}
              onClick={() => selectReaction('up')}
            >
              👍
            </button>
            <button
              className={cn(
                'h-8 w-8 rounded-full hover:bg-blue-100',
                reaction === 'down' && 'bg-blue-100',
              )}
              onClick={() => selectReaction('down')}
            >
              👎
            </button>
          </div>
        </div>
        <AnimatePresence>
          {reaction && <Form reaction={reaction} setReaction={setReaction} />}
        </AnimatePresence>
      </motion.div>
      <a
        href={`${githubDocsBaseUrl}${pathname}.mdx`}
        target="_blank"
        className="textsm flex h-12 items-center rounded-full border border-zinc-200 px-5 text-sm transition-all hover:-translate-y-1 hover:border-zinc-400"
      >
        ✍️ Edit on Github
      </a>
    </div>
  );
};
