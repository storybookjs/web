import React, { useEffect, useState } from 'react';
import type { MotionValue } from 'framer-motion';
import { motion, useTransform } from 'framer-motion';
import { useMediaQuery } from '../../../../hooks/use-media-query';
import { Sidebar, agentStories } from './sidebar';
import { RangeSlider } from './range-slider';
import { VSCode } from './vscode';
import { DocsPage } from './docs-page';

interface ScrollDemoProps {
  appearProgress: MotionValue<number>;
  isolationProgress: MotionValue<number>;
  storyIndex: MotionValue<number>;
  /**
   * Which agent-written story is showing: 0 before the agent step, then
   * 1, 2… for each story in `agentStories`.
   */
  agentStep?: MotionValue<number>;
  /**
   * Show the generated docs page for RangeSlider: 0 hides it, 1 opens
   * Overview in the sidebar and the docs page in the canvas.
   */
  docsStep?: MotionValue<number>;
}

const rangeSlider = {
  stories: ['default', 'no-selection', 'input-range', 'default'],
  addons: ['controls', 'interactions', 'design', 'a11y', 'controls'],
};

function agentStoryAt(step: number) {
  return step > 0
    ? agentStories[Math.min(step, agentStories.length) - 1].id
    : null;
}

export function ScrollDemo({
  appearProgress,
  isolationProgress,
  storyIndex,
  agentStep,
  docsStep,
  ...props
}: ScrollDemoProps) {
  const [activeStory, setActiveStory] = useState('default');
  const [agentStory, setAgentStory] = useState(() =>
    agentStoryAt(agentStep?.get() ?? 0),
  );

  const [showDocs, setShowDocs] = useState(() => (docsStep?.get() ?? 0) > 0);

  useEffect(() => {
    if (!docsStep) return;
    setShowDocs(docsStep.get() > 0);
    return docsStep.on('change', (step) => {
      setShowDocs(step > 0);
    });
  }, [docsStep]);

  useEffect(() => {
    if (!agentStep) return;
    setAgentStory(agentStoryAt(agentStep.get()));
    return agentStep.on('change', (step) => {
      setAgentStory(agentStoryAt(step));
    });
  }, [agentStep]);

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
      <Sidebar
        activeStory={agentStory ?? (showDocs ? 'overview' : activeStory)}
        showAgentStories={agentStory !== null}
        type="rangeSlider"
      />
      <RangeSlider
        activeStory={agentStory ?? activeStory}
        appearProgress={appearProgress}
      />
      <DocsPage
        visible={showDocs ? agentStory === null : false}
        zoomed={stacked}
      />
      <VSCode
        appearProgress={appearProgress}
        scrollProgress={isolationProgress}
      />
    </motion.div>
  );
}
