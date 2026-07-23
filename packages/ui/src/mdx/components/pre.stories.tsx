import preview from '../../../.storybook/preview';
import { Pre } from './pre';

const sample = `import { fn } from 'storybook/test';

export const Clicked = {
  args: { onClick: fn() },
};`;

const meta = preview.meta({
  title: 'MDX/Pre',
  component: Pre,
  parameters: { layout: 'padded' },
});

export const TypeScript = meta.story({
  args: {
    'data-language': 'ts',
    raw: sample,
    children: <code>{sample}</code>,
  },
});

export const Shell = meta.story({
  args: {
    'data-language': 'sh',
    raw: 'npx storybook init',
    children: <code>npx storybook init</code>,
  },
});
