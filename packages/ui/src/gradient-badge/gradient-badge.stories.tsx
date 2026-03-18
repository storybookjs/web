import type { Meta, StoryObj } from '@storybook/react';
import { WandIcon } from '@storybook/icons';
import { GradientBadge } from './gradient-badge';

const meta = {
  title: 'GradientBadge',
  component: GradientBadge,
  parameters: {
    layout: 'centered',
  },
  globals: {
    backgrounds: {
      value: 'dark',
    },
  },
} satisfies Meta<typeof GradientBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    link: '/ai',
    children: 'Introducing MCP for React',
    icon: <WandIcon />,
  },
  name: 'GradientBadge',
};
