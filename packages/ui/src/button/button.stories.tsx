import preview from '../../.storybook/preview';
import { Button } from './button';

const meta = preview.meta({
  title: 'Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  args: {
    children: 'Button',
  },
});

export const Ghost = meta.story({
  args: { variant: 'ghost' },
});

export const GhostSystem = meta.story({
  args: { variant: 'ghostSystem' },
});

export const GhostHome = meta.story({
  args: { variant: 'ghostHome' },
  globals: { backgrounds: { value: 'dark' } },
});

export const Solid = meta.story({
  args: { variant: 'solid', children: 'Copy prompt' },
});

export const Link = meta.story({
  args: { variant: 'link', children: 'Read more' },
});

export const Outline = meta.story({
  args: { variant: 'outline' },
});

export const OutlineActive = meta.story({
  args: { variant: 'outline', active: 'outline', children: 'React' },
});

export const OutlineHome = meta.story({
  args: { variant: 'outlineHome' },
  globals: { backgrounds: { value: 'dark' } },
});

export const SmallSize = meta.story({
  args: { variant: 'solid', size: 'sm' },
});

export const MediumSize = meta.story({
  args: { variant: 'solid', size: 'md' },
});

export const LargeSize = meta.story({
  args: { variant: 'solid', size: 'lg' },
});

export const RoundedFull = meta.story({
  args: { variant: 'solid', rounded: 'full' },
});

export const JumpOnHover = meta.story({
  args: { variant: 'solid', jumpOnHover: true, children: 'Hover me' },
});

export const Disabled = meta.story({
  args: { variant: 'solid', disabled: true },
});

export const AsLink = meta.story({
  args: {
    variant: 'solid',
    asChild: true,
    children: <a href="https://storybook.js.org">Visit Storybook</a>,
  },
});
