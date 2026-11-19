import React, { useEffect } from 'react';
import type { MotionProps } from 'framer-motion';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';

/** Stories an agent adds to the RangeSlider during the third Develop step. */
export const agentStories = [
  { id: 'loading', name: 'Loading' },
  { id: 'disabled', name: 'Disabled' },
] as const;

export type AgentStoryId = (typeof agentStories)[number]['id'];

interface SidebarProps extends MotionProps {
  type: 'rangeSlider' | 'timeFrame';
  activeStory: string;
  /**
   * Show the stories an agent wrote. When set, they're inserted under
   * RangeSlider and `activeStory` can select one of them.
   */
  showAgentStories?: boolean;
}

const rangeSliderStories = ['default', 'input-range', 'no-selection'];

/*
 * The sidebar artwork is a 250×830 SVG. These values are in its coordinate
 * space, so the inserted rows line up with the rows drawn in the artwork.
 */
const ART = { width: 250, height: 830 };
const ROW = 28;
/** Bottom edge of the "Input Range" row, the last RangeSlider story. */
const INSERT_AT = 592;
/** Top edge of the pinned "Run tests" panel and its gutter. */
const PANEL_TOP = 776;
const SHIFT = ROW * agentStories.length;

const y = (value: number) => `${String((value / ART.height) * 100)}%`;
const x = (value: number) => `${String((value / ART.width) * 100)}%`;

/** A horizontal band of the artwork, in artwork units. */
/** Artwork units inside the sidebar box, which is a size container. */
const u = (value: number) => `${String((value / ART.width) * 100)}cqw`;

const band = (top: number, bottom: number) =>
  `inset(${y(top)} 0 ${y(ART.height - bottom)} 0)`;

function Art({ id, style }: { id: string; style?: MotionProps['style'] }) {
  return (
    <motion.img
      alt=""
      className="absolute left-0 top-0 h-full w-full"
      src={`/home/develop/sidebar-rs-${id}.svg`}
      style={style}
    />
  );
}

function StoryIcon({ selected }: { selected: boolean }) {
  return (
    <svg
      aria-hidden
      className="absolute"
      fill="none"
      style={{ left: u(61), top: u(7), width: u(8), height: u(14) }}
      viewBox="0 0 8 14"
    >
      <path
        clipRule="evenodd"
        d="M.5 0h7c.276 0 .5.224.5.5v13a.5.5 0 0 1-.454.498.5.5 0 0 1-.371-.118L4 11.159.825 13.88a.5.5 0 0 1-.379.117A.5.5 0 0 1 0 13.5V.5C0 .224.224 0 .5 0ZM1 12.413l2.664-2.284a.5.5 0 0 1 .662.023L7 12.413V1H1v11.413Z"
        fill={selected ? '#fff' : '#37D5D3'}
        fillRule="evenodd"
      />
    </svg>
  );
}

/** Four-point sparkle that marks a story as written by an agent. */
function AgentMark({ selected }: { selected: boolean }) {
  return (
    <svg
      aria-hidden
      className="absolute"
      style={{ right: u(12), top: u(9), width: u(10), height: u(10) }}
      viewBox="0 0 12 12"
    >
      <path
        d="M6 0c.35 2.95 2.05 4.65 5 5-2.95.35-4.65 2.05-5 5-.35-2.95-2.05-4.65-5-5 2.95-.35 4.65-2.05 5-5Z"
        fill={selected ? '#fff' : '#FF4785'}
        transform="translate(0 1)"
      />
    </svg>
  );
}

