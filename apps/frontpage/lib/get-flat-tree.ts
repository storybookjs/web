import { DocsVersion, TreeProps } from '@repo/utils';

export interface FlatTreeNode {
  slug: string;
  draft?: TreeProps['draft'];
  level: number;
  type: TreeProps['type'];
  version?: DocsVersion;
}

export const getFlatTree = ({
  tree,
  level = 0,
  filterDrafts,
  filterSecondLevelDirectories,
}: {
  tree: TreeProps[];
  level?: number;
  filterDrafts?: boolean;
  filterSecondLevelDirectories?: boolean;
}): FlatTreeNode[] => {
  let flatTree: FlatTreeNode[] = [];
  tree.forEach((node) => {
    flatTree.push({
      slug: node.slug,
      type: node.type,
      draft: node.draft || false,
      level: level,
    });
    if (node.children) {
      flatTree = flatTree.concat(
        getFlatTree({ tree: node.children, level: level + 1 }),
      );
    }
  });

  if (filterDrafts) {
    flatTree = flatTree.filter((node) => !node.draft);
  }

  if (filterSecondLevelDirectories) {
    flatTree = flatTree.filter((node) => node.level !== 2);
  }

  return flatTree;
};
