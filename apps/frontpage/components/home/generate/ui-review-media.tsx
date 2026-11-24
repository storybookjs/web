import type { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@repo/utils';
import {
  ChevronLeftIcon,
  ChevronSmallUpIcon,
  WandIcon,
} from '@storybook/icons';
import type { Beat } from './skill-stage';
import {
  AgentCard,
  Skeleton,
  SkillStage,
  StorybookWindow,
  beatEase,
  useBeat,
} from './skill-stage';

/**
 * The UI review skill: the agent lightens the Button's background, publishes
 * a review, and Storybook's review page fills in with the Button states and
 * the Checkout page the change reaches. Simplified from the Storybook 11
 * review summary (Figma kXVzQgpZUkuBEQ43AgiS0Z, node 2186:29146).
 */

const STATUS: Record<Beat, string> = {
  act: 'Lightening the Button',
  respond: 'Publishing a review',
  settle: 'Review ready: 4 stories',
};

export const UIReviewMedia: FC<{ beat?: Beat }> = ({ beat: heldBeat }) => {
  const beat = useBeat(heldBeat);
  const settled = beat === 'settle';

  return (
    <SkillStage
      agent={
        <AgentCard
          done={settled}
          file="Button.tsx"
          status={STATUS[beat]}
          statusKey={beat}
        >
          <Diff />
        </AgentCard>
      }
      label="An agent lightens the Button's background and publishes a review. Storybook's review page shows the changed Button stories and the Checkout page that uses it."
      window={
        <StorybookWindow>
          <UIReviewWindow beat={beat} />
        </StorybookWindow>
      }
    />
  );
};

/**
 * What the Storybook window shows at a beat: the review page. The UI
 * workflow recap reuses it.
 */
export const UIReviewWindow: FC<{ beat: Beat }> = ({ beat }) => (
  <ReviewPage published={beat !== 'act'} settled={beat === 'settle'} />
);

const Diff: FC = () => (
  <div className="overflow-hidden rounded border border-zinc-700 font-mono text-[11px] leading-5">
    <div className="bg-[#3A1F22] px-2 text-[#FCA5A5]">
      - background: &apos;#0B6BCB&apos;
    </div>
    <div className="bg-[#1F2A1A] px-2 text-[#9AD66B]">
      + background: &apos;#029CFD&apos;
    </div>
  </div>
);

const ReviewPage: FC<{ published: boolean; settled: boolean }> = ({
  published,
  settled,
}) => (
  <div>
    <div className="flex items-start gap-2 border-b border-[#DDE0E3] px-3 py-2">
      <ChevronLeftIcon className="mt-1 shrink-0 text-[#5C6570]" size={12} />
      <div className="min-w-0 flex-1">
        <Reveal
          placeholder={<Bar className="h-3 w-48" line="h-5" />}
          shown={published}
        >
          <div className="truncate text-[14px] font-bold leading-5">
            Button style changes on Checkout
          </div>
        </Reveal>
        <Reveal
          delay={0.05}
          placeholder={<Bar className="h-2 w-36" delay={0.08} line="h-4" />}
          shown={published}
        >
          <div className="text-[11.5px] leading-4 text-[#5C6570]">
            Your agent provided 4 stories for review
          </div>
        </Reveal>
      </div>
    </div>

    <div className="flex flex-col gap-2 bg-[#F7FAFC] p-2.5">
      <Reveal
        delay={0.1}
        placeholder={
          <Skeleton className="h-8 rounded bg-[#F0F2F4]" delay={0.16} />
        }
        shown={published}
      >
        <div className="flex h-8 items-center gap-1.5 rounded border border-[#E1D2EF] bg-[#F5F0FA] px-2.5 text-[12px]">
          <WandIcon className="shrink-0 text-[#6F2CAC]" size={12} />
          <span className="font-bold">Summary:</span>
          <span className="truncate">The Button background is lighter</span>
        </div>
      </Reveal>

      <div className="rounded-lg border border-[#DDE0E3] bg-white">
        <div className="flex h-9 items-center justify-between pl-3 pr-2">
          <Reveal
            delay={0.15}
            placeholder={<Bar className="h-2.5 w-40" delay={0.24} />}
            shown={published}
          >
            <div className="text-[13px] font-bold">
              Button background lightened
            </div>
          </Reveal>
          <div className="flex items-center gap-1.5 text-[#5C6570]">
            <span className="font-mono text-[12px]">
              {published ? 4 : 0}
            </span>
            <ChevronSmallUpIcon size={12} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-2.5 gap-y-1.5 px-2.5 pb-2.5">
          <Tile
            component="Button"
            delay={0.2}
            published={published}
            story="Primary"
          >
            <FakeButton />
          </Tile>
          <Tile
            component="Button"
            delay={0.28}
            published={published}
            story="Secondary"
          >
            <FakeButton variant="outline" />
          </Tile>
          <Tile
            component="Checkout"
            delay={0.36}
            published={published}
            selected={settled}
            story="Page"
            tall
          >
            <FakeCheckout />
          </Tile>
          <Tile delay={0.44} published={published} tall>
            <span className="rounded border border-[#DDE0E3] bg-[#F7FAFC] px-2 py-1 text-[11px] font-bold">
              Review all 4
            </span>
          </Tile>
        </div>
      </div>
    </div>
  </div>
);

/** Swaps a placeholder for its content once the review is published */
const Reveal: FC<{
  shown: boolean;
  delay?: number;
  placeholder: ReactNode;
  children: ReactNode;
}> = ({ shown, delay = 0, placeholder, children }) =>
  shown ? (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 4 }}
      transition={{ duration: 0.4, delay, ease: beatEase }}
    >
      {children}
    </motion.div>
  ) : (
    <>{placeholder}</>
  );

