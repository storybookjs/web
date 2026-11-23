import { useEffect, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@repo/utils';
import {
  ChangedIcon,
  CheckIcon,
  ChevronSmallDownIcon,
  DiamondIcon,
  ExpandAltIcon,
  FastForwardIcon,
  PassedIcon,
  PlayBackIcon,
  PlayNextIcon,
  RefreshIcon,
  RewindIcon,
} from '@storybook/icons';
import { Chrome } from '../../icons/chrome';
import { Tabs } from './tabs';
import { Toolbar } from './toolbar';
import { ComponentInteractions } from './component-interaction';
import { ComponentSmall } from './component-small';
import { ComponentVTA } from './component-vta';
import { ComponentDiff1 } from './component-diff1';
import { ComponentDiff2 } from './component-diff2';

/** How long the interactions run before the panel switches to visual tests, in ms */
const INTERACTIONS_DURATION = 3200;

type Phase = 'interactions' | 'visualTests';

export function SlideTesting({
  initialPhase = 'interactions',
}: {
  initialPhase?: Phase;
}) {
  const [phase, setPhase] = useState<Phase>(initialPhase);

  useEffect(() => {
    if (phase !== 'interactions') return;

    const timeout = setTimeout(() => {
      setPhase('visualTests');
    }, INTERACTIONS_DURATION);

    return () => {
      clearTimeout(timeout);
    };
  }, [phase]);

  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="absolute left-0 top-0 h-full w-full flex-1 bg-white"
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
    >
      <div
        className={cn(
          'absolute top-10 flex h-[calc(45%-40px)] w-full items-center justify-center bg-white p-4 text-black transition-all sm:h-[calc(60%-40px)] sm:p-8 lg:h-[calc(100%-40px)] lg:w-[calc(100%-400px)]',
        )}
      >
        {phase === 'interactions' ? (
          <ComponentInteractions />
        ) : (
          <ComponentVTA />
        )}
        <ComponentSmall className="max-h-full sm:hidden" />
      </div>
      <Toolbar />
      <div className="absolute bottom-0 left-0 flex h-[55%] w-full flex-col border-t border-t-[#D9E0E6] text-black sm:h-[40%] lg:bottom-auto lg:left-auto lg:right-0 lg:top-0 lg:h-full lg:w-[400px] lg:border-l lg:border-t-0 lg:border-l-[#D9E0E6]">
        <Tabs
          active={phase === 'interactions' ? 0 : 1}
          tabs={['Interactions', 'Visual tests']}
        />
        {phase === 'interactions' ? (
          <InteractionsPanel />
        ) : (
          <VisualTestsPanel />
        )}
      </div>
    </motion.div>
  );
}

const list = {
  visible: {
    transition: { staggerChildren: 0.4, delayChildren: 0.6 },
  },
  hidden: {
    transition: { staggerChildren: 0.05 },
  },
};

const item = {
  visible: {
    opacity: 1,
    y: 0,
  },
  hidden: {
    opacity: 0,
    y: 10,
  },
};

function InteractionsPanel() {
  const [text, setText] = useState('Runs');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setText('Pass');
    }, 2400);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <div className="flex h-10 flex-shrink-0 items-center gap-3 border-b border-b-[#D9E0E6] bg-[#F7F9FC] px-4">
        <motion.div
          animate={{ backgroundColor: '#7ABF39' }}
          className="flex h-6 w-14 items-center justify-center rounded px-3 text-[11px] font-bold uppercase tracking-widest text-white"
          initial={{ backgroundColor: '#FFAC31' }}
          transition={{ delay: 2.4 }}
        >
          {text}
        </motion.div>
        <div className="flex h-6 flex-shrink-0 items-center justify-center rounded border border-slate-300 px-2 text-[13px] text-[#818386]">
          Scroll to end
        </div>
        <div className="flex">
          <div className="flex h-7 w-7 items-center justify-center text-[#2E3438]">
            <RewindIcon />
          </div>
          <div className="flex h-7 w-7 items-center justify-center text-[#2E3438]">
            <PlayBackIcon />
          </div>
          <div className="flex h-7 w-7 items-center justify-center text-[#BABEC2]">
            <PlayNextIcon />
          </div>
          <div className="flex h-7 w-7 items-center justify-center text-[#BABEC2]">
            <FastForwardIcon />
          </div>
          <div className="flex h-7 w-7 items-center justify-center text-[#BABEC2]">
            <RefreshIcon />
          </div>
        </div>
      </div>
      <motion.div animate="visible" initial="hidden" variants={list}>
        <Line>
          <Span color="#0271b6">within</Span>
          <Span color="#000000">{`(<`}</Span>
          <Span color="#6f2cac">div</Span>
          <Span color="#1f99e5">#main</Span>
          <Span color="#000000">{`>).`}</Span>
          <Span color="#0271b6">findByRole</Span>
          <Span color="#000000">(</Span>
          <Span color="#16b242">{`"button"`}</Span>
          <Span color="#000000">{`, {`}</Span>
          <Span color="#5f5f5f">name: </Span>
          <Span color="#16b242">{`"Add to cart"`}</Span>
          <Span color="#000000">{` })`}</Span>
        </Line>
        <Line>
          <Span color="#000000">userEvent.</Span>
          <Span color="#0271b6">click</Span>
          <Span color="#000000">{`(<`}</Span>
          <Span color="#6f2cac">button</Span>
          <Span color="#0271b6">.add-to-cart</Span>
          <Span color="#000000">{`>)`}</Span>
        </Line>
        <Line>
          <Span color="#0271b6">within</Span>
          <Span color="#000000">{`(<`}</Span>
          <Span color="#6f2cac">button</Span>
          <Span color="#1f99e5">.add-to-cart</Span>
          <Span color="#000000">).</Span>
          <Span color="#0271b6">findByRole</Span>
          <Span color="#000000">(</Span>
          <Span color="#16b242">{`"image"`}</Span>
          <Span color="#000000">{`, {`}</Span>
          <Span color="#5f5f5f">name: </Span>
          <Span color="#16b242">{`"checkmark"`}</Span>
          <Span color="#000000">{` })`}</Span>
        </Line>
        <Line>
          <Span color="#0271b6">expect</Span>
          <Span color="#000000">(</Span>
          <Span color="#fc8047">SVGSVGElement</Span>
          <Span color="#000000">).</Span>
          <Span color="#0271b6">toBeInTheDocument</Span>
          <Span color="#000000">()</Span>
        </Line>
        <Line>
          <Span color="#0271b6">within</Span>
          <Span color="#000000">{`(<`}</Span>
          <Span color="#6f2cac">button</Span>
          <Span color="#1f99e5">.add-to-cart</Span>
          <Span color="#000000">{`>).`}</Span>
          <Span color="#0271b6">findByText</Span>
          <Span color="#000000">(</Span>
          <Span color="#16b242">{`"Added"`}</Span>
          <Span color="#000000">)</Span>
        </Line>
      </motion.div>
    </>
  );
}

