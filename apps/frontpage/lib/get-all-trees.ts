import {
  type RawTreeProps,
  type TreeProps,
  docsVersions,
} from '@repo/utils';
import { getDocsTreeFromPath } from './get-docs-tree-from-path';
import { getSlug } from './get-slug';
import { type FlatTreeNode, getFlatTree } from './get-flat-tree';

const addSlugToNode = (node: RawTreeProps): TreeProps => {
  const newNode = {
    ...node,
    slug: node.pathSegment ? getSlug(node.pathSegment) : '',
  } as TreeProps;

  if (newNode.children) {
    newNode.children = newNode.children.map(addSlugToNode);
  }

  return newNode;
};

const addCanonicalToNode = (
  node: TreeProps,
  flatTree: FlatTreeNode[],
): TreeProps => {
  // Remove the version from the slug
  const segment = node.slug.slice(1).split('/');
  const isVersion = docsVersions.find((v) => v.inSlug === segment[1]);
  const segmentWithoutVersion = isVersion ? segment.slice(2) : segment.slice(1);
  const slugWithoutVersion = `/docs/${segmentWithoutVersion.join('/')}`;

  // Find the node in the flat tree
  const findInFlatTree = flatTree.find((n) => n.slug === slugWithoutVersion);
  const canonical = findInFlatTree ? findInFlatTree.slug : node.slug;

  // console.log('original          ', node.slug);
  // console.log('without version   ', slugWithoutVersion);
  // console.log('find in flat tree ', findInFlatTree?.slug);
  // console.log('canonical         ', canonical);
  // console.log('-------');

  const newNode = {
    ...node,
    canonical,
  } as TreeProps;

  if (newNode.children) {
    newNode.children = newNode.children.map((n) =>
      addCanonicalToNode(n, flatTree),
    );
  }

  return newNode;
};

export const getAllTrees = () => {
  const rawTree = getDocsTreeFromPath();

  // Remove versions from all trees
  // This is a temporary solution until we have a better way to handle versions.
  // Ideally the versions folder should not be part of the docs.
  const treewithoutVersion = rawTree.map((tree) => {
    const treeChildren = tree.children?.filter(
      (child) => child.name !== 'versions',
    );
    return { ...tree, children: treeChildren };
  });

  const treeWithSlug = treewithoutVersion.map(addSlugToNode);
  const flatTree = getFlatTree({
    tree: treeWithSlug,
    filterDrafts: false,
    filterSecondLevelDirectories: false,
  });
  const treeWithCanonical = treeWithSlug.map((node) =>
    addCanonicalToNode(node, flatTree),
  );

  return treeWithCanonical;
};
