import type { ComponentProps } from 'react';
import { useAnimation } from 'framer-motion';
import preview from '../../../../.storybook/preview';
import { Controls } from './controls';

const meta = preview.meta({
  title: 'Home/Develop/Demo/Controls',
  component: Controls,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="relative w-[600px] h-[400px] bg-zinc-200">
        <Story />
      </div>
    ),
  ],
  render: function Render() {
    const startTimeControls = useAnimation();
    const endTimeControls = useAnimation();
    return (
      <Controls
        endTimeControls={endTimeControls}
        startTimeControls={startTimeControls}
      />
    );
  },
  args: {} as ComponentProps<typeof Controls>,
});

export const Default = meta.story({});
