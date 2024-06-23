import withMDX from '@next/mdx';

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const vercelUrl = process.env.VERCEL_URL || process.env.VERCEL_BRANCH_URL;
export const host = vercelUrl
  ? `https://${vercelUrl}`
  : 'http://localhost:3001';

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
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  // Optionally, add any other Next.js config below
});

export default nextConfig;
