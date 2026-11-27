import type { FC, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { cn } from '@repo/utils';
import {
  BookmarkHollowIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ComponentIcon,
  CheckIcon,
  CrossIcon,
  PlayHollowIcon,
} from '@storybook/icons';
import type { Beat } from './skill-stage';
import {
  AgentCard,
  Skeleton,
  SkillStage,
  PACE,
  StorybookWindow,
  beatEase,
  useBeat,
} from './skill-stage';

/**
 * The Test stories skill: the agent runs the Button's story tests with
 * accessibility checks, the Secondary story fails color contrast, the agent
 * darkens its text, and the re-run passes. Simplified from the Storybook 11
 * sidebar and addon panel (Figma kXVzQgpZUkuBEQ43AgiS0Z, node 2194:46315).
 */

type Mark = 'running' | 'pass' | 'fail';

/**
 * Where the test run is: the first run, its failure, the re-run at the start
 * of the settle beat, then the green result
 */
export type Run = 'running' | 'failed' | 'rerun' | 'passed';

const STATUS: Record<Run, string> = {
  running: 'Running story tests',
  failed: 'Fixing Secondary contrast',
  rerun: 'Running the tests again',
  passed: '4 of 4 passed',
};

const MODULE: Record<Run, { label: string; className: string }> = {
  running: { label: 'Running tests', className: 'text-[#2E3338]' },
  failed: { label: '1 test failed', className: 'text-[#C42A14]' },
  rerun: { label: 'Running tests', className: 'text-[#2E3338]' },
  passed: { label: '4 tests passed', className: 'text-[#3E7E1E]' },
};

/** The contrast rule's result for each run */
const CONTRAST_MARK: Record<Run, Mark> = {
  running: 'running',
  failed: 'fail',
  rerun: 'running',
  passed: 'pass',
};

function runFor(beat: Beat, rerunning: boolean): Run {
  if (beat === 'act') return 'running';
  if (beat === 'respond') return 'failed';
  return rerunning ? 'rerun' : 'passed';
}

const STORIES = ['Primary', 'Secondary', 'Large', 'Small'];
const FAILING = 'Secondary';

/**
 * How long the re-run spins at the start of the settle beat, in ms. Scaled
 * with the shared pace so it's on screen for about 2 seconds, like the
 * other steps.
 */
const RERUN = 1300 * PACE;

const FAIL_COLOR = '#5AB8FB';
const FIXED_COLOR = '#0077C2';

export const TestStoriesRunMedia: FC<{ beat?: Beat }> = ({
  beat: heldBeat,
}) => {
  const beat = useBeat(heldBeat);
  const rerunning = useRerun(beat === 'settle' && !heldBeat);
  const run = runFor(beat, rerunning);
  const fixed = run === 'passed';

  return (
    <SkillStage
      agent={
        <AgentCard
          done={fixed}
          file="Button.tsx"
          status={STATUS[run]}
          statusKey={run}
        >
          <AgentWork showFix={beat !== 'act'} />
        </AgentCard>
      }
      label="An agent runs the Button's story tests with accessibility checks. The Secondary story fails color contrast, the agent darkens its text, and all four stories pass on the re-run."
      window={
        <StorybookWindow>
          <TestStoriesWindow run={run} />
        </StorybookWindow>
      }
    />
  );
};

/**
 * What the Storybook window shows for a test run: the sidebar with each
 * story's status mark, and the Accessibility panel. The UI workflow recap
 * reuses it.
 */
export const TestStoriesWindow: FC<{
  run: Run;
  /** Overrides the height, for a taller window */
  className?: string;
}> = ({ run, className }) => {
  const markFor = (story: string): Mark => {
    if (run === 'running' || run === 'rerun') return 'running';
    if (run === 'failed' && story === FAILING) return 'fail';
    return 'pass';
  };
  return (
    <div className={cn('flex h-[264px]', className)}>
      <Sidebar markFor={markFor} run={run} />
      <Main run={run} />
    </div>
  );
};

/**
 * True for a moment at the start of the settle beat, while the tests run
 * again. Skipped when a story holds the beat or motion is reduced, so the
 * settled frame shows straight away.
 */
function useRerun(active: boolean): boolean {
  const reduceMotion = useReducedMotion();
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!active || reduceMotion) return;
    const timer = setTimeout(() => {
      setDone(true);
    }, RERUN);
    return () => {
      clearTimeout(timer);
      setDone(false);
    };
  }, [active, reduceMotion]);

  return active && !reduceMotion && !done;
}

