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
import { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../../../lib/tailwind';

export const Toolbar: FC<{ slide: number }> = ({ slide }) => {
  return (
    <motion.div
      initial={{ y: -40 }}
      animate={{ y: 0 }}
      exit={{ y: -40 }}
      className={cn(
        'absolute top-0 left-0 h-10 border-b border-b-[#D9E0E6] flex items-center px-2 justify-between right-0 overflow-hidden',
        slide === 4 && 'lg:right-[320px]'
      )}
    >
      <div className="flex mr-2">
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
