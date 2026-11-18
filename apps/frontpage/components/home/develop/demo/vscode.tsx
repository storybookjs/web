import React from 'react';
import type { MotionValue } from 'framer-motion';
import { motion, useTransform } from 'framer-motion';

export function VSCode({
  scrollProgress,
  appearProgress,
}: {
  scrollProgress: MotionValue<number>;
  appearProgress: MotionValue<number>;
}) {
  const x = useTransform(scrollProgress, [0, 1], ['0%', '40%']);
  const opacity = useTransform(scrollProgress, [0, 0.5, 1], [1, 1, 0]);
  const scaleY = useTransform(appearProgress, [0, 1], [1, 0]);

  return (
    <>
      <motion.img
        className="absolute left-[50%] top-[-2.2%] block h-auto w-[97.2%] md:top-[-5%] md:w-[101%]"
        height="993"
        src="/home/develop/vscode.svg"
        style={{ x, opacity }}
        width="1280"
      />
      <motion.div
        className="absolute left-[75%] top-[9%] h-[89.9%] w-[50%] bg-[#232a35] md:left-[76%] md:top-[5%] md:h-[96.1%] md:w-[60%]"
        style={{ transformOrigin: 'center bottom', x, opacity, scaleY }}
      />
    </>
  );
}
