import preview from '../../.storybook/preview';
import { Eyebrow } from './eyebrow';

const meta = preview.meta({
  title: 'Header/Eyebrow',
  component: Eyebrow,
  parameters: { layout: 'fullscreen' },
});

export const Linked = meta.story({
  args: {
    href: 'https://storybook.js.org/blog',
    title: 'Watch the latest Storybook release video',
  },
});

export const HiddenIcon = meta.story({
  args: {
    href: 'https://storybook.js.org/blog',
    hideIcon: true,
    title: 'Read about the new release',
  },
});

export const NoLink = meta.story({
  args: { title: 'Storybook 9 is here' },
});
