import preview from '../../.storybook/preview';
import { Sponsor } from './sponsor';

const meta = preview.meta({
  title: 'Community/Sponsor',
  component: Sponsor,
  parameters: { layout: 'padded' },
});

export const Default = meta.story({});
