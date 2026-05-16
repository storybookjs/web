import preview from '../../.storybook/preview';
import { Contribute } from './contribute';

const meta = preview.meta({
  title: 'Community/Contribute',
  component: Contribute,
  parameters: { layout: 'padded' },
});

export const Default = meta.story({});
