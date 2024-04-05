import { MetadataRoute } from 'next';

import { generateDocsTree } from './get-tree';
import { TreeProps, latestVersion } from '@utils';

const docsTree = generateDocsTree();

const startSitemap: MetadataRoute.Sitemap = [];

function getUrlObjectForSlug(slug: string): MetadataRoute.Sitemap[0] {
  return {
    url: `https://storybook.js.org${slug.replace(
      `/docs/${latestVersion.id}/`,
      '/docs/'
    )}`,
  };
}

export function getSitemapFromTree(
  sitemap: MetadataRoute.Sitemap = startSitemap,
  tree: TreeProps[] = docsTree
): MetadataRoute.Sitemap {
  tree.forEach((item) => {
    sitemap.push(getUrlObjectForSlug(item.slug));
    if (item.children) {
      getSitemapFromTree(sitemap, item.children);
    }
  });

  return sitemap;
}
