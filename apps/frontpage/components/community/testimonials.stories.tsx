import preview from '../../.storybook/preview';
import { Testimonials } from './testimonials';

const meta = preview.meta({
  title: 'Community/Testimonials',
  component: Testimonials,
  parameters: { layout: 'padded' },
});

export const Default = meta.story({});
