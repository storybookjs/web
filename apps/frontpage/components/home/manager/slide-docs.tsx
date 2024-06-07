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
      className="absolute left-0 top-0 h-full w-full flex-1 bg-white"
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
    >
      <Toolbar slide={4} />
      <motion.div
        animate={{
          x: '-50%',
          y: isMobile ? [0, -860, -860, 0] : [0, -900, -900, 0],
        }}
        className="absolute left-1/2 top-10 w-full max-w-[840px] -translate-x-1/2 px-6 pt-8 text-black md:pt-12"
        initial={{ x: '-50%', y: 0 }}
        transition={{ delay: 0.6, duration: 3.6, ease: 'easeInOut' }}
      >
        <div className="mb-4 text-3xl font-bold md:mb-6">ProductCard</div>
        <div className="mb-8 sm:hidden">
          The ProductCard component is designed to display product information
          in a compact, visually appealing widget.
        </div>
        <div className="mb-8 hidden sm:block">
          The ProductCard component is designed to display product information
          in a compact, visually appealing widget. This component is ideal for
          e-commerce websites or any application where products need to be
          showcased with an option to purchase.
        </div>
        <div className="mb-8 rounded border border-[#D9E0E6]">
          <div className="flex h-10 w-full items-center justify-between border-b border-b-[#D9E0E6] px-2">
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
              <div className="mx-2 h-6 w-px bg-[#D9E0E6]" />
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
          <div className="flex w-full justify-center px-4 sm:py-12">
            <ComponentSmall />
          </div>
        </div>
        <div className="mb-2 flex">
          <div className="w-[22%] pl-4 text-[13px]">Name</div>
          <div className="w-[28%] text-[13px]">Description</div>
          <div className="w-[25%] text-[13px]">Default</div>
          <div className="w-[25%] text-[13px]">Controls</div>
        </div>
        <div className="mb-12 rounded border border-[#D9E0E6]">
          <Controls isAnimated={false} />
        </div>
        <div className="mb-6 text-sm font-bold uppercase tracking-[0.25em] text-slate-500">
          Stories
        </div>
        <div className="mb-8">
          <div className="mb-4 text-xl font-bold md:mb-4">Default</div>
          <div className="flex w-full justify-center rounded border border-[#D9E0E6] px-4 sm:py-12">
            <ComponentSmall />
          </div>
        </div>
        <div className="mb-8">
          <div className="mb-4 text-xl font-bold md:mb-4">Expanded</div>
          <div className="flex w-full justify-center rounded border border-[#D9E0E6] px-4 py-6 sm:py-12 sm:pl-10">
            <ComponentDiff1 />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ToolbarButton: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-7 w-7 items-center justify-center text-[#73828C]">
      {children}
    </div>
  );
};
