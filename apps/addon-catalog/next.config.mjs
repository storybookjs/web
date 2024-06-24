const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

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
  async redirects() {
    return [
      {
        source: '/recipes',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
