import fs from 'node:fs';
import createMDX from '@next/mdx';
import { rehypePrettyCode } from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { visit } from 'unist-util-visit';
import firefoxThemeLight from './themes/firefox-theme-vscode.js';
import oneDarkPro from './themes/one-dark-pro.js';

export const rehypePrettyCodeOptions = {
  theme: {
    dark: oneDarkPro,
    light: firefoxThemeLight,
  },
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const RECIPES_FOLDER = new URL('./app/recipes', import.meta.url).pathname;

const withMDX = createMDX({
  /**
   * TODO: I think this file may need to do the same processing as in
   * apps/frontpage/components/docs/mdx/code-snippets/utils/get-metadata.ts
   */
  // See: packages/ui/src/mdx-config/options.ts
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      // Get the raw code from the pre tag
      // This is used to get the raw code for the pre component
      // Solution found here: https://claritydev.net/blog/copy-to-clipboard-button-nextjs-mdx-rehype
      () => (tree) => {
        visit(tree, (node) => {
          if (node.type === 'element' && node.tagName === 'pre') {
            const [codeEl] = node.children;

            if (codeEl.tagName !== 'code') return;

            node.raw = codeEl.children[0].value;
          }
        });
      },
      [rehypePrettyCode, rehypePrettyCodeOptions],
      // After the code is formatted, we need to get the raw code
      // This is used to get the raw code for the pre component
      () => (tree) => {
        visit(tree, 'element', (node) => {
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
  },
})

/**
 * Rewrites for recipes for namespaced packages
 *
 * Next.js doesn't allow special characters in the route directories,
 * so, e.g. `app/recipes/@emotion/styled/page.mdx`, does not compile and we
 * use `app/recipes/emotion/styled/page.mdx` instead. But we still want
 * the `/recipes/@emotion/styled` route to resolve in the browser, so we
 * need to rewrite the URL.
 *
 * We only want to rewrite routes for namespaced packages, which are also
 * the ones with subfolders. For example:
 * - /recipes/emotion/styled/page.mdx - Included
 * - /recipes/tailwindcss/page.mdx - Excluded
 */
const recipeForNamespacedPackageRewrites = fs
  .readdirSync(RECIPES_FOLDER)
  .filter((folder) => {
    const maybeSubFolder = fs.readdirSync(`${RECIPES_FOLDER}/${folder}`);
    return fs
      .statSync(`${RECIPES_FOLDER}/${folder}/${maybeSubFolder}`)
      .isDirectory();
  })
  .map((folder) => ({
    source: `/recipes/@${folder}/:name*`,
    destination: `/recipes/${folder}/:name*`,
  }));

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.gravatar.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: '*.githubusercontent.com',
        port: '',
      },
    ],
  },
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  async redirects() {
    return [
      {
        source: '/recipes',
        destination: '/',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [...recipeForNamespacedPackageRewrites];
  },
};

export default withMDX(nextConfig);
