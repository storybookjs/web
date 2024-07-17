/* eslint-disable @next/next/no-img-element -- We can't know the source */
/* eslint-disable @typescript-eslint/no-confusing-void-expression -- TODO: Fix this */
import type { FC } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useAnimate,
  useAnimationControls,
  useInView,
} from 'framer-motion';
import { Sidebar } from './sidebar';
import { Controls } from './controls';
import { TimeFrame } from './timeframe';

export const HeroDemo: FC = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5 });
  const [activeStory, setActiveStory] = useState('no-selection');
  const [scopePointerControls, animatePointerControls] = useAnimate();
  const startTimeControls = useAnimationControls();
  const endTimeControls = useAnimationControls();

  useEffect(() => {
    const sequence = async () => {
      // Cycle through stories
      await animatePointerControls(scopePointerControls.current, {
        opacity: [0, 1],
        x: '-730%',
        y: '-402%',
        transition: {
          delay: 1,
          duration: 1,
          opacity: { duration: 0.4 },
        },
      });
      await animatePointerControls(scopePointerControls.current, {
        scale: [1, 0.9, 1],
        transition: {
          duration: 0.3,
          delay: 0.4,
        },
      });
      setActiveStory('last-hour');
      await animatePointerControls(scopePointerControls.current, {
        x: '-700%',
        y: '-368%',
        transition: {
          delay: 1,
          duration: 0.4,
        },
      });
      await animatePointerControls(scopePointerControls.current, {
        scale: [1, 0.9, 1],
        transition: {
          duration: 0.3,
          delay: 0.4,
        },
      });
      setActiveStory('all-day');
      // Update startTime control
      await animatePointerControls(scopePointerControls.current, {
        x: '560%',
        y: '-214%',
        transition: { delay: 1, duration: 1 },
      });
      await Promise.all([
        await animatePointerControls(scopePointerControls.current, {
          scale: 0.9,
          opacity: 0,
          transition: {
            scale: {
              type: 'spring',
              stiffness: 700,
              damping: 80,
              duration: 0.4,
              delay: 0.4,
            },
            opacity: { delay: 0.4, duration: 0.1 },
          },
        }),
        startTimeControls.start('visible'),
      ]);
      setActiveStory('start-time');
      // Update endTime control
      await animatePointerControls(scopePointerControls.current, {
        opacity: 1,
        x: '580%',
        y: '-148%',
        transition: { delay: 1, duration: 1, opacity: { duration: 0.2 } },
      });
      await Promise.all([
        animatePointerControls(scopePointerControls.current, {
          scale: 0.9,
          opacity: 0,
          transition: {
            scale: {
              type: 'spring',
              stiffness: 700,
              damping: 80,
              duration: 0.4,
              delay: 0.4,
            },
            opacity: { delay: 0.4, duration: 0.1 },
          },
        }),
        endTimeControls.start('visible'),
      ]);
      setActiveStory('end-time');

      // Show docs
      await animatePointerControls(scopePointerControls.current, {
        opacity: 1,
        x: '-720%',
        y: '-470%',
        transition: { delay: 1, duration: 1, opacity: { duration: 0.2 } },
      });
      await animatePointerControls(scopePointerControls.current, {
        scale: [1, 0.9, 1],
        transition: {
          duration: 0.3,
          delay: 0.4,
        },
      });
      setActiveStory('overview');

      // Reset state
      await animatePointerControls(scopePointerControls.current, {
        x: '-730%',
        y: '-436%',
        transition: {
          delay: 2,
          duration: 1,
        },
      });
      await animatePointerControls(scopePointerControls.current, {
        scale: [1, 0.9, 1],
        transition: {
          duration: 0.3,
          delay: 0.4,
        },
      });
      setActiveStory('no-selection');
      await Promise.all([
        animatePointerControls(scopePointerControls.current, {
          x: '0%',
          y: '0%',
          opacity: 0,
          transition: { delay: 1, duration: 1 },
        }),
        endTimeControls.set('initial'),
        startTimeControls.set('initial'),
      ]);
    };

    const stop = () => {
      // Reset state
      setActiveStory('no-selection');
      // TODO: Fix this - Try to find a way to do .set() with the new api
      // pointerControls.set({ x: "0%", y: "0%", opacity: 0 });
      endTimeControls.set('initial');
      startTimeControls.set('initial');
      // stop animations
      // TODO: Fix this  - Try to find a way to do .stop() with the new api
      // pointerControls.stop();
      startTimeControls.stop();
      endTimeControls.stop();
    };

    if (inView) {
      void sequence();
    } else {
      stop();
    }
  }, [
    startTimeControls,
    endTimeControls,
    inView,
    animatePointerControls,
    scopePointerControls,
  ]);

  return (
    <motion.div
      className="relative h-0 w-full pb-[69.10907577%] after:absolute after:bottom-0 after:left-0 after:right-0 after:top-0 after:rounded-lg after:shadow-lg after:content-[''] sm:mt-[-12.625rem]"
      data-chromatic="ignore"
      ref={ref}
    >
      <motion.img
        alt=""
        className="absolute top-0 left-0 block w-full h-auto"
        height="830"
        src="/home/develop/storybook-frame.svg"
        width="1201"
      />
      <Sidebar activeStory={activeStory} type="timeFrame" />
      <Controls
        endTimeControls={endTimeControls}
        startTimeControls={startTimeControls}
      />
      <TimeFrame activeStory={activeStory} />
      <img
        alt=""
        className="absolute left-[50%] top-[100%] block h-auto w-[5.66%]"
        data-chromatic="ignore"
        ref={scopePointerControls}
        src="/home/develop/pointer.svg"
      />
    </motion.div>
  );
};
