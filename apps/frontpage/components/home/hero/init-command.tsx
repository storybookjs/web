import { CheckIcon, CopyIcon } from '@storybook/icons';
import type { FC } from 'react';
import { useState } from 'react';
import copy from 'copy-to-clipboard';
import { AnimatePresence, motion } from 'framer-motion';
import { usePlausible } from 'next-plausible';

export const InitCommand: FC = () => {
  const [state, setState] = useState(false);
  const plausible = usePlausible();

  const onClick = () => {
    copy('npm create storybook@latest');
    setState(true);
    plausible('CodeSnippetCopy', { props: { language: 'sh', snippetPath: 'create-command.md' } });
    plausible('CreateCommandCopy', { props: { language: 'sh', snippetPath: 'create-command.md' } });
    setTimeout(() => {
      setState(false);
    }, 2000);
  };

  return (
    <button
      className="relative overflow-hidden hidden md:flex items-center justify-center border border-white px-6 h-12 rounded-full text-white text-md font-bold gap-3"
      onClick={onClick}
      type="button"
    >
      npm create storybook@latest
      <CopyIcon />
      <AnimatePresence>
        {state ? (
          <motion.div
            animate={{ opacity: 1 }}
            className="absolute bg-white top-0 left-0 w-full h-full text-black flex items-center justify-center gap-2"
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
