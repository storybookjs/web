import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Player } from './player';
import StorybookMockUI from './images/storybook-mock-ui.svg';
import caret from './images/caret.svg';
import arrow from './images/arrow.svg';
import pointerHand from './images/pointer-hand.svg';
import timeFramePicker from './images/time-frame-picker.svg';

const symbolVariants = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
};

export const PublishIntegrations = () => {
  return (
    <motion.div
      className="relative w-full max-w-[800px] md:w-[150%]"
      initial="initial"
      viewport={{ once: true }}
      whileInView="animate"
    >
      <Image
        alt="Storybook Mock UI"
        className="block w-full h-auto"
        src={StorybookMockUI}
      />
      <Image
        alt=""
        className="block w-[46%] max-w-[440px] h-auto absolute z-[1] top-[18%] left-[37%] select-none pointer-events-none md:top-[15%] md:left-[25%]"
        src={timeFramePicker}
      />

      <motion.div
        className="absolute top-[10%] left-[32%] w-auto h-[5%] z-10"
        transition={{ duration: 0.4, delay: 0.8 }}
        variants={symbolVariants}
      >
        <Image alt="" src={pointerHand} width={32} />
      </motion.div>
      <Player count={2} delay={1} type="blue" x="6%" y="-12%" />
      <motion.div
        className="absolute top-[64%] left-[20%] w-auto h-[5%] ms:left-[10%] z-10"
        transition={{ duration: 0.4, delay: 1.6 }}
        variants={symbolVariants}
      >
        <Image alt="" src={arrow} width={32} />
      </motion.div>
      <Player count={4} delay={1.8} type="red" x="-7%" y="45%" />
      <Player count={2} delay={3} type="yellow" x="30%" y="56%" />
      <motion.div
        className="absolute top-[48%] left-[66%] w-auto h-[5%] z-10"
        transition={{ duration: 0.4, delay: 3.6 }}
        variants={symbolVariants}
      >
        <Image alt="" src={caret} width={24} />
      </motion.div>
      <Player count={1} delay={3.8} type="purple" x="65%" y="9%" />
    </motion.div>
  );
};

PublishIntegrations.displayName = 'PublishIntegrations';
