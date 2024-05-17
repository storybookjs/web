import type { FC } from 'react';
import { motion } from 'framer-motion';
import { UndoIcon } from '@storybook/icons';
import { Tabs } from './tabs';
import { Controls } from './controls';

export const PanelControls: FC = () => {
  return (
    <motion.div
      animate={{ y: 0, opacity: 1 }}
      className="absolute bottom-0 left-0 w-full h-[50%] sm:h-[40%] lg:bottom-auto lg:left-auto lg:top-0 lg:right-0 lg:h-full lg:w-[400px] border-t border-t-[#D9E0E6] lg:border-t-0 lg:border-l lg:border-l-[#D9E0E6] flex flex-col text-black"
      exit={{ y: 40, opacity: 0 }}
      initial={{ y: 40, opacity: 0 }}
    >
      <Tabs active={0} />
      <div className="flex h-10 items-center border-b border-b-[#D9E0E6]">
        <div className="text-[13px] w-1/2 md:w-1/2 flex-shrink-0 pl-4">
          Name
        </div>
        <div className="text-[13px] w-1/2 md:w-1/2 flex justify-between items-center pr-4 ">
          <div>Controls</div>
          <UndoIcon className="text-[#73828C]" />
        </div>
      </div>
      <Controls isPanel />
    </motion.div>
  );
};
