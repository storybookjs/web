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
        className="block h-auto absolute w-[97.2%] top-[-2.2%] left-[50%] md:w-[101%] md:top-[-5%]"
        height="993"
        src="/home/develop/vscode.svg"
        style={{ x, opacity }}
        width="1280"
      />
      <motion.div
        className="bg-[#232a35] absolute top-[9%] left-[75%] w-[50%] h-[89.9%] md:top-[5%] md:left-[76%] md:w-[60%] md:h-[96.1%]"
        style={{ transformOrigin: 'center bottom', x, opacity, scaleY }}
      />
    </>
  );
}
