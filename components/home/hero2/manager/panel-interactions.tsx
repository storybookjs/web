import { FC } from "react";
import { motion } from "framer-motion";

export const PanelInteractions: FC = () => {
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 40, opacity: 0 }}
      className="absolute bottom-0 left-0 w-full h-[40%] border-t border-t-[#D9E0E6] p-4 text-black"
    >
      Interactions
    </motion.div>
  );
};