function Line({ children }: { children: ReactNode }) {
  return (
    <motion.div
      className="flex items-center gap-4 border-b border-b-[#D9E0E6] px-5 py-3"
      variants={item}
    >
      <div className="relative flex h-4 w-4 items-center justify-center">
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          variants={{
            visible: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
        >
          <CheckIcon className="flex-shrink-0 text-[#7ABF39]" />
        </motion.div>
        <motion.div
          className="h-2 w-2 rounded-full bg-slate-200"
          variants={{
            visible: { opacity: 0 },
            hidden: { opacity: 1 },
          }}
        />
      </div>
      <div className="leading-3">{children}</div>
    </motion.div>
  );
}

function Span({
  children,
  color = '#2E3438',
}: {
  children: string;
  color?: string;
}) {
  return (
    <span className="font-mono text-xs" style={{ color }}>
      {children}
    </span>
  );
}

function VisualTestsPanel() {
  const [counter, setCounter] = useState(0);
  const [changeTitle, setChangeTitle] = useState('No changes');

  const DELAY = 0.6;
  const DURATION = 2;

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        const interval = setInterval(() => {
          setCounter((prevCounter) => {
            if (prevCounter >= 100) {
              clearInterval(interval);
              return 100;
            }
            return prevCounter + 1;
          });
        }, DURATION * 10);

        return () => {
          clearInterval(interval);
        };
      },
      DELAY * 100 + 600,
    );

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (counter === 100) {
      setChangeTitle('Changes found');
    }
  }, [counter]);

  return (
    <>
      <motion.div
        animate={{
          height: [null, 40, 40, 0],
          borderBottomColor: ['#ffffff', '#D9E0E6', '#D9E0E6', '#ffffff'],
        }}
        className="relative flex-shrink-0 overflow-hidden border-b"
        initial={{ height: 0, borderBottomColor: 'transparent' }}
        transition={{ delay: DELAY, duration: 3, times: [0, 0.1, 0.9, 1] }}
      >
        <div className="relative flex h-10 flex-shrink-0 items-center justify-between bg-[#F6F9FC] px-4 text-sm text-black">
          <span className="relative z-10">
            👀 Running visual test {Math.floor(counter * 1.24)}/124...
          </span>
          <ExpandAltIcon className="relative z-10 text-slate-500" />
          <div
            className="absolute left-0 top-0 h-full bg-[#E3F3FF]"
            style={{ width: `${counter.toString()}%` }}
          />
        </div>
      </motion.div>
      <div className="border-b border-b-[#D9E0E6] px-4 py-3 text-sm text-black">
        <div className="mb-1 flex items-center gap-2 font-bold">
          {changeTitle}
          <div className="relative h-[14px] w-[14px]">
            <motion.div
              animate={{ opacity: 0 }}
              className="absolute left-0 top-0 text-green-500"
              initial={{ opacity: 1 }}
              transition={{ delay: DURATION + DELAY }}
            >
              <PassedIcon />
            </motion.div>
            <motion.div
              animate={{ opacity: 1 }}
              className="absolute left-0 top-0 text-[#e69d00]"
              initial={{ opacity: 0 }}
              transition={{ delay: DURATION + DELAY }}
            >
              <ChangedIcon />
            </motion.div>
          </div>
        </div>
        <div className="text-xs text-slate-500">
          3 modes, 3 browsers • Ran 1m ago
        </div>
      </div>
      <div className="flex flex-1 items-start justify-start px-8 py-6">
        {counter !== 100 && <ComponentDiff1 />}
        {counter === 100 && <ComponentDiff2 />}
      </div>
      <div className="flex h-10 items-center gap-5 border-t border-t-[#D9E0E6] px-4 text-sm text-[#73828C]">
        <div className="flex items-center gap-1.5">
          <DiamondIcon />
          Mobile Light <ChevronSmallDownIcon />
        </div>
        <div className="flex items-center gap-1.5">
          <Chrome />
          Chrome <ChevronSmallDownIcon />
        </div>
      </div>
    </>
  );
}
