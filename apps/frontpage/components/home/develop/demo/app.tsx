import React from 'react';
import type { MotionValue } from 'framer-motion';
import { motion, useTransform } from 'framer-motion';

interface AppProps {
  scrollProgress: MotionValue<number>;
}

export function App({ scrollProgress }: AppProps) {
  const x = useTransform(scrollProgress, [0, 1], ['0%', '-109%']);
  const opacity = useTransform(scrollProgress, [0, 0.5, 1], [0, 1, 1]);

  return (
    <motion.img
      className="block w-[84%] h-auto absolute top-[-2%] left-[100%] z-[2]"
      height="1000"
      src="/home/develop/app.svg"
      style={{ x, opacity }}
      width="1280"
    />
  );
}
