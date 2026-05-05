import preview from '../../../.storybook/preview';
import { DocsMainNav } from './docs-main-nav';

const meta = preview.meta({
  title: 'Docs/Sidebar/DocsMainNav',
  component: DocsMainNav,
  decorators: [
    (Story) => (
      <div className="w-64 p-4">
        <Story />
      </div>
    ),
  ],
});

export const Default = meta.story({});

export const ApiActive = meta.story({
  parameters: {
    nextjs: {
      navigation: { pathname: '/docs/api/cli-options' },
    },
  },
});

export const TutorialsActive = meta.story({
  parameters: {
    nextjs: {
      navigation: { pathname: '/tutorials' },
    },
  },
});

export const ChangelogActive = meta.story({
  parameters: {
    nextjs: {
      navigation: { pathname: '/releases/10' },
    },
  },
});
