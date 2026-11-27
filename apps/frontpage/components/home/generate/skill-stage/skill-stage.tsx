import type { FC, ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@repo/utils';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  RefreshIcon,
  WandIcon,
} from '@storybook/icons';

/**
 * The shared layout for the skill visuals in the Agents section.
 *
 * Every visual is one Storybook window (top left, clear of the panel's
 * "Learn about" link) and one agent card (bottom right, always in the same
 * slot), authored on the 480px square stage that IllustratedFeatureList
 * scales to fit.
 *
 * To build one: call `useBeat()` for the current beat (act, respond,
 * settle), pass a `StorybookWindow` as `window` and an `AgentCard` as
 * `agent`, and drive both from that beat. Give the AgentCard the beat as
 * its `statusKey`, and set `done` on the settle beat. Use `Skeleton` for
 * the parts of the window that are still loading. See
 * ui-review-media.tsx for a complete example.
 */
export const SkillStage: FC<{
  /** Describes the whole animation; the stage is announced as one image */
  label: string;
  window: ReactNode;
  agent: ReactNode;
}> = ({ label, window, agent }) => (
  <div
    aria-label={label}
    className="relative h-full w-full font-sans text-[#2E3338]"
    role="img"
  >
    <div className="absolute left-[20px] top-[52px] w-[384px]">{window}</div>
    {/*
      Sits 10px from the stage's foot so none of the card's dividers line up
      with the bottom edge of a window (several windows end at 352px)
    */}
    <div className="absolute bottom-[10px] right-[16px] w-[224px]">{agent}</div>
  </div>
);

/** A white Storybook page in a browser window, styled like the hero's */
export const StorybookWindow: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="rounded-md shadow-[0_24px_48px_-20px_rgba(26,6,48,0.55)]">
    <TitleBar />
    <div className="overflow-hidden rounded-b-md bg-white">{children}</div>
  </div>
);

/** The width of the window controls, matched by the right-hand spacer */
const SIDE = 'w-[120px] shrink-0';

/**
 * The hero's title bar (hero/chrome.tsx), laid out like a real browser
 * toolbar for the narrow skill window: the window controls on the left, an
 * empty spacer of the same width on the right, and the address centred
 * between them. The address shrinks before it can reach the controls.
 */
const TitleBar: FC = () => (
  <div className="flex h-9 items-center rounded-t-md border-x border-t border-white/30 bg-white/20 text-white">
    <div className={cn(SIDE, 'flex items-center gap-3.5 pl-3')}>
      <div className="flex gap-1.5">
        <div className="size-[10px] rounded-full bg-red-500" />
        <div className="size-[10px] rounded-full bg-yellow-500" />
        <div className="size-[10px] rounded-full bg-green-500" />
      </div>
      <div className="flex gap-2">
        <ArrowLeftIcon size={12} />
        <ArrowRightIcon size={12} />
        <RefreshIcon size={12} />
      </div>
    </div>
    <div className="flex min-w-0 flex-1 justify-center px-3">
      <div className="flex h-6 w-full min-w-0 max-w-52 items-center justify-center rounded bg-white/20 px-2 text-[12px] font-medium leading-none">
        <span className="truncate">localhost:6006</span>
      </div>
    </div>
    <div aria-hidden className={SIDE} />
  </div>
);

/**
 * The agent's working card: a dark coding-agent panel in the style of the
 * hero's AgentChat window (manager/agent-chat.tsx), so it never reads as
 * Storybook UI. The AGENT pill and the file or task it's on, its content,
 * and a status line that swaps with each beat. Content sits on zinc-900;
 * use light text and monospace for code.
 */
export const AgentCard: FC<{
  file: string;
  status: ReactNode;
  /** Changes whenever the status text should animate in, usually the beat */
  statusKey: string;
  /** Turns the status line green for the settled result */
  done?: boolean;
  children: ReactNode;
}> = ({ file, status, statusKey, done, children }) => (
  <div className="overflow-hidden rounded-md border border-zinc-700 bg-zinc-900 text-zinc-100 shadow-[0_24px_48px_-16px_rgba(10,4,20,0.75)] ring-1 ring-white/10">
    <div className="flex h-10 items-center gap-1.5 border-b border-zinc-700 bg-zinc-800 px-3">
      <span className="flex shrink-0 items-center gap-1 rounded-full bg-[#B57EE5]/[0.18] px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#D9B8F5] ring-1 ring-inset ring-[#B57EE5]/40">
        <WandIcon className="shrink-0" size={10} />
        Agent
      </span>
      <span className="min-w-0 truncate font-mono text-[11px] text-zinc-400">
        {file}
      </span>
    </div>
    <div className="p-3">{children}</div>
    <div
      className={cn(
        'flex h-10 items-center border-t px-3 text-[13px] font-bold transition-colors duration-300',
        done
          ? 'border-[#3B5A27] bg-[#1F2A1A] text-[#8FD14F]'
          : 'border-zinc-700 text-[#C9A2EE]',
      )}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          animate={{ opacity: 1, y: 0 }}
          className="truncate"
          exit={{ opacity: 0, y: -4 }}
          initial={{ opacity: 0, y: 4 }}
          key={statusKey}
          transition={{ duration: 0.2 }}
        >
          {status}
        </motion.span>
      </AnimatePresence>
    </div>
  </div>
);
