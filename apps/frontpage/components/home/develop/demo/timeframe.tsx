import React from 'react';
import { motion } from 'framer-motion';

interface TimeFrameProps {
  activeStory: string;
}

const stories = [
  'no-selection',
  'all-day',
  'last-hour',
  'start-time',
  'end-time',
];

export function TimeFrame({ activeStory }: TimeFrameProps) {
  return (
    <>
      <motion.div className="absolute left-[39.5%] top-[17%] h-0 w-[41.415%] pb-[22.1121663%]">
        {stories.map((id) => (
          <motion.img
            alt=""
            animate={{ opacity: activeStory === id ? 1 : 0 }}
            className="absolute left-0 top-0 block h-auto w-full"
            height="303"
            initial={false}
            key={id}
            src={`/home/develop/time-frame-${id}.svg`}
            transition={{ duration: 0.1 }}
            width="370"
          />
        ))}
      </motion.div>
      <motion.img
        alt=""
        animate={{ opacity: activeStory === 'overview' ? 1 : 0 }}
        className="absolute left-[21%] top-[4%] block w-[78.9%] rounded"
        initial={false}
        src="/home/develop/time-frame-overview.svg"
        transition={{ duration: 0.1 }}
      />
    </>
  );
}
