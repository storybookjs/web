import type { FC } from 'react';
import { useState } from 'react';
import Link from 'next/link';
import copy from 'copy-to-clipboard';
import { AnimatePresence, motion } from 'framer-motion';
import {
  CheckIcon,
  ChevronSmallRightIcon,
  CopyIcon,
} from '@storybook/icons';
import { Container } from '@repo/ui';
import { useAnalytics } from '@repo/utils/analytics';

const command = 'npm create storybook@latest';

export const ClosingCta: FC = () => {
  const [copied, setCopied] = useState(false);
  const track = useAnalytics();

  const onCopy = () => {
    copy(command);
    setCopied(true);
    track('CodeSnippetCopy', {
      language: 'sh',
      snippetPath: 'create-command.md',
    });
    track('CreateCommandCopy', {
      language: 'sh',
      snippetPath: 'create-command.md',
    });
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <Container className="border-t border-zinc-600 pb-16 pt-16 text-center text-white sm:pb-20 sm:pt-24 md:pb-24 md:pt-32">
      <h2 className="mx-auto max-w-[760px] text-balance text-4xl font-bold md:text-[56px]/[70px]">
        Build UI you can trust, whoever writes the code
      </h2>
      <div className="mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-10">
        <button
          aria-live="polite"
          className="text-md relative flex h-12 items-center justify-center gap-3 overflow-hidden rounded-full bg-white px-6 font-bold text-black transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
          onClick={onCopy}
          type="button"
        >
          <code className="font-mono text-[15px]">{command}</code>
          <CopyIcon aria-hidden />
          <span className="sr-only">Copy install command</span>
          <AnimatePresence>
            {copied ? (
              <motion.span
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center gap-2 bg-white text-black"
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
              >
                <CheckIcon aria-hidden /> Copied!
              </motion.span>
            ) : null}
          </AnimatePresence>
        </button>
        <Link
          className="flex items-center gap-2 font-bold text-blue-500 underline-offset-4 hover:underline"
          href="/docs/ai"
        >
          Add agent skills
          <ChevronSmallRightIcon aria-hidden />
        </Link>
      </div>
    </Container>
  );
};
