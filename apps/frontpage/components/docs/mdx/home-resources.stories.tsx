import preview from '../../../.storybook/preview';
import { HomeResources } from './home-resources';

const meta = preview.meta({
  title: 'Docs/Mdx/HomeResources',
  component: HomeResources,
  parameters: { layout: 'padded' },
});

export const Default = meta.story({});
