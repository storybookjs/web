import fs from 'node:fs';
import { compileMDX } from 'next-mdx-remote/rsc';
import type { DocsVersion } from '@repo/utils';
import { mdxComponents, MDXRemoteOptions } from '@repo/ui';
import {
  A,
  CodeSnippets,
  FeatureSnippets,
  HomeConcepts,
  HomeRenderers,
  HomeResources,
  If,
  Img,
  Video,
  YouTubeCallout,
} from '../components/docs/mdx';
import { getDocsTreeFromPath } from './get-docs-tree-from-path';

export const getPageData = async (
  path: string[],
  activeVersion: DocsVersion,
) => {
  const rootPath = 'content/docs';
  const pathString = path.join('/');
  const indexPathMDX = `content/docs/${pathString}/index.mdx`;
  const indexPathMD = `content/docs/${pathString}/index.md`;

  const mdxPath = `${rootPath}/${pathString}.mdx`;
  const mdPath = `${rootPath}/${pathString}.md`;

  const isMdx = fs.existsSync(mdxPath);
  const isMd = fs.existsSync(mdPath);

  let linkPath = null;
  if (isMdx) linkPath = mdxPath;
  if (isMd) linkPath = mdPath;

  const isIndexMDX = fs.existsSync(indexPathMDX);
  const isIndexMD = fs.existsSync(indexPathMD);
  const isLink = linkPath ? fs.existsSync(linkPath) : false;

  let newPath = null;
  if (isIndexMDX) newPath = indexPathMDX;
  if (isIndexMD) newPath = indexPathMD;
  if (isLink) newPath = linkPath;

  if (!newPath) return undefined;

  const file = await fs.promises.readFile(
    `${process.cwd()}/${newPath}`,
    'utf8',
  );

  /**
   * TODO: Refactor this to use the MDXRemote component
   *       Because then we can import MDXContent from @repo/ui
   */
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
          indexPagePath={isIndexMDX || isIndexMD ? path : null}
          {...props}
        />
      ),
      img: (props) => <Img activeVersion={activeVersion.id} {...props} />,
      Video: (props) => <Video activeVersion={activeVersion.id} {...props} />,
      CodeSnippets: (props) => (
        <CodeSnippets activeVersion={activeVersion} {...props} />
      ),
      FeatureSnippets,
      FrameworkSupportTable: (props) => <div {...props}>{props.children}</div>,
      HomeConcepts,
      HomeRenderers,
      HomeResources,
      If,
      IfRenderer: If,
      YouTubeCallout,
    },
  });

  // Get Tabs
  const pathToFiles = isLink
    ? `${rootPath}/${pathString}`.split('/').slice(0, -1).join('/')
    : `${rootPath}/${pathString}`;

  const parent = getDocsTreeFromPath(pathToFiles);

  const sorted = parent.sort((a, b) =>
    a.tab?.order && b.tab?.order ? a.tab.order - b.tab.order : 0,
  );

  const index = sorted.find((item) => item.name === 'index.mdx');

  return {
    ...frontmatter,
    isIndexPage: isIndexMDX || isIndexMD,
    tabs: index?.isTab ? parent : [],
    content,
  };
};
