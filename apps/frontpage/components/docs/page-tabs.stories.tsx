import type { ComponentProps } from 'react';
import { docsVersions, latestVersion } from '@repo/utils';
import { expect } from 'storybook/test';
import preview from '../../.storybook/preview';
import { PageTabs } from './page-tabs';

const createTabs = (versionId: string) => [
  {
    name: 'index.mdx',
    title: 'Vitest addon',
    tab: { title: 'Guide' },
    pathSegment: `content/docs/${versionId}/writing-tests/integrations/vitest-addon/index.mdx`,
  },
  {
    name: 'migration-guide.mdx',
    title: 'Migration guide',
    pathSegment: `content/docs/${versionId}/writing-tests/integrations/vitest-addon/migration-guide.mdx`,
  },
];

const tabs = createTabs(latestVersion.id);

const olderVersion = docsVersions.find((v) => v.inSlug)!;
const versionedTabs = createTabs(olderVersion.id);

type Args = ComponentProps<typeof PageTabs>;

const meta = preview.meta({
  title: 'Docs/PageTabs',
  component: PageTabs,
  parameters: { layout: 'padded' },
  args: { tabs, path: tabs[0].pathSegment } as unknown as Args,
});

export const IndexActive = meta.story({
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Guide')).toHaveAttribute(
      'aria-current',
      'page',
    );
    await expect(
      canvas.getByRole('link', { name: 'Migration guide' }),
    ).toHaveAttribute(
      'href',
      '/docs/writing-tests/integrations/vitest-addon/migration-guide',
    );
  },
});

export const SubPageActive = meta.story({
  parameters: { chromatic: { disable: true } },
  args: { path: tabs[1].pathSegment } as Args,
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Migration guide')).toHaveAttribute(
      'aria-current',
      'page',
    );
    await expect(canvas.getByRole('link', { name: 'Guide' })).toHaveAttribute(
      'href',
      '/docs/writing-tests/integrations/vitest-addon',
    );
  },
});

export const Versioned = meta.story({
  parameters: { chromatic: { disable: true } },
  args: {
    tabs: versionedTabs,
    path: versionedTabs[1].pathSegment,
  } as unknown as Args,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('link', { name: 'Guide' })).toHaveAttribute(
      'href',
      `/docs/${olderVersion.inSlug!}/writing-tests/integrations/vitest-addon`,
    );
  },
});
