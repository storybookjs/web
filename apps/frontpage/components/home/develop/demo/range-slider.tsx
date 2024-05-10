import React from 'react';
import type { MotionValue } from 'framer-motion';
import { motion, useTransform } from 'framer-motion';

interface RangeSliderProps {
  activeStory: string;
  scrollProgress: MotionValue<number>;
  appearProgress: MotionValue<number>;
}

const stories = ['default', 'input-range', 'no-selection'];

export function RangeSlider({
  appearProgress,
  scrollProgress,
  activeStory,
  ...props
}: RangeSliderProps) {
  const x = useTransform(scrollProgress, [0, 1], ['0%', '-91%'], {
    clamp: true,
  });
  const y = useTransform(scrollProgress, [0, 1], ['0%', '31%'], {
    clamp: true,
  });

  const check = useTransform(scrollProgress, [0, 0.5, 1], [0, 0, 1], {
    clamp: true,
  });

  const filter = useTransform(
    appearProgress,
    [0, 0.5, 1],
    ['grayscale(100%)', 'grayscale(100%)', 'grayscale(0%)'],
    { clamp: true },
  );
  return (
    <motion.div
      className="absolute z-[2] w-[26.23762376%] h-0 pb-[21.48648648%] top-[12%] left-[24%]"
      style={{ x, y, opacity: appearProgress, filter }}
      {...props}
    >
      {stories.map((id) => (
        <motion.img
          alt=""
          animate={{ opacity: activeStory === id ? 1 : 0 }}
          className="block w-full h-auto absolute top-0 left-0"
          height="303"
          key={id}
          src={`/home/develop/range-slider-${id}.svg`}
          transition={{ duration: 0.1 }}
          width="370"
        />
      ))}
      <motion.img
        alt=""
        className="w-[10%] h-auto block absolute top-[-3%] right-[-1%]"
        src="/home/demo/ci-check-green.svg"
        style={{ scale: check, opacity: check }}
      />
    </motion.div>
  );
}
