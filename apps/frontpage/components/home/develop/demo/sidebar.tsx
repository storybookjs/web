import React from 'react';
import type { MotionProps } from 'framer-motion';
import { motion } from 'framer-motion';

interface SidebarProps extends MotionProps {
  type: 'rangeSlider' | 'timeFrame';
  activeStory: string;
}

const rangeSliderStories = ['default', 'input-range', 'no-selection'];

export function Sidebar({ activeStory, ...props }: SidebarProps & MotionProps) {
  const modifyingControls = ['start-time', 'end-time'].includes(activeStory);
  const storyID = modifyingControls ? 'all-day' : activeStory;

  return (
    <motion.div
      className="absolute bottom-0 left-0 top-0 w-full overflow-hidden rounded-xl"
      {...props}
    >
      {rangeSliderStories.map((id) => (
        <motion.img
          alt=""
          animate={{ opacity: storyID === id ? 1 : 0 }}
          className="absolute left-0 top-0 h-full"
          key={id}
          src={`/home/develop/sidebar-rs-${id}.svg`}
          transition={{ duration: 0.1 }}
        />
      ))}
    </motion.div>
  );
}
