import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from './index';

const meta = {
  title: 'Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
  globals: {
    backgrounds: {
      value: 'dark',
    },
  },
} satisfies Meta<typeof Footer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const System: Story = {};

export const Home: Story = {
  args: {
    variant: 'home',
  },
};
