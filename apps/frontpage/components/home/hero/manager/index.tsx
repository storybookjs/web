import type { FC } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Sidebar } from './sidebar';
import { Toolbar } from './toolbar';
import { PanelControls } from './panel-controls';
import { Doc } from './doc';
import { PanelInteractions } from './panel-interactions';
import { Canvas } from './canvas';
import { PanelVisualTesting } from './panel-visual-testing';

export const Manager: FC<{ slide: number }> = ({ slide }) => {
  return (
    <div
      className="flex h-[620px] sm:h-[720px] rounded-b-md overflow-hidden"
      role="presentation"
    >
      <Sidebar slide={slide} />
      <div className="relative flex-1 w-full h-full bg-white">
        <AnimatePresence>
          {slide !== 2 && <Canvas slide={slide} />}
        </AnimatePresence>
        <Toolbar />
        <AnimatePresence>{slide === 1 && <PanelControls />}</AnimatePresence>
        <AnimatePresence>{slide === 2 && <Doc />}</AnimatePresence>
        <AnimatePresence>
          {slide === 3 && <PanelInteractions />}
        </AnimatePresence>
        <AnimatePresence>
          {slide === 4 && <PanelVisualTesting slide={slide} />}
        </AnimatePresence>
      </div>
    </div>
  );
};
