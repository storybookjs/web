import preview from '../.storybook/preview';
import { Community } from './community';

const meta = preview.meta({
  title: 'Community',
  component: Community,
  globals: { backgrounds: { value: 'dark' } },
  parameters: {
    layout: 'fullscreen',
    chromatic: { viewports: [320, 768, 1200] },
  },
  decorators: [
    (Story) => (
      <div className="bg-homeBackground p-8">
        <Story />
      </div>
    ),
  ],
});

export const Default = meta.story({});
