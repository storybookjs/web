import preview from '../../.storybook/preview';
import { SubHeader } from './index';

const meta = preview.meta({
  title: 'SubHeader',
  component: SubHeader,
  parameters: { layout: 'fullscreen' },
});

export const Default = meta.story({});

export const Custom = meta.story({
  args: {
    leftLabel: 'Back to docs',
    leftHref: '/docs',
    right: <span className="ui-text-sm ui-text-zinc-500">Last updated 2 days ago</span>,
  },
});
