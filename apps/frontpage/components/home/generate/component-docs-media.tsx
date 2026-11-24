import type { FC, ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@repo/utils';
import {
  BookmarkHollowIcon,
  CheckIcon,
  ChevronSmallDownIcon,
  ChevronSmallRightIcon,
  ComponentIcon,
  DocumentIcon,
  SearchIcon,
} from '@storybook/icons';
import type { Beat } from './skill-stage';
import {
  AgentCard,
  Skeleton,
  SkillStage,
  PACE,
  StorybookWindow,
  beatEase,
  useBeat,
} from './skill-stage';

/**
 * The Component docs skill: the agent looks the Button up in Storybook, the
 * Button's docs page loads with its usage example and props, and the agent
 * reuses that Button in the checkout form with documented props only.
 * Simplified from the Storybook 11 sidebar and docs page (Figma
 * kXVzQgpZUkuBEQ43AgiS0Z, node 2194:46315).
 */

const STATUS: Record<Beat, string> = {
  act: 'Looking up Button',
  respond: 'Reading props and usage',
  settle: 'Reused Button from Storybook',
};

/** The Button's documented props; the agent uses the first two */
const PROPS = [
  { name: 'variant', type: "'primary' | 'outline'", used: true },
  { name: 'size', type: "'sm' | 'md' | 'lg'", used: true },
  { name: 'icon', type: 'ReactNode', used: false },
];

/**
 * Seconds into the respond beat when the highlight moves from the usage
 * example to the props table
 */
const TO_PROPS = PACE; // 1 second at the original pace

const HIGHLIGHT_COLOR = '#0069E0';

export const ComponentDocsMedia: FC<{ beat?: Beat }> = ({
  beat: heldBeat,
}) => {
  const beat = useBeat(heldBeat);

  return (
    <SkillStage
      agent={
        <AgentCard
          done={beat === 'settle'}
          file="CheckoutForm.tsx"
          status={STATUS[beat]}
          statusKey={beat}
        >
          <AgentWork beat={beat} />
        </AgentCard>
      }
      label="An agent looks up the Button in Storybook, reads its usage example and props on the docs page, then reuses that Button in the checkout form with documented props only."
      window={
        <StorybookWindow>
          <ComponentDocsWindow beat={beat} />
        </StorybookWindow>
      }
    />
  );
};

/**
 * What the Storybook window shows at a beat: the sidebar and the Button's
 * docs page. The UI workflow recap reuses it.
 */
export const ComponentDocsWindow: FC<{
  beat: Beat;
  /** Overrides the height, for a taller window */
  className?: string;
}> = ({ beat, className }) => (
  <div className={cn('flex h-[264px]', className)}>
    <Sidebar />
    <DocsPage beat={beat} loaded={beat !== 'act'} />
  </div>
);

/** The docs lookup while the agent reads, then the line it writes */
const AgentWork: FC<{ beat: Beat }> = ({ beat }) => (
  <div className="overflow-hidden rounded border border-zinc-700 font-mono text-[11px] leading-5">
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        key={beat === 'settle' ? 'write' : 'lookup'}
        transition={{ duration: 0.2 }}
      >
        {beat === 'settle' ? (
          <>
            <div className="truncate bg-[#1F2A1A] px-2 text-[#9AD66B]">
              + &lt;Button variant=&quot;primary&quot;
            </div>
            <div className="truncate whitespace-pre bg-[#1F2A1A] px-2 text-[#9AD66B]">
              + {'  '}size=&quot;md&quot;&gt;Place order
            </div>
          </>
        ) : (
          <>
            <div className="truncate px-2 text-zinc-200">
              get-documentation(&quot;button&quot;)
            </div>
            <div className="flex h-5 items-center px-2 text-zinc-400">
              {beat === 'respond' ? (
                <motion.span
                  animate={{ opacity: 1 }}
                  className="truncate"
                  initial={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  3 props, 2 examples
                </motion.span>
              ) : (
                <Skeleton className="h-1.5 w-28 bg-zinc-700" />
              )}
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  </div>
);

/** Storybook 11's sidebar, filtered to the Button with its docs open */
const Sidebar: FC = () => (
  <div className="flex w-[150px] shrink-0 flex-col border-r border-[#DDE0E3] bg-[#F7FAFC] px-1.5 py-2">
    <div className="flex h-7 items-center gap-1.5 rounded border border-[#DDE0E3] bg-white px-2 text-[11.5px]">
      <SearchIcon className="shrink-0 text-[#5C6570]" size={11} />
      <span className="truncate">Button</span>
    </div>
    <div className="flex h-8 items-end px-1 pb-1.5 text-[9.5px] font-bold uppercase tracking-[0.16em] text-[#5C6570]">
      Components
    </div>
    <Row icon="component" open>
      Button
    </Row>
    <Row icon="docs" nested selected>
      Docs
    </Row>
    <Row icon="story" nested>
      Primary
    </Row>
    <Row icon="story" nested>
      Secondary
    </Row>
    <Row icon="component">ButtonGroup</Row>
    <Row icon="component">IconButton</Row>
  </div>
);

const Row: FC<{
  icon: 'component' | 'docs' | 'story';
  nested?: boolean;
  open?: boolean;
  selected?: boolean;
  children: ReactNode;
}> = ({ icon, nested, open, selected, children }) => {
  const Chevron = open ? ChevronSmallDownIcon : ChevronSmallRightIcon;
  const Icon = {
    component: ComponentIcon,
    docs: DocumentIcon,
    story: BookmarkHollowIcon,
  }[icon];
  const iconClass = selected
    ? 'text-white'
    : {
        component: 'text-[#029CFD]',
        docs: 'text-[#FFAE00]',
        story: 'text-[#37D5D3]',
      }[icon];

  return (
    <div
      className={cn(
        'flex h-6 items-center gap-1.5 rounded pr-1.5 text-[12px]',
        nested ? 'pl-[26px]' : 'pl-1',
        selected ? 'bg-[#0069E0] font-bold text-white' : 'text-[#2E3338]',
      )}
    >
      {nested ? null : (
        <Chevron className="shrink-0 text-[#73828C]" size={12} />
      )}
      <Icon className={cn('shrink-0', iconClass)} size={12} />
      <span className="min-w-0 flex-1 truncate">{children}</span>
    </div>
  );
};

/**
 * The Button's docs page: title, description, a usage example and the props
 * table. Kept in the top of the page, clear of the agent card.
 */
const DocsPage: FC<{ beat: Beat; loaded: boolean }> = ({ beat, loaded }) => {
  const settled = beat === 'settle';
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-2 px-3 pt-2.5">
      <div>
        <Reveal
          placeholder={<Bar className="h-3 w-20" line="h-5" />}
          shown={loaded}
        >
          <div className="text-[15px] font-bold leading-5">Button</div>
        </Reveal>
        <Reveal
          delay={0.05}
          placeholder={<Bar className="h-2 w-40" delay={0.08} line="h-4" />}
          shown={loaded}
        >
          <div className="truncate text-[11px] leading-4 text-[#5C6570]">
            Triggers an action in a form or dialog
          </div>
        </Reveal>
      </div>

      <Highlighted
        // On in the respond beat, then hands over to the props table
        animate={
          beat === 'respond'
            ? { opacity: [0, 1, 1, 0] }
            : { opacity: 0 }
        }
        transition={{
          duration: TO_PROPS + 0.2,
          delay: 0.4,
          times: [0, 0.2, 0.85, 1],
        }}
      >
        <Reveal
          delay={0.1}
          placeholder={
            <Skeleton className="h-[62px] rounded bg-[#F0F2F4]" delay={0.16} />
          }
          shown={loaded}
        >
          <UsageExample />
        </Reveal>
      </Highlighted>

      <Highlighted
        animate={{ opacity: beat === 'respond' ? 1 : 0 }}
        transition={{
          duration: 0.3,
          delay: beat === 'respond' ? 0.4 + TO_PROPS : 0,
        }}
      >
        <PropsTable loaded={loaded} settled={settled} />
      </Highlighted>
    </div>
  );
};

/** A block of the docs page with a blue ring that fades in and out over it */
const Highlighted: FC<{
  animate: { opacity: number | number[] };
  transition: object;
  children: ReactNode;
}> = ({ animate, transition, children }) => (
  <div className="relative">
    {children}
    <motion.div
      animate={animate}
      className="pointer-events-none absolute -inset-[3px] rounded-md"
      initial={false}
      // A solid 2px ring with a soft halo, as the UI review's selected tile
      style={{
        boxShadow: `0 0 0 2px ${HIGHLIGHT_COLOR}, 0 0 0 5px ${HIGHLIGHT_COLOR}26`,
      }}
      transition={{ ease: beatEase, ...transition }}
    />
  </div>
);

/** The Primary story rendered, with the code that renders it */
const UsageExample: FC = () => (
  <div className="overflow-hidden rounded border border-[#DDE0E3]">
    <div className="flex h-10 items-center gap-2 px-3">
      <FakeButton variant="primary" />
      <FakeButton variant="secondary" />
    </div>
    <div className="truncate border-t border-[#DDE0E3] bg-[#F7FAFC] px-2 font-mono text-[10px] leading-5 text-[#5C6570]">
      &lt;<span className="text-[#0058BD]">Button</span> variant=
      <span className="text-[#3E7E1E]">&quot;primary&quot;</span>&gt;
    </div>
  </div>
);

const PropsTable: FC<{ loaded: boolean; settled: boolean }> = ({
  loaded,
  settled,
}) => (
  <div className="overflow-hidden rounded border border-[#DDE0E3] text-[10.5px]">
    <div className="flex h-[22px] items-center border-b border-[#DDE0E3] bg-[#F7FAFC] px-2 font-bold text-[#5C6570]">
      <span className="w-[52px] shrink-0">Name</span>
      <span>Type</span>
    </div>
    {PROPS.map((prop, i) => {
      const lit = settled && prop.used;
      return (
        <div
          className={cn(
            'flex h-[22px] items-center px-2 transition-colors duration-300',
            i > 0 && 'border-t border-[#EEF0F2]',
            lit && 'bg-[#E3F0FD]',
          )}
          key={prop.name}
        >
          {loaded ? (
            <motion.div
              animate={{ opacity: 1 }}
              className="flex min-w-0 flex-1 items-center"
              initial={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.2 + i * 0.06 }}
            >
              <span
                className={cn(
                  'w-[52px] shrink-0 font-mono font-bold transition-colors duration-300',
                  lit ? 'text-[#0058BD]' : 'text-[#2E3338]',
                )}
              >
                {prop.name}
              </span>
              <span className="min-w-0 flex-1 truncate font-mono text-[10px] text-[#5C6570]">
                {prop.type}
              </span>
              <span className="flex w-3 shrink-0 justify-end">
                {lit ? (
                  <motion.span
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex"
                    initial={{ opacity: 0, scale: 0.6 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.3 + i * 0.12,
                      ease: beatEase,
                    }}
                  >
                    <CheckIcon className="text-[#0069E0]" size={10} />
                  </motion.span>
                ) : null}
              </span>
            </motion.div>
          ) : (
            <Skeleton
              className="h-2 w-full max-w-[150px]"
              delay={0.24 + i * 0.06}
            />
          )}
        </div>
      );
    })}
  </div>
);

/** Swaps a placeholder for its content once the docs load */
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

const FakeButton: FC<{ variant: 'primary' | 'secondary' }> = ({ variant }) => (
  <span
    className={cn(
      'flex h-6 items-center rounded-md px-2.5 text-[10.5px] font-bold',
      variant === 'primary'
        ? 'bg-[#029CFD] text-white'
        : 'border border-[#029CFD] text-[#0077C2]',
    )}
  >
    {variant === 'primary' ? 'Primary' : 'Secondary'}
  </span>
);
