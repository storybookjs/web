import type { FC } from 'react';
import {
  ChevronSmallDownIcon,
  CloseIcon,
  SidebarAltIcon,
} from '@storybook/icons';
import { cn } from '@repo/utils';

export const Tabs: FC<{ active?: number; slide?: number }> = ({
  active = 0,
  slide,
}) => {
  let tabs = ['Controls', 'Interactions'];
  if (slide === 4) tabs = ['Controls', 'Visual tests'];

  return (
    <div className="w-full h-10 flex flex-shrink-0 border-b border-b-[#D9E0E6] justify-between items-center">
      <div className="flex h-full">
        {tabs.map((label, i) => (
          <div
            className={cn(
              'h-full flex items-center text-sm px-4 font-bold text-[#76828B] flex-shrink-0',
              i === 2 && 'hidden md:flex',
              i === 3 && 'hidden md:flex',
              i === 4 && 'hidden lg:flex',
              i === active && 'border-b-2 border-b-blue-500 text-blue-500',
            )}
            key={label}
          >
            {label}
          </div>
        ))}
        <div className="h-full flex items-center text-sm px-4 font-bold text-[#76828B] gap-1">
          <span className="hidden min-[360px]:block">Addons</span>
          <ChevronSmallDownIcon />
        </div>
      </div>
      <div className="flex text-[#76828B] pr-2">
        <div className="items-center justify-center hidden w-7 h-7 sm:flex">
          <SidebarAltIcon />
        </div>
        <div className="flex items-center justify-center w-7 h-7">
          <CloseIcon />
        </div>
      </div>
    </div>
  );
};
