import React from 'react';
import type { AnimationControls, MotionProps } from 'framer-motion';
import { motion } from 'framer-motion';

interface ControlsProps extends MotionProps {
  startTimeControls: AnimationControls;
  endTimeControls: AnimationControls;
}

const charVariants = {
  initial: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: {
      duration: 0,
      delay: 1.4 + i * 0.15,
    },
  }),
};

const bgVariants = { initial: { opacity: 0 }, visible: { opacity: 1 } };

export function Controls({
  startTimeControls,
  endTimeControls,
  ...props
}: ControlsProps) {
  return (
    <motion.div
      className="absolute top-0 left-0 bottom-0 w-full [clip-path: polygon(20%_50%,100%_50%,100%_92%,20%_92%)]"
      {...props}
    >
      <motion.img
        alt=""
        className="absolute top-0 left-0 w-full"
        src="/home/develop/time-frame-controls.svg"
      />
      <motion.svg
        className="absolute text-[11px] top-[79.7%] left-[81.7%] w-[13.6%] h-auto"
        viewBox="0 0 140 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.rect
          animate={startTimeControls}
          fill="#fff"
          height="20"
          initial="initial"
          transition={{ duration: 0.1, delay: 0.4 }}
          variants={bgVariants}
          width="120"
          x="2"
          y="2"
        />
        <text x="8" y="16">
          {'07:30'.split('').map((v, index) => (
            <motion.tspan
              animate={startTimeControls}
              custom={index}
              initial="initial"
              key={v}
              variants={charVariants}
            >
              {v}
            </motion.tspan>
          ))}
        </text>
      </motion.svg>
      <motion.svg
        animate={endTimeControls}
        className="absolute text-[11px] top-[86.7%] left-[81.7%] w-[13.6%] h-auto"
        initial="initial"
        transition={{ duration: 0.1, delay: 0.4 }}
        variants={bgVariants}
        viewBox="0 0 140 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect fill="#fff" height="20" width="120" x="2" y="2" />
        <text x="8" y="16">
          {'16:30'.split('').map((v, index) => (
            <motion.tspan
              animate={endTimeControls}
              custom={index}
              initial="initial"
              key={v}
              variants={charVariants}
            >
              {v}
            </motion.tspan>
          ))}
        </text>
      </motion.svg>
    </motion.div>
  );
}
