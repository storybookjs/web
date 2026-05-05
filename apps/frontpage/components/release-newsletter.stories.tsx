import preview from '../.storybook/preview';
import { ReleaseNewsletter } from './release-newsletter';

const meta = preview.meta({
  title: 'Releases/ReleaseNewsletter',
  component: ReleaseNewsletter,
  parameters: { layout: 'padded' },
});

export const Default = meta.story({});
