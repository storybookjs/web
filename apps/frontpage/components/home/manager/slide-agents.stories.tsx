import preview from '../../../.storybook/preview';
import { SlideAgents } from './slide-agents';

const meta = preview.meta({
  title: 'Home/Manager/SlideAgents',
  component: SlideAgents,
  parameters: {
    layout: 'fullscreen',
    chromatic: { viewports: [320, 768, 1200], delay: 6000 },
  },
  decorators: [
    (Story) => (
      <div className="relative h-[600px] w-full bg-white">
        <Story />
      </div>
    ),
  ],
});

/** Plays the slide: the agent's story appears, then its review replaces it */
export const Default = meta.story({});

/** Holds the first frame: the Expanded story the agent wrote */
export const Story = meta.story({
  args: { beat: 'story' },
  parameters: { chromatic: { delay: 0 } },
});

/** Holds the final frame: the review summary the agent published */
export const Review = meta.story({
  args: { beat: 'review' },
  parameters: { chromatic: { delay: 0 } },
});
