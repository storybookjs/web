import fs from 'node:fs';
import { rehypePrettyCode } from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeSlug from 'rehype-slug';
import type { DocsVersion } from '@repo/utils';
import { visit } from 'unist-util-visit';
import {
  CodeSnippets,
  Callout,
  YouTubeCallout,
  FeatureSnippets,
  HomeConcepts,
  HomeResources,
  HomeRenderers,
  Video,
  Pre,
  List,
  Img,
  If,
  UnorderedList,
  Hr,
  P,
  A,
  H4,
  H3,
  H2,
  H1,
  Table,
  Th,
  Tr,
  Td,
  OrderedList,
} from '../components/docs/mdx';
import { generateDocsTree } from './get-tree';
import { rehypePrettyCodeOptions } from './rehype-pretty-code-options';

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

  interface NodeProps {
    type?: string;
    tagName?: string;
    properties: string[];
    raw: string;
    children: {
      properties: {
        raw: string;
      };
      tagName: string;
      raw: string;
      children: {
        value: string;
      }[];
    }[];
  }

  const { content, frontmatter } = await compileMDX<{
    title?: string;
    hideRendererSelector?: boolean;
  }>({
    source: file,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          // Get the raw code from the pre tag
          // This is used to get the raw code for the pre component
          // Solution found here: https://claritydev.net/blog/copy-to-clipboard-button-nextjs-mdx-rehype
          () => (tree) => {
            visit(tree, (node: NodeProps) => {
              if (node?.type === 'element' && node?.tagName === 'pre') {
                const [codeEl] = node.children;

                if (codeEl.tagName !== 'code') return;

                node.raw = codeEl.children?.[0].value;
              }
            });
          },
          [rehypePrettyCode, rehypePrettyCodeOptions] as never,
          // After the code is formatted, we need to get the raw code
          // This is used to get the raw code for the pre component
          () => (tree) => {
            visit(tree, 'element', (node: NodeProps) => {
              if (node?.type === 'element' && node?.tagName === 'figure') {
                if (!('data-rehype-pretty-code-figure' in node.properties)) {
                  return;
                }

                for (const child of node.children) {
                  if (child.tagName === 'pre') {
                    child.properties.raw = node.raw;
                  }
                }
              }
            });
          },
        ],
        format: 'mdx',
      },
    },
    components: {
      h1: H1,
      h2: H2,
      h3: H3,
      h4: H4,
      a: A,
      p: P,
      hr: Hr,
      ul: UnorderedList,
      ol: OrderedList,
      li: List,
      pre: Pre,
      table: Table,
      th: Th,
      tr: Tr,
      td: Td,
      img: (props) => <Img activeVersion={activeVersion.id} {...props} />,
      Video: (props) => <Video activeVersion={activeVersion.id} {...props} />,
      CodeSnippets: (props) => (
        <CodeSnippets activeVersion={activeVersion} {...props} />
      ),
      Callout,
      If,
      IfRenderer: If,
      YouTubeCallout,
      FeatureSnippets,
      HomeRenderers,
      HomeConcepts,
      HomeResources,
    },
  });

  // Get Tabs
  const pathToFiles = isLink
    ? `${rootPath}/${pathString}`.split('/').slice(0, -1).join('/')
    : `${rootPath}/${pathString}`;

  const parent = generateDocsTree(pathToFiles);

  const sorted = parent.sort((a, b) =>
    a.tab?.order && b.tab?.order ? a.tab.order - b.tab.order : 0,
  );

  const index = sorted.find((item) => item.name === 'index.mdx');

  return {
    ...frontmatter,
    tabs: index?.isTab ? parent : [],
    content,
  };
};
