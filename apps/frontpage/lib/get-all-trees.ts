import {
  RawTreeProps,
  TreeProps,
  latestVersion,
  docsVersions,
} from '@repo/utils';
import { getDocsTreeFromPath } from './get-docs-tree-from-path';
import { FlatTreeNode, getFlatTree } from './get-flat-tree';

const getSlug = (pathSegment: string) => {
  // We first split the pathSegment into an array
  const splitSegment = pathSegment.split('/');

  // If the first segment is 'content', we remove it
  if (splitSegment[0] === 'content') splitSegment.shift();

  // If the first segment is 'docs', we check if the second segment is a version
  if (splitSegment[0] === 'docs') {
    // If this is the latest version, remove it from the URL
    if (latestVersion.id === splitSegment[1]) {
      splitSegment.splice(1, 1);
    } else {
      // If this is not the latest version, replace it with the inSlug
      const version = docsVersions.find((v) => v.id === splitSegment[1]);
      if (version?.inSlug) {
        splitSegment[1] = version.inSlug;
      }
    }
  }

  return `/${splitSegment
    .join('/')
    .replace(/\.mdx?$|\.md$/, '')
    .replace(/\/index$/, '')}`;
};

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
    newNode.children = newNode.children.map((node) =>
      addCanonicalToNode(node, flatTree),
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
