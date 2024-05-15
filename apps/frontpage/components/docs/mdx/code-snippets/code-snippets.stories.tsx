import type { Meta, StoryObj } from '@storybook/react';
import { CodeSnippetsComponent } from './code-snippets';
import { content1 } from './mocked-data/content-1';
import { content2 } from './mocked-data/content-2';

const meta = {
  title: 'CodeSnippets',
  component: CodeSnippetsComponent,
} satisfies Meta<typeof CodeSnippetsComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Packages: Story = {
  args: {
    content: content1,
    activeLanguage: 'js',
    activePackageManager: 'npm',
    setLanguage: () => {},
    setPackageManager: () => {},
  },
};

export const Languages: Story = {
  args: {
    content: content2,
    activeLanguage: 'js',
    activePackageManager: 'npm',
    setLanguage: () => {},
    setPackageManager: () => {},
  },
};
