import type { ComponentProps } from 'react';
import { useMotionValue } from 'framer-motion';
import preview from '../../../../.storybook/preview';
import { RangeSlider } from './range-slider';

const meta = preview.meta({
  title: 'Home/Develop/Demo/RangeSlider',
  component: RangeSlider,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="relative w-[800px] h-[500px] bg-white">
        <Story />
      </div>
    ),
  ],
  render: function Render({ activeStory }) {
    const appearProgress = useMotionValue(1);
    return <RangeSlider activeStory={activeStory} appearProgress={appearProgress} />;
  },
  argTypes: {
    activeStory: {
      control: 'select',
      options: ['default', 'input-range', 'no-selection'],
    },
  },
  args: { activeStory: 'default' } as ComponentProps<typeof RangeSlider>,
});

export const Default = meta.story({ args: { activeStory: 'default' } });
export const InputRange = meta.story({ args: { activeStory: 'input-range' } });
export const NoSelection = meta.story({ args: { activeStory: 'no-selection' } });
