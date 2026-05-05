import type { ComponentProps } from 'react';
import preview from '../../../../.storybook/preview';
import { Sidebar } from './sidebar';

const meta = preview.meta({
  title: 'Home/Develop/Demo/Sidebar',
  component: Sidebar,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="relative w-[260px] h-[600px] bg-white">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    activeStory: {
      control: 'select',
      options: ['default', 'input-range', 'no-selection', 'all-day'],
    },
  },
  args: { type: 'rangeSlider' } as ComponentProps<typeof Sidebar>,
});

export const Default = meta.story({ args: { activeStory: 'default' } });
export const InputRange = meta.story({ args: { activeStory: 'input-range' } });
export const NoSelection = meta.story({ args: { activeStory: 'no-selection' } });
