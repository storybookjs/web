import type { Meta, StoryObj } from '@storybook/react';
import { AI } from './ai';

const meta = {
  title: 'AI/AIPage',
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
  args: {
    githubCount: 85000,
  },
};

export const Mobile: Story = {
  args: {
    githubCount: 85000,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    chromatic: {
      viewports: [320],
    },
  },
};

export const Tablet: Story = {
  args: {
    githubCount: 85000,
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    chromatic: {
      viewports: [768],
    },
  },
};
