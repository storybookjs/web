import {
  GridAltIcon,
  GridIcon,
  GrowIcon,
  OutlineIcon,
  PhotoIcon,
  RulerIcon,
  ShareAltIcon,
  SyncIcon,
  ZoomIcon,
  ZoomOutIcon,
  ZoomResetIcon,
} from '@storybook/icons';
import type { FC, ReactNode } from 'react';
import { cn } from '@repo/utils';

export const Toolbar: FC<{ slide: number }> = ({ slide }) => {
  return (
    <div
      className={cn(
        'absolute left-0 right-0 top-0 z-10 flex h-10 items-center justify-between overflow-hidden border-b border-b-[#D9E0E6] bg-white px-2 lg:right-[400px]',
        slide === 4 && 'lg:right-0',
      )}
    >
      <div className="mr-2 flex">
        <ToolbarButton className={cn(slide === 4 && 'hidden')}>
          <SyncIcon />
        </ToolbarButton>
        <ToolbarButton className={cn(slide === 4 && 'hidden')}>
          <ZoomIcon />
        </ToolbarButton>
        <ToolbarButton className={cn(slide === 4 && 'hidden')}>
          <ZoomOutIcon />
        </ToolbarButton>
        <ToolbarButton className={cn(slide === 4 && 'hidden')}>
          <ZoomResetIcon />
        </ToolbarButton>
        <ToolbarButton className={cn(slide === 4 && 'hidden')}>
          <GrowIcon />
        </ToolbarButton>
        <div
          className={cn('mx-2 h-6 w-px bg-[#D9E0E6]', slide === 4 && 'hidden')}
        />
        <ToolbarButton className={cn(slide === 4 && 'hidden')}>
          <RulerIcon />
        </ToolbarButton>
        <ToolbarButton className={cn(slide === 4 && 'hidden')}>
          <GridAltIcon />
        </ToolbarButton>
        <ToolbarButton className={cn(slide !== 4 && 'hidden')}>
          <PhotoIcon />
        </ToolbarButton>
        <ToolbarButton className={cn(slide !== 4 && 'hidden')}>
          <GridIcon />
        </ToolbarButton>
        <ToolbarButton>
          <OutlineIcon />
        </ToolbarButton>
      </div>
      <ToolbarButton>
        <ShareAltIcon />
      </ToolbarButton>
    </div>
  );
};

const ToolbarButton: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex h-7 w-7 items-center justify-center text-[#73828C]',
        className,
      )}
    >
      {children}
    </div>
  );
};
