import fs from 'node:fs';
import withMDX from '@next/mdx';

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const vercelUrl = process.env.VERCEL_URL || process.env.VERCEL_BRANCH_URL;
export const host = vercelUrl
  ? `https://${vercelUrl}`
  : 'http://localhost:3001';

const RECIPES_FOLDER = './app/recipes';

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
const nextConfig = withMDX()({
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
  async rewrites() {
    return [...recipeForNamespacedPackageRewrites];
  },
});

export default nextConfig;
