/* eslint-disable @next/next/no-img-element -- TODO */
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
        <div className="relative mx-auto mt-12 max-w-[400px] sm:mt-16">
          <motion.img
            alt=""
            className="absolute right-[15%] top-[73%] z-[2] h-auto w-[8%]"
            initial="initial"
            src="/home/automate/arrow.svg"
            transition={{ duration: 0.3, delay: 1.8 }}
            variants={decorationVariants}
            viewport={{ once: true, amount: 'all' }}
            whileInView="animate"
          />
          <motion.img
            alt=""
            className="absolute bottom-[50%] left-[14%] z-[2] h-auto w-[10%]"
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
            className="transform-style-preserve-3d absolute right-0 top-0 block h-0 w-[8%] pb-[8%]"
            initial="initial"
            style={{ perspective: '1000px' }}
            variants={statusVariants}
            viewport={{ once: true, amount: 'all' }}
            whileInView={['spin', 'animate']}
          >
            <img
              alt=""
              className="absolute bottom-0 left-0 right-0 top-0 z-[2] w-full rotate-0"
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
