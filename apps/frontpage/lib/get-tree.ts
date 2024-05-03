import { TreeProps } from '@repo/utils';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

function getMetadata(filePath: string): any {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const {
    data: { navTitle, title, ...data },
  } = matter(fileContents);
  return {
    title: navTitle || title,
    ...data,
  };
}

export const generateDocsTree = (pathToFiles?: string, docsRoot?: string) => {
  const newPath = pathToFiles || 'content/docs';
  const newDocsRoot = docsRoot || newPath;

  const files = fs.readdirSync(newPath);
  const tree: TreeProps[] = [];

  files.forEach((file) => {
    const filePath = path.join(newPath, file);
    const slug = filePath.replace('content/', '/').replace(/\.mdx?$|\.md$/, '');
    const isDirectory = fs.lstatSync(filePath).isDirectory();

    if (isDirectory) {
      const childItems = generateDocsTree(filePath, newDocsRoot);

      if (childItems) {
        const indexFile = childItems.find(
          (item) => item.name === 'index.mdx' || item.name === 'index.md',
        );
        const children = childItems
          .sort((a, b) =>
            a?.sidebar?.order && b?.sidebar?.order
              ? a.sidebar.order - b.sidebar.order
              : 0,
          )
          .filter((item) => item.name !== 'index.mdx')
          .filter((item) => item.name !== 'index.md');
        const isTab = indexFile?.isTab || false;

        if (indexFile) {
          tree.push({
            ...indexFile,
            name: file,
            slug,
            pathSegment: filePath,
            type: 'directory',
            children: isTab ? [] : children,
          });
        } else {
          tree.push({
            title: 'No title',
            name: file,
            slug,
            pathSegment: filePath,
            type: 'directory',
            children,
          });
        }
      }
    } else if (file.endsWith('.mdx') || file.endsWith('.md')) {
      const metaData = getMetadata(filePath);

      const isTab = metaData.isTab || false;

      tree.push({
        name: file,
        slug: isTab ? slug.replace(/\/index$/, '') : slug,
        pathSegment: filePath,
        type: 'link',
        ...metaData,
      });
    }
  });

  return tree
    .sort((a, b) =>
      a?.sidebar?.order && b?.sidebar?.order
        ? a.sidebar.order - b.sidebar.order
        : 0,
    )
    .filter((item) => {
      // Here we are removing the index page from the tree
      const slug = item.slug.split('/');
      if (slug.length !== 3) return true;
      return slug[2] !== 'index';
    });
};
