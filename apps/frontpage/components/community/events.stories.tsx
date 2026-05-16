import preview from '../../.storybook/preview';
import { Events } from './events';

const meta = preview.meta({
  title: 'Community/Events',
  component: Events,
  parameters: { layout: 'padded' },
});

export const Default = meta.story({});
