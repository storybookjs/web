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
  render: function Render() {
    const appearProgress = useMotionValue(1);
    const isolationProgress = useMotionValue(0);
    const storyIndex = useMotionValue(0);
    return (
      <ScrollDemo
        appearProgress={appearProgress}
        isolationProgress={isolationProgress}
        storyIndex={storyIndex}
      />
    );
  },
  args: {} as ComponentProps<typeof ScrollDemo>,
});

export const Default = meta.story({});
