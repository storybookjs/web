import { MetadataRoute } from 'next';
import {
  FlatTreeNode,
  getFlatTreeSitemap,
} from '../../lib/get-flat-tree-sitemap';
import { getUrl } from '../../lib/get-url';
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

  // Generate URLs for each node - The getUrl function will remove the version from the URL
  const docsUrls = flatTree.map((node) => ({
    url: getUrl(`https://storybook.js.org${node.slug}`, node.version),
  }));

  return [
    { url: 'https://storybook.js.org' },
    { url: 'https://storybook.js.org/community' },
    ...docsUrls,
  ];
}
