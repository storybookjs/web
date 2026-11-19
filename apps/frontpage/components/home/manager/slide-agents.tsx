import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@repo/utils';
import {
  BookmarkHollowIcon,
  ComponentIcon,
  PassedIcon,
  SearchIcon,
  WandIcon,
} from '@storybook/icons';
import { Tabs } from './tabs';
import { Toolbar } from './toolbar';
import { ComponentDiff1 } from './component-diff1';
import { ComponentSmall } from './component-small';

/**
 * Seconds after the slide mounts when the agent's new story appears. The
 * Sidebar uses the same value to add the story to the tree.
 */
export const AGENT_STORY_DELAY = 2;

const steps = {
  visible: {
    transition: { staggerChildren: 0.6, delayChildren: 0.8 },
  },
  hidden: {},
};

const step = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: 10 },
};

export function SlideAgents() {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="absolute left-0 top-0 h-full w-full flex-1 bg-white"
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
    >
      <div className="absolute top-10 flex h-[calc(45%-40px)] w-full items-center justify-center bg-white p-4 text-black sm:h-[calc(60%-40px)] sm:p-8 lg:h-[calc(100%-40px)] lg:w-[calc(100%-400px)]">
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          className="flex max-h-full items-center justify-center"
          initial={{ opacity: 0, scale: 0.96 }}
          transition={{ delay: AGENT_STORY_DELAY, duration: 0.4 }}
        >
          <div className="hidden max-h-full sm:block">
            <ComponentDiff1 />
          </div>
          <ComponentSmall className="max-h-full sm:hidden" />
        </motion.div>
      </div>
      <Toolbar />
      <div className="absolute bottom-0 left-0 flex h-[55%] w-full flex-col border-t border-t-[#D9E0E6] text-black sm:h-[40%] lg:bottom-auto lg:left-auto lg:right-0 lg:top-0 lg:h-full lg:w-[400px] lg:border-l lg:border-t-0 lg:border-l-[#D9E0E6]">
        <Tabs active={1} tabs={['Controls', 'Agent']} />
        <div className="flex flex-1 flex-col gap-3 overflow-hidden bg-[#F7F9FC] p-4 text-sm">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="self-end rounded-lg bg-blue-500 px-3 py-2 text-white"
            initial={{ opacity: 0, y: 10 }}
            transition={{ delay: 0.3 }}
          >
            Add a story for the expanded ProductCard
          </motion.div>
          <motion.div
            animate="visible"
            className="flex flex-col gap-2"
            initial="hidden"
            variants={steps}
          >
            <Step icon={<WandIcon className="text-[#6F2CAC]" />}>
              Reading the ProductCard stories
            </Step>
            <Step icon={<SearchIcon className="text-[#73828C]" />}>
              Reusing <Code>Button</Code> and <Code>Avatar</Code> from the
              design system
            </Step>
            <Step icon={<BookmarkHollowIcon className="text-[#37D5D3]" />}>
              Wrote the <Code>Expanded</Code> story
            </Step>
            <Step
              className="border-[#B8E0A0] bg-[#F1FAEC]"
              icon={<PassedIcon className="text-[#7ABF39]" />}
            >
              Interaction and visual tests pass
            </Step>
          </motion.div>
          <motion.div
            animate={{ opacity: 1 }}
            className="mt-auto flex h-9 items-center gap-2 rounded border border-[#D9E0E6] bg-white px-3 text-[#73828C]"
            initial={{ opacity: 0 }}
            transition={{ delay: 3.4 }}
          >
            <ComponentIcon className="text-[#029CFD]" />
            Ready for your review
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function Step({
  children,
  icon,
  className,
}: {
  children: ReactNode;
  icon: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={cn(
        'flex items-center gap-2 rounded border border-[#D9E0E6] bg-white px-3 py-2',
        className,
      )}
      variants={step}
    >
      <div className="flex h-4 w-4 flex-shrink-0 items-center justify-center">
        {icon}
      </div>
      <div className="leading-5">{children}</div>
    </motion.div>
  );
}

function Code({ children }: { children: string }) {
  return (
    <span className="rounded bg-[#F0F2F5] px-1 font-mono text-xs">
      {children}
    </span>
  );
}
