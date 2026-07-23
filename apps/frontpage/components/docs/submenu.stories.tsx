import preview from '../../.storybook/preview';
import { Submenu } from './submenu';
import { listOfTreesFixture } from './sidebar/__fixtures__/list-of-trees';

const meta = preview.meta({
  title: 'Docs/Submenu',
  component: Submenu,
  globals: { viewport: { value: 'mobile1' } },
  parameters: {
    layout: 'fullscreen',
  },
  args: { listOfTrees: listOfTreesFixture },
});

export const Default = meta.story({
  parameters: {
    nextjs: { navigation: { pathname: '/docs/get-started' } },
  },
});

export const ActiveSection = meta.story({
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/docs/writing-stories',
        segment: 'writing-stories',
      },
    },
  },
});
