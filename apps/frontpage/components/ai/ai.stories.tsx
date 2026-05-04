import preview from '../../.storybook/preview';
import { AI } from './ai';

const meta = preview.meta({
  title: 'AI',
  component: AI,
  globals: { backgrounds: { value: 'dark' } },
  parameters: {
    layout: 'fullscreen',
    chromatic: {
      viewports: [320, 768, 1200],
    },
  },
});

export const Default = meta.story({
  name: 'AI',
  args: {
    githubCount: 85000,
  },
});
