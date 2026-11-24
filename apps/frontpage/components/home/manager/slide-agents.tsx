import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Toolbar } from './toolbar';
import { ComponentDiff1 } from './component-diff1';
import { ComponentSmall } from './component-small';
import { AgentReview } from './agent-review';

/**
 * Seconds after the slide mounts when the agent's new story appears. The
 * Sidebar uses the same value to add the story to the tree.
 */
export const AGENT_STORY_DELAY = 2;

/**
 * Seconds after the slide mounts when the agent publishes its review: the
 * chat adds its last step and the canvas changes to the review summary.
 */
export const AGENT_REVIEW_DELAY = 4.6;

/** The slide's two frames: the agent's new story, then its review */
export type AgentsBeat = 'story' | 'review';

/**
 * The canvas for the Agents slide. It has no addon panel; the Hero shows
 * AgentChat as its own window instead. Below `lg` that window covers the
 * lower half, so the canvas renders in the space above it.
 *
 * Pass `beat` to hold one frame (stories). Under reduced motion it shows the
 * final frame, the review.
 */
export function SlideAgents({ beat }: { beat?: AgentsBeat }) {
  const reduceMotion = useReducedMotion();
  const held = beat ?? (reduceMotion ? 'review' : undefined);
  const [published, setPublished] = useState(false);

  useEffect(() => {
    if (held) return;
    const timer = setTimeout(() => {
      setPublished(true);
    }, AGENT_REVIEW_DELAY * 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [held]);

  const current = held ?? (published ? 'review' : 'story');

  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="absolute left-0 top-0 h-full w-full flex-1 bg-white"
      exit={{ opacity: 0 }}
      initial={held ? false : { opacity: 0 }}
    >
      <AnimatePresence initial={false}>
        {current === 'story' ? (
          <motion.div
            className="absolute inset-0"
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            key="story"
          >
            <div className="absolute top-10 flex h-[calc(45%-40px)] w-full items-center justify-center bg-white p-4 text-black sm:h-[calc(55%-40px)] sm:p-8 lg:h-[calc(100%-40px)]">
              <motion.div
                animate={{ opacity: 1, scale: 1 }}
                className="flex max-h-full items-center justify-center"
                initial={held ? false : { opacity: 0, scale: 0.96 }}
                transition={{ delay: AGENT_STORY_DELAY, duration: 0.4 }}
              >
                <div className="hidden max-h-full sm:block">
                  <ComponentDiff1 />
                </div>
                <ComponentSmall className="max-h-full sm:hidden" />
              </motion.div>
            </div>
            <Toolbar fullWidth />
          </motion.div>
        ) : (
          <motion.div
            animate={{ opacity: 1 }}
            className="absolute inset-x-0 top-0 h-[45%] sm:h-[60%] lg:h-full"
            initial={held ? false : { opacity: 0 }}
            key="review"
            transition={{ duration: 0.3 }}
          >
            <AgentReview still={Boolean(held)} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
