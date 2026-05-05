import { fn } from 'storybook/test';
import preview from '../../.storybook/preview';
import { DocsContext } from '../../app/docs/provider';
import { TableOfContent } from './table-of-content';

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
  title: 'Docs/TableOfContent',
  component: TableOfContent,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <DocsContext.Provider value={docsValue}>
        <div className="flex gap-8 px-8">
          <main className="flex-1">
            <h1>An example documentation page</h1>
            <h2 id="introduction">Introduction</h2>
            <p>Some intro content.</p>
            <h2 id="getting-started">Getting started</h2>
            <h3 id="installation">Installation</h3>
            <p>Install Storybook using your favorite package manager.</p>
            <h3 id="configuration">Configuration</h3>
            <h4 id="main-config">main.ts</h4>
            <p>Configure your Storybook in main.ts.</p>
            <h4 id="preview-config">preview.ts</h4>
            <h2 id="next-steps">Next steps</h2>
            <p>Continue exploring the docs.</p>
          </main>
          <Story />
        </div>
      </DocsContext.Provider>
    ),
  ],
});

export const Default = meta.story({});
