import { useArgs } from 'storybook/preview-api';
import { expect, fn, waitFor, within } from 'storybook/test';
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
import { contentCSFRenamed } from './mocked-data/content-csf-renamed';

/**
 * Snippet tabs render as buttons; the selected one carries the `filled` active variant.
 * These helpers pin the displayed tab order and the active selection in play functions.
 */
const SNIPPET_TAB_TITLES = [
  'CSF',
  'CSF (Legacy)',
  'CSF 3',
  'CSF Next 🧪',
  'Story File',
];

const getSnippetTabButtons = (canvasElement: HTMLElement) =>
  within(canvasElement)
    .getAllByRole('button')
    .filter((button) => SNIPPET_TAB_TITLES.includes(button.textContent ?? ''));

const getActiveTabTitle = (canvasElement: HTMLElement) =>
  getSnippetTabButtons(canvasElement).find((button) =>
    button.classList.contains('ui-bg-slate-500'),
  )?.textContent;

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
  play: async ({ canvasElement }) => {
    // Pre-11 display behavior: the stored pre-rename title still selects its own tab
    // (the migration only applies when the page offers the target tab), and the
    // "Learn more about CSF Next" banner keeps displaying.
    await waitFor(async () => {
      await expect(getActiveTabTitle(canvasElement)).toBe('CSF Next 🧪');
    });
    await expect(
      within(canvasElement).getByRole('link', {
        name: /learn more about csf next/i,
      }),
    ).toBeTruthy();
  },
});

export const CSFRenamedTabOrder = meta.story({
  args: {
    content: contentCSFRenamed,
  },
  play: async ({ canvasElement }) => {
    // Renamed titles: CSF (current) displays first and is the default, CSF (Legacy)
    // second — even though the content order is the reverse — and every other tab
    // keeps its content order.
    const tabTitles = getSnippetTabButtons(canvasElement).map(
      (button) => button.textContent,
    );
    await expect(tabTitles).toEqual(['CSF', 'CSF (Legacy)', 'Story File']);
    await waitFor(async () => {
      await expect(getActiveTabTitle(canvasElement)).toBe('CSF');
    });
  },
});

export const CSFPreRenameTabOrder = meta.story({
  args: {
    content: contentCSFNext,
  },
  play: async ({ canvasElement }) => {
    // Old-title fixtures (pre-11 docs versions) keep today's order untouched: the
    // precedence sort matches exact titles only.
    const tabTitles = getSnippetTabButtons(canvasElement).map(
      (button) => button.textContent,
    );
    await expect(tabTitles).toEqual(['CSF 3', 'CSF Next 🧪']);
    await waitFor(async () => {
      await expect(getActiveTabTitle(canvasElement)).toBe('CSF 3');
    });
  },
});

export const CSFCookieMigratesLegacyTab = meta.story({
  args: {
    content: contentCSFRenamed,
    activeSnippetTabs: ['CSF 3'],
  },
  play: async ({ canvasElement }) => {
    // A stored "CSF 3" preference lands on "CSF (Legacy)" — not on "CSF", which the
    // fuzzy matcher would otherwise resolve it to.
    await waitFor(async () => {
      await expect(getActiveTabTitle(canvasElement)).toBe('CSF (Legacy)');
    });
  },
});

export const CSFCookieMigratesCurrentTab = meta.story({
  args: {
    content: contentCSFRenamed,
    activeSnippetTabs: ['CSF Next 🧪'],
  },
  play: async ({ canvasElement }) => {
    // A stored "CSF Next 🧪" preference lands on "CSF".
    await waitFor(async () => {
      await expect(getActiveTabTitle(canvasElement)).toBe('CSF');
    });
  },
});

export const CSFCookieUnknownUnchanged = meta.story({
  args: {
    content: contentCSFRenamed,
    activeSnippetTabs: ['vite-env'],
  },
  play: async ({ canvasElement }) => {
    // Unknown stored values pass through untouched: no tab matches, so the default
    // (first displayed) tab is selected, exactly as before the migration.
    await waitFor(async () => {
      await expect(getActiveTabTitle(canvasElement)).toBe('CSF');
    });
  },
});

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
