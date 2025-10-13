import { cn } from '@repo/utils';
import {
  BookmarkHollowIcon,
  ChevronSmallDownIcon,
  ChevronSmallRightIcon,
  CogIcon,
  ComponentIcon,
  DocumentIcon,
  ExpandAltIcon,
  FolderIcon,
  PlayIcon,
  PlusIcon,
  SearchIcon,
} from '@storybook/icons';
import type { FC } from 'react';
import { StorybookLogo } from '../../logos/storybook';

export const Sidebar: FC<{ slide: number }> = ({ slide }) => {
  return (
    <div className="hidden sm:block w-[230px] h-full bg-[#F7F9FC] border-r border-r-[#D9E0E6] px-3">
      <div className="flex items-center justify-between pt-5 pb-4 pl-2">
        <StorybookLogo color="dark" />
        <div className="flex items-center">
          <div className="flex items-center justify-center w-8 h-8">
            <CogIcon className="text-[#73828C]" />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 mb-4">
        <div className="flex flex-1 border border-[#D9E0E6] rounded h-8 w-full text-sm items-center px-2 gap-2 text-[#73828C]">
          <SearchIcon />
          Find components
        </div>
        <div className="w-8 h-8 border border-[#D9E0E6] rounded flex items-center justify-center text-[#73828C]">
          <PlusIcon />
        </div>
      </div>
      <SidebarLine ic="docs" label="Introduction" />
      <div className="text-[#73828C] text-[11px] uppercase font-bold tracking-wider pt-5 pb-2 flex items-center px-2 justify-between">
        <div className="flex gap-1">
          <ChevronSmallRightIcon className="text-[#73828C] group-hover:text-white" />
          Application
        </div>
        <ExpandAltIcon size={10} />
      </div>
      <SidebarLine ar="right" ic="component" label="ProductCard" />
      <SidebarLine
        active={slide === 4}
        ic="docs"
        label="Documentation"
        lvl={2}
      />
      <SidebarLine ic="story" label="Default" lvl={2} />
      <SidebarLine active={slide === 1} ic="story" label="Expanded" lvl={2} />
      <SidebarLine
        active={slide === 2 || slide === 3}
        ic="story"
        label="Added to cart"
        lvl={2}
      />
      <SidebarLine ar="right" ic="component" label="Dashboard" lvl={1} />
      <SidebarLine ar="right" ic="component" label="Homepage" lvl={1} />
      <SidebarLine ar="right" ic="component" label="User Profile" lvl={1} />
      <SidebarLine ar="right" ic="component" label="Sign In" lvl={1} />
      <div className="text-[#73828C] text-[11px] uppercase font-bold tracking-wider pt-5 pb-2 flex items-center px-2 justify-between">
        <div className="flex gap-1">
          <ChevronSmallRightIcon className="text-[#73828C] group-hover:text-white" />
          Design System
        </div>
        <ExpandAltIcon size={10} />
      </div>
      <SidebarLine ar="down" ic="group" label="ActivityList" />
      <SidebarLine ar="down" ic="group" label="Form" />
      <SidebarLine ar="down" ic="component" label="Avatar" />
      <SidebarLine ar="down" ic="component" label="Button" />
      <SidebarLine ar="down" ic="component" label="Footer" />
      <SidebarLine ar="down" ic="component" label="Header" />
      <SidebarLine ar="down" ic="component" label="Pagination" />
    </div>
  );
};

const SidebarLine: FC<{
  ic: 'docs' | 'story' | 'group' | 'component';
  label: string;
  ar?: 'down' | 'right';
  lvl?: 1 | 2;
  active?: boolean;
}> = ({ ic, label, ar, lvl = 1, active }) => {
  return (
    <div
      className={cn(
        'group flex items-center gap-1.5 rounded h-7 cursor-default select-none',
        lvl === 1 && 'pl-2 pr-2',
        lvl === 2 && 'pl-11 pr-2',
        active && 'bg-blue-500',
      )}
    >
      {ar === 'down' && (
        <ChevronSmallDownIcon
          className={cn('text-[#73828C]', active && 'text-white')}
        />
      )}
      {ar === 'right' && (
        <ChevronSmallRightIcon
          className={cn('text-[#73828C]', active && 'text-white')}
        />
      )}
      {ic === 'docs' && (
        <DocumentIcon
          className={cn('text-[#FFAE00]', active && 'text-white')}
        />
      )}
      {ic === 'component' && (
        <ComponentIcon
          className={cn('text-[#029CFD]', active && 'text-white')}
        />
      )}
      {ic === 'group' && (
        <FolderIcon className={cn('text-[#6F2CAC]', active && 'text-white')} />
      )}
      {ic === 'story' && (
        <BookmarkHollowIcon
          className={cn('text-[#37D5D3]', active && 'text-white')}
        />
      )}
      <div className={cn('text-black text-sm', active && 'text-white')}>
        {label}
      </div>
    </div>
  );
};