function AgentRow({
  name,
  index,
  selected,
}: {
  name: string;
  index: number;
  selected: boolean;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="absolute"
      exit={{ opacity: 0, transition: { duration: 0.1 } }}
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: '-40%' }}
      style={{
        left: x(12),
        width: x(226),
        top: y(INSERT_AT + index * ROW),
        height: y(ROW),
      }}
      transition={{
        delay: reduceMotion ? 0 : 0.12 + index * 0.08,
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* A tint that settles out once the story lands, like a fresh diff. */}
      <motion.div
        animate={{ opacity: 0 }}
        className="absolute inset-0 bg-[#FF4785]/[0.14]"
        initial={{ opacity: 1 }}
        style={{ borderRadius: u(4) }}
        transition={{ delay: 0.5 + index * 0.08, duration: 1.4 }}
      />
      <motion.div
        animate={{ opacity: selected ? 1 : 0 }}
        className="absolute inset-0 bg-[#029CFD]"
        style={{ borderRadius: u(4) }}
        transition={{ duration: 0.1 }}
      />
      <StoryIcon selected={selected} />
      <span
        className="absolute leading-none"
        style={{
          left: u(78.3),
          top: u(9),
          fontSize: u(14),
          fontWeight: selected ? 700 : 400,
          color: selected ? '#fff' : '#2E3438',
        }}
      >
        {name}
      </span>
      <AgentMark selected={selected} />
    </motion.div>
  );
}

/**
 * Rebuilds the sidebar with room for the agent's stories: the artwork above
 * the insertion point stays put, everything below slides down two rows, and
 * the pinned "Run tests" panel stays on top.
 */
function AgentStories({ activeStory }: { activeStory: string }) {
  const shift = useSpring(0, { stiffness: 400, damping: 40 });
  useEffect(() => {
    shift.set(SHIFT);
  }, [shift]);
  const translateY = useTransform(shift, (v) => y(v));
  const lowerClip = useTransform(shift, (v) =>
    band(INSERT_AT, PANEL_TOP - v),
  );

  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="absolute inset-0"
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
    >
      {/*
       * Nothing is selected in RangeSlider while an agent story is: take
       * Default (unselected) from the no-selection art and No selection and
       * Input Range (unselected) from the default art.
       */}
      <Art id="no-selection" style={{ clipPath: band(0, 536) }} />
      <Art id="default" style={{ clipPath: band(536, INSERT_AT) }} />
      {/* Covers the anti-aliased edge of both selection fills at the seam. */}
      <div
        className="absolute bg-[#F6F9FC]"
        style={{ left: 0, right: 0, top: y(534), height: y(4) }}
      />
      <div
        className="absolute bg-[#F6F9FC]"
        style={{ left: 0, right: 0, top: y(INSERT_AT), height: y(SHIFT) }}
      />
      <Art id="default" style={{ clipPath: lowerClip, y: translateY }} />
      <Art id="default" style={{ clipPath: band(PANEL_TOP, ART.height) }} />
      {agentStories.map((story, index) => (
        <AgentRow
          index={index}
          key={story.id}
          name={story.name}
          selected={activeStory === story.id}
        />
      ))}
    </motion.div>
  );
}

export function Sidebar({
  activeStory,
  showAgentStories = false,
  ...props
}: SidebarProps & MotionProps) {
  const modifyingControls = ['start-time', 'end-time'].includes(activeStory);
  const storyID = modifyingControls ? 'all-day' : activeStory;

  return (
    <motion.div
      className="absolute bottom-0 left-0 top-0 w-full overflow-hidden rounded-xl"
      {...props}
    >
      <div
        className="absolute left-0 top-0 h-full"
        style={{
          aspectRatio: `${String(ART.width)} / ${String(ART.height)}`,
          containerType: 'size',
        }}
      >
        {rangeSliderStories.map((id) => (
          <motion.img
            alt=""
            animate={{ opacity: storyID === id ? 1 : 0 }}
            className="absolute left-0 top-0 h-full w-full"
            key={id}
            src={`/home/develop/sidebar-rs-${id}.svg`}
            transition={{ duration: 0.1 }}
          />
        ))}
        <AnimatePresence>
          {showAgentStories ? (
            <AgentStories activeStory={activeStory} key="agent-stories" />
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
