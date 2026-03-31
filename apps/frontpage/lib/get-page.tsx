import fs from 'node:fs';
import nodePath from 'node:path';
import { compileMDX } from 'next-mdx-remote/rsc';
import type { DocsVersion, RawTreeProps } from '@repo/utils';
import { mdxComponents, MDXRemoteOptions } from '@repo/ui';
import type { ReactNode, ReactElement } from 'react';
import {
  A,
  CodeSnippets,
  CommunityRenderers,
  FeatureSnippets,
  GetStartedVersions,
  HomeConcepts,
  HomeRenderers,
  HomeResources,
  If,
  Img,
  Video,
  YouTubeCallout,
} from '../components/docs/mdx';
import { getDocsTreeFromPath } from './get-docs-tree-from-path';

export interface PageDataProps {
  title?: string;
  hideRendererSelector?: boolean;
  isIndexPage: boolean;
  isHeading: boolean;
  isTab?: boolean;
  tabs: RawTreeProps[];
  content: ReactElement;
  path: string;
}

export function findDocFile(docPath: string): {
  filePath: string;
  isIndexPage: boolean;
} | null {
  const basePath = `content/docs/${docPath}`;
  const candidates = [
    { path: `${basePath}.mdx`, isIndex: false },
    { path: `${basePath}.md`, isIndex: false },
    { path: `${basePath}/index.mdx`, isIndex: true },
    { path: `${basePath}/index.md`, isIndex: true },
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(nodePath.join(process.cwd(), candidate.path))) {
      return { filePath: candidate.path, isIndexPage: candidate.isIndex };
    }
  }
  return null;
}

export const getPageData = async (
  path: string[],
  activeVersion: DocsVersion,
) => {
  const rootPath = 'content/docs';
  const pathString = path.join('/');

  const result = findDocFile(pathString);
  if (!result) return undefined;

  const { filePath: newPath, isIndexPage } = result;

  const file = await fs.promises.readFile(
    `${process.cwd()}/${newPath}`,
    'utf8',
  );

  const { content, frontmatter } = await compileMDX<{
    title?: string;
    hideRendererSelector?: boolean;
  }>({
    source: file,
    options: MDXRemoteOptions,
    components: {
      ...mdxComponents,
      a: (props) => (
        <A
          activeVersion={activeVersion}
          isIndexPage={isIndexPage}
          pagePath={path}
          {...props}
        />
      ),
      img: (props) => <Img activeVersion={activeVersion.id} {...props} />,
      Video: (props) => <Video activeVersion={activeVersion.id} {...props} />,
      CodeSnippets: (props) => (
        <CodeSnippets activeVersion={activeVersion} {...props} />
      ),
      CommunityRenderers,
      FeatureSnippets,
      FrameworkSupportTable: (props: { children: ReactNode }) => (
        <div {...props}>{props.children}</div>
      ),
      GetStartedVersions,
      HomeConcepts,
      HomeRenderers: () => <HomeRenderers activeVersion={activeVersion} />,
      HomeResources,
      If,
      IfRenderer: If,
      YouTubeCallout,
    },
  });

  // Get Tabs
  const pathToFiles = !isIndexPage
    ? `${rootPath}/${pathString}`.split('/').slice(0, -1).join('/')
    : `${rootPath}/${pathString}`;

  const children = getDocsTreeFromPath(pathToFiles);

  const sorted = children.sort((a, b) =>
    a.tab?.order && b.tab?.order ? a.tab.order - b.tab.order : 0,
  );

  const index = sorted.find((item) => item.name === 'index.mdx');

  return {
    ...frontmatter,
    isIndexPage,
    isHeading: isIndexPage && path.length < 3,
    path: newPath,
    tabs: index?.isTab ? children : [],
    content,
  };
};
