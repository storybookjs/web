import type { Meta, StoryObj } from '@storybook/react';
import { CodeSnippets } from '@repo/ui';

const meta = {
  title: 'CodeSnippets',
  component: CodeSnippets,
} satisfies Meta<typeof CodeSnippets>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => <CodeSnippets />,
};
