import { fn } from 'storybook/test';
import preview from '../../../.storybook/preview';
import { DocsContext } from '../../../app/docs/provider';
import { If } from './if';

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
  title: 'Docs/MDX/If',
  component: If,
  decorators: [
    (Story, { parameters }) => (
      <DocsContext.Provider
        value={{ ...docsValue, activeRenderer: parameters.activeRenderer }}
      >
        <Story />
      </DocsContext.Provider>
    ),
  ],
  parameters: { activeRenderer: 'react' },
});

const Body = () => (
  <div className="rounded border border-blue-300 bg-blue-50 p-4 text-sm">
    Renderer-specific content shown here.
  </div>
);

export const MatchingRenderer = meta.story({
  args: {
    renderer: 'react',
    children: <Body />,
  },
});

export const MultipleRenderersMatch = meta.story({
  args: {
    renderer: ['react', 'vue'],
    children: <Body />,
  },
  parameters: { activeRenderer: 'vue' },
});

export const NonMatchingRenderer = meta.story({
  args: {
    renderer: 'angular',
    children: <Body />,
  },
});

export const NotRenderer = meta.story({
  args: {
    notRenderer: 'react',
    children: <Body />,
  },
  parameters: { activeRenderer: 'vue' },
});

export const NotRendererHidesActive = meta.story({
  args: {
    notRenderer: 'react',
    children: <Body />,
  },
});
