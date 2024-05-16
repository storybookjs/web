import type { FC } from 'react';
import { motion } from 'framer-motion';
import { UndoIcon } from '@storybook/icons';
import { cn } from '@repo/utils';
import { Tabs } from './tabs';

const content = [
  {
    label: 'label',
    description: 'Label of component',
    default: 'Choose time frame',
    control: 'Usage frequency',
  },
  {
    label: 'startTime',
    description: 'Start time in 24h notation',
    default: 'undefined',
    control: 'Edit string',
    muted: true,
  },
  {
    label: 'endTime',
    description: 'End time in 24h notation',
    default: 'undefined',
    control: 'Edit string',
    muted: true,
  },
];

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
        <div className="text-[13px] w-1/2 md:w-24 flex-shrink-0 pl-4">Name</div>
        <div className="text-[13px] w-[25%] md:w-full hidden lg:block">
          Default
        </div>
        <div className="text-[13px] w-1/2 md:w-full flex justify-between items-center pr-4 ">
          <div>Controls</div>
          <UndoIcon className="text-[#73828C]" />
        </div>
      </div>
      <div>
        <div
          className={cn(
            'bg-[#F7F9FC] h-10 items-center px-4 text-[11px] tracking-widest uppercase font-bold text-[#2E3438] border-b border-b-[#D9E0E6] hidden sm:flex',
          )}
        >
          Props
        </div>
        {content.map((item) => (
          <div className="flex border-b border-b-[#D9E0E6]" key={item.label}>
            <div className="text-[13px] w-1/2 md:w-24 pl-4 py-2 flex-shrink-0">
              {item.label}
            </div>
            <div className="text-[13px] w-[25%] md:w-full hidden lg:flex py-2">
              <div className="bg-[#F6F9FC] border border-[#D9E0E6] h-5 px-1.5 rounded flex items-center">
                {item.default}
              </div>
            </div>
            <div className="text-[13px] w-1/2 md:w-full flex py-2 pr-4">
              <div
                className={cn(
                  'border border-[#D9E0E6] rounded w-full h-7 flex items-center px-2',
                  item.muted && 'text-[#73828C]',
                )}
              >
                {item.control}
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
