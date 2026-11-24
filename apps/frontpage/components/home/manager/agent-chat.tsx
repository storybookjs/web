import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@repo/utils';
import {
  ArrowUpIcon,
  BookmarkHollowIcon,
  ComponentIcon,
  EyeIcon,
  PassedIcon,
  SearchIcon,
  WandIcon,
} from '@storybook/icons';
import { AGENT_REVIEW_DELAY } from './slide-agents';

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

/**
 * A coding agent's chat, shown as its own app window beside Storybook. Its
 * last step, publishing a review, lands when the canvas changes to the review
 * summary. Pass `settled` to show every step at once (stories); reduced
 * motion does the same.
 */
export function AgentChat({ settled = false }: { settled?: boolean }) {
  const reduceMotion = useReducedMotion();
  const still = settled || Boolean(reduceMotion);
  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="flex h-full w-full flex-col overflow-hidden rounded-md border border-zinc-700 bg-zinc-900 text-sm text-zinc-100 shadow-2xl"
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      initial={still ? false : { opacity: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="flex h-9 flex-shrink-0 items-center gap-4 border-b border-b-zinc-700 bg-zinc-800 px-4">
        <div className="flex gap-2">
          <div className="h-[10px] w-[10px] rounded-full bg-red-500" />
          <div className="h-[10px] w-[10px] rounded-full bg-yellow-500" />
          <div className="h-[10px] w-[10px] rounded-full bg-green-500" />
        </div>
        <div className="flex items-center gap-2 text-[13px] font-medium">
          <WandIcon className="text-[#B57EE5]" />
          Agent
        </div>
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-3 p-4">
        {/* Below lg the window is short, so the thread sits on the input
            like a chat and its oldest lines scroll out of view at the top */}
        <div className="flex min-h-0 flex-1 flex-col justify-end gap-3 overflow-hidden lg:justify-start">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="self-end rounded-lg bg-blue-500 px-3 py-2 text-white"
            initial={still ? false : { opacity: 0, y: 10 }}
            transition={{ delay: 0.5 }}
          >
            Add a story for the expanded ProductCard
          </motion.div>
          <motion.div
            animate="visible"
            className="flex flex-col gap-2"
            initial={still ? false : 'hidden'}
            variants={steps}
          >
            <Step icon={<WandIcon className="text-[#B57EE5]" />}>
              Reading the ProductCard stories
            </Step>
            <Step icon={<SearchIcon className="text-zinc-400" />}>
              Reusing <Code>Button</Code> and <Code>Avatar</Code> from the
              design system
            </Step>
            <Step icon={<BookmarkHollowIcon className="text-[#37D5D3]" />}>
              Wrote the <Code>Expanded</Code> story
            </Step>
            <Step
              className="border-[#3B5A27] bg-[#1F2A1A]"
              icon={<PassedIcon className="text-[#7ABF39]" />}
            >
              Interaction and visual tests pass
            </Step>
            <Step
              delay={AGENT_REVIEW_DELAY}
              icon={<EyeIcon className="text-[#B57EE5]" />}
              still={still}
            >
              Published a review of 3 stories
            </Step>
          </motion.div>
          <motion.div
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-zinc-300"
            initial={still ? false : { opacity: 0 }}
            transition={{ delay: AGENT_REVIEW_DELAY + 0.6 }}
          >
            <ComponentIcon className="flex-shrink-0 text-[#029CFD]" />
            Ready for your review
          </motion.div>
        </div>
        <div className="flex h-10 flex-shrink-0 items-center justify-between rounded-lg border border-zinc-700 bg-zinc-800 pl-3 pr-1.5 text-zinc-500">
          Ask the agent
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-zinc-700 text-zinc-300">
            <ArrowUpIcon />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * One step in the agent's work. Steps follow the list's stagger; pass `delay`
 * to time one on its own instead (`still` then skips its entrance).
 */
function Step({
  children,
  icon,
  className,
  delay,
  still,
}: {
  children: ReactNode;
  icon: ReactNode;
  className?: string;
  delay?: number;
  still?: boolean;
}) {
  const timing =
    delay === undefined
      ? { variants: step }
      : {
          animate: step.visible,
          initial: still ? false : step.hidden,
          transition: { delay },
        };
  return (
    <motion.div
      className={cn(
        'flex items-center gap-2 rounded border border-zinc-700 bg-zinc-800 px-3 py-2',
        className,
      )}
      {...timing}
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
    <span className="rounded bg-zinc-700 px-1 font-mono text-xs">
      {children}
    </span>
  );
}
