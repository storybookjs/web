import { RawTreeProps, TreeProps } from '@repo/utils';
import { getDocsTreeFromPath } from './get-docs-tree-from-path';

const getSlug = (pathSegment: string) => {
  const slug = pathSegment
    .replace('content/', '/')
    .replace(/\.mdx?$|\.md$/, '')
    .replace(/\/index$/, '');

  return slug;
};

const addSlugToNode = (node: RawTreeProps): TreeProps => {
  const newNode: TreeProps = {
    ...node,
    slug: node.pathSegment ? getSlug(node.pathSegment) : '',
  };

  if (newNode.children) {
    newNode.children = newNode.children.map(addSlugToNode);
  }

  return newNode;
};

export const getAllTrees = () => {
  const rawTree = getDocsTreeFromPath();
  const transformedTree = rawTree.map(addSlugToNode);

  return transformedTree;
};
