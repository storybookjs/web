export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const vercelUrl = process.env.VERCEL_URL || process.env.VERCEL_BRANCH_URL
export const host = vercelUrl ? `https://${vercelUrl}` : 'http://localhost:3001';

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
};

export default nextConfig;
