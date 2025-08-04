import React from 'react';
import type { MotionValue } from 'framer-motion';
import { motion, useTransform } from 'framer-motion';

interface RangeSliderProps {
  activeStory: string;
  appearProgress: MotionValue<number>;
}

const stories = ['default', 'input-range', 'no-selection'];

export function RangeSlider({
  appearProgress,
  activeStory,
  ...props
}: RangeSliderProps) {
  const filter = useTransform(
    appearProgress,
    [0, 0.5, 1],
    ['grayscale(100%)', 'grayscale(100%)', 'grayscale(0%)'],
    { clamp: true },
  );
  return (
    <motion.div
      className="absolute left-[24%] top-[12%] z-[2] h-0 w-[26.23762376%] pb-[21.48648648%]"
      style={{ opacity: appearProgress, filter }}
      {...props}
    >
      {stories.map((id) => (
        <motion.img
          alt=""
          animate={{ opacity: activeStory === id ? 1 : 0 }}
          className="absolute left-0 top-0 block h-auto w-full"
          height="303"
          key={id}
          src={`/home/develop/range-slider-${id}.svg`}
          transition={{ duration: 0.1 }}
          width="370"
        />
      ))}
    </motion.div>
  );
}
