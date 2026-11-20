import type { FC, ReactNode, SVGProps } from 'react';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { cn } from '@repo/utils';

/**
 * Coded media for the "Test stories" skill in the Agents section. An agent
 * runs the Histogram stories, one fails because its bars render empty, the
 * agent patches the component, and the re-run goes green.
 * Restored from the Test section (removed in 87ce13bb).
 * Authored on the 480px stage that IllustratedFeatureList scales to fit.
 */

const PHASES = ['running', 'failed', 'fixing', 'passed'] as const;
type Phase = (typeof PHASES)[number];

/** How long each phase holds before the next, in ms. The loop restarts after `passed`. */
const PHASE_DURATION: Record<Phase, number> = {
  running: 1900,
  failed: 1500,
  fixing: 1900,
  passed: 3400,
};

const STORIES = ['Empty', 'With data', 'Loading', 'Error'];
const FAILING_STORY = 1;
const BARS = [22, 46, 52, 74, 100, 52];

const ease = [0.16, 1, 0.3, 1] as const;

function usePhase(): Phase {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>('running');

  useEffect(() => {
    if (reduceMotion) return;
    const timer = setTimeout(() => {
      setPhase(
        (current) => PHASES[(PHASES.indexOf(current) + 1) % PHASES.length],
      );
    }, PHASE_DURATION[phase]);
    return () => {
      clearTimeout(timer);
    };
  }, [phase, reduceMotion]);

  return reduceMotion ? 'passed' : phase;
}

export const TestStoriesMedia: FC = () => {
  const phase = usePhase();
  const barsDrawn = phase === 'passed';

  return (
    <div
      aria-label="An agent runs the Histogram story tests. One fails, the agent fixes the component, and all four pass."
      className="relative h-full w-full font-sans text-[#2E3438]"
      role="img"
    >
      {/* The component under test */}
      <div className="absolute left-[28px] top-[56px] h-[196px] w-[272px] rounded-md bg-[#FBFAF7] px-5 pb-4 pt-5 shadow-[0_18px_36px_-14px_rgba(122,86,10,0.45)]">
        <div className="flex h-[124px] gap-3">
          <div className="flex flex-col justify-between pb-1 text-[11px] font-bold text-[#73828C]">
            <span>20k</span>
            <span>15k</span>
            <span>5k</span>
          </div>
          <div className="flex flex-1 items-end gap-[3px] border-b border-[#E3E6E8]">
            {BARS.map((height, i) => (
              <motion.div
                animate={{ height: barsDrawn ? `${String(height)}%` : '0%' }}
                className="flex-1 rounded-t-[2px] bg-gradient-to-t from-[#9BAAF0] to-[#6178F2]"
                initial={false}
                // eslint-disable-next-line react/no-array-index-key -- static decorative bars
                key={i}
                transition={{
                  duration: barsDrawn ? 0.7 : 0.25,
                  delay: barsDrawn ? 0.15 + i * 0.05 : 0,
                  ease,
                }}
              />
            ))}
          </div>
        </div>
        <div className="ml-8 mt-2 flex justify-around text-[11px] font-bold text-[#73828C]">
          <span>20ms</span>
          <span>30ms</span>
          <span>40ms</span>
        </div>
      </div>

      {/* The agent's test run */}
      <div className="absolute bottom-[44px] right-[28px] w-[300px] overflow-hidden rounded-md bg-white text-[13px] shadow-[0_24px_48px_-16px_rgba(122,86,10,0.55)]">
        <div className="flex h-11 items-center gap-2 border-b border-[#E3E6E8] px-4">
          <span className="rounded-full bg-[#6F2CAC] px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-white">
            Agent
          </span>
          <span className="font-bold">Running story tests</span>
        </div>
        <ul className="m-0 list-none p-0">
          {STORIES.map((story, i) => (
            <StoryRow
              index={i}
              key={story}
              name={`Histogram: ${story}`}
              phase={phase}
            />
          ))}
        </ul>
        <Footer phase={phase} />
      </div>
    </div>
  );
};

type RowStatus = 'pending' | 'pass' | 'fail' | 'fixing';

function rowStatus(index: number, phase: Phase, resolved: boolean): RowStatus {
  if (phase === 'running') {
    if (!resolved) return 'pending';
    return index === FAILING_STORY ? 'fail' : 'pass';
  }
  if (index !== FAILING_STORY || phase === 'passed') return 'pass';
  return phase === 'failed' ? 'fail' : 'fixing';
}

