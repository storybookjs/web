import React, { useEffect, useState } from 'react';
import type { MotionValue } from 'framer-motion';
import { motion, useTransform } from 'framer-motion';
import { Connector } from '../../connector';
import { useMediaQuery } from '../../../../hooks/use-media-query';
import { Sidebar } from './sidebar';
import { AddonsPanel } from './addons-panel';
import { RangeSlider } from './range-slider';
import { VSCode } from './vscode';
import { App } from './app';

interface ScrollDemoProps {
  appearProgress: MotionValue<number>;
  isolationProgress: MotionValue<number>;
  addonsProgress: MotionValue<number>;
  dropInProgress: MotionValue<number>;
  storyIndex: MotionValue<number>;
  panelIndex: MotionValue<number>;
}

const rangeSlider = {
  stories: ['default', 'no-selection', 'input-range', 'default'],
  addons: ['controls', 'interactions', 'design', 'a11y', 'controls'],
};

export function ScrollDemo({
  appearProgress,
  isolationProgress,
  addonsProgress,
  dropInProgress,
  storyIndex,
  panelIndex,
  ...props
}: ScrollDemoProps) {
  const [activeStory, setActiveStory] = useState('default');
  const [activePanel, setActivePanel] = useState('controls');

  useEffect(() => {
    function updateId() {
      setActiveStory(rangeSlider.stories[storyIndex.get()]);
    }
    const unsubscribeStoryIndex = storyIndex.on('change', updateId);

    function updatePanel() {
      setActivePanel(rangeSlider.addons[panelIndex.get()]);
    }
    const unsubscribePanel = panelIndex.on('change', updatePanel);

    return () => {
      unsubscribeStoryIndex();
      unsubscribePanel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- We don't need to update the effect when the props change
  }, []);

  const zoom = useTransform<number, number>(
    [isolationProgress, dropInProgress],
    ([latestIsolationProgress, latestDropInProgress]) =>
      (latestIsolationProgress || 0) - (latestDropInProgress || 0),
  );

  const [stacked] = useMediaQuery(`(min-width: 648px)`);

  const scale = useTransform(zoom, [0, 1], [1, stacked ? 1.25 : 1], {
    clamp: true,
  });
  const x = useTransform(zoom, [0, 1], ['0%', stacked ? '12.5%' : '0%'], {
    clamp: true,
  });
  const scrimY = useTransform(zoom, [0, 1], ['0%', '-5%'], { clamp: true });
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
        className="absolute h-[75vh] top-[-35vh] left-0 right-0 pointer-events-none user-select-none bg-gradient-to-b from-homeBackground from-90% to-homeBackground/10"
        style={{
          y: scrimY,
          opacity: scrimOpacity,
        }}
      />
      <motion.img
        alt=""
        className="absolute top-0 left-0 block w-full h-auto"
        src="/home/develop/storybook-frame.svg"
        style={{
          scale: frameScale,
          opacity: frameOpacity,
        }}
      />
      <Sidebar
        activeStory={activeStory}
        style={{
          scale: frameScale,
          opacity: frameOpacity,
        }}
        type="rangeSlider"
      />
      <AddonsPanel
        activePanel={activePanel}
        scrollProgress={addonsProgress}
        style={{
          scale: frameScale,
          opacity: frameOpacity,
        }}
      />
      <App scrollProgress={dropInProgress} />
      <Connector
        className="w-[24%] h-auto absolute top-[20%] left-[17.8%] rotate-[-56deg] z-[2]"
        name="rs-to-app"
        progress={connectorProgress}
      />
      <RangeSlider
        activeStory={activeStory}
        appearProgress={appearProgress}
        scrollProgress={dropInProgress}
      />
      <VSCode
        appearProgress={appearProgress}
        scrollProgress={isolationProgress}
      />
    </motion.div>
  );
}
