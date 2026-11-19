import type { FC, ReactNode, SVGProps } from 'react';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { cn } from '@repo/utils';

/**
 * Coded media for the "Agents reuse what you already have" item in the
 * Document list. An agent reads the Button docs in Storybook (the preview,
 * then the props, then the examples) and then drops that same Button into the
 * checkout form it's building instead of writing a new one.
 * Authored on the 480px stage that IllustratedFeatureList scales to fit.
 */

const PHASES = ['preview', 'props', 'examples', 'build', 'done'] as const;
type Phase = (typeof PHASES)[number];

/** How long each phase holds before the next, in ms. The loop restarts after `done`. */
const PHASE_DURATION: Record<Phase, number> = {
  preview: 1300,
  props: 1500,
  examples: 1300,
  build: 1400,
  done: 3200,
};

const STATUS: Record<Phase, ReactNode> = {
  preview: 'Reading the Button docs',
  props: 'Checking its props',
  examples: 'Comparing 4 examples',
  build: (
    <>
      Using your <Code>&lt;Button&gt;</Code>
    </>
  ),
  done: 'Reused Button. No new code',
};

const PROPS = [
  ['variant', "'primary' | 'outline'"],
  ['size', "'sm' | 'md' | 'lg'"],
  ['icon', 'ReactNode'],
];

const ease = [0.16, 1, 0.3, 1] as const;

function usePhase(): Phase {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>('preview');

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

  return reduceMotion ? 'done' : phase;
}

