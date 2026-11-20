import preview from '../../../.storybook/preview';
import { ReviewSummary } from './review-summary';

const meta = preview.meta({
  title: 'Home/Generate/ReviewSummary',
  component: ReviewSummary,
  globals: { backgrounds: { value: 'dark' } },
  parameters: {
    chromatic: { viewports: [320, 768, 1200] },
  },
  decorators: [
    (Story) => (
      <div className="bg-homeBackground p-4 sm:p-8">
        <Story />
      </div>
    ),
  ],
});

export const Default = meta.story({});
