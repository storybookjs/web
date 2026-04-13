/** @type {import('next').NextConfig} */
import { withPlausibleProxy } from 'next-plausible';

const nextConfig = withPlausibleProxy({
  src: 'https://plausible.io/js/pa-anM74fP8S5w3vipeaMMrx.js',
})({
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
  // more robust static generation with retries and concurrency control
  experimental: {
    staticGenerationRetryCount: 1,
    staticGenerationMaxConcurrency: 50,
  },
});

export default nextConfig;
