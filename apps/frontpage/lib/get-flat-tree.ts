import { DocsVersion, TreeProps } from '@repo/utils';

export interface FlatTreeNode {
  slug: string;
  draft?: TreeProps['draft'];
  level: number;
  version?: DocsVersion;
}

export const flattenTree = (
  tree: TreeProps[],
  level: number = 1,
): FlatTreeNode[] => {
  let flatTree: FlatTreeNode[] = [];
  tree.forEach((node) => {
    flatTree.push({
      slug: node.slug,
      draft: node.draft || false,
      level: level,
    });
    if (node.children) {
      flatTree = flatTree.concat(flattenTree(node.children, level + 1));
    }
  });
  return flatTree;
};
