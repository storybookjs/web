import { DocsVersion, TreeProps } from '@repo/utils';

export interface FlatTreeNode {
  slug: string;
  draft?: TreeProps['draft'];
  level: number;
  type: TreeProps['type'];
  version?: DocsVersion;
}

export const getFlatTreeSitemap = (
  tree: TreeProps[],
  level: number = 1,
): FlatTreeNode[] => {
  let flatTree: FlatTreeNode[] = [];
  tree.forEach((node) => {
    flatTree.push({
      slug: node.slug,
      type: node.type,
      draft: node.draft || false,
      level: level,
    });
    if (node.children) {
      flatTree = flatTree.concat(getFlatTreeSitemap(node.children, level + 1));
    }
  });

  return (
    flatTree
      // Filter out drafts
      .filter((node) => node.draft !== true)
      // Filter out second level directories
      .filter((node) =>
        node.type === 'directory' ? (node.level === 2 ? false : true) : true,
      )
  );
};
