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
          'absolute w-full top-10 h-[calc(45%-40px)] flex items-center justify-center text-black bg-white transition-all p-4 sm:p-8 sm:h-[calc(60%-40px)] lg:w-[calc(100%-400px)] lg:h-[calc(100%-40px)]',
        )}
      >
        <ComponentVTA />
        <ComponentSmall className="max-h-full sm:hidden" />
      </div>
      <Toolbar slide={1} />
      <div className="absolute bottom-0 left-0 w-full h-[55%] sm:h-[40%] lg:bottom-auto lg:left-auto lg:top-0 lg:right-0 lg:h-full lg:w-[400px] border-t border-t-[#D9E0E6] lg:border-t-0 lg:border-l lg:border-l-[#D9E0E6] flex flex-col">
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
          <div className="relative flex text-black text-sm h-10 items-center justify-between flex-shrink-0 px-4 bg-[#F6F9FC]">
            <span className="relative z-10">
              👀 Running visual test {Math.floor(counter * 1.24)}/124...
            </span>
            <ExpandAltIcon className="relative z-10 text-slate-500" />
            <div
              className="absolute top-0 left-0 bg-[#E3F3FF] h-full"
              style={{ width: `${counter}%` }}
            />
          </div>
        </motion.div>
        <div className="border-b border-b-[#D9E0E6] text-black text-sm px-4 py-3">
          <div className="flex items-center gap-2 mb-1 font-bold">
            {changeTitle}
            <div className="relative w-[14px] h-[14px]">
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
                className="absolute top-0 left-0 text-[#e69d00]"
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
        <div className="border-t border-t-[#D9E0E6] text-[#73828C] h-10 text-sm px-4 flex items-center gap-5">
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
