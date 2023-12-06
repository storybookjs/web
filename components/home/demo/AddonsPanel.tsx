import React from "react";
import { motion, MotionProps, MotionValue, useTransform } from "framer-motion";

interface AddonsProps extends MotionProps {
  activePanel: string;
  scrollProgress: MotionValue;
}

const panels = ["a11y", "controls", "design", "interactions"];

export const AddonsPanel = ({
  scrollProgress,
  activePanel,
  ...props
}: AddonsProps) => {
  const y = useTransform(scrollProgress, [0, 0.15], ["100%", "0%"], {
    clamp: true,
  });

  return (
    <motion.div
      className="absolute top-0 left-0 bottom-0 w-full"
      style={{ clipPath: "polygon(20% 50%, 100% 50%, 100% 100%, 20% 100%)" }}
      {...props}
    >
      {panels.map((id) => (
        <motion.img
          className="absolute top-0 left-0 h-full"
          key={id}
          src={`images/develop/addons-${id}.svg`}
          alt=""
          animate={{ opacity: id === activePanel ? 1 : 0 }}
          style={{ y }}
          transition={{ duration: 0.1 }}
        />
      ))}
    </motion.div>
  );
};
