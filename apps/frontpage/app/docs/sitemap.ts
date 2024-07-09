import { MetadataRoute } from 'next';
import { generateDocsTree } from '../../lib/get-tree';
import { TreeProps, docsVersions } from '@repo/utils';

export default function sitemap(): MetadataRoute.Sitemap {
  const latestVersion = docsVersions[0];
  const tree = generateDocsTree(`content/docs/${latestVersion.id}`);

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

  flattenTree(tree);

  const filteredTree = flattenedTree
    .filter((node) => node.type !== 'directory')
    .filter((node) => node.draft !== true);

  const docs = filteredTree.map((node) => ({
    url: `https://storybook.js.org${node.slug}`.replace(
      `${latestVersion.id}/`,
      '',
    ),
  }));

  return [
    { url: 'https://storybook.js.org' },
    { url: 'https://storybook.js.org/community' },
    { url: 'https://storybook.js.org/docs' },
    ...docs,
  ];
}
