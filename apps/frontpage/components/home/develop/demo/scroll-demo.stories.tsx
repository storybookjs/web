import type { ComponentProps } from 'react';
import { useMotionValue } from 'framer-motion';
import preview from '../../../../.storybook/preview';
import { ScrollDemo } from './scroll-demo';

const meta = preview.meta({
  title: 'Home/Develop/Demo/ScrollDemo',
  component: ScrollDemo,
  globals: { backgrounds: { value: 'dark' } },
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div className="bg-homeBackground mx-auto w-full max-w-[920px] p-12">
        <Story />
      </div>
    ),
  ],
  render: function Render(_args, { parameters }) {
    const step = (parameters.agentStep as number | undefined) ?? 0;
    const appearProgress = useMotionValue(1);
    const isolationProgress = useMotionValue(step > 0 ? 1 : 0);
    const storyIndex = useMotionValue(0);
    const agentStep = useMotionValue(step);
    return (
      <ScrollDemo
        agentStep={agentStep}
        appearProgress={appearProgress}
        isolationProgress={isolationProgress}
        storyIndex={storyIndex}
      />
    );
  },
  args: {} as ComponentProps<typeof ScrollDemo>,
});

export const Default = meta.story({});

/** Third Develop step: the agent has added stories and Loading is open. */
export const AgentLoading = meta.story({ parameters: { agentStep: 1 } });

/** Third Develop step, later in the scroll: Disabled is open. */
export const AgentDisabled = meta.story({ parameters: { agentStep: 2 } });
