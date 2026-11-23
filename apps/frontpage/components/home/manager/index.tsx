import type { FC } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Sidebar } from './sidebar';
import { SlideAgents } from './slide-agents';
import { SlideControls } from './slide-controls';
import { SlideDocs } from './slide-docs';
import { SlideTesting } from './slide-testing';
import { SLIDE_DURATION, SLIDES, TESTING_SLIDE_DURATION } from './slides';

export { SLIDE_DURATION, SLIDES, TESTING_SLIDE_DURATION };

export const Manager: FC<{ slide: number }> = ({ slide }) => {
  return (
    <div
      className="flex h-[620px] overflow-hidden rounded-b-md sm:h-[720px]"
      role="presentation"
    >
      <Sidebar slide={slide} />
      <div className="relative h-full w-full flex-1 bg-white">
        <AnimatePresence>
          {slide === SLIDES.development && <SlideControls />}
        </AnimatePresence>
        <AnimatePresence>
          {slide === SLIDES.testing && <SlideTesting />}
        </AnimatePresence>
        <AnimatePresence>
          {slide === SLIDES.docs && <SlideDocs />}
        </AnimatePresence>
        <AnimatePresence>
          {slide === SLIDES.agents && <SlideAgents />}
        </AnimatePresence>
      </div>
    </div>
  );
};
