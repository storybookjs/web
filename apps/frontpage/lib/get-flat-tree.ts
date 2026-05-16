import { type DocsVersion, type TreeProps } from '@repo/utils';

export interface FlatTreeNode {
  slug: string;
  draft?: TreeProps['draft'];
  level: number;
  type: TreeProps['type'];
  version?: DocsVersion;
  canonical: string;
}

export const getFlatTree = ({
  tree,
  level = 1,
  filterDrafts = true,
  filterSecondLevelDirectories = true,
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
      draft: node.draft ?? false,
      canonical: node.canonical,
      level,
    });
    if (node.children) {
      flatTree = flatTree.concat(
        getFlatTree({
          tree: node.children,
          level: level + 1,
          filterDrafts,
          filterSecondLevelDirectories,
        }),
      );
    }
  });

  if (filterDrafts) {
    flatTree = flatTree.filter((node) => !node.draft);
  }

  if (filterSecondLevelDirectories) {
    flatTree = flatTree.filter((node) =>
      node.type === 'directory' ? node.level !== 2 : true,
    );
  }

  return flatTree;
};
