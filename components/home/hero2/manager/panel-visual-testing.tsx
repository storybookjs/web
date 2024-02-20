import { FC } from "react";
import { motion } from "framer-motion";

export const PanelVisualTesting: FC = () => {
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 40, opacity: 0 }}
      className="absolute top-0 right-0 h-full w-[230px] border-l border-l-[#D9E0E6] p-4 text-black"
    >
      Visual Testing
    </motion.div>
  );
};
