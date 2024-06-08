'use client';

import { cn } from '@repo/utils';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Form } from './form';

export type ReactionsProps = null | 'positive' | 'negative';

export const DocsFooter = () => {
  const [reaction, setReaction] = useState<ReactionsProps>(null);

  const selectReaction = (r: 'positive' | 'negative') => {
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
        className="overflow-hidden rounded-3xl border border-zinc-200"
      >
        <div className="flex h-12 items-center gap-2 pl-5 pr-3 text-sm">
          Was this page useful?
          <div className="flex items-center gap-1">
            <button
              className={cn(
                'h-8 w-8 rounded-full hover:bg-blue-100',
                reaction === 'positive' && 'bg-blue-100',
              )}
              onClick={() => selectReaction('positive')}
            >
              👍
            </button>
            <button
              className={cn(
                'h-8 w-8 rounded-full hover:bg-blue-100',
                reaction === 'negative' && 'bg-blue-100',
              )}
              onClick={() => selectReaction('negative')}
            >
              👎
            </button>
          </div>
        </div>
        <AnimatePresence>
          {reaction && <Form reaction={reaction} setReaction={setReaction} />}
        </AnimatePresence>
      </motion.div>
      <button
        type="submit"
        className="textsm flex h-12 items-center rounded-full border border-zinc-200 px-5 text-sm transition-all hover:-translate-y-1 hover:border-zinc-400"
      >
        ✍️ Edit on Github
      </button>
    </div>
  );
};