const StoryRow: FC<{ index: number; name: string; phase: Phase }> = ({
  index,
  name,
  phase,
}) => {
  // While the run is going, rows resolve one after another
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    if (phase !== 'running') return;
    setResolved(false);
    const timer = setTimeout(
      () => {
        setResolved(true);
      },
      350 + index * 320,
    );
    return () => {
      clearTimeout(timer);
    };
  }, [phase, index]);

  const shown = rowStatus(index, phase, resolved);

  return (
    <li
      className={cn(
        'm-0 border-b border-[#EEF0F2] transition-colors duration-300 last:border-b-0',
        shown === 'fail' && 'bg-[#FFF3EE]',
        shown === 'fixing' && 'bg-[#F6F0FC]',
      )}
    >
      <div className="flex h-10 items-center gap-3 px-4">
        <StatusIcon status={shown} />
        <span
          className={cn(
            'transition-colors duration-300',
            shown === 'pending' && 'text-[#9AA4AB]',
          )}
        >
          {name}
        </span>
      </div>
      <AnimatePresence initial={false}>
        {(shown === 'fail' || shown === 'fixing') && (
          <motion.div
            animate={{ height: 'auto', opacity: 1 }}
            className="overflow-hidden"
            exit={{ height: 0, opacity: 0 }}
            initial={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease }}
          >
            <div className="pb-3 pl-11 pr-4 text-[12px] leading-5">
              {shown === 'fail' ? (
                <span className="text-[#C23400]">Expected 6 bars, found 0</span>
              ) : (
                <div className="rounded bg-white/80 px-2 py-1.5 font-mono text-[11px] leading-[18px]">
                  <div className="text-[#C23400]">- height=&#123;0&#125;</div>
                  <div className="text-[#2E7D0F]">
                    + height=&#123;scale(d.value)&#125;
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};

const FOOTER: Record<Phase, { copy: ReactNode; className: string }> = {
  running: { copy: 'Running 4 tests', className: 'text-[#73828C]' },
  failed: {
    copy: '1 failed. Reading the failure',
    className: 'text-[#C23400]',
  },
  fixing: { copy: 'Fixing Histogram.tsx', className: 'text-[#6F2CAC]' },
  passed: {
    copy: '4 of 4 passed. Ready for review',
    className: 'bg-[#F1FAEC] text-[#2E7D0F]',
  },
};

const Footer: FC<{ phase: Phase }> = ({ phase }) => {
  return (
    <div
      className={cn(
        'flex h-10 items-center border-t border-[#E3E6E8] px-4 text-[12px] font-bold transition-colors duration-300',
        FOOTER[phase].className,
      )}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          initial={{ opacity: 0, y: 4 }}
          key={phase}
          transition={{ duration: 0.2 }}
        >
          {FOOTER[phase].copy}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

const StatusIcon: FC<{ status: RowStatus }> = ({ status }) => {
  return (
    <span className="relative flex h-4 w-4 flex-shrink-0 items-center justify-center">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          animate={{ scale: 1, opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center"
          exit={{ scale: 0.6, opacity: 0 }}
          initial={{ scale: 0.6, opacity: 0 }}
          key={status}
          transition={{ duration: 0.2, ease }}
        >
          {status === 'pending' && (
            <span className="h-1.5 w-1.5 rounded-full bg-[#C5CCD1]" />
          )}
          {status === 'pass' && (
            <svg
              aria-hidden
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 16 16"
            >
              <circle cx="8" cy="8" fill="#66BF3C" r="8" />
              <path
                d="m4.75 8.25 2.1 2.1 4.4-4.6"
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.6"
              />
            </svg>
          )}
          {status === 'fail' && (
            <svg
              aria-hidden
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 16 16"
            >
              <circle cx="8" cy="8" fill="#FF4400" r="8" />
              <path
                d="m5.5 5.5 5 5m0-5-5 5"
                stroke="#fff"
                strokeLinecap="round"
                strokeWidth="1.6"
              />
            </svg>
          )}
          {status === 'fixing' && (
            <motion.svg
              animate={{ rotate: 360 }}
              aria-hidden
              className="h-4 w-4"
              fill="none"
              transition={{ duration: 0.9, ease: 'linear', repeat: Infinity }}
              viewBox="0 0 16 16"
            >
              <circle cx="8" cy="8" r="6.5" stroke="#E5D6F3" strokeWidth="2" />
              <path
                d="M8 1.5a6.5 6.5 0 0 1 6.5 6.5"
                stroke="#6F2CAC"
                strokeLinecap="round"
                strokeWidth="2"
              />
            </motion.svg>
          )}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

/** List icon, drawn in the same flat, filled style as the other home icons */
export function AgentTest(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" fillRule="evenodd">
        <rect fill="#A470D5" height={40} rx={10} width={40} x={2} y={6} />
        <path
          d="m12.5 26.5 6 6 13-14"
          stroke="#FFF"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={4.5}
        />
        <path
          d="M40 0c.6 3.9 2.1 5.4 6 6-3.9.6-5.4 2.1-6 6-.6-3.9-2.1-5.4-6-6 3.9-.6 5.4-2.1 6-6Z"
          fill="#FFC445"
        />
      </g>
    </svg>
  );
}
