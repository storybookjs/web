import { motion } from 'framer-motion';
import { Tabs } from './tabs';
import {
  ChevronSmallDownIcon,
  DiamondIcon,
  ExpandAltIcon,
  PassedIcon,
} from '@storybook/icons';
import { Chrome } from '../../../../components/icons/chrome';
import Image from 'next/image';
import timeframe1 from './timeframe-1.svg';

export const PanelVisualTesting = ({ slide }: { slide: number }) => {
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 40, opacity: 0 }}
      className="absolute bottom-0 left-0 w-full h-[50%] sm:h-[40%] lg:bottom-auto lg:left-auto lg:top-0 lg:right-0 lg:h-full lg:w-[400px] border-t border-t-[#D9E0E6] lg:border-t-0 lg:border-l lg:border-l-[#D9E0E6] flex flex-col"
    >
      <Tabs active={1} slide={slide} />
      <div className="hidden sm:flex border-b border-b-[#D9E0E6] text-black text-sm h-10 items-center justify-between flex-shrink-0 px-4 bg-[#F6F9FC]">
        <span>👀 Running visual test 97/248...</span>
        <ExpandAltIcon className="text-slate-500" />
      </div>
      <div className="border-b border-b-[#D9E0E6] text-black text-sm px-4 py-3">
        <div className="flex items-center gap-2 mb-1 font-bold">
          No changes <PassedIcon className="text-green-500" />
        </div>
        <div className="text-slate-500">3 modes, 3 browsers • Ran 1m ago</div>
      </div>
      <div className="flex-1 px-8 py-6">
        <Image priority src={timeframe1} alt="TimeFrame" />
      </div>
      <div className="border-t border-t-[#D9E0E6] text-[#73828C] h-10 text-sm px-4 flex items-center gap-5">
        <div className="flex items-center gap-1.5">
          <DiamondIcon />
          Mobile Light <ChevronSmallDownIcon />
        </div>
        <div className="flex items-center gap-1.5">
          <Chrome />
          Chrome <ChevronSmallDownIcon />
        </div>
      </div>
    </motion.div>
  );
};
