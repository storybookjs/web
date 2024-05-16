import type { FC } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@repo/utils';
import timeframe1 from './timeframe-1.svg';

export const Canvas: FC<{ slide: number }> = ({ slide }) => {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      className={cn(
        'absolute w-full top-10 h-[calc(60%-40px)] flex items-center justify-center text-black bg-white transition-all px-4 sm:h-[calc(60%-40px)] lg:w-[calc(100%-400px)] lg:h-[calc(100%-40px)]',
        slide === 4 && 'h-[calc(50%-40px)]',
      )}
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
    >
      <Image alt="TimeFrame" priority src={timeframe1} />
    </motion.div>
  );
};
