import { MetadataRoute } from 'next';
import { generateDocsTree } from '../../../lib/get-tree';
import { TreeProps, docsVersions } from '@repo/utils';

export default function sitemap(): MetadataRoute.Sitemap {
  const latestVersion = docsVersions[0];
  const listofTrees = docsVersions.map((version) => {
    return {
      version: version.id,
      tree: generateDocsTree(`content/docs/${version.id}`),
    };
  });

  const flattenedTree: TreeProps[] = [];

  const flattenTree = (tree: TreeProps[]) => {
    tree.forEach((node) => {
      if (node.children) {
        flattenedTree.push(node);
        flattenTree(node.children);
      }
      flattenedTree.push(node);
    });
  };

  listofTrees.forEach((list) => {
    flattenTree(list.tree);
  });

  const filteredTree = flattenedTree
    .filter((node) => node.type !== 'directory')
    .filter((node) => node.draft !== true);

  const docs = filteredTree.map((node) => {
    const url = `https://storybook.js.org${node.slug}`
      .replace(`${latestVersion.id}/`, '')
      .replace(docsVersions[1].id, docsVersions[1].inSlug || '')
      .replace(docsVersions[2].id, docsVersions[2].inSlug || '')
      .replace(/index$/, '') // This line removes 'index' at the end of the URL
      .replace(/\/$/, '');

    return {
      url,
    };
  });

  return [
    { url: 'https://storybook.js.org' },
    { url: 'https://storybook.js.org/community' },
    ...docs,
  ];
}
