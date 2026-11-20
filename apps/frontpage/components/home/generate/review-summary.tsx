import { cn } from '@repo/utils';
import {
  ChevronLeftIcon,
  ChevronSmallUpIcon,
  StorybookIcon,
  WandIcon,
} from '@storybook/icons';
import type { FC, ReactNode } from 'react';
import { Chrome } from '../hero/chrome';

// Code-built illustration of the Storybook 11 agentic review summary page:
// the agent's summary, then the changed component and the pages it affects,
// side by side. Based on https://storybook.js.org/docs/ai/skills/ui-review
export const ReviewSummary: FC = () => {
  return (
    <div className="w-full" role="presentation">
      <Chrome />
      <div className="overflow-hidden rounded-b-md bg-[#F7F9FC] text-[#2E3438]">
        <Header />
        <div className="flex flex-col gap-3 p-3 sm:gap-4 sm:p-4">
          <div className="flex items-start gap-2 rounded border border-[#E3D0F5] bg-[#F5EEFC] px-3 py-2.5 text-[13px] leading-5 sm:text-sm">
            <WandIcon className="mt-0.5 shrink-0 text-[#6F2CAC]" />
            <p>
              <span className="font-bold">Summary:</span> Button now uses the
              new brand color token, and the small size has more padding.
            </p>
          </div>
          <div className="grid gap-3 sm:gap-4 md:grid-cols-[2fr_3fr]">
            <Group
              count={4}
              description="The component that changed"
              title="Button"
            >
              <div className="grid grid-cols-2 gap-2">
                <Thumbnail label="Primary">
                  <FakeButton />
                </Thumbnail>
                <Thumbnail label="Secondary">
                  <FakeButton variant="secondary" />
                </Thumbnail>
                <Thumbnail label="Small">
                  <FakeButton size="small" />
                </Thumbnail>
                <Thumbnail label="Disabled">
                  <FakeButton disabled />
                </Thumbnail>
              </div>
            </Group>
            <Group
              count={5}
              description="Pages that show the changed Button"
              title="Pages"
            >
              <div className="grid grid-cols-2 gap-2">
                <Thumbnail label="Checkout" tall title="Pages">
                  <FakeCheckoutPage />
                </Thumbnail>
                <Thumbnail label="Sign in" tall title="Pages">
                  <FakeSignInPage />
                </Thumbnail>
              </div>
            </Group>
          </div>
        </div>
      </div>
    </div>
  );
};

const Header: FC = () => (
  <div className="flex items-center justify-between gap-4 border-b border-[#D9E0E6] bg-white px-4 py-3 sm:px-5 sm:py-4">
    <div className="flex items-center gap-2 sm:gap-3">
      <ChevronLeftIcon className="hidden text-[#73828C] sm:block" />
      <StorybookIcon className="shrink-0 text-[#FF4785]" size={18} />
      <div>
        <div className="text-base font-bold sm:text-lg">
          Update Button colors
        </div>
        <div className="text-xs text-[#5C6870] sm:text-sm">
          Showing 9 stories for review
          <span className="hidden sm:inline"> • 2m ago</span>
        </div>
      </div>
    </div>
    <div className="shrink-0 text-xs font-bold text-[#5C6870] sm:text-sm">
      1 new
    </div>
  </div>
);

const Group: FC<{
  title: string;
  description: string;
  count: number;
  children: ReactNode;
}> = ({ title, description, count, children }) => (
  <div className="flex flex-col gap-2 rounded border border-[#D9E0E6] bg-white p-3">
    <div className="flex items-center justify-between">
      <div className="text-sm font-bold">{title}</div>
      <div className="flex items-center gap-1 text-xs text-[#5C6870]">
        {count}
        <ChevronSmallUpIcon />
      </div>
    </div>
    <div className="mb-1 text-xs text-[#5C6870]">{description}</div>
    {children}
  </div>
);

const Thumbnail: FC<{
  label: string;
  title?: string;
  // Page thumbnails fill the height of the two-row Button grid on desktop
  tall?: boolean;
  children: ReactNode;
}> = ({ label, title = 'Button', tall, children }) => (
  <div className="flex min-w-0 flex-col gap-1.5">
    <div
      className={cn(
        'flex h-24 items-center justify-center overflow-hidden rounded border border-[#D9E0E6] bg-white sm:h-32 md:h-36',
        tall && 'md:h-[322px]',
      )}
    >
      {children}
    </div>
    <div className="truncate px-1 text-xs">
      <span className="font-bold">{title}</span>
      <span className="text-[#5C6870]"> / {label}</span>
    </div>
  </div>
);

export const FakeButton: FC<{
  variant?: 'primary' | 'secondary';
  size?: 'medium' | 'small';
  disabled?: boolean;
  className?: string;
}> = ({ variant = 'primary', size = 'medium', disabled, className }) => (
  <div
    className={cn(
      'rounded-full font-bold',
      size === 'medium' && 'px-4 py-2 text-xs',
      size === 'small' && 'px-3 py-1.5 text-[10px]',
      variant === 'primary' && 'bg-[#FF4785] text-white',
      variant === 'secondary' &&
        'border border-[#FF4785] bg-white text-[#FF4785]',
      disabled && 'opacity-40',
      className,
    )}
  >
    Button
  </div>
);

const Line: FC<{ className?: string }> = ({ className }) => (
  <div className={cn('h-1.5 rounded-full bg-[#D9E0E6]', className)} />
);

const FakeCheckoutPage: FC = () => (
  <div className="flex h-full w-full flex-col gap-1.5 bg-[#F7F9FC] p-2">
    <div className="flex items-center justify-between">
      <Line className="w-8 bg-[#2E3438]" />
      <Line className="w-5" />
    </div>
    <div className="flex flex-1 gap-1.5">
      <div className="flex flex-1 flex-col gap-1 rounded bg-white p-1.5">
        <div className="h-5 rounded-sm bg-[#E3E8EC] sm:h-8 md:h-24" />
        <Line className="w-3/4" />
        <Line className="w-1/2" />
      </div>
      <div className="flex w-2/5 flex-col justify-between gap-1 rounded bg-white p-1.5">
        <div className="flex flex-col gap-1">
          <Line />
          <Line className="w-2/3" />
        </div>
        <div className="h-2.5 rounded-full bg-[#FF4785] ring-2 ring-[#FF4785]/30" />
      </div>
    </div>
  </div>
);

const FakeSignInPage: FC = () => (
  <div className="flex h-full w-full items-center justify-center bg-[#F7F9FC] p-2">
    <div className="flex w-3/4 flex-col gap-1.5 rounded bg-white p-2">
      <Line className="w-1/2 bg-[#2E3438]" />
      <div className="h-2.5 rounded-sm border border-[#D9E0E6]" />
      <div className="h-2.5 rounded-sm border border-[#D9E0E6]" />
      <div className="h-2.5 rounded-full bg-[#FF4785] ring-2 ring-[#FF4785]/30" />
    </div>
  </div>
);
