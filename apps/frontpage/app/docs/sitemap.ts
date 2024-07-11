import { MetadataRoute } from 'next';
import { docsVersions } from '@repo/utils';
import { getFlatTreeSitemap } from '../../lib/get-flat-tree-sitemap';
import { getAllTrees } from '../../lib/get-all-trees';

export default function sitemap(): MetadataRoute.Sitemap {
  const latestVersion = docsVersions[0];

  // Generate docs tree for the latest version only
  const listOfTrees = getAllTrees();
  const tree = listOfTrees.find((tree) => tree.name === latestVersion.id);

  // We flatten the tree
  const flatTree = tree?.children && getFlatTreeSitemap(tree?.children);

  // Generate URLs for each node
  const docsUrls = flatTree
    ? flatTree.map((node) => ({
        url: `https://storybook.js.org${node.slug}`,
      }))
    : [];

  return [
    { url: 'https://storybook.js.org' },
    { url: 'https://storybook.js.org/community' },
    ...docsUrls,
  ];
}
