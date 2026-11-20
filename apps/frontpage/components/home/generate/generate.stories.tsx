import preview from '../../../.storybook/preview';
import { Generate } from './generate';

const meta = preview.meta({
  title: 'Home/Generate/Generate',
  component: Generate,
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
