import { motion } from 'framer-motion';
import { Toolbar } from './toolbar';
import { ComponentDiff1 } from './component-diff1';
import { ComponentSmall } from './component-small';

/**
 * Seconds after the slide mounts when the agent's new story appears. The
 * Sidebar uses the same value to add the story to the tree.
 */
export const AGENT_STORY_DELAY = 2;

/**
 * The canvas for the Agents slide. It has no addon panel; the Hero shows
 * AgentChat as its own window instead. Below `lg` that window covers the
 * lower half, so the story renders in the space above it.
 */
export function SlideAgents() {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="absolute left-0 top-0 h-full w-full flex-1 bg-white"
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
    >
      <div className="absolute top-10 flex h-[calc(45%-40px)] w-full items-center justify-center bg-white p-4 text-black sm:h-[calc(55%-40px)] sm:p-8 lg:h-[calc(100%-40px)]">
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          className="flex max-h-full items-center justify-center"
          initial={{ opacity: 0, scale: 0.96 }}
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
  );
}
