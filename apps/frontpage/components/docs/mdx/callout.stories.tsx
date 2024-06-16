import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import { Callout } from './callout';

const meta = {
  title: 'Callout',
  component: Callout,
  tags: ['autodocs'],
} satisfies Meta<ComponentProps<typeof Callout>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is a default callout',
  },
};
