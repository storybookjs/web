import React from 'react';
import type { MotionValue } from 'framer-motion';
import { motion, useReducedMotion, useTransform } from 'framer-motion';

interface RangeSliderProps {
  activeStory: string;
  appearProgress: MotionValue<number>;
}

const stories = ['default', 'input-range', 'no-selection'];

/*
 * The agent's stories reuse the drawn states: Loading is the empty slider
 * with a skeleton shimmer, Disabled is the default slider washed out.
 */
const artFor: Record<string, string> = {
  loading: 'no-selection',
  disabled: 'default',
};

export function RangeSlider({
  appearProgress,
  activeStory,
  ...props
}: RangeSliderProps) {
  const reduceMotion = useReducedMotion();
  const filter = useTransform(
    appearProgress,
    [0, 0.5, 1],
    ['grayscale(100%)', 'grayscale(100%)', 'grayscale(0%)'],
    { clamp: true },
  );
  const art = artFor[activeStory] ?? activeStory;
  const disabled = activeStory === 'disabled';
  const opacityFor = (id: string) => {
    if (art !== id) return 0;
    return disabled ? 0.5 : 1;
  };

  return (
    <motion.div
      className="absolute left-[24%] top-[12%] z-[2] h-0 w-[26.23762376%] pb-[21.48648648%]"
      style={{ opacity: appearProgress, filter }}
      {...props}
    >
      {stories.map((id) => (
        <motion.img
          alt=""
          animate={{
            opacity: opacityFor(id),
            filter: disabled ? 'saturate(0)' : 'saturate(1)',
          }}
          className="absolute left-0 top-0 block h-auto w-full"
          height="303"
          key={id}
          src={`/home/develop/range-slider-${id}.svg`}
          transition={{ duration: 0.1 }}
          width="370"
        />
      ))}
      {/* Skeleton shimmer over the card for the Loading story. */}
      <motion.div
        animate={{ opacity: activeStory === 'loading' ? 1 : 0 }}
        className="absolute left-[4.054%] top-[3.3%] h-[90.1%] w-[91.892%] overflow-hidden rounded-[2.94%/3.66%]"
        transition={{ duration: 0.1 }}
      >
        {reduceMotion ? (
          <div className="absolute inset-0 bg-white/50" />
        ) : (
          <motion.div
            animate={{ x: ['-100%', '100%'] }}
            className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-white/0 via-white/80 to-white/0"
            transition={{ duration: 1.3, ease: 'easeInOut', repeat: Infinity }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}
