import preview from '../../.storybook/preview';
import { NavSide } from './nav-side';

const meta = preview.meta({
  title: 'Community/NavSide',
  component: NavSide,
  parameters: { layout: 'padded' },
});

export const Default = meta.story({});
