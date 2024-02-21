import { FC } from "react";
import { Sidebar } from "./sidebar";
import { Toolbar } from "./toolbar";
import { PanelControls } from "./panel-controls";
import { AnimatePresence } from "framer-motion";
import { Doc } from "./doc";
import { PanelInteractions } from "./panel-interactions";
import { Canvas } from "./canvas";
import { PanelVisualTesting } from "./panel-visual-testing";

export const Manager: FC<{ slide: number }> = ({ slide }) => {
  return (
    <div
      className="flex h-[580px] sm:h-[820px] rounded-b-md overflow-hidden"
      role="presentation"
    >
      <Sidebar slide={slide} />
      <div className="w-full flex-1 h-full bg-white relative">
        <AnimatePresence>
          {slide !== 2 && <Canvas slide={slide} />}
        </AnimatePresence>
        <Toolbar slide={slide} />
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
