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
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
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
        source: '/telemetry',
        destination: '/docs/configure/telemetry',
        permanent: true,
      },
      {
        source: '/status',
        destination: 'https://github.com/storybookjs/storybook/issues/23279',
        permanent: false,
      },
      {
        source: '/versions.json',
        destination: '/versions',
        permanent: true,
      },
      {
        source: '/design-system',
        destination: 'https://master--5ccbc373887ca40020446347.chromatic.com',
        permanent: true,
      },
      {
        source: '/migration-guides/7.0',
        destination: 'https://storybook.js.org/docs/7.0/migration-guide',
        permanent: true,
      },
      {
        source: '/migration-guides/8.0',
        destination: 'https://storybook.js.org/docs/8.0/migration-guide',
        permanent: true,
      },
    ];
  },
};
