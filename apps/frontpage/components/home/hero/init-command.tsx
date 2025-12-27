import { CheckIcon, CopyIcon } from '@storybook/icons';
import type { FC } from 'react';
import { useState } from 'react';
import copy from 'copy-to-clipboard';
import { AnimatePresence, motion } from 'framer-motion';
import { useAnalytics } from '../../../lib/analytics';

export const InitCommand: FC = () => {
  const [state, setState] = useState(false);
  const track = useAnalytics();

  const onClick = () => {
    copy('npm create storybook@latest');
    setState(true);
    track('CodeSnippetCopy', {
      language: 'sh',
      snippetPath: 'create-command.md',
    });
    track('CreateCommandCopy', {
      language: 'sh',
      snippetPath: 'create-command.md',
    });
    setTimeout(() => {
      setState(false);
    }, 2000);
  };

  return (
    <button
      className="text-md relative hidden h-12 items-center justify-center gap-3 overflow-hidden rounded-full border border-white px-6 font-bold text-white md:flex"
      onClick={onClick}
      type="button"
    >
      npm create storybook@latest
      <CopyIcon />
      <AnimatePresence>
        {state ? (
          <motion.div
            animate={{ opacity: 1 }}
            className="absolute left-0 top-0 flex h-full w-full items-center justify-center gap-2 bg-white text-black"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
          >
            <CheckIcon /> Copied!
          </motion.div>
        ) : null}
      </AnimatePresence>
    </button>
  );
};
