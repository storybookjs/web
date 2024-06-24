import type { MDXRemoteProps } from 'next-mdx-remote/rsc';
import { rehypePrettyCode } from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { visit } from 'unist-util-visit';
import { firefoxThemeLight } from './themes/firefox-theme-vscode';
import { oneDarkPro } from './themes/one-dark-pro';

export const rehypePrettyCodeOptions = {
  theme: {
    dark: oneDarkPro,
    light: firefoxThemeLight,
  },
};

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

/**
 * TODO: I think this file may need to do the same processing as in
 * apps/frontpage/components/docs/mdx/code-snippets/utils/get-metadata.ts
 */
export const MDXRemoteOptions: MDXRemoteProps['options'] = {
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
          if (node.type === 'element' && node.tagName === 'pre') {
            const [codeEl] = node.children;

            if (codeEl.tagName !== 'code') return;

            node.raw = codeEl.children[0].value;
          }
        });
      },
      [rehypePrettyCode, rehypePrettyCodeOptions] as never,
      // After the code is formatted, we need to get the raw code
      // This is used to get the raw code for the pre component
      () => (tree) => {
        visit(tree, 'element', (node: NodeProps) => {
          if (
            node.type === 'element' &&
            node.tagName === 'figure'
          ) {
            if (
              !('data-rehype-pretty-code-figure' in node.properties)
            ) {
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
};