const generatedRedirects = require('./generated-redirects.json');

const historicalVersions = [
  '8.1',
  '8.0',
  '7.6',
  '7.5',
  '7.4',
  '7.3',
  '7.2',
  '7.1',
  '7.0',
  '6.5',
  '6.4',
  '6.3',
  '6.2',
  '6.1',
  '6.0',
];

const renderers = [
  'react',
  'vue',
  'angular',
  'web-components',
  'ember',
  'html',
  'mithril',
  'marko',
  'svelte',
  'riot',
  'preact',
  'rax',
];

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
};
