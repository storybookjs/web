import { useEffect, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@repo/utils';
import {
  PlayBackIcon,
  PlayNextIcon,
  RewindIcon,
  FastForwardIcon,
  RefreshIcon,
  CheckIcon,
} from '@storybook/icons';
import { Tabs } from './tabs';
import { Toolbar } from './toolbar';
import { ComponentInteractions } from './component-interaction';
import { ComponentSmall } from './component-small';

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

export const SlideInteractions = () => {
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
    <motion.div
      animate={{ opacity: 1 }}
      className="absolute top-0 left-0 flex-1 w-full h-full bg-white"
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
    >
      <div
        className={cn(
          'absolute w-full top-10 h-[calc(45%-40px)] flex items-center justify-center text-black bg-white transition-all p-4 sm:p-8 sm:h-[calc(60%-40px)] lg:w-[calc(100%-400px)] lg:h-[calc(100%-40px)]',
        )}
      >
        <ComponentInteractions />
        <ComponentSmall className="max-h-full sm:hidden" />
      </div>
      <Toolbar slide={1} />
      <div className="absolute bottom-0 left-0 w-full h-[55%] sm:h-[40%] lg:bottom-auto lg:left-auto lg:top-0 lg:right-0 lg:h-full lg:w-[400px] border-t border-t-[#D9E0E6] lg:border-t-0 lg:border-l lg:border-l-[#D9E0E6] flex flex-col text-black">
        <Tabs active={1} />
        <div className="bg-[#F7F9FC] h-10 flex items-center px-4 border-b border-b-[#D9E0E6] gap-3 flex-shrink-0">
          <motion.div
            animate={{ backgroundColor: '#7ABF39' }}
            className="w-14 h-6 px-3 justify-center rounded text-[11px] font-bold uppercase tracking-widest flex items-center text-white"
            initial={{ backgroundColor: '#FFAC31' }}
            transition={{ delay: 2.4 }}
          >
            {text}
          </motion.div>
          <div className="text-[#818386] text-[13px] flex-shrink-0 border border-slate-300 h-6 px-2 rounded flex items-center justify-center">
            Scroll to end
          </div>
          <div className="flex">
            <div className="w-7 h-7 flex items-center justify-center text-[#2E3438]">
              <RewindIcon />
            </div>
            <div className="w-7 h-7 flex items-center justify-center text-[#2E3438]">
              <PlayBackIcon />
            </div>
            <div className="w-7 h-7 flex items-center justify-center text-[#BABEC2]">
              <PlayNextIcon />
            </div>
            <div className="w-7 h-7 flex items-center justify-center text-[#BABEC2]">
              <FastForwardIcon />
            </div>
            <div className="w-7 h-7 flex items-center justify-center text-[#BABEC2]">
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
      </div>
    </motion.div>
  );
};

const Line = ({ children }: { children: ReactNode }) => (
  <motion.div
    className="border-b border-b-[#D9E0E6] flex items-center px-5 gap-4 py-3"
    variants={item}
  >
    <div className="relative flex items-center justify-center w-4 h-4">
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
        variants={{
          visible: { opacity: 1 },
          hidden: { opacity: 0 },
        }}
      >
        <CheckIcon className="text-[#7ABF39] flex-shrink-0" />
      </motion.div>
      <motion.div
        className="w-2 h-2 rounded-full bg-slate-200"
        variants={{
          visible: { opacity: 0 },
          hidden: { opacity: 1 },
        }}
      />
    </div>
    <div className="leading-3">{children}</div>
  </motion.div>
);

const Span = ({
  children,
  color = '#2E3438',
}: {
  children: string;
  color?: string;
}) => (
  <span className="font-mono text-xs" style={{ color }}>
    {children}
  </span>
);
