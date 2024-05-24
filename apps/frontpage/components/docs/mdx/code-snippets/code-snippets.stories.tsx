import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import type { ComponentProps } from 'react';
import { DocsContext } from '../../../../app/docs/provider';
import { CodeSnippetsClient } from './code-snippets';
import { content1 } from './mocked-data/content-1';
import { content2 } from './mocked-data/content-2';
import { content3 } from './mocked-data/content-3';

const meta = {
  title: 'CodeSnippets',
  component: CodeSnippetsClient,
  tags: ['autodocs'],
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
      control: 'radio',
      options: ['js', 'ts', 'ts-4.9'],
    },
    activePackageManager: {
      control: 'radio',
      options: ['npm', 'npx', 'yarn', 'pnpm'],
    },
    content: {
      control: {
        type: 'object',
      },
    },
  },
  args: {
    activeRenderer: 'react',
    activeLanguage: null,
    activePackageManager: null,
    content: content1,
  },
  decorators: [
    (Story, { args }) => {
      const [_, setArgs] = useArgs();
      return (
        <DocsContext.Provider
          value={{
            ...args,
            setLanguage: fn()
              .mockName('setLanguage')
              .mockImplementation((id) => {
                setArgs({ activeLanguage: id });
              }),
            setPackageManager: fn()
              .mockName('setPackageManager')
              .mockImplementation((id) => {
                setArgs({ activePackageManager: id });
              }),
            setRenderer: fn()
              .mockName('setRenderer')
              .mockImplementation((id) => {
                setArgs({ activeRenderer: id });
              }),
          }}
        >
          <Story />
        </DocsContext.Provider>
      );
    },
  ],
} satisfies Meta<
  ComponentProps<typeof CodeSnippetsClient> & {
    activeRenderer: string | null;
    activePackageManager: string | null;
    activeLanguage: string | null;
  }
>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ContentOnly: Story = {
  args: {},
};

export const PackageNPM: Story = {
  args: {
    content: content1,
    activePackageManager: 'npm',
  },
};

export const PackageYARN: Story = {
  args: {
    content: content1,
    activePackageManager: 'yarn',
  },
};

export const PackagePNPM: Story = {
  args: {
    content: content1,
    activePackageManager: 'pnpm',
  },
};

export const ReactNoLanguage: Story = {
  args: {
    content: content2,
    activeRenderer: 'react',
  },
};

export const ReactJS: Story = {
  args: {
    content: content2,
    activeRenderer: 'react',
    activeLanguage: 'js',
  },
};

export const ReactTS: Story = {
  args: {
    content: content2,
    activeLanguage: 'ts',
  },
};

export const AngularNoLanguage: Story = {
  args: {
    content: content2,
    activeRenderer: 'angular',
  },
};

export const AngularJS: Story = {
  args: {
    content: content2,
    activeRenderer: 'angular',
    activeLanguage: 'js',
  },
};

export const ContentUndefined: Story = {
  args: {
    content: content3,
  },
};
