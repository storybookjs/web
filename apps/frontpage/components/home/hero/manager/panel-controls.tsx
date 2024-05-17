import type { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { UndoIcon } from '@storybook/icons';
import { cn } from '@repo/utils';
import { Tabs } from './tabs';

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
      <div>
        <Line
          control={<Input value="Generate" />}
          label="buttonLabel"
          required
        />
        <Line
          control={<Input value="What should I make?" />}
          label="placeholder"
          required
        />
        <Line control={<Boolean value />} label="disabled" />
        <Line control={<Color value="#FFD000" />} label="primaryColor" />
        <Line control={<Range value={0.6} />} label="playfulness" />
      </div>
    </motion.div>
  );
};

const Line = ({
  label,
  control,
  required = false,
}: {
  label: ReactNode;
  control: ReactNode;
  required?: boolean;
}) => {
  return (
    <div className="flex border-b border-b-[#D9E0E6] py-3">
      <div className="text-[13px] w-1/2 md:w-1/2 pl-4 flex-shrink-0 flex items-center">
        {label}
        {required ? <span className="text-red-500">*</span> : null}
      </div>
      <div className="text-[13px] w-1/2 md:w-1/2 flex pr-4">{control}</div>
    </div>
  );
};

const Input = ({
  value,
  muted = false,
}: {
  value: string;
  muted?: boolean;
}) => {
  return (
    <div
      className={cn(
        'border border-[#D9E0E6] rounded w-full h-7 flex items-center px-2',
        muted && 'text-[#73828C]',
      )}
    >
      {value}
    </div>
  );
};

const Boolean = ({ value }: { value: boolean }) => {
  return (
    <div className="relative flex items-center h-8 px-0.5 rounded-full bg-slate-200">
      <div className="relative z-10 flex items-center justify-center h-full w-14">
        False
      </div>
      <div className="relative z-10 flex items-center justify-center h-full w-14">
        True
      </div>
      <div
        className={cn(
          'absolute bg-white rounded-full w-14 h-7',
          value && 'left-[58px]',
          !value && 'left-0',
        )}
      />
    </div>
  );
};

const Color = ({
  value,
  muted = false,
}: {
  value: string;
  muted?: boolean;
}) => {
  return (
    <div
      className={cn(
        'border border-[#D9E0E6] rounded w-full h-7 flex items-center px-2 justify-between',
        muted && 'text-[#73828C]',
      )}
    >
      <div className="flex items-center gap-2">
        <div
          className="w-4 h-4 rounded border border-[#D9E0E6]"
          style={{ backgroundColor: value }}
        />
        {value}
      </div>
      <svg
        fill="none"
        height="12"
        width="12"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#a)" fill="#73828C">
          <path d="M7.7 1.399a.429.429 0 0 0-.828-.226l-2.571 9.429a.429.429 0 0 0 .827.225L7.699 1.4ZM2.846 3.1a.429.429 0 0 1 .055.603L.986 6l1.915 2.297a.429.429 0 0 1-.659.549L.1 6.274a.429.429 0 0 1 0-.548l2.143-2.572a.429.429 0 0 1 .604-.055ZM9.154 3.1a.429.429 0 0 0-.055.603L11.014 6 9.099 8.297a.429.429 0 0 0 .659.549L11.9 6.274a.429.429 0 0 0 0-.548L9.758 3.154a.429.429 0 0 0-.604-.055Z" />
        </g>
        <defs>
          <clipPath id="a">
            <path d="M0 0h12v12H0z" fill="#fff" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

const Range = ({ value }: { value: number }) => {
  return (
    <div className={cn('w-full flex items-center gap-2')}>
      <div>0</div>
      <div className="relative flex items-center w-full h-1.5 px-2 bg-white border rounded border-slate-200">
        <div
          className="absolute z-20 w-4 h-4 -ml-2 bg-white border rounded-full shadow-md border-slate-200"
          style={{ left: `${value * 100}%` }}
        />
        <div
          className="absolute left-0 z-10 h-full bg-green-500 rounded-full"
          style={{ width: `${value * 100}%` }}
        />
      </div>
      <div>100</div>
    </div>
  );
};
