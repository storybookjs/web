import { motion } from 'framer-motion';
import { cn } from '@repo/utils';
import {
  ChangedIcon,
  ChevronSmallDownIcon,
  DiamondIcon,
  ExpandAltIcon,
  PassedIcon,
} from '@storybook/icons';
import { useEffect, useState } from 'react';
import { Chrome } from '../../icons/chrome';
import { Tabs } from './tabs';
import { Toolbar } from './toolbar';
import { ComponentSmall } from './component-small';
import { ComponentVTA } from './component-vta';
import { ComponentDiff2 } from './component-diff2';
import { ComponentDiff1 } from './component-diff1';

export const SlideVisualTesting = () => {
  const [counter, setCounter] = useState(0);
  const [changeTitle, setChangeTitle] = useState('No changes');

  const DELAY = 0.6;
  const DURATION = 2;

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        const interval = setInterval(() => {
          setCounter((prevCounter) => {
            if (prevCounter >= 100) {
              clearInterval(interval);
              return 100;
            }
            return prevCounter + 1;
          });
        }, DURATION * 10);

        return () => {
          clearInterval(interval);
        };
      },
      DELAY * 100 + 600,
    );

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (counter === 100) {
      setChangeTitle('Changes found');
    }
  }, [counter]);

  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="absolute top-0 left-0 flex-1 w-full h-full bg-white"
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
    >
      <div
        className={cn(
          'absolute top-10 flex h-[calc(45%-40px)] w-full items-center justify-center bg-white p-4 text-black transition-all sm:h-[calc(60%-40px)] sm:p-8 lg:h-[calc(100%-40px)] lg:w-[calc(100%-400px)]',
        )}
      >
        <ComponentVTA />
        <ComponentSmall className="max-h-full sm:hidden" />
      </div>
      <Toolbar slide={1} />
      <div className="absolute bottom-0 left-0 flex h-[55%] w-full flex-col border-t border-t-[#D9E0E6] sm:h-[40%] lg:bottom-auto lg:left-auto lg:right-0 lg:top-0 lg:h-full lg:w-[400px] lg:border-l lg:border-t-0 lg:border-l-[#D9E0E6]">
        <Tabs active={1} slide={4} />
        <motion.div
          animate={{
            height: [null, 40, 40, 0],
            borderBottomColor: ['#ffffff', '#D9E0E6', '#D9E0E6', '#ffffff'],
          }}
          className="relative flex-shrink-0 overflow-hidden border-b"
          initial={{ height: 0, borderBottomColor: 'transparent' }}
          transition={{ delay: DELAY, duration: 3, times: [0, 0.1, 0.9, 1] }}
        >
          <div className="relative flex h-10 flex-shrink-0 items-center justify-between bg-[#F6F9FC] px-4 text-sm text-black">
            <span className="relative z-10">
              👀 Running visual test {Math.floor(counter * 1.24)}/124...
            </span>
            <ExpandAltIcon className="relative z-10 text-slate-500" />
            <div
              className="absolute left-0 top-0 h-full bg-[#E3F3FF]"
              style={{ width: `${counter.toString()}%` }}
            />
          </div>
        </motion.div>
        <div className="border-b border-b-[#D9E0E6] px-4 py-3 text-sm text-black">
          <div className="flex items-center gap-2 mb-1 font-bold">
            {changeTitle}
            <div className="relative h-[14px] w-[14px]">
              <motion.div
                animate={{ opacity: 0 }}
                className="absolute top-0 left-0 text-green-500"
                initial={{ opacity: 1 }}
                transition={{ delay: DURATION + DELAY }}
              >
                <PassedIcon />
              </motion.div>
              <motion.div
                animate={{ opacity: 1 }}
                className="absolute left-0 top-0 text-[#e69d00]"
                initial={{ opacity: 0 }}
                transition={{ delay: DURATION + DELAY }}
              >
                <ChangedIcon />
              </motion.div>
            </div>
          </div>
          <div className="text-xs text-slate-500">
            3 modes, 3 browsers • Ran 1m ago
          </div>
        </div>
        <div className="flex items-start justify-start flex-1 px-8 py-6">
          {counter !== 100 && <ComponentDiff1 />}
          {counter === 100 && <ComponentDiff2 />}
        </div>
        <div className="flex h-10 items-center gap-5 border-t border-t-[#D9E0E6] px-4 text-sm text-[#73828C]">
          <div className="flex items-center gap-1.5">
            <DiamondIcon />
            Mobile Light <ChevronSmallDownIcon />
          </div>
          <div className="flex items-center gap-1.5">
            <Chrome />
            Chrome <ChevronSmallDownIcon />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
