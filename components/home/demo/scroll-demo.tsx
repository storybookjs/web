import React, { useEffect, useState } from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import { Sidebar } from "./sidebar2";
import { AddonsPanel } from "./addons-panel";
import { RangeSlider } from "./range-slider";
import { VSCode } from "./vscode";
import { App } from "./app2";
import { Connector } from "../connector";
import { useMediaQuery } from "@/lib/useMediaQuery";

interface ScrollDemoProps {
  appearProgress: MotionValue;
  isolationProgress: MotionValue;
  addonsProgress: MotionValue;
  dropInProgress: MotionValue;
  storyIndex: MotionValue;
  panelIndex: MotionValue;
}

const rangeSlider = {
  stories: ["default", "no-selection", "input-range", "default"],
  addons: ["controls", "interactions", "design", "a11y", "controls"],
};

export const ScrollDemo = ({
  appearProgress,
  isolationProgress,
  addonsProgress,
  dropInProgress,
  storyIndex,
  panelIndex,
  ...props
}: ScrollDemoProps) => {
  const [activeStory, setActiveStory] = useState("default");
  const [activePanel, setActivePanel] = useState("controls");

  useEffect(() => {
    function updateId() {
      setActiveStory(rangeSlider.stories[storyIndex.get()]);
    }
    const unsubscribeStoryIndex = storyIndex.on("change", updateId);

    function updatePanel() {
      setActivePanel(rangeSlider.addons[panelIndex.get()]);
    }
    const unsubscribePanel = panelIndex.on("change", updatePanel);

    return () => {
      unsubscribeStoryIndex();
      unsubscribePanel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const zoom = useTransform(
    [isolationProgress, dropInProgress],
    ([latestIsolationProgress, latestDropInProgress]: number[]) =>
      latestIsolationProgress - latestDropInProgress
  );

  const [stacked] = useMediaQuery(`(min-width: 648px)`);

  const scale = useTransform(zoom, [0, 1], [1, stacked ? 1.25 : 1], {
    clamp: true,
  });
  const x = useTransform(zoom, [0, 1], ["0%", stacked ? "12.5%" : "0%"], {
    clamp: true,
  });
  const scrimY = useTransform(zoom, [0, 1], ["0%", "-5%"], { clamp: true });
  const scrimOpacity = useTransform(isolationProgress, [0, 0.25], [0, 1], {
    clamp: true,
  });

  const frameScale = useTransform(dropInProgress, [0, 1], [1, 0], {
    clamp: true,
  });
  const frameOpacity = useTransform(dropInProgress, [0, 1], [1, 0.25], {
    clamp: true,
  });

  const connectorProgress = useTransform(dropInProgress, [0.75, 1], [0, 1], {
    clamp: true,
  });

  return (
    <motion.div
      className="relative w-full h-0 pb-[69.10907577%]"
      style={{ scale, x }}
      transition={{ delay: 0.4 }}
      {...props}
    >
      <motion.div
        className="absolute h-[75vh] top-[-35vh] left-0 right-0 pointer-events-none user-select-none bg-gradient-to-b from-[#181C22] from-90% to-[#181C22]/10"
        style={{
          y: scrimY,
          opacity: scrimOpacity,
        }}
      />
      <motion.img
        className="block h-auto absolute top-0 left-0 w-full"
        src="/home/develop/storybook-frame.svg"
        alt=""
        style={{
          scale: frameScale,
          opacity: frameOpacity,
        }}
      />
      <Sidebar
        type="rangeSlider"
        activeStory={activeStory}
        style={{
          scale: frameScale,
          opacity: frameOpacity,
        }}
      />
      <AddonsPanel
        scrollProgress={addonsProgress}
        activePanel={activePanel}
        style={{
          scale: frameScale,
          opacity: frameOpacity,
        }}
      />
      <App scrollProgress={dropInProgress} />
      <Connector
        name="rs-to-app"
        progress={connectorProgress}
        className="w-[24%] h-auto absolute top-[20%] left[17.8%] rotate[-56deg] z-[2]"
      />
      <RangeSlider
        activeStory={activeStory}
        scrollProgress={dropInProgress}
        appearProgress={appearProgress}
      />
      <VSCode
        appearProgress={appearProgress}
        scrollProgress={isolationProgress}
      />
    </motion.div>
  );
};