/** The test command while it runs, then the one-line fix */
const AgentWork: FC<{ showFix: boolean }> = ({ showFix }) => (
  <div className="overflow-hidden rounded border border-zinc-700 font-mono text-[11px] leading-5">
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        key={showFix ? 'fix' : 'run'}
        transition={{ duration: 0.2 }}
      >
        {showFix ? (
          <>
            <div className="bg-[#3A1F22] px-2 text-[#FCA5A5]">
              - color: &apos;{FAIL_COLOR}&apos;
            </div>
            <div className="bg-[#1F2A1A] px-2 text-[#9AD66B]">
              + color: &apos;{FIXED_COLOR}&apos;
            </div>
          </>
        ) : (
          <>
            <div className="truncate px-2 text-zinc-200">
              $ npx vitest Button
            </div>
            <div className="truncate px-2 text-zinc-400">
              4 stories, a11y checks
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  </div>
);

const Sidebar: FC<{
  run: Run;
  markFor: (story: string) => Mark;
}> = ({ run, markFor }) => (
  <div className="flex w-[150px] shrink-0 flex-col border-r border-[#E5E9ED] bg-[#F6F9FC] px-1.5 py-2">
    <div className="flex h-6 items-center gap-1 px-1 text-[9.5px] font-bold uppercase tracking-[0.16em] text-[#5C6570]">
      <ChevronDownIcon size={8} />
      Components
    </div>
    <TreeRow>
      <ChevronDownIcon className="shrink-0 text-[#5C6570]" size={8} />
      <ComponentIcon className="shrink-0 text-[#029CFD]" size={12} />
      <span>Button</span>
    </TreeRow>
    {STORIES.map((story, i) => (
      <TreeRow indent key={story} selected={story === FAILING}>
        <BookmarkHollowIcon className="shrink-0 text-[#2BB5B3]" size={11} />
        <span className="min-w-0 flex-1 truncate">{story}</span>
        <StatusMark delay={i * 0.08} mark={markFor(story)} />
      </TreeRow>
    ))}
    <TreeRow>
      <ChevronRightIcon className="shrink-0 text-[#5C6570]" size={8} />
      <ComponentIcon className="shrink-0 text-[#029CFD]" size={12} />
      <span>Header</span>
    </TreeRow>
    <TreeRow>
      <ChevronRightIcon className="shrink-0 text-[#5C6570]" size={8} />
      <ComponentIcon className="shrink-0 text-[#029CFD]" size={12} />
      <span className="truncate">CheckoutForm</span>
    </TreeRow>
    <TestModule run={run} />
  </div>
);

const TreeRow: FC<{
  indent?: boolean;
  selected?: boolean;
  children: ReactNode;
}> = ({ indent, selected, children }) => (
  <div
    className={cn(
      'flex h-6 items-center gap-1.5 rounded pr-1.5 text-[12px]',
      indent ? 'pl-6' : 'pl-1',
      selected && 'bg-[#E3F0FD] font-bold text-[#0058BD]',
    )}
  >
    {children}
  </div>
);

/** A story's test result in the sidebar: spinning, passed or failed */
const StatusMark: FC<{ mark: Mark; delay?: number }> = ({
  mark,
  delay = 0,
}) => (
  <span className="flex h-3 w-3 shrink-0 items-center justify-center">
    <AnimatePresence initial={false} mode="wait">
      <motion.span
        animate={{ opacity: 1, scale: 1 }}
        className="flex"
        exit={{ opacity: 0, scale: 0.6 }}
        initial={{ opacity: 0, scale: 0.6 }}
        key={mark}
        transition={{ duration: 0.25, delay, ease: beatEase }}
      >
        {mark === 'running' ? <Spinner /> : null}
        {mark === 'pass' ? (
          <CheckIcon className="text-[#3E9A1C]" size={11} />
        ) : null}
        {mark === 'fail' ? (
          <CrossIcon className="text-[#E5381F]" size={10} />
        ) : null}
      </motion.span>
    </AnimatePresence>
  </span>
);

const Spinner: FC = () => {
  const reduceMotion = useReducedMotion();
  return (
    <motion.svg
      animate={reduceMotion ? undefined : { rotate: 360 }}
      aria-hidden
      data-chromatic="ignore"
      height={11}
      transition={{ duration: 0.8, ease: 'linear', repeat: Infinity }}
      viewBox="0 0 12 12"
      width={11}
    >
      <circle
        cx="6"
        cy="6"
        fill="none"
        r="4.5"
        stroke="#CFE6FB"
        strokeWidth="1.75"
      />
      <path
        d="M6 1.5a4.5 4.5 0 0 1 4.5 4.5"
        fill="none"
        stroke="#029CFD"
        strokeLinecap="round"
        strokeWidth="1.75"
      />
    </motion.svg>
  );
};

/** The test module at the foot of the Storybook 11 sidebar */
const TestModule: FC<{ run: Run }> = ({ run }) => (
  <div className="mt-auto flex h-8 items-center gap-1.5 rounded-md border border-[#DDE0E3] bg-white px-2 text-[11.5px] font-bold">
    {run === 'failed' ? (
      <CrossIcon className="shrink-0 text-[#E5381F]" size={10} />
    ) : null}
    {run === 'passed' ? (
      <CheckIcon className="shrink-0 text-[#3E9A1C]" size={11} />
    ) : null}
    {run === 'running' || run === 'rerun' ? (
      <PlayHollowIcon className="shrink-0 text-[#5C6570]" size={12} />
    ) : null}
    <span
      className={cn(
        'truncate transition-colors duration-300',
        MODULE[run].className,
      )}
    >
      {MODULE[run].label}
    </span>
  </div>
);

/** The Secondary story's canvas and the Accessibility panel below it */
const Main: FC<{ run: Run }> = ({ run }) => {
  const checked = run !== 'running';
  const failing = run === 'failed';
  const fixed = run === 'passed';
  const others: Mark = run === 'rerun' ? 'running' : 'pass';
  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <div className="flex h-[96px] items-center justify-center border-b border-[#DDE0E3]">
        <span
          className={cn(
            'flex h-7 items-center rounded-md border border-[#029CFD] bg-white px-3 text-[11px] font-bold outline-offset-[3px] transition-[color,outline-color] duration-500',
            failing
              ? 'outline-dashed outline-2 outline-[#E5381F]'
              : 'outline-dashed outline-2 outline-transparent',
          )}
          style={{ color: fixed ? FIXED_COLOR : FAIL_COLOR }}
        >
          Button
        </span>
      </div>

      <div className="flex h-8 items-end gap-4 border-b border-[#DDE0E3] px-3 text-[12px]">
        <span className="pb-2 text-[#5C6570]">Interactions</span>
        <span className="flex items-center gap-1.5 border-b-2 border-[#0069E0] pb-[6px] font-bold text-[#0058BD]">
          Accessibility
          <AnimatePresence initial={false}>
            {failing ? (
              <motion.span
                animate={{ opacity: 1, scale: 1 }}
                className="flex h-4 min-w-4 items-center justify-center rounded-full bg-[#FDE8E4] px-1 text-[10px] text-[#C42A14]"
                exit={{ opacity: 0, scale: 0.6 }}
                initial={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.25, ease: beatEase }}
              >
                1
              </motion.span>
            ) : null}
          </AnimatePresence>
        </span>
      </div>

      <div className="flex flex-col py-1">
        <Check
          checked={checked}
          delay={0}
          mark={CONTRAST_MARK[run]}
          name="Color contrast"
          value={fixed ? '4.8:1' : '2.2:1'}
        />
        <Check
          checked={checked}
          delay={0.08}
          mark={others}
          name="Button name"
        />
        <Check
          checked={checked}
          delay={0.16}
          mark={others}
          name="Focus visible"
        />
      </div>
    </div>
  );
};

/** One accessibility rule: a loading bar while the tests run, then its result */
const Check: FC<{
  checked: boolean;
  mark: Mark;
  name: string;
  value?: string;
  delay: number;
}> = ({ checked, mark, name, value, delay }) => (
  <div className="flex h-8 items-center gap-2 px-3 text-[12px]">
    {checked ? (
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="flex min-w-0 flex-1 items-center gap-2"
        initial={{ opacity: 0, y: 4 }}
        transition={{ duration: 0.4, delay, ease: beatEase }}
      >
        <StatusMark mark={mark} />
        <span
          className={cn(
            'min-w-0 flex-1 truncate',
            mark === 'fail' && 'font-bold text-[#C42A14]',
          )}
        >
          {name}
        </span>
        {value ? (
          <span
            className={cn(
              'font-mono text-[11px] tabular-nums transition-colors duration-300',
              mark === 'fail' ? 'text-[#C42A14]' : 'text-[#5C6570]',
            )}
          >
            {value}
          </span>
        ) : null}
      </motion.div>
    ) : (
      <>
        <Spinner />
        <Skeleton className="h-2.5 w-28" delay={delay} />
      </>
    )}
  </div>
);
