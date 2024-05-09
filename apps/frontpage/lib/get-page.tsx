import fs from 'fs';
import { generateDocsTree } from './get-tree';
import { firefoxThemeLight } from '../components/docs/mdx/code-snippets/themes/firefox-theme-vscode';
import rehypePrettyCode from 'rehype-pretty-code';
import { compileMDX } from 'next-mdx-remote/rsc';
import * as MDX from '../components/docs/mdx';
import rehypeSlug from 'rehype-slug';
import { DocsVersion } from '@repo/utils';
import { extractHeadings } from 'extract-md-headings';

const rehypePrettyCodeOptions = {
  theme: firefoxThemeLight,
};

export const getPageData = async (
  path: string[],
  activeVersion: DocsVersion,
) => {
  const rootPath = 'content/docs';
  const pathString = path.join('/');
  const indexPathMDX = `content/docs/${pathString}/index.mdx`;
  const indexPathMD = `content/docs/${pathString}/index.md`;
  const linkPath =
    `${rootPath}/${pathString}.mdx` || `${rootPath}/${pathString}.md`;

  const isIndexMDX = fs.existsSync(indexPathMDX);
  const isIndexMD = fs.existsSync(indexPathMD);
  const isLink = fs.existsSync(linkPath);

  let newPath = null;
  if (isIndexMDX) newPath = indexPathMDX;
  if (isIndexMD) newPath = indexPathMD;
  if (isLink) newPath = linkPath;

  if (!newPath) return undefined;

  const file = await fs.promises.readFile(
    process.cwd() + `/${newPath}`,
    'utf8',
  );

  const { content, frontmatter } = await compileMDX<{ title: string }>({
    source: file,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [],
        rehypePlugins: [
          rehypeSlug,
          [rehypePrettyCode, rehypePrettyCodeOptions] as any,
        ],
        format: 'mdx',
      },
    },
    components: {
      h1: MDX.H1,
      h2: MDX.H2,
      h3: MDX.H3,
      h4: MDX.H4,
      a: MDX.A,
      p: MDX.P,
      hr: MDX.Hr,
      ul: MDX.UnorderedList,
      li: MDX.List,
      pre: MDX.Pre,
      details: () => <details>Hello world</details>,
      img: (props) => <MDX.Img activeVersion={activeVersion.id} {...props} />,
      Video: (props) => (
        <MDX.Video activeVersion={activeVersion.id} {...props} />
      ),
      CodeSnippets: (props) => (
        <MDX.CodeSnippets activeVersion={activeVersion.id} {...props} />
      ),
      Callout: MDX.Callout,
      If: MDX.If,
      IfRenderer: MDX.If,
      YouTubeCallout: MDX.YouTubeCallout,
      FeatureSnippets: MDX.FeatureSnippets,
      // TODO: These three should be imported in the necessary MDX file(s)
      HomeRenderers: MDX.HomeRenderers,
      HomeConcepts: MDX.HomeConcepts,
      HomeResources: MDX.HomeResources,
    },
  });

  const headings = extractHeadings(process.cwd() + `/${newPath}`);

  // Get Tabs
  let pathToFiles = isLink
    ? `${rootPath}/${pathString}`.split('/').slice(0, -1).join('/')
    : `${rootPath}/${pathString}`;

  const parent = generateDocsTree(pathToFiles);

  const sorted = parent?.sort((a, b) =>
    a?.tab?.order && b?.tab?.order ? a.tab.order - b.tab.order : 0,
  );

  const index = sorted?.find((item) => item.name === 'index.mdx');

  return {
    ...frontmatter,
    tabs: index?.isTab ? parent : [],
    content,
    headings,
  };
};
