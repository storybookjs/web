import preview from '../../../.storybook/preview';
import { Hero } from '.';

const meta = preview.meta({
  title: 'Home/Hero/Hero',
  component: Hero,
  args: {
    npmDownloads: '30M',
    contributorCount: '2282',
  },
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
