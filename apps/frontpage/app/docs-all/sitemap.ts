import { MetadataRoute } from 'next';
import {
  FlatTreeNode,
  getFlatTreeSitemap,
} from '../../lib/get-flat-tree-sitemap';
import { getAllTrees } from '../../lib/get-all-trees';
import { docsVersions } from '@repo/utils';

export default function sitemap(): MetadataRoute.Sitemap {
  // Generate docs tree for each version
  const listofTrees = getAllTrees();

  // We flatten the tree for each version
  const flatTree: FlatTreeNode[] = [];
  listofTrees.forEach((list) => {
    const newTree = list.children ? getFlatTreeSitemap(list.children) : [];
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

  return [
    { url: 'https://storybook.js.org' },
    { url: 'https://storybook.js.org/community' },
    ...docsUrls,
  ];
}
