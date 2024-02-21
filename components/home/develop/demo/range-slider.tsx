import React from "react";
import { motion, useTransform, MotionValue } from "framer-motion";

interface RangeSliderProps {
  activeStory: string;
  scrollProgress: MotionValue;
  appearProgress: MotionValue;
}

const stories = ["default", "input-range", "no-selection"];

export const RangeSlider = ({
  appearProgress,
  scrollProgress,
  activeStory,
  ...props
}: RangeSliderProps) => {
  const x = useTransform(scrollProgress, [0, 1], ["0%", "-91%"], {
    clamp: true,
  });
  const y = useTransform(scrollProgress, [0, 1], ["0%", "31%"], {
    clamp: true,
  });

  const check = useTransform(scrollProgress, [0, 0.5, 1], [0, 0, 1], {
    clamp: true,
  });

  const filter = useTransform(
    appearProgress,
    [0, 0.5, 1],
    ["grayscale(100%)", "grayscale(100%)", "grayscale(0%)"],
    { clamp: true }
  );
  return (
    <motion.div
      className="absolute z-[2] w-[26.23762376%] h-0 pb-[21.48648648%] top-[12%] left-[24%]"
      style={{ x, y, opacity: appearProgress, filter }}
      {...props}
    >
      {stories.map((id) => (
        <motion.img
          className="block w-full h-auto absolute top-0 left-0"
          key={id}
          src={`/home/develop/range-slider-${id}.svg`}
          alt=""
          width="370"
          height="303"
          animate={{ opacity: activeStory === id ? 1 : 0 }}
          transition={{ duration: 0.1 }}
        />
      ))}
      <motion.img
        className="w-[10%] h-auto block absolute top-[-3%] right-[-1%]"
        src="/home/demo/ci-check-green.svg"
        alt=""
        style={{ scale: check, opacity: check }}
      />
    </motion.div>
  );
};
