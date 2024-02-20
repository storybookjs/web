import { FC } from "react";
import { motion } from "framer-motion";
import { Controls } from "./controls";

export const PanelControls: FC = () => {
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 40, opacity: 0 }}
      className="absolute bottom-0 left-0 w-full h-[40%] border-t border-t-[#D9E0E6] text-black"
    >
      <Controls />
    </motion.div>
  );
};
