import preview from '../../../.storybook/preview';
import { A } from './a';

const meta = preview.meta({
  title: 'MDX/A',
  component: A,
  parameters: { layout: 'centered' },
});

export const Default = meta.story({
  args: { children: 'Link text', href: 'https://storybook.js.org' },
});
