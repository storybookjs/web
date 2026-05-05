import { fn } from 'storybook/test';
import preview from '../../.storybook/preview';
import { Copy } from './copy';

const meta = preview.meta({
  title: 'CodeSnippetsWrapper/Copy',
  component: Copy,
  parameters: { layout: 'centered' },
  args: {
    content: 'npx storybook init',
    onClick: fn(),
  },
});

export const Default = meta.story({});

export const NewUsers = meta.story({ args: { variant: 'new-users' } });
