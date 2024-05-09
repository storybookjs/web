import React from "react";
import { motion } from "framer-motion";
import { Player } from "./player";

const symbolVariants = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
};

export const PublishIntegrations = React.forwardRef<
  HTMLImageElement | null,
  { timeFrameStyles: React.CSSProperties }
>(({ timeFrameStyles }, ref) => {
  return (
    <motion.div
      className="relative w-full max-w-[800px] md:w-[150%] md:col-[2/3]"
      whileInView="animate"
      initial="initial"
      viewport={{ once: true }}
    >
      <div
        style={{
          position: "absolute",
          top: -64,
          left: -64,
          right: 0,
          bottom: 0,
          zIndex: "-1",
        }}
        data-chromatic="ignore"
      />
      <img
        className="block w-full h-auto"
        src="/home/share/storybook-mock-ui.svg"
        alt=""
      />
      <motion.img
        className="block w-[46%] max-w-[440px] h-auto absolute z-[1] top-[18%] left-[37%] select-none pointer-events-none md:top-[15%] md:left-[25%]"
        initial={false}
        style={timeFrameStyles}
        width="458"
        height="244"
        src="/home/share/time-frame-picker.svg"
      />
      <motion.img
        className="block w-[46%] max-w-[440px] h-auto absolute z-[1] top-[18%] left-[37%] select-none pointer-events-none md:top-[15%] md:left-[25%]"
        ref={ref}
        width="458"
        height="244"
        style={{ opacity: 0 }}
      />
      <motion.img
        className="absolute top-[10%] left-[32%] w-auto h-[5%]"
        src="/home/share/pointerhand.svg"
        variants={symbolVariants}
        transition={{ duration: 0.4, delay: 0.8 }}
      />
      <Player type="blue" x="6%" y="-12%" delay={1} count={2} />
      <motion.img
        className="absolute top-[64%] left-[20%] w-auto h-[5%] ms:left-[10%]"
        src="/home/share/arrow.svg"
        alt=""
        variants={symbolVariants}
        transition={{ duration: 0.4, delay: 1.6 }}
      />
      <Player type="red" x="-7%" y="45%" delay={1.8} count={4} />
      <Player type="yellow" x="30%" y="56%" delay={3} count={2} />
      <motion.img
        className="absolute top-[20%] left-[66%] w-auto h-[5%]"
        src="/home/share/caret.svg"
        variants={symbolVariants}
        transition={{ duration: 0.4, delay: 3.6 }}
      />
      <Player type="purple" x="65%" y="9%" delay={3.8} count={1} />
    </motion.div>
  );
});

PublishIntegrations.displayName = "PublishIntegrations";