/** A text placeholder, centered in a `line` the height of the real text */
const Bar: FC<{ className?: string; line?: string; delay?: number }> = ({
  className,
  line,
  delay,
}) => {
  const bar = <Skeleton className={className} delay={delay} />;
  return line ? <div className={cn('flex items-center', line)}>{bar}</div> : bar;
};

/**
 * One story in the review: a preview and its "Component / Story" label.
 * Without a label it's the "Review all" tile, which has a grey preview.
 */
const Tile: FC<{
  component?: string;
  story?: string;
  published: boolean;
  delay: number;
  selected?: boolean;
  tall?: boolean;
  children: ReactNode;
}> = ({ component, story, published, delay, selected, tall, children }) => (
  <div className="min-w-0">
    <div
      className={cn(
        'relative flex items-center justify-center overflow-hidden rounded border transition-colors duration-300',
        tall ? 'h-[92px]' : 'h-14',
        selected ? 'border-[#0069E0]' : 'border-[#DDE0E3]',
        component ? 'bg-white' : 'bg-[#F4F5F6]',
      )}
    >
      {published ? (
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          className="flex h-full w-full items-center justify-center"
          initial={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.45, delay, ease: beatEase }}
        >
          {children}
        </motion.div>
      ) : null}
      {selected ? (
        <motion.div
          animate={{ opacity: 1 }}
          className="pointer-events-none absolute inset-0 rounded-[3px] ring-2 ring-inset ring-[#0069E0]/25"
          initial={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      ) : null}
    </div>
    <div className="flex h-6 items-center truncate px-1 text-[12px]">
      {component && published ? (
        <motion.span
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.3, delay }}
        >
          <span className="font-bold">{component}</span>
          <span className="text-[#5C6570]"> / {story}</span>
        </motion.span>
      ) : null}
      {component && !published ? (
        <Bar className="h-2 w-24" delay={delay + 0.12} />
      ) : null}
    </div>
  </div>
);

const FakeButton: FC<{ variant?: 'primary' | 'outline'; block?: boolean }> = ({
  variant = 'primary',
  block,
}) => (
  <span
    className={cn(
      'flex items-center justify-center rounded-md font-bold',
      block ? 'h-5 w-full text-[8px]' : 'h-7 px-3 text-[11px]',
      variant === 'primary'
        ? 'bg-[#029CFD] text-white'
        : 'border border-[#029CFD] text-[#0077C2]',
    )}
  >
    {block ? 'Place order' : 'Button'}
  </span>
);

/** The checkout form from the Component docs visual, as a page thumbnail */
const FakeCheckout: FC = () => (
  <div className="flex h-full w-full flex-col justify-center gap-1.5 bg-[#F7FAFC] px-4">
    <div className="text-[10px] font-extrabold">Checkout</div>
    <div className="h-3.5 rounded-sm border border-[#D9E0E6] bg-white" />
    <div className="h-3.5 rounded-sm border border-[#D9E0E6] bg-white" />
    <FakeButton block />
  </div>
);
