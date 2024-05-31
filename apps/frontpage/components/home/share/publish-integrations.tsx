import React, { forwardRef } from 'react';
import type { MotionValue } from 'framer-motion';
import { motion } from 'framer-motion';
import { Player } from './player';

const symbolVariants = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
};

export const PublishIntegrations = forwardRef<
  HTMLImageElement | null,
  {
    timeFrameStyles: {
      x: MotionValue<string>;
      y: MotionValue<string>;
      scale: number;
      opacity: number;
      transformOrigin: string;
    };
  }
>(({ timeFrameStyles }, ref) => {
  return (
    <motion.div
      className="relative w-full max-w-[800px] md:w-[150%] md:col-[2/3]"
      initial="initial"
      viewport={{ once: true }}
      whileInView="animate"
    >
      <div
        data-chromatic="ignore"
        style={{
          position: 'absolute',
          top: -64,
          left: -64,
          right: 0,
          bottom: 0,
          zIndex: '-1',
        }}
      />
      <img
        alt=""
        className="block w-full h-auto"
        src="/home/share/storybook-mock-ui.svg"
      />
      <motion.img
        className="block w-[46%] max-w-[440px] h-auto absolute z-[1] top-[18%] left-[37%] select-none pointer-events-none md:top-[15%] md:left-[25%]"
        height="244"
        initial={false}
        src="/home/share/time-frame-picker.svg"
        style={timeFrameStyles}
        width="458"
      />
      <motion.img
        className="block w-[46%] max-w-[440px] h-auto absolute z-[1] top-[18%] left-[37%] select-none pointer-events-none md:top-[15%] md:left-[25%]"
        height="244"
        ref={ref}
        style={{ opacity: 0 }}
        width="458"
      />
      <motion.img
        className="absolute top-[10%] left-[32%] w-auto h-[5%]"
        src="/home/share/pointerhand.svg"
        transition={{ duration: 0.4, delay: 0.8 }}
        variants={symbolVariants}
      />
      <Player count={2} delay={1} type="blue" x="6%" y="-12%" />
      <motion.img
        alt=""
        className="absolute top-[64%] left-[20%] w-auto h-[5%] ms:left-[10%]"
        src="/home/share/arrow.svg"
        transition={{ duration: 0.4, delay: 1.6 }}
        variants={symbolVariants}
      />
      <Player count={4} delay={1.8} type="red" x="-7%" y="45%" />
      <Player count={2} delay={3} type="yellow" x="30%" y="56%" />
      <motion.img
        className="absolute top-[20%] left-[66%] w-auto h-[5%]"
        src="/home/share/caret.svg"
        transition={{ duration: 0.4, delay: 3.6 }}
        variants={symbolVariants}
      />
      <Player count={1} delay={3.8} type="purple" x="65%" y="9%" />
    </motion.div>
  );
});

PublishIntegrations.displayName = 'PublishIntegrations';
