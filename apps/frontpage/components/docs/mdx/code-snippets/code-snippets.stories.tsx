import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
// import { fn, userEvent, within, expect, waitFor } from '@storybook/test';
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
import { contentCSFNext } from './mocked-data/content-csf-next';

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
    activeLanguage: 'js',
    activePackageManager: 'npm',
    activeSnippetTabs: [],
    activeDismissals: [],
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
            setSnippetTabs: fn()
              .mockName('setSnippetTabs')
              .mockImplementation((id) => {
                setArgs({ activeSnippetTabs: [id] });
              }),
            setDismissals: fn()
              .mockName('setDismissals')
              .mockImplementation((id) => {
                setArgs({ activeDismissals: [id] });
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
    activeSnippetTabs: string[] | null;
    activeDismissals: string[] | null;
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
    activeLanguage: null,
  },
};

export const ReactJS: Story = {
  args: {
    content: content2,
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
    activeLanguage: null,
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
  },
};

export const MultipleTabsWithTabFromCookie: Story = {
  args: {
    content: contentMultiTab,
    activeSnippetTabs: ['vite'],
  },
};

export const MultipleTabsVue3Only: Story = {
  args: {
    content: contentMultiTabVue3Only,
    activeRenderer: 'vue',
  },
};

export const MultipleTabsVue3OnlySuffix: Story = {
  args: {
    content: contentMultiTabVue3OnlySuffix,
    activeRenderer: 'vue',
  },
};

export const MultipleTabsVue2And3: Story = {
  args: {
    content: contentMultiTabVue2And3,
    activeRenderer: 'vue',
  },
};

export const MultipleTabsVue2And3Suffix: Story = {
  args: {
    content: contentMultiTabVue2And3Suffix,
    activeRenderer: 'vue',
  },
};

export const CoerceTS49ToTS: Story = {
  name: 'Coerce TS 4.9 language to TS snippet',
  args: {
    content: content2.filter((tab) => tab.language !== 'ts-4-9'),
    activeLanguage: 'ts-4-9',
  },
}

export const CSFNextInfo: Story = {
  args: {
    content: contentCSFNext,
    activeRenderer: 'react',
    activeSnippetTabs: ['CSF Next 🧪']
  }
}

// TODO: Couldn't get this working, something with `setArgs`?
// export const DismissCSFNextInfo: Story = {
//   parameters: {
//     chromatic: {
//       disableSnapshot: true,
//     },
//   },
//   args: {
//     content: contentCSFNext,
//     activeRenderer: 'react',
//     activeSnippetTabs: ['CSF Next 🧪'],
//     activeDismissals: [],
//   },
//   async play({ canvasElement }) {
//     const canvas = within(canvasElement);
//     await waitFor(async () => {
//       await canvas.findByText(/Learn more about CSF Next/i);
//     });
//     const dismissButton = canvas.getByRole('button', { name: /dismiss/i });
//     await userEvent.click(dismissButton);

//     await expect(
//       canvas.queryByText(/Learn more about CSF Next/i)
//     ).not.toBeInTheDocument();
//   },
// }

export const NoRenderer: Story = {
  args: {
    content: content2,
    activeRenderer: 'ember',
  },
};

export const ContentUndefined: Story = {
  args: {
    content: content3,
  },
};
