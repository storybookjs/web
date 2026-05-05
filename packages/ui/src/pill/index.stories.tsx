import { fn } from 'storybook/test';
import preview from '../../.storybook/preview';
import { Pill } from './index';

const meta = preview.meta({
  title: 'Pill',
  component: Pill,
  parameters: { layout: 'centered' },
  args: { children: 'React', onClick: fn() },
});

export const Default = meta.story({});

export const Active = meta.story({ args: { isActive: true } });

export const WithArrow = meta.story({ args: { arrow: true } });

export const NoHover = meta.story({ args: { noHover: true } });

export const AsLink = meta.story({
  args: {
    asChild: true,
    children: <a href="https://storybook.js.org">Storybook</a>,
  },
});
