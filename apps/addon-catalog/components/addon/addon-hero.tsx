'use client';

import {
  CheckIcon,
  CopyIcon,
  GithubIcon,
  VerifiedIcon,
} from '@storybook/icons';
import { humanFormat } from 'human-format';
import copy from 'copy-to-clipboard';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StorybookIcon } from '@repo/ui';
import { type Addon } from '../../types';

export function AddonHero({ addon }: { addon: Addon }) {
  const [state, setState] = useState(false);

  const onClick = () => {
    copy(`npx install ${addon.name ?? ''}`);
    setState(true);
    setTimeout(() => {
      setState(false);
    }, 2000);
  };

  return (
    <div className="mb-12 flex justify-between border-b border-zinc-300 pb-12 dark:border-b-slate-700">
      <div className="flex flex-col gap-8 md:flex-row">
        {addon.icon ? (
          <div
            style={{ backgroundImage: `url('${addon.icon}')` }}
            className="h-20 w-20 bg-contain bg-center bg-no-repeat"
          />
        ) : null}
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">{addon.displayName}</h1>
            {addon.verified &&
            ['official', 'integrators'].includes(addon.verified) &&
            addon.status !== 'deprecated' ? (
              <VerifiedIcon className="text-blue-500" />
            ) : null}
          </div>
          <p className="mb-4">{addon.description}</p>
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <button
              className="relative flex cursor-pointer items-center gap-4 rounded bg-zinc-100 px-4 py-2 dark:bg-slate-800 dark:text-slate-300"
              onClick={onClick}
              type="button"
            >
              npm install {addon.name} <CopyIcon />
              <AnimatePresence>
                {state ? (
                  <motion.div
                    animate={{ opacity: 1 }}
                    className="absolute left-0 top-0 flex h-full w-full items-center justify-center gap-2 bg-zinc-100 text-black dark:bg-slate-800 dark:text-slate-300"
                    exit={{ opacity: 0 }}
                    initial={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CheckIcon /> Copied!
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </button>
            <a
              href={addon.repositoryUrl ?? ''}
              target="_blank"
              className="flex items-center gap-2 text-sm text-black transition-colors hover:text-blue-500 dark:text-slate-400"
              rel="noopener"
            >
              <GithubIcon />
              View on Github
            </a>
          </div>
        </div>
      </div>
      <div className="hidden flex-col pr-8 lg:flex">
        <div className="mb-4 flex flex-col">
          <div className="text-3xl text-blue-400">
            {humanFormat(addon.weeklyDownloads ?? 0, {
              decimals: 0,
              separator: '',
            })}
          </div>
          <div className="text-md">Downloads per week</div>
        </div>
        {addon.verified && addon.verified === 'official' ? (
          <div className="flex items-center gap-2 rounded bg-blue-900 px-2 py-1.5">
            <StorybookIcon size={16} />
            <span className="text-xs font-bold text-white">
              Made by Storybook
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
