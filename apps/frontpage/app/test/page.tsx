import { docsVersions } from '@repo/utils';
import { getAllTrees } from '../../lib/get-all-trees';
import {
  FlatTreeNode,
  getFlatTreeSitemap,
} from '../../lib/get-flat-tree-sitemap';

export default function Page() {
  const listofTrees = getAllTrees();

  const flatTree: FlatTreeNode[] = [];
  listofTrees.forEach((list) => {
    const newTree = list.children ? getFlatTreeSitemap(list.children) : [];
    const treeWithVersion = newTree.map((node) => {
      node.version = docsVersions.find((version) => version.id === list.name);
      return node;
    });

    flatTree.push(...treeWithVersion);
  });

  const listOfSlugs: { slug: string[] }[] = flatTree.map((node) => ({
    slug: node.slug.replace('/docs/', '').split('/'),
  }));

  console.log(listOfSlugs);
  return <pre>{JSON.stringify(listOfSlugs, null, 2)}</pre>;
}
