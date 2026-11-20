import preview from '../../../.storybook/preview';
import { SlideAgents } from './slide-agents';

const meta = preview.meta({
  title: 'Home/Manager/SlideAgents',
  component: SlideAgents,
  parameters: {
    layout: 'fullscreen',
    chromatic: { viewports: [320, 768, 1200], delay: 4000 },
  },
  decorators: [
    (Story) => (
      <div className="relative h-[600px] w-full bg-white">
        <Story />
      </div>
    ),
  ],
});

export const Default = meta.story({});
