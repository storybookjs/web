import { cn } from '@repo/utils';
import { ChevronSmallDownIcon, ComponentIcon } from '@storybook/icons';
import type { FC } from 'react';
import { Chrome } from '../hero/chrome';
import { FakeButton } from './review-summary';

type Change = 'new' | 'changed';

// Same change as the ReviewSummary below it: the Button picks up the new
// brand color token and gains a Disabled story.
const stories: { name: string; change: Change }[] = [
  { name: 'Primary', change: 'changed' },
  { name: 'Secondary', change: 'changed' },
  { name: 'Small', change: 'changed' },
  { name: 'Disabled', change: 'new' },
];

const selected = 'Disabled';

// Code-built illustration of Storybook after a change: every new or changed
// state of the Button has a story, marked in the sidebar.
export const ChangedStories: FC = () => {
  return (
    <div className="w-full" role="presentation">
      <Chrome />
      <div className="grid grid-cols-[132px_1fr] overflow-hidden rounded-b-md bg-white text-[#2E3438] sm:grid-cols-[208px_1fr]">
        <div className="flex flex-col gap-1 border-r border-[#D9E0E6] bg-[#F7F9FC] px-2 py-3 text-[13px] sm:px-3">
          <div className="px-1 pb-1 text-[11px] font-bold uppercase tracking-wider text-[#5C6870]">
            Components
          </div>
          <div className="flex items-center gap-1.5 px-1 py-1 font-bold">
            <ChevronSmallDownIcon className="shrink-0 text-[#73828C]" />
            <ComponentIcon className="shrink-0 text-[#029CFD]" />
            Button
          </div>
          {stories.map((story) => (
            <StoryRow
              change={story.change}
              key={story.name}
              name={story.name}
              selected={story.name === selected}
            />
          ))}
          <div className="mt-auto flex flex-wrap gap-x-3 gap-y-1 px-1 pt-4 text-[11px] text-[#5C6870]">
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-[#FF4785]" />
              New
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-[#FFAE00]" />
              Changed
            </span>
          </div>
        </div>
        <div className="flex min-h-[200px] flex-col sm:min-h-[260px]">
          <div className="flex items-center justify-between gap-2 border-b border-[#D9E0E6] px-3 py-2.5 text-xs sm:px-4">
            <div className="truncate">
              <span className="font-bold">Button</span>
              <span className="text-[#5C6870]"> / {selected}</span>
            </div>
            <ChangeBadge change="new" />
          </div>
          <div className="flex flex-1 items-center justify-center bg-[#FCFDFE] p-6">
            <FakeButton disabled />
          </div>
        </div>
      </div>
    </div>
  );
};

const StoryRow: FC<{ name: string; change: Change; selected: boolean }> = ({
  name,
  change,
  selected: isSelected,
}) => (
  <div
    className={cn(
      'flex items-center justify-between gap-2 rounded py-1 pl-7 pr-1.5 sm:pl-8',
      isSelected && 'bg-[#029CFD] font-bold text-white',
    )}
  >
    <span className="truncate">{name}</span>
    <span
      aria-hidden
      className={cn(
        'size-2 shrink-0 rounded-full',
        change === 'new' ? 'bg-[#FF4785]' : 'bg-[#FFAE00]',
        isSelected && 'ring-2 ring-white',
      )}
    />
  </div>
);

const ChangeBadge: FC<{ change: Change }> = ({ change }) => (
  <span
    className={cn(
      'shrink-0 rounded-full px-2 py-0.5 text-[11px] font-bold',
      change === 'new'
        ? 'bg-[#FFF0F5] text-[#C1185B]'
        : 'bg-[#FFF5DB] text-[#8A5A00]',
    )}
  >
    {change === 'new' ? 'New story' : 'Changed'}
  </span>
);