export const DocumentAgentMedia: FC = () => {
  const phase = usePhase();
  const reading =
    phase === 'preview' || phase === 'props' || phase === 'examples';
  const placed = phase === 'build' || phase === 'done';

  return (
    <div
      aria-label="An agent reads the Button docs, props and examples in Storybook, then reuses that Button in the checkout form it is building."
      className="relative h-full w-full font-sans text-[#2E3438]"
      role="img"
    >
      {/* The Button docs page in Storybook */}
      <motion.div
        animate={{ opacity: reading ? 1 : 0.92 }}
        className="absolute left-[20px] top-[52px] w-[268px] rounded-md bg-white shadow-[0_18px_36px_-14px_rgba(46,110,20,0.4)]"
        transition={{ duration: 0.4 }}
      >
        <div className="flex h-8 items-center gap-1.5 border-b border-[#E3E6E8] px-3">
          <span className="h-2 w-2 rounded-full bg-[#F28B6D]" />
          <span className="h-2 w-2 rounded-full bg-[#F5C451]" />
          <span className="h-2 w-2 rounded-full bg-[#7BBF4F]" />
          <span className="ml-2 text-[11px] font-bold text-[#73828C]">
            Button · Docs
          </span>
        </div>
        <div className="flex flex-col gap-3 p-4">
          <div>
            <div className="text-[17px] font-extrabold leading-6">Button</div>
            <div className="mt-1.5 h-1.5 w-[86%] rounded-full bg-[#E8ECEF]" />
            <div className="mt-1.5 h-1.5 w-[62%] rounded-full bg-[#E8ECEF]" />
          </div>

          <Readable active={phase === 'preview'}>
            <div className="flex items-center justify-center gap-2 py-4">
              <FakeButton>Continue</FakeButton>
              <FakeButton variant="outline">Cancel</FakeButton>
            </div>
          </Readable>

          <Readable active={phase === 'props'}>
            <div className="divide-y divide-[#EEF0F2] text-[11px]">
              {PROPS.map(([name, type]) => (
                <div className="flex h-7 items-center px-2.5" key={name}>
                  <span className="w-[64px] font-bold">{name}</span>
                  <span className="font-mono text-[10px] text-[#6F2CAC]">
                    {type}
                  </span>
                </div>
              ))}
            </div>
          </Readable>

          <Readable active={phase === 'examples'}>
            <div className="grid grid-cols-4 gap-1.5 p-2">
              <Example>
                <FakeButton size="xs">Go</FakeButton>
              </Example>
              <Example>
                <FakeButton size="xs" variant="outline">
                  Go
                </FakeButton>
              </Example>
              <Example>
                <span className="h-3 w-7 rounded-[3px] bg-[#029CFD]" />
              </Example>
              <Example>
                <span className="flex h-3 w-7 items-center justify-center gap-0.5 rounded-[3px] bg-[#029CFD]">
                  <span className="h-1 w-1 rounded-full bg-white" />
                  <span className="h-0.5 w-3 rounded-full bg-white/80" />
                </span>
              </Example>
            </div>
          </Readable>
        </div>
      </motion.div>

      {/* The screen the agent is building */}
      <div className="absolute bottom-[28px] right-[20px] w-[212px] overflow-hidden rounded-md bg-white shadow-[0_24px_48px_-16px_rgba(46,110,20,0.5)]">
        <div className="flex h-11 items-center gap-2 border-b border-[#E3E6E8] px-3.5">
          <span className="rounded-full bg-[#6F2CAC] px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-white">
            Agent
          </span>
          <span className="font-mono text-[11px] text-[#73828C]">
            CheckoutForm.tsx
          </span>
        </div>
        <div className="flex flex-col gap-3 p-4">
          <div className="text-[15px] font-extrabold">Checkout</div>
          <Field label="Email" />
          <Field label="Card number" />
          <div
            className={cn(
              'relative flex h-10 items-center justify-center rounded-md border border-dashed transition-colors duration-300',
              placed ? 'border-transparent' : 'border-[#1EA7FD] bg-[#E6F4FD]',
            )}
          >
            <AnimatePresence>
              {placed ? (
                <motion.div
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="absolute inset-0"
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  initial={{ opacity: 0, scale: 0.92, y: -10 }}
                  transition={{ duration: 0.5, ease }}
                >
                  <FakeButton block>Place order</FakeButton>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
        <div
          className={cn(
            'flex h-10 items-center border-t border-[#E3E6E8] px-3.5 text-[12px] font-bold transition-colors duration-300',
            phase === 'done' ? 'bg-[#F1FAEC] text-[#2E7D0F]' : 'text-[#6F2CAC]',
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
              {STATUS[phase]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

/** A docs block the agent can be reading; the active one gets a focus ring */
const Readable: FC<{ active: boolean; children: ReactNode }> = ({
  active,
  children,
}) => {
  return (
    <div className="relative rounded border border-[#E3E6E8]">
      {children}
      <motion.div
        animate={{ opacity: active ? 1 : 0 }}
        className="pointer-events-none absolute -inset-[3px] rounded-[6px] border-2 border-[#6F2CAC] bg-[#6F2CAC]/[0.06]"
        initial={false}
        transition={{ duration: 0.3, ease }}
      />
    </div>
  );
};

const Example: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="flex h-9 items-center justify-center rounded-[3px] bg-[#F6F9FC]">
    {children}
  </div>
);

const Field: FC<{ label: string }> = ({ label }) => (
  <div>
    <div className="mb-1 text-[10px] font-bold text-[#73828C]">{label}</div>
    <div className="h-7 rounded border border-[#D9E0E6]" />
  </div>
);

const FakeButton: FC<{
  children: ReactNode;
  variant?: 'primary' | 'outline';
  size?: 'xs' | 'md';
  block?: boolean;
}> = ({ children, variant = 'primary', size = 'md', block }) => (
  <span
    className={cn(
      'flex items-center justify-center rounded-md font-bold',
      size === 'md' ? 'h-8 px-3.5 text-[12px]' : 'h-4 px-1.5 text-[8px]',
      variant === 'primary'
        ? 'bg-[#029CFD] text-white'
        : 'border border-[#029CFD] text-[#0077C2]',
      block && 'h-10 w-full text-[13px]',
    )}
  >
    {children}
  </span>
);

function Code({ children }: { children: ReactNode }) {
  return (
    <span className="rounded bg-[#F0E8F8] px-1 font-mono text-[11px]">
      {children}
    </span>
  );
}

/** List icon, drawn in the same flat, filled style as the other Document icons */
export function AgentReuse(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" fillRule="evenodd">
        <rect fill="#37D5D3" height={30} rx={6} width={24} x={2} y={4} />
        <rect fill="#D7F7F6" height={3} rx={1.5} width={14} x={7} y={11} />
        <rect fill="#D7F7F6" height={3} rx={1.5} width={10} x={7} y={18} />
        <rect fill="#A470D5" height={22} rx={6} width={28} x={18} y={22} />
        <rect fill="#FFF" height={6} rx={3} width={16} x={24} y={30} />
        <path
          d="M40 2c.5 3.3 1.8 4.6 5 5-3.2.4-4.5 1.7-5 5-.5-3.3-1.8-4.6-5-5 3.2-.4 4.5-1.7 5-5Z"
          fill="#FFC445"
        />
      </g>
    </svg>
  );
}
