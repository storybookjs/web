import React from "react";
import { motion } from "framer-motion";

interface TimeFrameProps {
  activeStory: string;
}

const stories = [
  "no-selection",
  "all-day",
  "last-hour",
  "start-time",
  "end-time",
];

export const TimeFrame = ({ activeStory }: TimeFrameProps) => {
  return (
    <>
      <motion.div className="absolute w-[41.415%] h-0 pb-[22.1121663%] top-[17%] left-[39.5%]">
        {stories.map((id) => (
          <motion.img
            key={id}
            className="block w-full h-auto absolute top-0 left-0"
            src={`/home/develop/time-frame-${id}.svg`}
            alt=""
            width="370"
            height="303"
            initial={false}
            animate={{ opacity: activeStory === id ? 1 : 0 }}
            transition={{ duration: 0.1 }}
          />
        ))}
      </motion.div>
      <motion.img
        className="block absolute top-[4%] left-[21%] w-[78.9%] rounded"
        src="/home/develop/time-frame-overview.svg"
        alt=""
        initial={false}
        animate={{ opacity: activeStory === "overview" ? 1 : 0 }}
        transition={{ duration: 0.1 }}
      />
    </>
  );
};
