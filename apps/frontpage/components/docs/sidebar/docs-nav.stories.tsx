import preview from '../../../.storybook/preview';
import { NavDocs } from './docs-nav';
import { listOfTreesFixture } from './__fixtures__/list-of-trees';

const meta = preview.meta({
  title: 'Docs/Sidebar/NavDocs',
  component: NavDocs,
  decorators: [
    (Story) => (
      <div className="w-64 p-4">
        <Story />
      </div>
    ),
  ],
  args: { listOfTrees: listOfTreesFixture },
});

export const Default = meta.story({
  parameters: {
    nextjs: { navigation: { pathname: '/docs/get-started' } },
  },
});

export const InsideSection = meta.story({
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/docs/writing-stories/args',
        segment: 'writing-stories',
      },
    },
  },
});

export const NestedSection = meta.story({
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/docs/configure/integration/frameworks',
        segment: 'configure',
      },
    },
  },
});
