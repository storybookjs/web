import preview from '../../../.storybook/preview';
import { AgentReview } from './agent-review';

const meta = preview.meta({
  title: 'Home/Manager/AgentReview',
  component: AgentReview,
  parameters: {
    layout: 'fullscreen',
    chromatic: { viewports: [320, 768, 1200], delay: 1000 },
  },
  decorators: [
    (Story) => (
      <div className="h-[600px] w-full">
        <Story />
      </div>
    ),
  ],
});

/** The review fills in: title, summary, then the story tiles */
export const Default = meta.story({});

/** The settled review, without its entrance */
export const Still = meta.story({ args: { still: true } });

/** The short canvas the review gets on phones, above the agent's chat */
export const Phone = meta.story({
  args: { still: true },
  globals: { viewport: { value: 'mobile1' } },
  parameters: { chromatic: { viewports: [375] } },
  decorators: [
    (Story) => (
      <div className="h-[279px] w-full max-w-[343px]">
        <Story />
      </div>
    ),
  ],
});
