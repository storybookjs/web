import type { FC, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { cn } from '@repo/utils';
import { CheckIcon } from '@storybook/icons';
import type { Beat } from './skill-stage';
import {
  AgentCard,
  BEATS,
  BEAT_DURATION,
  PACE,
  SkillStage,
  StorybookWindow,
  beatEase,
} from './skill-stage';
import { ComponentDocsWindow } from './component-docs-media';
import { TestStoriesWindow } from './test-stories-run-media';
import { UIReviewWindow } from './ui-review-media';
import { WriteStoriesWindow } from './write-stories-media';

/**
 * The UI workflow skill, as a recap of the other four: the agent works
 * through a checklist (read the docs, write stories, run tests, publish a
 * review) and the Storybook window shows each skill's result as its step
 * runs. It ends on the published review with every step ticked.
 */

const STEPS = [
  { label: 'Read the docs', result: 'Button', status: 'Reading the Button docs' },
  { label: 'Write stories', result: '2 new', status: 'Writing stories' },
  { label: 'Run tests', result: '4 passed', status: 'Running story tests' },
  {
    label: 'Publish a review',
    result: '4 stories',
    status: 'Publishing a review',
  },
] as const;

/** Index of the step running, or `STEPS.length` once all four are done */
type Phase = number;
const DONE: Phase = STEPS.length;

/** The same loop length as the other skill visuals */
const LOOP = BEATS.reduce((total, b) => total + BEAT_DURATION[b], 0);
/**
 * How long the finished checklist holds before the loop restarts, in ms.
 * Scaled with the shared pace; the four steps share the rest of the loop,
 * about 2 seconds each.
 */
const HOLD = 2400 * PACE;
/** Each step gets an equal share of the rest of the loop */
const STEP = (LOOP - HOLD) / STEPS.length;

/** The phase each held beat shows, for stories and screenshots */
const HELD: Record<Beat, Phase> = { act: 0, respond: 2, settle: DONE };

export const UIWorkflowMedia: FC<{ beat?: Beat }> = ({ beat }) => {
  const phase = usePhase(beat);
  const done = phase === DONE;

  return (
    <SkillStage
      agent={
        <AgentCard
          done={done}
          file="CheckoutForm.tsx"
          status={done ? 'Change ready for review' : STEPS[phase].status}
          statusKey={String(phase)}
        >
          <Checklist phase={phase} />
        </AgentCard>
      }
      label="An agent runs the whole UI workflow on the checkout form: it reads the Button docs, writes stories, runs the tests, and publishes a review. Storybook shows each result in turn, ending on the review."
      window={
        <StorybookWindow>
          {/* The height of the review page, so each step fills the same window */}
          <div className="relative h-[363px] overflow-hidden">
            <AnimatePresence initial={false}>
              <motion.div
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-white"
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                // The review stays mounted from its step to the end
                key={Math.min(phase, 3)}
                transition={{ duration: 0.3, ease: beatEase }}
              >
                <StepWindow phase={phase} />
              </motion.div>
            </AnimatePresence>
          </div>
        </StorybookWindow>
      }
    />
  );
};

/**
 * Steps through the checklist, then holds the finished state. Pass `beat`
 * to hold one moment; under reduced motion it holds the finished state.
 */
function usePhase(beat?: Beat): Phase {
  const reduceMotion = useReducedMotion();
  let frozen: Phase | undefined;
  if (beat) frozen = HELD[beat];
  else if (reduceMotion) frozen = DONE;
  const [current, setCurrent] = useState<Phase>(0);

  useEffect(() => {
    if (frozen !== undefined) return;
    const timer = setTimeout(
      () => {
        setCurrent((p) => (p + 1) % (DONE + 1));
      },
      current === DONE ? HOLD : STEP,
    );
    return () => {
      clearTimeout(timer);
    };
  }, [current, frozen]);

  return frozen ?? current;
}

/** Each step's moment, borrowed from that skill's own visual */
const StepWindow: FC<{ phase: Phase }> = ({ phase }) => {
  if (phase === 0) {
    return <ComponentDocsWindow beat="settle" className="h-full" />;
  }
  if (phase === 1) {
    return <WriteStoriesWindow beat="settle" className="h-full" />;
  }
  if (phase === 2) return <TestStoriesWindow className="h-full" run="passed" />;
  return <UIReviewWindow beat={phase === DONE ? 'settle' : 'respond'} />;
};

const Checklist: FC<{ phase: Phase }> = ({ phase }) => (
  <ol className="m-0 flex list-none flex-col p-0">
    {STEPS.map((step, i) => {
      let state: StepState = 'pending';
      if (i < phase) state = 'done';
      else if (i === phase) state = 'running';
      return (
        <li
          className="m-0 flex h-[22px] items-center gap-2 text-[12px]"
          key={step.label}
        >
          <StepMark state={state} />
          <span
            className={cn(
              'min-w-0 flex-1 truncate transition-colors duration-300',
              state === 'pending' ? 'text-zinc-500' : 'text-zinc-100',
              state === 'running' && 'font-bold',
            )}
          >
            {step.label}
          </span>
          <span className="shrink-0 font-mono text-[10.5px] text-zinc-400">
            <AnimatePresence initial={false}>
              {state === 'done' ? (
                <motion.span
                  animate={{ opacity: 1 }}
                  className="block"
                  initial={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  {step.result}
                </motion.span>
              ) : null}
            </AnimatePresence>
          </span>
        </li>
      );
    })}
  </ol>
);

type StepState = 'pending' | 'running' | 'done';

/** A hollow ring while waiting, a spinner while running, then a tick */
const StepMark: FC<{ state: StepState }> = ({ state }) => {
  let mark: ReactNode = (
    <span className="size-2.5 rounded-full border-[1.5px] border-zinc-600" />
  );
  if (state === 'running') mark = <Spinner />;
  if (state === 'done') {
    mark = <CheckIcon className="text-[#8FD14F]" size={11} />;
  }
  return (
    <span className="flex size-3 shrink-0 items-center justify-center">
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          animate={{ opacity: 1, scale: 1 }}
          className="flex"
          exit={{ opacity: 0, scale: 0.6 }}
          initial={{ opacity: 0, scale: 0.6 }}
          key={state}
          transition={{ duration: 0.2, ease: beatEase }}
        >
          {mark}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

/** The test visual's spinner, recoloured for the dark agent card */
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
        stroke="#3F3F46"
        strokeWidth="1.75"
      />
      <path
        d="M6 1.5a4.5 4.5 0 0 1 4.5 4.5"
        fill="none"
        stroke="#C9A2EE"
        strokeLinecap="round"
        strokeWidth="1.75"
      />
    </motion.svg>
  );
};
