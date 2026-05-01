import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta = {
  title: 'Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  args: {
    children: 'Button',
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Ghost: Story = {
  args: { variant: 'ghost' },
};

export const GhostSystem: Story = {
  args: { variant: 'ghostSystem' },
};

export const GhostHome: Story = {
  args: { variant: 'ghostHome' },
  globals: { backgrounds: { value: 'dark' } },
};

export const Solid: Story = {
  args: { variant: 'solid', children: 'Copy prompt' },
};

export const Link: Story = {
  args: { variant: 'link', children: 'Read more' },
};

export const Outline: Story = {
  args: { variant: 'outline' },
};

export const OutlineActive: Story = {
  args: { variant: 'outline', active: 'outline', children: 'React' },
};

export const OutlineHome: Story = {
  args: { variant: 'outlineHome' },
  globals: { backgrounds: { value: 'dark' } },
};

export const SmallSize: Story = {
  args: { variant: 'solid', size: 'sm' },
};

export const MediumSize: Story = {
  args: { variant: 'solid', size: 'md' },
};

export const LargeSize: Story = {
  args: { variant: 'solid', size: 'lg' },
};

export const RoundedFull: Story = {
  args: { variant: 'solid', rounded: 'full' },
};

export const JumpOnHover: Story = {
  args: { variant: 'solid', jumpOnHover: true, children: 'Hover me' },
};

export const Disabled: Story = {
  args: { variant: 'solid', disabled: true },
};

export const AsLink: Story = {
  args: {
    variant: 'solid',
    asChild: true,
    children: <a href="https://storybook.js.org">Visit Storybook</a>,
  },
};
