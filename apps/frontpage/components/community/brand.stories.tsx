import preview from '../../.storybook/preview';
import { BrandAndResources } from './brand';

const meta = preview.meta({
  title: 'Community/BrandAndResources',
  component: BrandAndResources,
  parameters: { layout: 'padded' },
});

export const Default = meta.story({});
