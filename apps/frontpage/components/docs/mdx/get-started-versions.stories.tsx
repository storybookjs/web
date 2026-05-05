import preview from '../../../.storybook/preview';
import { GetStartedVersions } from './get-started-versions';

const meta = preview.meta({
  title: 'Docs/Mdx/GetStartedVersions',
  component: GetStartedVersions,
  parameters: { layout: 'padded' },
});

export const Default = meta.story({
  args: {
    versions: [
      { name: 'Next.js', range: '14+', icon: '/images/logos/renderers/logo-nextjs.svg' },
      { name: 'Vite', range: '7+', icon: '/images/logos/builders/vite.svg' },
    ],
  },
});
