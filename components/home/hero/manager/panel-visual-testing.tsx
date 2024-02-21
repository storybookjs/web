import { FC } from "react";
import { motion } from "framer-motion";
import { Tabs } from "./tabs";

export const PanelVisualTesting: FC<{ slide: number }> = ({ slide }) => {
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 40, opacity: 0 }}
      className="absolute bottom-0 left-0 w-full h-[40%] lg:bottom-auto lg:left-auto lg:top-0 lg:right-0 lg:h-full lg:w-[320px] border-t border-t-[#D9E0E6] lg:border-t-0 lg:border-l lg:border-l-[#D9E0E6]"
    >
      <Tabs slide={slide} active={1} />
    </motion.div>
  );
};
