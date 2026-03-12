import type { Meta, StoryObj } from '@storybook/react';
import { Document } from '../home/test/icons';
import { FeatureCard } from './feature-card';

const meta = {
  title: 'AI/FeatureCard',
  component: FeatureCard,
  parameters: {
    backgrounds: { default: 'dark' },
  },
} satisfies Meta<typeof FeatureCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: <Document />,
    title: 'Match existing UI patterns',
    description:
      'Agents should reuse existing components instead of inventing new ones. Storybook exposes production components and their APIs so agents assemble UI from what already exists.',
  },
};

export const ShortDescription: Story = {
  args: {
    icon: <Document />,
    title: 'Short title',
    description: 'A brief description for this feature.',
  },
};
