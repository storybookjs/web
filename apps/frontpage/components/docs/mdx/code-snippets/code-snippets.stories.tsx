import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import type { ComponentProps } from 'react';
import { DocsContext } from '../../../../app/docs/provider';
import { CodeSnippetsClient } from './code-snippets';
import { content1 } from './mocked-data/content-1';
import { content2 } from './mocked-data/content-2';
import { content3 } from './mocked-data/content-3';
import { contentMultiTab } from './mocked-data/content-multiple-tabs';
import { contentMultiTabVue3Only } from './mocked-data/content-multiple-tabs-vue-3-only';
import { contentMultiTabVue3OnlySuffix } from './mocked-data/content-multiple-tabs-vue-3-only-suffix';
import { contentMultiTabVue2And3 } from './mocked-data/content-multiple-tabs-vue-2-and-3';
import { contentMultiTabVue2And3Suffix } from './mocked-data/content-multiple-tabs-vue-2-and-3-suffix';

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
        'react-native-web',
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
      options: ['js', 'ts', 'ts-4-9'],
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

export const ReactNativeWebFallbackToReact: Story = {
  args: {
    content: content2,
    activeRenderer: 'react-native-web',
  },
};

export const MultipleTabs: Story = {
  args: {
    content: contentMultiTab,
    activeLanguage: 'js',
  },
};

export const MultipleTabsVue3Only: Story = {
  args: {
    content: contentMultiTabVue3Only,
    activeRenderer: 'vue',
    activeLanguage: 'js',
  },
};

export const MultipleTabsVue3OnlySuffix: Story = {
  args: {
    content: contentMultiTabVue3OnlySuffix,
    activeRenderer: 'vue',
    activeLanguage: 'js',
  },
};

export const MultipleTabsVue2And3: Story = {
  args: {
    content: contentMultiTabVue2And3,
    activeRenderer: 'vue',
    activeLanguage: 'js',
  },
};

export const MultipleTabsVue2And3Suffix: Story = {
  args: {
    content: contentMultiTabVue2And3Suffix,
    activeRenderer: 'vue',
    activeLanguage: 'js',
  },
};

export const CoerceTS49ToTS: Story = {
  name: 'Coerce TS 4.9 language to TS snippet',
  args: {
    content: content2.filter((tab) => tab.language !== 'ts-4-9'),
    activeLanguage: 'ts-4-9',
  },
}

export const NoRenderer: Story = {
  args: {
    content: content2,
    activeRenderer: 'ember',
    activeLanguage: 'js',
  },
};

export const ContentUndefined: Story = {
  args: {
    content: content3,
  },
};
