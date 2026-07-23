import { fn } from 'storybook/test';
import preview from '../../../.storybook/preview';
import { DocsContext } from '../../../app/docs/provider';
import { DocsFooter } from './footer';

const docsValue = {
  activeRenderer: 'react',
  activeLanguage: 'js',
  activePackageManager: 'npm',
  activeSnippetTabs: [],
  activeDismissals: [],
  setRenderer: fn(),
  setLanguage: fn(),
  setPackageManager: fn(),
  setSnippetTabs: fn(),
  setDismissals: fn(),
};

const meta = preview.meta({
  title: 'Docs/Footer/Footer',
  component: DocsFooter,
  parameters: {
    nextjs: { navigation: { pathname: '/docs/get-started/install' } },
  },
  decorators: [
    (Story) => (
      <DocsContext.Provider value={docsValue}>
        <div className="p-8">
          <Story />
        </div>
      </DocsContext.Provider>
    ),
  ],
  args: {
    isIndexPage: false,
    sendFeedback: fn(() => Promise.resolve({ status: 'ok' as const })),
  },
});

export const Default = meta.story({});
