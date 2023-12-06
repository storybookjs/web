import React from "react";
import { motion, useTransform, MotionValue } from "framer-motion";

interface AppProps {
  scrollProgress: MotionValue;
}

export const App = ({ scrollProgress }: AppProps) => {
  const x = useTransform(scrollProgress, [0, 1], ["0%", "-109%"]);
  const opacity = useTransform(scrollProgress, [0, 0.5, 1], [0, 1, 1]);

  return (
    <motion.img
      className="block w-[84%] h-auto absolute top-[-2%] left-[100%] z-[2]"
      src="/develop/app.svg"
      width="1280"
      height="1000"
      style={{ x, opacity }}
    />
  );
};
