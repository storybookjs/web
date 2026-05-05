import preview from '../../../../.storybook/preview';
import { TimeFrame } from './timeframe';

const meta = preview.meta({
  title: 'Home/Develop/Demo/TimeFrame',
  component: TimeFrame,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="relative w-[800px] h-[500px] bg-white">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    activeStory: {
      control: 'select',
      options: ['no-selection', 'all-day', 'last-hour', 'start-time', 'end-time', 'overview'],
    },
  },
});

export const NoSelection = meta.story({ args: { activeStory: 'no-selection' } });
export const AllDay = meta.story({ args: { activeStory: 'all-day' } });
export const LastHour = meta.story({ args: { activeStory: 'last-hour' } });
export const StartTime = meta.story({ args: { activeStory: 'start-time' } });
export const EndTime = meta.story({ args: { activeStory: 'end-time' } });
export const Overview = meta.story({ args: { activeStory: 'overview' } });
