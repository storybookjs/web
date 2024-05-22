import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@repo/utils';
import {
  ChevronSmallDownIcon,
  DiamondIcon,
  ExpandAltIcon,
  PassedIcon,
} from '@storybook/icons';
import { Chrome } from '../../../icons/chrome';
import { Tabs } from './tabs';
import { Toolbar } from './toolbar';
import componentSmall from './component-small.svg';
// import { Component } from './component';

export const SlideVisualTesting = () => {
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
        {/* <Component /> */}
        <Image
          alt="Component"
          className="max-h-full sm:hidden"
          src={componentSmall}
        />
      </div>
      <Toolbar slide={1} />
      <div className="absolute bottom-0 left-0 w-full h-[55%] sm:h-[40%] lg:bottom-auto lg:left-auto lg:top-0 lg:right-0 lg:h-full lg:w-[400px] border-t border-t-[#D9E0E6] lg:border-t-0 lg:border-l lg:border-l-[#D9E0E6] flex flex-col">
        <Tabs active={1} slide={4} />
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
          {/* <Image alt="Component" src={component} /> */}
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
      </div>
    </motion.div>
  );
};
