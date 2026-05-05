import preview from '../../../.storybook/preview';
import { HomeConcepts } from './home-concepts';

const meta = preview.meta({
  title: 'Docs/Mdx/HomeConcepts',
  component: HomeConcepts,
  parameters: { layout: 'padded' },
});

export const Default = meta.story({});
