import { useArgs } from 'storybook/preview-api';
import { expect, fn } from 'storybook/test';
import preview from '../../../../.storybook/preview';
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

const meta = preview.meta({
  title: 'Docs/MDX/CodeSnippets',
  component: CodeSnippetsClient,
  tags: ['autodocs'],
  argTypes: {
    content: {
      control: {
        type: 'object',
      },
    },
    ...({
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
    } as Record<string, unknown>),
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
});

export const ContentOnly = meta.story({
  args: {},
});

export const PackageNPM = meta.story({
  args: {
    content: content1,
  },
});

export const PackageYARN = meta.story({
  args: {
    content: content1,
    activePackageManager: 'yarn',
  },
});

export const PackagePNPM = meta.story({
  args: {
    content: content1,
    activePackageManager: 'pnpm',
  },
});

export const ReactNoLanguage = meta.story({
  args: {
    content: content2,
    activeLanguage: null,
  },
});

export const ReactJS = meta.story({
  args: {
    content: content2,
  },
});

export const ReactTS = meta.story({
  args: {
    content: content2,
    activeLanguage: 'ts',
  },
});

export const AngularNoLanguage = meta.story({
  args: {
    content: content2,
    activeRenderer: 'angular',
    activeLanguage: null,
  },
});

export const ReactNativeWebFallbackToReact = meta.story({
  args: {
    content: content2,
    activeRenderer: 'react-native-web',
  },
});

export const MultipleTabs = meta.story({
  args: {
    content: contentMultiTab,
  },
});

export const MultipleTabsWithTabFromCookie = meta.story({
  args: {
    content: contentMultiTab,
    activeSnippetTabs: ['vite'],
  },
});

export const MultipleTabsVue3Only = meta.story({
  args: {
    content: contentMultiTabVue3Only,
    activeRenderer: 'vue',
  },
});

export const MultipleTabsVue3OnlySuffix = meta.story({
  args: {
    content: contentMultiTabVue3OnlySuffix,
    activeRenderer: 'vue',
  },
});

export const MultipleTabsVue2And3 = meta.story({
  args: {
    content: contentMultiTabVue2And3,
    activeRenderer: 'vue',
  },
});

export const MultipleTabsVue2And3Suffix = meta.story({
  args: {
    content: contentMultiTabVue2And3Suffix,
    activeRenderer: 'vue',
  },
});

export const CoerceTS49ToTS = meta.story({
  name: 'Coerce TS 4.9 language to TS snippet',
  args: {
    content: content2.filter((tab) => tab.language !== 'ts-4-9'),
    activeLanguage: 'ts-4-9',
  },
});

export const CSFNextInfo = meta.story({
  args: {
    content: contentCSFNext,
    activeRenderer: 'react',
    activeSnippetTabs: ['CSF Next 🧪'],
  },
});

export const CSFNextInfoDismissed = meta.story({
  parameters: {
    nextjs: { navigation: { pathname: '/docs/11/writing-stories' } },
    chromatic: { disableSnapshot: true },
  },
  args: {
    content: contentCSFNext,
    activeRenderer: 'react',
    activeSnippetTabs: ['CSF Next 🧪'],
    activeDismissals: ['csf-next-info'],
  },
  async play({ canvas }) {
    await canvas.findByRole('button', { name: 'CSF Next 🧪' });
    await expect(canvas.queryByText('Learn more about CSF Next')).not.toBeInTheDocument();
  },
});

const CSF3Message = /^CSF 3 is still supported/;

export const CSF3Info = meta.story({
  parameters: {
    nextjs: { navigation: { pathname: '/docs/11/writing-stories' } },
    chromatic: { disableSnapshot: true },
  },
  args: {
    content: contentCSFNext,
    activeRenderer: 'react',
    activeSnippetTabs: ['CSF 3'],
  },
  async play({ canvas }) {
    await expect(await canvas.findByText(CSF3Message)).toBeInTheDocument();
  },
});

export const CSF3InfoBefore11 = meta.story({
  name: 'CSF 3 info hidden before 11',
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  args: {
    content: contentCSFNext,
    activeRenderer: 'react',
    activeSnippetTabs: ['CSF 3'],
  },
  async play({ canvas }) {
    await canvas.findByRole('button', { name: 'CSF 3' });
    await expect(canvas.queryByText(CSF3Message)).not.toBeInTheDocument();
  },
});

export const CSF3InfoDismissed = meta.story({
  parameters: {
    nextjs: { navigation: { pathname: '/docs/11/writing-stories' } },
    chromatic: { disableSnapshot: true },
  },
  args: {
    content: contentCSFNext,
    activeRenderer: 'react',
    activeSnippetTabs: ['CSF 3'],
    activeDismissals: ['csf-3-warning'],
  },
  async play({ canvas }) {
    await canvas.findByRole('button', { name: 'CSF 3' });
    await expect(canvas.queryByText(CSF3Message)).not.toBeInTheDocument();
  },
});

export const NoRenderer = meta.story({
  args: {
    content: content2,
    activeRenderer: 'ember',
  },
});

export const ContentUndefined = meta.story({
  args: {
    content: content3,
  },
});
