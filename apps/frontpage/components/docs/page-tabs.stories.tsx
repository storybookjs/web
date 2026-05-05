import type { ComponentProps } from 'react';
import preview from '../../.storybook/preview';
import { PageTabs } from './page-tabs';

const tabs = [
  {
    name: 'overview',
    title: 'Overview',
    pathSegment: 'docs/writing-stories/overview.mdx',
  },
  {
    name: 'args',
    title: 'Args',
    pathSegment: 'docs/writing-stories/args.mdx',
  },
  {
    name: 'parameters',
    title: 'Parameters',
    pathSegment: 'docs/writing-stories/parameters.mdx',
  },
];

const meta = preview.meta({
  title: 'Docs/PageTabs',
  component: PageTabs,
  parameters: { layout: 'padded' },
  // @ts-expect-error -- PageDataProps tab has more fields than we mock
  args: { tabs, isIndexPage: false, path: 'docs/writing-stories/overview.mdx' },
});

export const FirstActive = meta.story({
  args: {} as ComponentProps<typeof PageTabs>,
});

export const MiddleActive = meta.story({
  args: { path: 'docs/writing-stories/args.mdx' } as ComponentProps<
    typeof PageTabs
  >,
});
