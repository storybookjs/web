import type { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';
import {
  PlayBackIcon,
  PlayNextIcon,
  RewindIcon,
  FastForwardIcon,
  RefreshIcon,
  CheckIcon,
} from '@storybook/icons';
import { Tabs } from './tabs';

export const PanelInteractions: FC = () => {
  return (
    <motion.div
      animate={{ y: 0, opacity: 1 }}
      className="absolute bottom-0 left-0 w-full h-[50%] sm:h-[40%] lg:bottom-auto lg:left-auto lg:top-0 lg:right-0 lg:h-full lg:w-[400px] border-t border-t-[#D9E0E6] lg:border-t-0 lg:border-l lg:border-l-[#D9E0E6] flex flex-col text-black"
      exit={{ y: 40, opacity: 0 }}
      initial={{ y: 40, opacity: 0 }}
    >
      <Tabs active={1} />
      <div className="bg-[#F7F9FC] h-10 flex items-center px-4 border-b border-b-[#D9E0E6] justify-between">
        <div className="flex gap-3 items-center">
          <div className="h-6 bg-[#7ABF39] px-3 rounded text-[11px] font-bold uppercase tracking-widest flex items-center text-white">
            Pass
          </div>
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
      </div>
      <Line>
        <Span>userEvent.</Span>
        <Span color="#0271b6">type</Span>
        <Span>(</Span>
        <Span color="#0271b6">within</Span>
        <Span>(</Span>
        <Span>{`<`}</Span>
        <Span color="#6f2cac">div</Span>
        <Span color="#1f99e5">#storybook-root</Span>
        <Span>{`>`}</Span>
        <Span>).</Span>
        <Span color="#0271b6">getByTestId</Span>
        <Span>(</Span>
        <Span color="#16b242">{`"Email"`}</Span>
        <Span>{`), `}</Span>
        <Span color="#16b242">{`"email@provider.com"`}</Span>
        <Span>{`, { `}</Span>
        <Span>{`delay: `}</Span>
        <Span color="#6f2cac">100 </Span>
        <Span>{`})`}</Span>
      </Line>
      <Line>
        <Span>userEvent.</Span>
        <Span color="#0271b6">type</Span>
        <Span>(</Span>
        <Span color="#0271b6">within</Span>
        <Span>(</Span>
        <Span>{`<`}</Span>
        <Span color="#6f2cac">div</Span>
        <Span color="#1f99e5">#storybook-root</Span>
        <Span>{`>`}</Span>
        <Span>).</Span>
        <Span color="#0271b6">getByTestId</Span>
        <Span>(</Span>
        <Span color="#16b242">{`"Password"`}</Span>
        <Span>{`), `}</Span>
        <Span color="#16b242">{`"a-random-password"`}</Span>
        <Span>{`, { `}</Span>
        <Span>{`delay: `}</Span>
        <Span color="#6f2cac">100 </Span>
        <Span>{`})`}</Span>
      </Line>
      <Line>
        <Span>userEvent.</Span>
        <Span color="#0271b6">type</Span>
        <Span>(</Span>
        <Span color="#0271b6">within</Span>
        <Span>(</Span>
        <Span>{`<`}</Span>
        <Span color="#6f2cac">div</Span>
        <Span color="#1f99e5">#storybook-root</Span>
        <Span>{`>`}</Span>
        <Span>).</Span>
        <Span color="#0271b6">getByRole</Span>
        <Span>(</Span>
        <Span color="#16b242">{`"button"`}</Span>
        <Span>))</Span>
      </Line>
      <Line>
        <Span>expect</Span>
        <Span>(</Span>
        <Span color="#0271b6">within</Span>
        <Span>(</Span>
        <Span>{`<`}</Span>
        <Span color="#6f2cac">div</Span>
        <Span color="#1f99e5">#storybook-root</Span>
        <Span>{`>`}</Span>
        <Span>).</Span>
        <Span color="#0271b6">getByText</Span>
        <Span>(</Span>
        <Span color="#16b242">{`"Looking good!"`}</Span>
        <Span>)).</Span>
        <Span color="#0271b6">toBeInTheDocument</Span>
        <Span>()</Span>
      </Line>
    </motion.div>
  );
};

const Line = ({ children }: { children: ReactNode }) => (
  <div className="border-b border-b-[#D9E0E6] flex items-center px-4 gap-2 py-3">
    <CheckIcon className="text-[#7ABF39] flex-shrink-0" />
    <div className="leading-3">{children}</div>
  </div>
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
