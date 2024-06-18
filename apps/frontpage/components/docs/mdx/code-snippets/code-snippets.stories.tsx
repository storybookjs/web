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
    serverActiveRenderer: {
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
    serverActiveLanguage: {
      control: 'radio',
      options: ['js', 'ts', 'ts-4.9'],
    },
    serverActivePackageManager: {
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
    serverActiveRenderer: 'react',
    serverActiveLanguage: 'js',
    serverActivePackageManager: 'npm',
    content: content1,
  },
  decorators: [
    (Story, { args }) => {
      const [_, setArgs] = useArgs();
      return (
        <DocsContext.Provider
          value={{
            activeLanguage: args.serverActiveLanguage,
            activePackageManager: args.serverActivePackageManager,
            activeRenderer: args.serverActiveRenderer,
            setLanguage: fn()
              .mockName('setLanguage')
              .mockImplementation((id) => {
                setArgs({ serverActiveLanguage: id });
              }),
            setPackageManager: fn()
              .mockName('setPackageManager')
              .mockImplementation((id) => {
                setArgs({ serverActivePackageManager: id });
              }),
            setRenderer: fn()
              .mockName('setRenderer')
              .mockImplementation((id) => {
                setArgs({ serverActiveRenderer: id });
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
    serverActiveRenderer: string | null;
    serverActivePackageManager: string | null;
    serverActiveLanguage: string | null;
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
    serverActivePackageManager: 'npm',
  },
};

export const PackageYARN: Story = {
  args: {
    content: content1,
    serverActivePackageManager: 'yarn',
  },
};

export const PackagePNPM: Story = {
  args: {
    content: content1,
    serverActivePackageManager: 'pnpm',
  },
};

export const ReactNoLanguage: Story = {
  args: {
    content: content2,
    serverActiveRenderer: 'react',
  },
};

export const ReactJS: Story = {
  args: {
    content: content2,
    serverActiveRenderer: 'react',
    serverActiveLanguage: 'js',
  },
};

export const ReactTS: Story = {
  args: {
    content: content2,
    serverActiveLanguage: 'ts',
  },
};

export const AngularNoLanguage: Story = {
  args: {
    content: content2,
    serverActiveRenderer: 'angular',
  },
};

export const AngularJS: Story = {
  args: {
    content: content2,
    serverActiveRenderer: 'angular',
    serverActiveLanguage: 'js',
  },
};

export const NoRenderer: Story = {
  args: {
    content: content2,
    serverActiveRenderer: 'ember',
    serverActiveLanguage: 'js',
  },
};

export const ContentUndefined: Story = {
  args: {
    content: content3,
  },
};
