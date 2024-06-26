/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/tutorials',
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: 'www.gravatar.com',
  //       port: '',
  //     },
  //     {
  //       protocol: 'https',
  //       hostname: 'github.com',
  //       port: '',
  //     },
  //     {
  //       protocol: 'https',
  //       hostname: '*.githubusercontent.com',
  //       port: '',
  //     },
  //   ],
  // },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/tutorials',
        basePath: false,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
