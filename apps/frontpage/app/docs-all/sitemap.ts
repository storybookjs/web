import { MetadataRoute } from 'next';
import { generateDocsTree } from '../../lib/get-tree';
import { docsVersions } from '@repo/utils';
import {
  FlatTreeNode,
  getFlatTreeSitemap,
} from '../../lib/get-flat-tree-sitemap';
import { getUrl } from '../../lib/get-url';

export default function sitemap(): MetadataRoute.Sitemap {
  // Generate docs tree for each version
  const listofTrees = docsVersions.map((version) => {
    return {
      version: version,
      tree: generateDocsTree(`content/docs/${version.id}`),
    };
  });

  // We flatten the tree for each version
  const flatTree: FlatTreeNode[] = [];
  listofTrees.forEach((list) => {
    const newTree = getFlatTreeSitemap(list.tree);
    const treeWithVersion = newTree.map((node) => {
      node.version = list.version;
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
