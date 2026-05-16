import type { ComponentProps } from 'react';
import { fn } from 'storybook/test';
import preview from '../../../../.storybook/preview';
import { Dropdown } from './dropdown';

const languages = [
  { id: 'js', title: 'JavaScript' },
  { id: 'ts', title: 'TypeScript' },
];

const meta = preview.meta({
  title: 'Docs/Mdx/CodeSnippets/Dropdown',
  component: Dropdown,
  parameters: { layout: 'centered' },
  args: {
    list: languages,
    action: fn(),
    type: 'language',
    activeId: 'ts',
  },
});

export const Default = meta.story({
  args: {} as ComponentProps<typeof Dropdown>,
});
