import type { Meta, StoryObj } from '@storybook/react';
import { AI } from './ai';

const meta = {
  title: 'AI',
  component: AI,
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'fullscreen',
    chromatic: {
      viewports: [320, 768, 1200],
    },
  },
} satisfies Meta<typeof AI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'AI',
  args: {
    githubCount: 85000,
  },
};
