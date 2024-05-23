import type { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';
import {
  GridAltIcon,
  GrowIcon,
  OutlineIcon,
  RulerIcon,
  ShareAltIcon,
  SyncIcon,
  ZoomIcon,
  ZoomOutIcon,
  ZoomResetIcon,
} from '@storybook/icons';
import { useMediaQuery } from '../../../hooks/use-media-query';
import { Controls } from './controls';
import { Toolbar } from './toolbar';
import { ComponentSmall } from './component-small';
import { ComponentDiff1 } from './component-diff1';

export const SlideDocs = () => {
  const [isMobile] = useMediaQuery('(max-width: 640px)');

  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="absolute top-0 left-0 flex-1 w-full h-full bg-white"
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
    >
      <Toolbar slide={2} />
      <motion.div
        animate={{ x: '-50%', y: isMobile ? -1000 : -1300 }}
        className="absolute top-10 left-1/2 w-full text-black max-w-[840px] -translate-x-1/2 pt-8 md:pt-12 px-6"
        initial={{ x: '-50%', y: 0 }}
        transition={{ delay: 0.6, duration: 3, ease: 'easeInOut' }}
      >
        <div className="mb-4 text-3xl font-bold md:mb-6">Card</div>
        <div className="mb-8 sm:hidden">
          AI Prompt is a component that allows you to select a range of data
          points from a time period.
        </div>
        <div className="hidden mb-8 sm:block">
          The Card component is designed to display product information in a
          compact, visually appealing widget. This component is ideal for
          e-commerce websites or any application where products need to be
          showcased with an option to purchase.
        </div>
        <div className="rounded border border-[#D9E0E6] mb-8">
          <div className="h-10 border-b border-b-[#D9E0E6] w-full flex items-center px-2 justify-between">
            <div className="flex">
              <ToolbarButton>
                <SyncIcon />
              </ToolbarButton>
              <ToolbarButton>
                <ZoomIcon />
              </ToolbarButton>
              <ToolbarButton>
                <ZoomOutIcon />
              </ToolbarButton>
              <ToolbarButton>
                <ZoomResetIcon />
              </ToolbarButton>
              <ToolbarButton>
                <GrowIcon />
              </ToolbarButton>
              <div className="w-px bg-[#D9E0E6] h-6 mx-2" />
              <ToolbarButton>
                <RulerIcon />
              </ToolbarButton>
              <ToolbarButton>
                <GridAltIcon />
              </ToolbarButton>
              <ToolbarButton>
                <OutlineIcon />
              </ToolbarButton>
            </div>
            <ToolbarButton>
              <ShareAltIcon />
            </ToolbarButton>
          </div>
          <div className="flex justify-center w-full px-4 py-10 sm:py-12">
            <ComponentSmall />
          </div>
        </div>
        <div className="flex mb-2">
          <div className="text-[13px] w-[22%] pl-4">Name</div>
          <div className="text-[13px] w-[28%]">Description</div>
          <div className="text-[13px] w-[25%]">Default</div>
          <div className="text-[13px] w-[25%]">Controls</div>
        </div>
        <div className="rounded border border-[#D9E0E6] mb-12">
          <Controls isAnimated={false} />
        </div>
        <div className="text-sm font-bold tracking-[0.25em] uppercase text-slate-500 mb-6">
          Stories
        </div>
        <div className="mb-8">
          <div className="mb-4 text-xl font-bold md:mb-4">Default</div>
          <div className="border border-[#D9E0E6] rounded flex justify-center w-full px-4 sm:py-12">
            <ComponentSmall />
          </div>
        </div>
        <div className="mb-8">
          <div className="mb-4 text-xl font-bold md:mb-4">Expanded</div>
          <div className="border border-[#D9E0E6] rounded flex justify-center w-full px-4 py-6 sm:py-12 sm:pl-10">
            <ComponentDiff1 />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ToolbarButton: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="text-[#73828C] w-7 h-7 flex items-center justify-center">
      {children}
    </div>
  );
};
