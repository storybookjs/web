import type { FC } from 'react';
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@repo/utils';
import { AspectRatio } from '../../ui/aspect-ratio';

const players = {
  blue: '/home/share/avatar-1.png',
  red: '/home/share/avatar-2.png',
  yellow: '/home/share/avatar-3.png',
  purple: '/home/share/avatar-4.png',
};

interface PlayerProps {
  x: string;
  y: string;
  type: 'blue' | 'red' | 'yellow' | 'purple';
  delay: number;
  count: number;
}

const MotionComponent = motion.div;

const purple =
  'bg-[radial-gradient(100%_100%_at_50%_50%,_rgba(111,_44,_172,_0)_0%,_#6f2cac_100%)]';
const yellow =
  'bg-[radial-gradient(100%_100%_at_50%_50%,_rgba(255,_174,_0,_0)_0%,_#ffae00_100%)]';
const red =
  'bg-[radial-gradient(100%_100%_at_50%_50%,_rgba(255,_71,_133,_0.0001)_0%,_#ff4785_100%)]';
const blue =
  'bg-[radial-gradient(100%_100%_at_50%_50%,_rgba(30,_167,_253,_0.0001)_0%,_#1ea7fd_100%)]';

export const Player: FC<PlayerProps> = ({ x, y, type, delay, count }) => (
  <MotionComponent
    className="w-[28%] absolute z-[1] sm:w-[20%] md:w-[14%]"
    data-chromatic="ignore"
    initial="initial"
    style={{ left: x, top: y }}
    transition={{ type: 'pop', delay, duration: 0.4 }}
    variants={{
      initial: { scale: 0, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
    }}
    viewport={{ once: true }}
    whileInView="animate"
  >
    <AspectRatio ratio={1 / 1}>
      <motion.div
        className={cn(
          'rounded-[50%] absolute top-1/2 left-1/2 w-full h-full opacity-10',
          type === 'purple' && purple,
          type === 'yellow' && yellow,
          type === 'red' && red,
          type === 'blue' && blue,
        )}
        color={type}
        data-chromatic="ignore"
        style={{ x: '-50%', y: '-50%' }}
        transition={{
          ease: 'linear',
          repeat: count,
          repeatType: 'loop',
          duration: 0.3,
          delay: delay + 0.4,
          repeatDelay: 0,
        }}
        variants={{
          initial: { opacity: 0.1 },
          animate: { opacity: 0 },
        }}
      />
      <motion.div
        className={cn(
          'rounded-[50%] absolute top-1/2 left-1/2 w-[60%] h-[60%] opacity-10',
          type === 'purple' && purple,
          type === 'yellow' && yellow,
          type === 'red' && red,
          type === 'blue' && blue,
        )}
        color={type}
        data-chromatic="ignore"
        style={{ x: '-50%', y: '-50%' }}
        transition={{
          ease: 'linear',
          repeat: count,
          repeatType: 'loop',
          duration: 0.3,
          delay: delay + 0.4,
          repeatDelay: 0,
        }}
        variants={{
          initial: { scale: 1, opacity: 0.3 },
          animate: { scale: 1.66666667, opacity: 0.1 },
        }}
      />
      <motion.div
        className={cn(
          'rounded-[50%] absolute top-1/2 left-1/2 w-[28%] h-[28%] opacity-30',
          type === 'purple' && purple,
          type === 'yellow' && yellow,
          type === 'red' && red,
          type === 'blue' && blue,
        )}
        color={type}
        data-chromatic="ignore"
        style={{ x: '-50%', y: '-50%' }}
        transition={{
          ease: 'linear',
          repeat: count,
          repeatType: 'loop',
          duration: 0.3,
          delay: delay + 0.4,
          repeatDelay: 0,
        }}
        variants={{
          initial: { scale: 1, opacity: 0 },
          animate: { scale: 2.14285714, opacity: 0.3 },
        }}
      />
      <img
        className="border-2 border-white rounded-[50%] shadow-sm block w-[28%] h-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        src={players[type]}
        alt="Player"
      />
    </AspectRatio>
  </MotionComponent>
);
