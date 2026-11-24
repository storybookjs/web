import type { FC, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@repo/utils';
import {
  BookmarkHollowIcon,
  ChevronSmallDownIcon,
  ChevronSmallRightIcon,
  CogIcon,
  ComponentIcon,
  DocumentIcon,
  GridIcon,
  OutlineIcon,
  SearchIcon,
  SyncIcon,
  ZoomIcon,
  ZoomOutIcon,
} from '@storybook/icons';
import { StorybookLogo } from '../../logos/storybook';
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
 * The Write stories skill: the agent writes a Loading and a Disabled story
 * for the Button, and they appear in Storybook's sidebar one after the
 * other, each marked New, with the canvas rendering the selected one.
 * Simplified from the Storybook 11 sidebar and canvas (Figma
 * kXVzQgpZUkuBEQ43AgiS0Z, node 2194:46315).
 */

const STATUS: Record<Beat, string> = {
  act: 'Writing stories for Button',
  respond: 'Adding them to Storybook',
  settle: '2 stories written',
};

/** The stories the agent writes, in the order they appear */
const NEW_STORIES = ['Loading', 'Disabled'] as const;
type NewStory = (typeof NEW_STORIES)[number];

/** Seconds between the new stories landing in the sidebar */
const STORY_STAGGER = 0.5;

export const WriteStoriesMedia: FC<{ beat?: Beat }> = ({ beat: heldBeat }) => {
  const beat = useBeat(heldBeat);
  const written = beat !== 'act';
  const settled = beat === 'settle';
  // Primary while the agent writes, then each new story as it lands
  let selected: NewStory | 'Primary' = 'Primary';
  if (written) selected = settled ? 'Disabled' : 'Loading';

  return (
    <SkillStage
      agent={
        <AgentCard
          done={settled}
          file="Button.stories.tsx"
          status={STATUS[beat]}
          statusKey={beat}
        >
          {/* Remounts when the loop restarts, so the code types in again */}
          <StoryCode key={written ? 'written' : 'typing'} typing={!written} />
        </AgentCard>
      }
      label="An agent writes Loading and Disabled stories for the Button. They appear in Storybook's sidebar marked New, and the canvas shows each one."
      window={
        <StorybookWindow>
          <div className="flex h-[292px]">
            <Sidebar selected={selected} written={written} />
            <Canvas story={selected} />
          </div>
        </StorybookWindow>
      }
    />
  );
};

const Keyword: FC<{ children: ReactNode }> = ({ children }) => (
  <span className="text-[#C9A2EE]">{children}</span>
);
const Prop: FC<{ children: ReactNode }> = ({ children }) => (
  <span className="text-zinc-400">{children}</span>
);
const Value: FC<{ children: ReactNode }> = ({ children }) => (
  <span className="text-[#9AD66B]">{children}</span>
);

/** The two story exports, typed in line by line while the agent acts */
const CODE: ReactNode[] = [
  <>
    <Keyword>export const</Keyword> Loading = {'{'}
  </>,
  <>
    {'  '}
    <Prop>args</Prop>: {'{ '}
    <Prop>loading</Prop>: <Value>true</Value>
    {' },'}
  </>,
  <>{'};'}</>,
  <>
    <Keyword>export const</Keyword> Disabled = {'{'}
  </>,
  <>
    {'  '}
    <Prop>args</Prop>: {'{ '}
    <Prop>disabled</Prop>: <Value>true</Value>
    {' },'}
  </>,
  <>{'};'}</>,
];

const StoryCode: FC<{ typing: boolean }> = ({ typing }) => (
  <pre className="whitespace-pre font-mono text-[11px] leading-5 text-zinc-100">
    {CODE.map((line, i) => (
      <motion.div
        animate={{ opacity: 1, x: 0 }}
        // eslint-disable-next-line react/no-array-index-key -- fixed list
        key={i}
        initial={typing ? { opacity: 0, x: -4 } : false}
        transition={{
          duration: 0.3,
          // A beat between the two stories, as if the agent moves on
          delay: 0.2 + i * 0.18 + (i >= 3 ? 0.2 : 0),
          ease: beatEase,
        }}
      >
        {line}
      </motion.div>
    ))}
  </pre>
);

/** Storybook 11's sidebar with the Button expanded */
const Sidebar: FC<{ selected: string; written: boolean }> = ({
  selected,
  written,
}) => (
  <div className="flex w-[164px] shrink-0 flex-col border-r border-[#DDE0E3] bg-[#F7FAFC] px-2">
    <div className="flex h-10 items-center justify-between pl-1">
      {/* The logo is drawn 100px wide; this sets it at 80px */}
      <div className="h-4 w-20">
        <div className="origin-top-left scale-[0.8]">
          <StorybookLogo color="dark" />
        </div>
      </div>
      <CogIcon className="text-[#73828C]" size={12} />
    </div>
    <div className="flex h-7 items-center gap-1.5 rounded border border-[#DDE0E3] bg-white px-2 text-[11px] text-[#5C6570]">
      <SearchIcon className="shrink-0" size={11} />
      <span className="truncate">Find components</span>
    </div>
    <div className="flex h-8 items-end px-1 pb-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#5C6570]">
      Components
    </div>
    <Row icon="component" open>
      Button
    </Row>
    <Row icon="docs" nested>
      Docs
    </Row>
    <Row icon="story" nested selected={selected === 'Primary'}>
      Primary
    </Row>
    <Row icon="story" nested>
      Secondary
    </Row>
    {written ? (
      NEW_STORIES.map((story, i) => (
        <motion.div
          animate={{ height: 24, opacity: 1 }}
          className="overflow-hidden"
          initial={{ height: 0, opacity: 0 }}
          key={story}
          transition={{
            duration: 0.4,
            delay: 0.15 + i * STORY_STAGGER,
            ease: beatEase,
          }}
        >
          <Row icon="story" isNew nested selected={selected === story}>
            {story}
          </Row>
        </motion.div>
      ))
    ) : (
      // The agent is still writing: a placeholder where the stories will land
      <div className="flex h-6 items-center gap-1.5 pl-[26px] pr-2">
        <Skeleton className="size-3 rounded-sm" />
        <Skeleton className="h-2 w-16" delay={0.08} />
      </div>
    )}
    <Row icon="component">Header</Row>
    <Row icon="component">Footer</Row>
  </div>
);

const Row: FC<{
  icon: 'component' | 'docs' | 'story';
  nested?: boolean;
  open?: boolean;
  selected?: boolean;
  isNew?: boolean;
  children: ReactNode;
}> = ({ icon, nested, open, selected, isNew, children }) => {
  const Chevron = open ? ChevronSmallDownIcon : ChevronSmallRightIcon;
  const iconClass = selected
    ? 'text-white'
    : {
        component: 'text-[#029CFD]',
        docs: 'text-[#FFAE00]',
        story: 'text-[#37D5D3]',
      }[icon];
  const Icon = {
    component: ComponentIcon,
    docs: DocumentIcon,
    story: BookmarkHollowIcon,
  }[icon];

  return (
    <div
      className={cn(
        'flex h-6 items-center gap-1.5 rounded pr-1.5 text-[12px] transition-colors duration-300',
        nested ? 'pl-[26px]' : 'pl-1',
        selected ? 'bg-[#0069E0] font-bold text-white' : 'text-[#2E3338]',
      )}
    >
      {nested ? null : (
        <Chevron className="shrink-0 text-[#73828C]" size={12} />
      )}
      <Icon className={cn('shrink-0', iconClass)} size={12} />
      <span className="min-w-0 flex-1 truncate">{children}</span>
      {isNew ? (
        <span
          className={cn(
            'shrink-0 rounded-full px-1 text-[9px] font-extrabold uppercase leading-[14px] tracking-[0.04em] transition-colors duration-300',
            selected ? 'bg-white/20 text-white' : 'bg-[#FFE3EE] text-[#C7135A]',
          )}
        >
          New
        </span>
      ) : null}
    </div>
  );
};

/** The canvas toolbar and the selected story, rendered */
const Canvas: FC<{ story: string }> = ({ story }) => (
  <div className="flex min-w-0 flex-1 flex-col">
    <div className="flex h-8 shrink-0 items-center gap-3 border-b border-[#DDE0E3] px-3 text-[#73828C]">
      <SyncIcon size={11} />
      <ZoomIcon size={11} />
      <ZoomOutIcon size={11} />
      <GridIcon size={11} />
      <OutlineIcon size={11} />
    </div>
    {/* Kept in the top of the canvas, clear of the agent card */}
    <div className="flex h-[120px] flex-col items-center justify-center gap-2">
      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0.96 }}
        key={story}
        transition={{ duration: 0.35, ease: beatEase }}
      >
        <PreviewButton story={story} />
      </motion.div>
    </div>
  </div>
);

/** The Button as each story renders it */
const PreviewButton: FC<{ story: string }> = ({ story }) => (
  <span
    className={cn(
      'flex h-8 items-center gap-2 rounded-md px-4 text-[12px] font-bold',
      story === 'Disabled'
        ? 'bg-[#E8ECEF] text-[#8B969E]'
        : 'bg-[#029CFD] text-white',
    )}
  >
    {story === 'Loading' ? <Spinner /> : null}
    Button
  </span>
);

/** Spins while the loop plays; holds still under reduced motion */
const Spinner: FC = () => {
  const reduceMotion = useReducedMotion();
  return (
    <motion.span
      animate={reduceMotion ? undefined : { rotate: 360 }}
      className="size-3 rounded-full border-2 border-white/40 border-t-white"
      data-chromatic="ignore"
      transition={{ duration: 0.9, ease: 'linear', repeat: Infinity }}
    />
  );
};
