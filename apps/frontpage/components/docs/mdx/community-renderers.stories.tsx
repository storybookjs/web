import preview from '../../../.storybook/preview';
import { CommunityRenderers } from './community-renderers';

const meta = preview.meta({
  title: 'Docs/Mdx/CommunityRenderers',
  component: CommunityRenderers,
  parameters: { layout: 'padded' },
});

export const Default = meta.story({});
