import type { Meta, StoryObj } from '@storybook/react';
import { CodeSnippetsClient } from './client';

const meta = {
  title: 'CodeSnippets',
  component: CodeSnippetsClient,
} satisfies Meta<typeof CodeSnippetsClient>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => <div>Hello world</div>,
};
