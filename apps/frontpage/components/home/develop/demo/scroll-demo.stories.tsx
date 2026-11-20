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
    const docs = (parameters.docsStep as number | undefined) ?? 0;
    const appearProgress = useMotionValue(1);
    const isolationProgress = useMotionValue(step > 0 || docs > 0 ? 1 : 0);
    const storyIndex = useMotionValue(0);
    const agentStep = useMotionValue(step);
    const docsStep = useMotionValue(docs);
    return (
      <ScrollDemo
        agentStep={agentStep}
        docsStep={docsStep}
        appearProgress={appearProgress}
        isolationProgress={isolationProgress}
        storyIndex={storyIndex}
      />
    );
  },
  args: {} as ComponentProps<typeof ScrollDemo>,
});

export const Default = meta.story({});

/** Third Context step: the generated RangeSlider docs page is open. */
export const Docs = meta.story({ parameters: { docsStep: 1 } });

/*
 * Agent-written stories. Not used in the Context section any more; the Review
 * section reuses this state through the `agentStep` prop.
 */

/** The agent has added stories and Loading is open. */
export const AgentLoading = meta.story({ parameters: { agentStep: 1 } });

/** Later in the scroll: Disabled is open. */
export const AgentDisabled = meta.story({ parameters: { agentStep: 2 } });
