import { useEffect } from 'react';
import { motion, useAnimate } from 'framer-motion';
import { UndoIcon } from '@storybook/icons';
import Image from 'next/image';
import { cn } from '@repo/utils';
import { Tabs } from './tabs';
import { Controls } from './controls';
import hand from './hand.svg';
import { Toolbar } from './toolbar';
import componentSmall from './component-small.svg';
import { Component } from './component';

export const SlideControls = () => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    void (async () => {
      await animate(scope.current, { y: 280 });
      await animate(
        scope.current,
        {
          x: 210,
          y: 200,
          opacity: 1,
        },
        { duration: 0.4 },
      );
      await animate(
        scope.current,
        { scale: 0.8 },
        { duration: 0.1, delay: 0.2 },
      );
      await animate(scope.current, { scale: 1 }, { duration: 0.1 });
      await animate(
        scope.current,
        { x: 240, y: 256 },
        { duration: 0.1, delay: 1 },
      );
      await animate(
        scope.current,
        { scale: 0.8 },
        { duration: 0.1, delay: 0.2 },
      );
      await animate(scope.current, { scale: 1 }, { duration: 0.1 });
    })();
  }, [animate, scope]);

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
        <Component />
        <Image
          alt="Component"
          className="max-h-full sm:hidden"
          src={componentSmall}
        />
      </div>
      <Toolbar slide={1} />
      <div className="absolute bottom-0 left-0 w-full h-[55%] sm:h-[40%] lg:bottom-auto lg:left-auto lg:top-0 lg:right-0 lg:h-full lg:w-[400px] border-t border-t-[#D9E0E6] lg:border-t-0 lg:border-l lg:border-l-[#D9E0E6] flex flex-col text-black">
        <Image
          alt="Hand"
          className="absolute top-0 z-20 opacity-0"
          height={48}
          ref={scope}
          src={hand}
          width={48}
        />
        <Tabs active={0} />
        <div className="flex h-10 flex-shrink-0 items-center border-b border-b-[#D9E0E6]">
          <div className="text-[13px] w-1/2 md:w-1/2 flex-shrink-0 pl-4">
            Name
          </div>
          <div className="text-[13px] w-1/2 md:w-1/2 flex justify-between items-center pr-4 ">
            <div>Controls</div>
            <UndoIcon className="text-[#73828C]" />
          </div>
        </div>
        <Controls isPanel />
      </div>
    </motion.div>
  );
};
