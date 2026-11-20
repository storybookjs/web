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

/**
 * `docs` swaps the canvas tools for the docs-page tools and spans the full
 * width. `fullWidth` spans the full width when no addon panel is shown.
 */
export const Toolbar: FC<{
  variant?: 'canvas' | 'docs';
  fullWidth?: boolean;
}> = ({ variant = 'canvas', fullWidth = false }) => {
  const isDocs = variant === 'docs';
  return (
    <div
      className={cn(
        'absolute left-0 right-0 top-0 z-10 flex h-10 items-center justify-between overflow-hidden border-b border-b-[#D9E0E6] bg-white px-2 lg:right-[400px]',
        (isDocs || fullWidth) && 'lg:right-0',
      )}
    >
      <div className="mr-2 flex">
        <ToolbarButton className={cn(isDocs && 'hidden')}>
          <SyncIcon />
        </ToolbarButton>
        <ToolbarButton className={cn(isDocs && 'hidden')}>
          <ZoomIcon />
        </ToolbarButton>
        <ToolbarButton className={cn(isDocs && 'hidden')}>
          <ZoomOutIcon />
        </ToolbarButton>
        <ToolbarButton className={cn(isDocs && 'hidden')}>
          <ZoomResetIcon />
        </ToolbarButton>
        <ToolbarButton className={cn(isDocs && 'hidden')}>
          <GrowIcon />
        </ToolbarButton>
        <div className={cn('mx-2 h-6 w-px bg-[#D9E0E6]', isDocs && 'hidden')} />
        <ToolbarButton className={cn(isDocs && 'hidden')}>
          <RulerIcon />
        </ToolbarButton>
        <ToolbarButton className={cn(isDocs && 'hidden')}>
          <GridAltIcon />
        </ToolbarButton>
        <ToolbarButton className={cn(!isDocs && 'hidden')}>
          <PhotoIcon />
        </ToolbarButton>
        <ToolbarButton className={cn(!isDocs && 'hidden')}>
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
