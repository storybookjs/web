import preview from '../../.storybook/preview';
import { Footer } from './index';

const meta = preview.meta({
  title: 'Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
  globals: {
    backgrounds: {
      value: 'dark',
    },
  },
});

export const System = meta.story();

export const Home = meta.story({
  args: {
    variant: 'home',
  },
});
