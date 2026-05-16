import preview from '../../../.storybook/preview';
import { Hr } from './hr';

const meta = preview.meta({
  title: 'MDX/Hr',
  component: Hr,
  parameters: { layout: 'padded' },
});

export const Default = meta.story({});
