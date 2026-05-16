import React, { useEffect, useState } from 'react';
import type { MotionValue } from 'framer-motion';
import { motion, useTransform } from 'framer-motion';
import { useMediaQuery } from '../../../../hooks/use-media-query';
import { Sidebar } from './sidebar';
import { RangeSlider } from './range-slider';
import { VSCode } from './vscode';

interface ScrollDemoProps {
  appearProgress: MotionValue<number>;
  isolationProgress: MotionValue<number>;
  storyIndex: MotionValue<number>;
}

const rangeSlider = {
  stories: ['default', 'no-selection', 'input-range', 'default'],
  addons: ['controls', 'interactions', 'design', 'a11y', 'controls'],
};

export function ScrollDemo({
  appearProgress,
  isolationProgress,
  storyIndex,
  ...props
}: ScrollDemoProps) {
  const [activeStory, setActiveStory] = useState('default');

  useEffect(() => {
    function updateId() {
      setActiveStory(rangeSlider.stories[storyIndex.get()]);
    }
    const unsubscribeStoryIndex = storyIndex.on('change', updateId);

    return () => {
      unsubscribeStoryIndex();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- We don't need to update the effect when the props change
  }, []);

  const zoom = useTransform<number, number>(
    [isolationProgress],
    ([latestIsolationProgress]) => latestIsolationProgress || 0,
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

  return (
    <motion.div
      className="relative h-0 w-full pb-[69.10907577%]"
      style={{ scale, x }}
      transition={{ delay: 0.4 }}
      {...props}
    >
      <motion.div
        className="user-select-none from-homeBackground to-homeBackground/10 pointer-events-none absolute left-0 right-0 top-[-35vh] h-[75vh] bg-gradient-to-b from-90%"
        style={{
          y: scrimY,
          opacity: scrimOpacity,
        }}
      />
      <motion.img
        alt=""
        className="absolute left-0 top-0 block h-auto w-full"
        src="/home/develop/storybook-frame.svg"
      />
      <Sidebar activeStory={activeStory} type="rangeSlider" />
      <RangeSlider activeStory={activeStory} appearProgress={appearProgress} />
      <VSCode
        appearProgress={appearProgress}
        scrollProgress={isolationProgress}
      />
    </motion.div>
  );
}
