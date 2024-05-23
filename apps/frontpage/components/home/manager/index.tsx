import type { FC } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Sidebar } from './sidebar';
import { SlideControls } from './slide-controls';
import { SlideDocs } from './slide-docs';
import { SlideInteractions } from './slide-interactions';
import { SlideVisualTesting } from './slide-visual-testing';

export const Manager: FC<{ slide: number }> = ({ slide }) => {
  return (
    <div
      className="flex h-[620px] sm:h-[720px] rounded-b-md overflow-hidden"
      role="presentation"
    >
      <Sidebar slide={slide} />
      <div className="relative flex-1 w-full h-full bg-white">
        <AnimatePresence>{slide === 1 && <SlideControls />}</AnimatePresence>
        <AnimatePresence>{slide === 2 && <SlideDocs />}</AnimatePresence>
        <AnimatePresence>
          {slide === 3 && <SlideInteractions />}
        </AnimatePresence>
        <AnimatePresence>
          {slide === 4 && <SlideVisualTesting />}
        </AnimatePresence>
      </div>
    </div>
  );
};
