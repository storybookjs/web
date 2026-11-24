import type { FC, ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@repo/utils';
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

/** The hero's browser frame around a white Storybook page */
export const StorybookWindow: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="rounded-md shadow-[0_24px_48px_-20px_rgba(26,6,48,0.55)]">
    <Chrome />
    <div className="overflow-hidden rounded-b-md bg-white">{children}</div>
  </div>
);

/**
 * The agent's working card: the AGENT pill and the file or task it's on,
 * its content, and a status line that swaps with each beat.
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
  <div className="overflow-hidden rounded-md bg-white shadow-[0_24px_48px_-16px_rgba(26,6,48,0.6)]">
    <div className="flex h-10 items-center gap-2 border-b border-[#E3E6E8] px-3">
      <span className="rounded-full bg-[#6F2CAC] px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-white">
        Agent
      </span>
      <span className="truncate font-mono text-[12px] text-[#5C6570]">
        {file}
      </span>
    </div>
    <div className="p-3">{children}</div>
    <div
      className={cn(
        'flex h-10 items-center border-t border-[#E3E6E8] px-3 text-[13px] font-bold transition-colors duration-300',
        done ? 'bg-[#F1FAEC] text-[#2E7D0F]' : 'text-[#6F2CAC]',
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
