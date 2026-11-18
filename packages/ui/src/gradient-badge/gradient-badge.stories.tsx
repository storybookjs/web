import { WandIcon } from '@storybook/icons';
import preview from '../../.storybook/preview';
import { GradientBadge } from './gradient-badge';

const meta = preview.meta({
  title: 'GradientBadge',
  component: GradientBadge,
  parameters: {
    layout: 'centered',
  },
  globals: {
    backgrounds: {
      value: 'dark',
    },
  },
});

export const Default = meta.story({
  args: {
    link: '/blog/storybook-11/',
    children: 'Storybook 11 is here',
    icon: <WandIcon />,
  },
  name: 'GradientBadge',
});
