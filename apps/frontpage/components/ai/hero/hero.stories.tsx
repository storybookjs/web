import preview from '../../../.storybook/preview';
import { Hero } from './hero';

const meta = preview.meta({
  title: 'AI/Hero',
  component: Hero,
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'fullscreen',
    chromatic: {
      viewports: [320, 768, 1200],
    },
  },
  decorators: [
    (Story) => (
      <div className="bg-homeBackground min-h-screen">
        <Story />
      </div>
    ),
  ],
});

export const Default = meta.story({ name: 'Hero' });
