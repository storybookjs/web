import { MetadataRoute } from 'next';
import { FlatTreeNode, getFlatTree } from '../../lib/get-flat-tree';
import { getAllTrees } from '../../lib/get-all-trees';
import { docsVersions, latestVersion } from '@repo/utils';

export default function sitemap(): MetadataRoute.Sitemap {
  // Generate docs tree for each version
  const listofTrees = getAllTrees();

  // We flatten the tree for each version
  const flatTree: FlatTreeNode[] = [];
  listofTrees.forEach((list) => {
    const newTree = list.children ? getFlatTree({ tree: list.children }) : [];
    const treeWithVersion = newTree.map((node) => {
      node.version = docsVersions.find((version) => version.id === list.name);
      return node;
    });

    flatTree.push(...treeWithVersion);
  });

  // Generate URLs for each node
  const docsUrls = flatTree.map((node) => ({
    url: `https://storybook.js.org${node.slug}`,
  }));

  // Remove https://storybook.js.org/docs/get-started as we are redirecting to https://storybook.js.org/docs
  const filteredDocsUrls = docsUrls.filter(
    (node) => node.url !== 'https://storybook.js.org/docs/get-started',
  );

  const docsHomeUrls = docsVersions.map((version) => ({
    url:
      version.id === latestVersion.id
        ? 'https://storybook.js.org/docs'
        : `https://storybook.js.org/docs/${version.inSlug || version.id}`,
  }));

  return [
    { url: 'https://storybook.js.org' },
    { url: 'https://storybook.js.org/community' },
    ...docsHomeUrls,
    ...filteredDocsUrls,
  ];
}
