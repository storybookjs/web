import React from "react";
import { motion, MotionProps } from "framer-motion";

interface SidebarProps extends MotionProps {
  type: "rangeSlider" | "timeFrame";
  activeStory: string;
}

const rangeSliderStories = ["default", "input-range", "no-selection"];
const timeFrameStories = ["overview", "all-day", "last-hour", "no-selection"];

export const Sidebar = ({
  activeStory,
  type = "rangeSlider",
  ...props
}: SidebarProps & MotionProps) => {
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
            className="absolute top-0 left-0 h-full"
            key={id}
            src={`/develop/sidebar-rs-${id}.svg`}
            alt=""
            animate={{ opacity: storyID === id ? 1 : 0 }}
            transition={{ duration: 0.1 }}
          />
        ))}
      {type === "timeFrame" &&
        timeFrameStories.map((id) => (
          <motion.img
            className="absolute top-0 left-0 h-full"
            key={id}
            src={`/develop/sidebar-tf-${id}.svg`}
            alt=""
            animate={{ opacity: storyID === id ? 1 : 0 }}
            transition={{ duration: 0.1 }}
          />
        ))}
    </motion.div>
  );
};
