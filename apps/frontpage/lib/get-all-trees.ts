import {
  RawTreeProps,
  TreeProps,
  latestVersion,
  docsVersions,
} from '@repo/utils';
import { getDocsTreeFromPath } from './get-docs-tree-from-path';

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

export const getAllTrees = () => {
  const rawTree = getDocsTreeFromPath();
  const transformedTree = rawTree.map(addSlugToNode);

  return transformedTree;
};
