import type { FC } from 'react';
import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '@repo/ui';

const calendarVariants = {
  initial: { opacity: 0.5, filter: 'grayscale(100%)' },
  animate: { opacity: 1, filter: 'grayscale(0%)' },
};
const statusVariants = {
  initial: { x: '50%', y: '-50%' },
  spin: { rotate: 1440, x: '50%', y: '-50%', transition: { duration: 0.8 } },
  animate: {
    rotateY: 180,
    x: '50%',
    y: '-50%',
    transition: { delay: 1.6, duration: 0.8 },
  },
};
const decorationVariants = {
  initial: { y: '15%', opacity: 0 },
  animate: { y: 0, opacity: 1 },
};

export const Publish: FC = () => {
  return (
    <Container asChild data-chromatic="ignore">
      <figure>
        <div className="relative mt-12 mx-auto max-w-[400px] sm:mt-16">
          <motion.img
            alt=""
            className="absolute w-[8%] h-auto top-[73%] right-[15%] z-[2]"
            initial="initial"
            src="/home/automate/arrow.svg"
            transition={{ duration: 0.3, delay: 1.8 }}
            variants={decorationVariants}
            viewport={{ once: true, amount: 'all' }}
            whileInView="animate"
          />
          <motion.img
            alt=""
            className="absolute w-[10%] h-auto left-[14%] bottom-[50%] z-[2]"
            initial="initial"
            src="/home/automate/pointerhand.svg"
            transition={{ duration: 0.3, delay: 1.8 }}
            variants={decorationVariants}
            viewport={{ once: true, amount: 'all' }}
            whileInView="animate"
          />
          <motion.img
            alt=""
            className="block w-full"
            initial="initial"
            src="/home/automate/datepicker-compact-week.svg"
            transition={{ duration: 0.8 }}
            variants={calendarVariants}
            viewport={{ once: true, amount: 'all' }}
            whileInView="animate"
          />
          <motion.div
            className="block absolute w-[8%] h-0 pb-[8%] top-0 right-0 transform-style-preserve-3d"
            initial="initial"
            style={{ perspective: '1000px' }}
            variants={statusVariants}
            viewport={{ once: true, amount: 'all' }}
            whileInView={['spin', 'animate']}
          >
            <img
              alt=""
              className="rotate-0 w-full absolute top-0 left-0 right-0 bottom-0 z-[2]"
              src="/home/automate/status-publishing.svg"
              style={{ backfaceVisibility: 'hidden' }}
            />
            <img
              alt=""
              className="absolute top-0 bottom-0 left-0 right-0 w-full rotate-180"
              src="/home/automate/status-published.svg"
            />
          </motion.div>
        </div>
      </figure>
    </Container>
  );
};
