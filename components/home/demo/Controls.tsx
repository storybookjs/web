import React from "react";
import { AnimationControls, motion, MotionProps } from "framer-motion";

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

export const Controls = ({
  startTimeControls,
  endTimeControls,
  ...props
}: ControlsProps) => {
  return (
    <motion.div
      className="absolute top-0 left-0 bottom-0 w-full [clip-path: polygon(20%_50%,100%_50%,100%_92%,20%_92%)]"
      {...props}
    >
      <motion.img
        className="absolute top-0 left-0 w-full"
        src="/develop/time-frame-controls.svg"
        alt=""
      />
      <motion.svg
        className="absolute text-[11px] top-[79.7%] left-[81.7%] w-[13.6%] h-auto"
        viewBox="0 0 140 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.rect
          x="2"
          y="2"
          width="120"
          height="20"
          fill="#fff"
          initial="initial"
          animate={startTimeControls}
          variants={bgVariants}
          transition={{ duration: 0.1, delay: 0.4 }}
        />
        <text x="8" y="16">
          {"07:30".split("").map((v, index) => (
            <motion.tspan
              // eslint-disable-next-line react/no-array-index-key
              key={`${v}-${index}`}
              custom={index}
              initial="initial"
              animate={startTimeControls}
              variants={charVariants}
            >
              {v}
            </motion.tspan>
          ))}
        </text>
      </motion.svg>
      <motion.svg
        className="absolute text-[11px] top-[86.7%] left-[81.7%] w-[13.6%] h-auto"
        viewBox="0 0 140 24"
        xmlns="http://www.w3.org/2000/svg"
        initial="initial"
        animate={endTimeControls}
        variants={bgVariants}
        transition={{ duration: 0.1, delay: 0.4 }}
      >
        <rect x="2" y="2" width="120" height="20" fill="#fff" />
        <text x="8" y="16">
          {"16:30".split("").map((v, index) => (
            <motion.tspan
              // eslint-disable-next-line react/no-array-index-key
              key={`${v}-${index}`}
              custom={index}
              initial="initial"
              animate={endTimeControls}
              variants={charVariants}
            >
              {v}
            </motion.tspan>
          ))}
        </text>
      </motion.svg>
    </motion.div>
  );
};
