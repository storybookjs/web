import preview from '../../../.storybook/preview';
import { Review } from './review';

const meta = preview.meta({
  title: 'Home/Review/Review',
  component: Review,
  globals: { backgrounds: { value: 'dark' } },
  parameters: {
    layout: 'fullscreen',
    chromatic: { viewports: [320, 768, 1200] },
  },
  decorators: [
    (Story) => (
      <div className="bg-homeBackground">
        <Story />
      </div>
    ),
  ],
});

export const Default = meta.story({});
