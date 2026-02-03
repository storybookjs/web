import type { Meta, StoryObj } from '@storybook/react';
import { CommandButton } from './command-button';

const meta = {
  title: 'AI/Hero/CommandButton',
  component: CommandButton,
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="bg-zinc-900 p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CommandButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    command: 'npx storybook add addon-mcp',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    command: 'npx storybook@10 upgrade',
    variant: 'secondary',
  },
};

export const LongCommand: Story = {
  args: {
    command: 'npm create storybook@latest',
    variant: 'primary',
  },
};
