import type { FC } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Sidebar } from './sidebar';
import { SlideAgents } from './slide-agents';
import { SlideControls } from './slide-controls';
import { SlideDocs } from './slide-docs';
import { SlideInteractions } from './slide-interactions';
import { SlideVisualTesting } from './slide-visual-testing';
import { SLIDES } from './slides';

export { SLIDES };

export const Manager: FC<{ slide: number }> = ({ slide }) => {
  return (
    <div
      className="flex h-[620px] sm:h-[720px] rounded-b-md overflow-hidden"
      role="presentation"
    >
      <Sidebar slide={slide} />
      <div className="relative flex-1 w-full h-full bg-white">
        <AnimatePresence>
          {slide === SLIDES.development && <SlideControls />}
        </AnimatePresence>
        <AnimatePresence>
          {slide === SLIDES.interactions && <SlideInteractions />}
        </AnimatePresence>
        <AnimatePresence>
          {slide === SLIDES.visualTesting && <SlideVisualTesting />}
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
