import type { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@repo/utils';
import { ChevronLeftIcon, WandIcon } from '@storybook/icons';
import { ComponentDiff1 } from './component-diff1';
import { ComponentSmall } from './component-small';

/** The ease the skill visuals use, so the hero's review settles the same way */
const ease = [0.16, 1, 0.3, 1] as const;

/**
 * The review the agent publishes at the end of the Agents slide: Storybook's
 * review summary, with the ProductCard stories the agent changed and the
 * Homepage that shows the card. Simplified from the Storybook 11 review
 * summary (Figma kXVzQgpZUkuBEQ43AgiS0Z, node 2186:29146) and modelled on the
 * UI review skill visual.
 *
 * Pass `still` to render it without its entrance (held frames, reduced motion).
 */
export const AgentReview: FC<{ still?: boolean }> = ({ still = false }) => (
  <div className="flex h-full w-full flex-col overflow-hidden bg-[#F7F9FC] text-[#2E3438]">
    <div className="flex flex-shrink-0 items-start gap-2 border-b border-[#DDE0E3] bg-white px-3 py-2 sm:px-5 sm:py-3">
      <ChevronLeftIcon className="mt-1 flex-shrink-0 text-[#5C6570]" />
      <div className="min-w-0">
        <Enter still={still}>
          <div className="truncate text-sm font-bold leading-5 sm:text-base sm:leading-6">
            ProductCard: new Expanded story
          </div>
        </Enter>
        <Enter delay={0.05} still={still}>
          <div className="text-xs leading-4 text-[#5C6570] sm:text-[13px] sm:leading-5">
            Your agent provided 3 stories for review
          </div>
        </Enter>
      </div>
    </div>

    <div className="flex min-h-0 flex-1 flex-col gap-2 p-2.5 sm:gap-4 sm:p-5">
      <Enter delay={0.1} still={still}>
        <div className="flex items-center gap-2 rounded border border-[#E1D2EF] bg-[#F5F0FA] px-2.5 py-1.5 text-xs leading-4 sm:px-3 sm:py-2.5 sm:text-sm sm:leading-5">
          <WandIcon className="flex-shrink-0 text-[#6F2CAC]" />
          <p className="min-w-0">
            <span className="font-bold">Summary:</span> Added an Expanded story
            that reuses Button and Avatar
          </p>
        </div>
      </Enter>

      <div className="grid min-h-0 flex-1 grid-cols-3 gap-2 sm:gap-4 lg:max-h-[380px]">
        <Tile
          component="ProductCard"
          delay={0.2}
          isNew
          selected
          still={still}
          story="Expanded"
        >
          <ComponentDiff1 />
        </Tile>
        <Tile
          component="ProductCard"
          delay={0.28}
          still={still}
          story="Default"
        >
          <ComponentSmall className="h-auto w-full" />
        </Tile>
        <Tile component="Homepage" delay={0.36} still={still} story="Page">
          <FakeHomepage />
        </Tile>
      </div>
    </div>
  </div>
);

/** Fades and lifts its content in, unless the frame is held */
const Enter: FC<{ still: boolean; delay?: number; children: ReactNode }> = ({
  still,
  delay = 0,
  children,
}) => (
  <motion.div
    animate={{ opacity: 1, y: 0 }}
    initial={still ? false : { opacity: 0, y: 4 }}
    transition={{ duration: 0.4, delay, ease }}
  >
    {children}
  </motion.div>
);

/** One story in the review: a preview and its "Component / Story" label */
const Tile: FC<{
  component: string;
  story: string;
  delay: number;
  still: boolean;
  isNew?: boolean;
  selected?: boolean;
  children: ReactNode;
}> = ({ component, story, delay, still, isNew, selected, children }) => (
  <motion.div
    animate={{ opacity: 1, scale: 1 }}
    className="flex min-h-0 min-w-0 flex-col"
    initial={still ? false : { opacity: 0, scale: 0.96 }}
    transition={{ duration: 0.45, delay, ease }}
  >
    <div
      className={cn(
        'relative flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded border bg-white p-1.5 sm:p-3',
        selected
          ? 'border-[#0069E0] ring-2 ring-inset ring-[#0069E0]/20'
          : 'border-[#DDE0E3]',
      )}
    >
      <div className="flex h-full w-full items-center justify-center [&>svg]:max-h-full [&>svg]:max-w-full">
        {children}
      </div>
      {isNew ? (
        <span className="absolute right-1 top-1 rounded-full bg-[#E3F3FF] px-1.5 text-[10px] font-bold leading-4 text-[#0069E0] sm:right-2 sm:top-2 sm:text-[11px]">
          New
        </span>
      ) : null}
    </div>
    {/* Phones stack the label, since "Component / Story" won't fit a third */}
    <div className="flex flex-shrink-0 flex-col px-0.5 pt-1 text-[11px] leading-[14px] sm:flex-row sm:items-center sm:pt-2 sm:text-[13px] sm:leading-5">
      <span className="truncate font-bold">{component}</span>
      <span className="truncate text-[#5C6570]">
        <span className="hidden sm:inline">&nbsp;/ </span>
        {story}
      </span>
    </div>
  </motion.div>
);

/** The Homepage that renders the ProductCard, as a page thumbnail */
const FakeHomepage: FC = () => (
  <div className="flex h-full w-full flex-col gap-1.5 overflow-hidden rounded-sm bg-[#F7F9FC] p-1.5 sm:gap-2.5 sm:p-2.5">
    <div className="flex h-2.5 flex-shrink-0 items-center justify-between sm:h-4">
      <div className="h-1.5 w-6 rounded-sm bg-[#2E3438] sm:h-2 sm:w-10" />
      <div className="flex gap-1">
        <div className="h-1 w-3 rounded-sm bg-[#C9D0D6] sm:h-1.5 sm:w-5" />
        <div className="h-1 w-3 rounded-sm bg-[#C9D0D6] sm:h-1.5 sm:w-5" />
      </div>
    </div>
    <div className="h-1.5 w-2/3 flex-shrink-0 rounded-sm bg-[#C9D0D6] sm:h-2.5" />
    <div className="flex min-h-0 flex-1 flex-col justify-center gap-1 sm:gap-2">
      <ComponentSmall className="h-auto w-full" />
      <ComponentSmall className="hidden h-auto w-full sm:block" />
    </div>
  </div>
);
