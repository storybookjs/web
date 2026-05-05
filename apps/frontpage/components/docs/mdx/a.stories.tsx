import preview from '../../../.storybook/preview';
import { A } from './a';

const meta = preview.meta({
  title: 'Docs/Mdx/A',
  component: A,
  parameters: { layout: 'centered' },
  args: {
    children: 'Link text',
    isIndexPage: false,
    pagePath: ['9.0', 'writing-stories', 'overview'],
  },
});

export const Default = meta.story({ args: { href: './args' } });
