import preview from '../../../.storybook/preview';
import { Chrome } from './chrome';

const meta = preview.meta({
  title: 'Home/Hero/Chrome',
  component: Chrome,
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
