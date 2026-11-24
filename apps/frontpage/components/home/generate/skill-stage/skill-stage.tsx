import type { FC, ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@repo/utils';
import { WandIcon } from '@storybook/icons';
import { Chrome } from '../../hero/chrome';

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
    <div className="absolute bottom-[20px] right-[16px] w-[224px]">{agent}</div>
  </div>
);

/**
 * The hero's browser frame around a white Storybook page, without the
 * navigation icons so the address sits centred on the narrow window
 */
export const StorybookWindow: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="rounded-md shadow-[0_24px_48px_-20px_rgba(26,6,48,0.55)]">
    <Chrome navigation={false} />
    <div className="overflow-hidden rounded-b-md bg-white">{children}</div>
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
