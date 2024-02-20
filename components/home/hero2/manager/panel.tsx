import { FC } from "react";
import { motion } from "framer-motion";

export const Panel: FC = () => {
  return (
    <motion.div
      initial={{ y: 400 }}
      animate={{ y: 0 }}
      exit={{ y: 400 }}
      className="absolute bottom-0 left-0 w-full h-[40%] border-t border-t-[#D9E0E6] p-4 text-black"
    >
      Panel
    </motion.div>
  );
};
