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
    // Add the wild cards at the bottom of the list
    // to avoid conflicts with the more specific redirects
    return [
      {
        source: '/docs/get-started',
        destination: '/docs',
        permanent: true,
      },
      {
        source: '/basics/slow-start-guide',
        destination: '/docs/configure',
        permanent: true,
      },
      {
        source: '/docs/basics/slow-start-guide',
        destination: '/docs/configure',
        permanent: true,
      },
      {
        source: '/basics/guide-react-native',
        destination:
          'https://github.com/storybookjs/react-native#storybook-for-react-native',
        permanent: true,
      },
      {
        source: '/docs/basics/guide-react-native',
        destination:
          'https://github.com/storybookjs/react-native#storybook-for-react-native',
        permanent: true,
      },
      {
        source: '/docs/basics/writing-stories',
        destination: '/docs/get-started/whats-a-story',
        permanent: true,
      },
      {
        source: '/docs/basics/exporting-storybook',
        destination: '/docs/workflows/publish-storybook',
        permanent: true,
      },
      {
        source: '/docs/basics/faq',
        destination: '/docs/workflows/faq',
        permanent: true,
      },
      {
        source: '/docs/basics/live-examples',
        destination:
          'https://github.com/storybookjs/storybook/blob/next/examples/README.md',
        permanent: true,
      },
      {
        source: '/docs/examples',
        destination: '/docs/get-started/examples',
        permanent: true,
      },
      /////////////////////////////////////////////////
      /////////////// 🐺 Wild Cards ///////////////////
      /////////////////////////////////////////////////
      {
        source: '/basics/:path*',
        destination: '/docs',
        permanent: true,
      },
      {
        source: '/docs/basics/:path*',
        destination: '/docs',
        permanent: true,
      },
      {
        source: '/configurations/:path*',
        destination: '/docs/configure',
        permanent: true,
      },
      {
        source: '/examples/:path*',
        destination: '/docs',
        permanent: true,
      },
      {
        source: '/logos/:path*',
        destination: '/docs',
        permanent: true,
      },
      {
        source: '/testing/:path*',
        destination: '/docs',
        permanent: true,
      },
    ];
  },
};
