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
import { Controls } from './controls';
import { Component } from './component';

export const Doc: FC = () => {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="absolute top-10 left-1/2 w-full text-black max-w-[840px] -translate-x-1/2 pt-8 md:pt-12 px-6"
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
    >
      <div className="mb-4 text-3xl font-bold md:mb-6">TimeFrame</div>
      <div className="mb-8 sm:hidden">
        TimeFrame is a component that allows you to select a range of data
        points from a time period.
      </div>
      <div className="hidden mb-8 sm:block">
        TimeFrame is a component that allows you to select a range of data
        points from a time period. It combines a time chart visualization and
        slider. TimeFrames are often used in tandem with a form or as a facet in
        search.
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
        <div className="flex justify-center w-full px-4 py-4 sm:py-16">
          <Component />
        </div>
      </div>
      <div>
        <div className="flex mb-2">
          <div className="text-[13px] w-[22%] pl-4">Name</div>
          <div className="text-[13px] w-[28%]">Description</div>
          <div className="text-[13px] w-[25%]">Default</div>
          <div className="text-[13px] w-[25%]">Controls</div>
        </div>
        <div className="rounded border border-[#D9E0E6] mb-8">
          <Controls />
        </div>
      </div>
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
