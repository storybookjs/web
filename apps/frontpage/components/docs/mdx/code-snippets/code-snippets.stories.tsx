import type { Meta, StoryObj } from '@storybook/react';
import { CodeSnippetsComponent } from './code-snippets';
import { content1 } from './mocked-data/content-1';
import { content2 } from './mocked-data/content-2';
import { content3 } from './mocked-data/content-3';

const meta = {
  title: 'CodeSnippets',
  component: CodeSnippetsComponent,
  argTypes: {
    activeRenderer: {
      control: 'select',
      options: [
        'react',
        'vue',
        'angular',
        'web-components',
        'ember',
        'html',
        'svelte',
        'preact',
        'qwik',
        'solid',
      ],
    },
    activeLanguage: {
      control: 'select',
      options: ['js', 'ts', 'ts-4.9'],
    },
    activePackageManager: {
      control: 'select',
      options: ['npm', 'npx', 'yarn', 'pnpm'],
    },
  },
} satisfies Meta<typeof CodeSnippetsComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ContentOnly: Story = {
  args: {
    content: content1,
    setLanguage: () => {},
    setPackageManager: () => {},
  },
};

export const PackageNPM: Story = {
  args: {
    ...ContentOnly.args,
    content: content1,
    activePackageManager: 'npm',
  },
};

export const PackageYARN: Story = {
  args: {
    ...ContentOnly.args,
    content: content1,
    activePackageManager: 'yarn',
  },
};

export const PackagePNPM: Story = {
  args: {
    ...ContentOnly.args,
    content: content1,
    activePackageManager: 'pnpm',
  },
};

export const ReactJS: Story = {
  args: {
    ...ContentOnly.args,
    content: content2,
    activeLanguage: 'js',
  },
};

export const ReactTS: Story = {
  args: {
    ...ContentOnly.args,
    content: content2,
    activeLanguage: 'ts',
  },
};

export const ContentUndefined: Story = {
  args: {
    ...ContentOnly.args,
    content: content3,
  },
};
