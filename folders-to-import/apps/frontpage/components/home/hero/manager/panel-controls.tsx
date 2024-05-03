import { FC } from 'react';
import { motion } from 'framer-motion';
import { Controls } from './controls';
import { UndoIcon } from '@storybook/icons';
import { Tabs } from './tabs';

export const PanelControls: FC = () => {
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 40, opacity: 0 }}
      className="absolute bottom-0 left-0 w-full h-[215px] sm:h-[40%] border-t border-t-[#D9E0E6] text-black"
    >
      <Tabs active={0} />
      <div className="flex h-10 items-center border-b border-b-[#D9E0E6]">
        <div className="text-[13px] w-1/2 md:w-[28%] lg:w-[22%] pl-4">Name</div>
        <div className="text-[13px] w-[38%] lg:w-[28%] hidden md:block">
          Description
        </div>
        <div className="text-[13px] w-[25%] hidden lg:block">Default</div>
        <div className="text-[13px] w-1/2 md:w-1/3 lg:w-[25%] flex justify-between items-center pr-4 ">
          <div>Controls</div>
          <UndoIcon className="text-[#73828C]" />
        </div>
      </div>
      <Controls isPanel />
    </motion.div>
  );
};
