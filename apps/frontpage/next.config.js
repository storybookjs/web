/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars3.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars2.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars0.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars1.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'images.opencollective.com',
      },
    ],
  },
  // This was added to fix the error with remarkExpressiveCode
  // https://stackoverflow.com/questions/77009138/module-has-no-exports-error-works-fine-on-stackblitz-but-fails-locally
  webpack: (config) => {
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto',
    });
    return config;
  },
  transpilePackages: ['@repo/ui', '@repo/utils'],
  async redirects() {
    return [
      {
        source: '/docs/get-started',
        destination: '/docs',
        permanent: true,
      },
      {
        source: '/basics/quick-start-guide',
        destination: '/docs/get-started',
        permanent: true,
      },
      {
        source: '/basics/slow-start-guide',
        destination: '/docs/configure',
        permanent: true,
      },
      {
        source: '/basics/guide-react',
        destination: '/docs/get-started',
        permanent: true,
      },
      {
        source: '/basics/guide-react-native',
        destination:
          'https://github.com/storybookjs/react-native#storybook-for-react-native',
        permanent: true,
      },
      {
        source: '/basics/guide-vue',
        destination: '/docs/get-started',
        permanent: true,
      },
      {
        source: '/basics/guide-angular',
        destination: '/docs/get-started',
        permanent: true,
      },
      {
        source: '/basics/guide-mithril',
        destination: '/docs/get-started',
        permanent: true,
      },
      {
        source: '/basics/guide-ember',
        destination: '/docs/get-started',
        permanent: true,
      },
      {
        source: '/basics/guide-riot',
        destination: '/docs/get-started',
        permanent: true,
      },
      {
        source: '/basics/guide-html',
        destination: '/docs/get-started',
        permanent: true,
      },
      {
        source: '/docs/basics/quick-start-guide',
        destination: '/docs/get-started',
        permanent: true,
      },
      {
        source: '/docs/basics/slow-start-guide',
        destination: '/docs/configure',
        permanent: true,
      },
      {
        source: '/docs/basics/slow-start-guide',
        destination: '/docs/configure',
        permanent: true,
      },
      {
        source: '/docs/basics/guide-react',
        destination: '/docs/get-started',
        permanent: true,
      },
      {
        source: '/docs/basics/guide-react-native',
        destination:
          'https://github.com/storybookjs/react-native#storybook-for-react-native',
        permanent: true,
      },
      {
        source: '/docs/basics/guide-vue',
        destination: '/docs/get-started',
        permanent: true,
      },
      {
        source: '/docs/basics/guide-angular',
        destination: '/docs/get-started',
        permanent: true,
      },
      {
        source: '/docs/basics/guide-mithril',
        destination: '/docs/get-started',
        permanent: true,
      },
      {
        source: '/docs/basics/guide-ember',
        destination: '/docs/get-started',
        permanent: true,
      },
      {
        source: '/docs/basics/guide-riot',
        destination: '/docs/get-started',
        permanent: true,
      },
      {
        source: '/docs/basics/guide-html',
        destination: '/docs/get-started',
        permanent: true,
      },
    ];
  },
};
