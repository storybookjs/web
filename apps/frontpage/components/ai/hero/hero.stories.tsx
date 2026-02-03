import type { Meta, StoryObj } from '@storybook/react';
import { Hero } from './hero';

const meta = {
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
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { name: 'Hero' };
