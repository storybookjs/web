'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { cn } from '@repo/utils';
import { Form } from './form';

export type ReactionsProps = null | 'up' | 'down';
const githubDocsBaseUrl = 'https://github.com/storybookjs/storybook/tree/next';

interface FooterProps {
  isIndexPage: boolean;
}

export const DocsFooter = ({ isIndexPage }: FooterProps) => {
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
    <div className="flex flex-wrap justify-between gap-4 pt-12 pb-6 page-footer">
      <motion.div
        initial={{ width: 'auto', height: 48, borderRadius: 24 }}
        animate={{
          width: reaction ? 340 : 'auto',
          height: reaction ? 202 : 48,
          borderRadius: reaction ? 4 : 24,
        }}
        transition={{ duration, ease }}
        className="flex flex-col overflow-hidden border rounded-3xl border-zinc-200"
      >
        <div className="flex items-center flex-shrink-0 h-12 gap-2 pl-5 pr-3 text-sm">
          Was this page useful?
          <div className="flex items-center gap-1">
            <button
              type="button"
              className={cn(
                'h-8 w-8 rounded-full hover:bg-blue-100',
                reaction === 'up' && 'bg-blue-100',
              )}
              onClick={() => {
                selectReaction('up');
              }}
            >
              👍
            </button>
            <button
              type="button"
              className={cn(
                'h-8 w-8 rounded-full hover:bg-blue-100',
                reaction === 'down' && 'bg-blue-100',
              )}
              onClick={() => {
                selectReaction('down');
              }}
            >
              👎
            </button>
          </div>
        </div>
        <AnimatePresence>
          {reaction ? (
            <Form reaction={reaction} setReaction={setReaction} />
          ) : null}
        </AnimatePresence>
      </motion.div>
      <a
        href={`${githubDocsBaseUrl}${pathname}${isIndexPage ? '/index' : ''}.mdx`}
        target="_blank"
        className="flex items-center h-12 px-5 text-sm transition-all border rounded-full textsm border-zinc-200 hover:-translate-y-1 hover:border-zinc-400"
        rel="noopener"
      >
        ✍️ Edit on Github
      </a>
    </div>
  );
};
