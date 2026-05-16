import preview from '../../.storybook/preview';
import { NavTop } from './nav-top';

const meta = preview.meta({
  title: 'Community/NavTop',
  component: NavTop,
  parameters: { layout: 'fullscreen' },
});

export const Default = meta.story({});
