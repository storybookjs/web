/** @type {import('next').NextConfig} */
import { withPlausibleProxy } from 'next-plausible';

const nextConfig = withPlausibleProxy()({
  basePath: '/addons',
  images: {
    unoptimized: true,
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
  async redirects() {
    return [
      {
        source: '/',
        destination: '/addons',
        basePath: false,
        permanent: false,
      },
    ];
  },
});

export default nextConfig;
