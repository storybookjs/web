import path from 'node:path';
import fs from 'node:fs';
import type { RawTreeProps } from '@repo/utils';
import matter from 'gray-matter';

interface Metadata {
  title: string;
  [key: string]: unknown;
}

function getMetadata(filePath: string): Metadata {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const {
    data: { navTitle, title, ...data },
  } = matter(fileContents);
  return {
    title: navTitle || title,
    ...data,
  };
}

export const getDocsTreeFromPath = (
  pathToFiles?: string,
  docsRoot?: string,
) => {
  const newPath = pathToFiles ?? 'content/docs';
  const newDocsRoot = docsRoot ?? newPath;

  const files = fs.readdirSync(path.join(process.cwd(), newPath));
  const tree: RawTreeProps[] = [];

  files.forEach((file) => {
    const filePath = path.join(newPath, file);
    const isDirectory = fs.lstatSync(filePath).isDirectory();

    if (isDirectory) {
      const childItems = getDocsTreeFromPath(filePath, newDocsRoot);

      if (childItems) {
        const indexFile = childItems.find(
          (item) => item.name === 'index.mdx' || item.name === 'index.md',
        );
        const children = childItems
          .sort((a, b) =>
            a.sidebar?.order && b.sidebar?.order
              ? a.sidebar.order - b.sidebar.order
              : 0,
          )
          .filter((item) => item.name !== 'index.mdx')
          .filter((item) => item.name !== 'index.md');
        const isTab = indexFile?.isTab ?? false;

        if (indexFile) {
          tree.push({
            ...indexFile,
            name: file,
            pathSegment: filePath,
            type: 'directory',
            children: isTab ? [] : children,
          });
        } else {
          tree.push({
            title: 'No title',
            name: file,
            pathSegment: filePath,
            type: 'directory',
            children,
          });
        }
      }
    } else if (file.endsWith('.mdx') || file.endsWith('.md')) {
      const metaData = getMetadata(filePath);

      tree.push({
        name: file,
        pathSegment: filePath,
        type: 'link',
        ...metaData,
      });
    }
  });

  return tree.sort((a, b) =>
    a.sidebar?.order && b.sidebar?.order
      ? a.sidebar.order - b.sidebar.order
      : 0,
  );
  // TODO: Remove the index page from the tree, probably from pathSegment instead of slug
  // .filter((item) => {
  //   // Here we are removing the index page from the tree
  //   const slug = item.slug.split('/');
  //   if (slug.length !== 3) return true;
  //   return slug[2] !== 'index';
  // });
};
