import React from "react";
import type { MotionProps } from "framer-motion";
import { motion } from "framer-motion";

interface SidebarProps extends MotionProps {
  type: "rangeSlider" | "timeFrame";
  activeStory: string;
}

const rangeSliderStories = ["default", "input-range", "no-selection"];
const timeFrameStories = ["overview", "all-day", "last-hour", "no-selection"];

export function Sidebar({
  activeStory,
  type = "rangeSlider",
  ...props
}: SidebarProps & MotionProps) {
  const modifyingControls = ["start-time", "end-time"].includes(activeStory);
  const storyID = modifyingControls ? "all-day" : activeStory;

  return (
    <motion.div
      className="absolute top-0 left-0 bottom-0 w-full rounded-xl overflow-hidden"
      {...props}
    >
      {type === "rangeSlider" &&
        rangeSliderStories.map((id) => (
          <motion.img
            alt=""
            animate={{ opacity: storyID === id ? 1 : 0 }}
            className="absolute top-0 left-0 h-full"
            key={id}
            src={`/home/develop/sidebar-rs-${id}.svg`}
            transition={{ duration: 0.1 }}
          />
        ))}
      {type === "timeFrame" &&
        timeFrameStories.map((id) => (
          <motion.img
            alt=""
            animate={{ opacity: storyID === id ? 1 : 0 }}
            className="absolute top-0 left-0 h-full"
            key={id}
            src={`/home/develop/sidebar-tf-${id}.svg`}
            transition={{ duration: 0.1 }}
          />
        ))}
    </motion.div>
  );
}
