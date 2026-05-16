import { latestVersion } from '@repo/utils';
import preview from '../../../.storybook/preview';
import { HomeRenderers } from './home-renderers';

const meta = preview.meta({
  title: 'Docs/Mdx/HomeRenderers',
  component: HomeRenderers,
  parameters: { layout: 'padded' },
});

export const Latest = meta.story({ args: { activeVersion: latestVersion } });

export const Older = meta.story({
  args: {
    activeVersion: { id: '8.0', label: '8.0', preRelease: false, inSlug: '8.0' },
  },
});
