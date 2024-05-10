import React from 'react';
import type { MotionProps, MotionValue } from 'framer-motion';
import { motion, useTransform } from 'framer-motion';

interface AddonsProps extends MotionProps {
  activePanel: string;
  scrollProgress: MotionValue<number>;
}

const panels = ['a11y', 'controls', 'design', 'interactions'];

export function AddonsPanel({
  scrollProgress,
  activePanel,
  ...props
}: AddonsProps) {
  const y = useTransform(scrollProgress, [0, 0.15], ['100%', '0%'], {
    clamp: true,
  });

  return (
    <motion.div
      className="absolute top-0 left-0 bottom-0 w-full"
      style={{ clipPath: 'polygon(20% 50%, 100% 50%, 100% 100%, 20% 100%)' }}
      {...props}
    >
      {panels.map((id) => (
        <motion.img
          alt=""
          animate={{ opacity: id === activePanel ? 1 : 0 }}
          className="absolute top-0 left-0 h-full"
          key={id}
          src={`/home/develop/addons-${id}.svg`}
          style={{ y }}
          transition={{ duration: 0.1 }}
        />
      ))}
    </motion.div>
  );
}
