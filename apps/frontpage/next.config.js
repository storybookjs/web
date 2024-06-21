const generatedRedirects = require('./generated-redirects.json');
const { withPlausibleProxy } = require('next-plausible');

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
module.exports = withPlausibleProxy()({
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
  experimental: {
    outputFileTracingIncludes: {
      '/docs/**': ['./content/docs/**'],
    },
  },
  async redirects() {
    // Add the wild cards at the bottom of the list
    // to avoid conflicts with the more specific redirects
    return [
      // TODO: Are we adding /docs/index.mdx to all versions?
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
      /* Supporting old docs URLs */
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
        source: '/docs/guides/slow-start-guide',
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
        source: '/docs/guides/guide-react-native',
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
        destination: '/docs/sharing/publish-storybook',
        permanent: true,
      },
      {
        source: '/docs/basics/faq',
        destination: '/docs/faq',
        permanent: true,
      },
      {
        source: '/docs/basics/live-examples',
        destination:
          'https://github.com/storybookjs/storybook/blob/next/examples/README.md',
        permanent: true,
      },
      {
        source: '/docs/configurations/options-parameter',
        destination: '/docs/configure/features-and-behavior',
        permanent: true,
      },
      {
        source: '/docs/configurations/custom-webpack-config',
        destination: '/docs/builders/webpack',
        permanent: true,
      },
      {
        source: '/docs/configurations/custom-babel-config',
        destination: '/docs/configure/compilers',
        permanent: true,
      },
      {
        source: '/docs/configurations/typescript-config',
        destination: '/docs/configure/typescript',
        permanent: true,
      },
      {
        source: '/docs/configurations/add-custom-head-tags',
        destination: '/docs/configure/story-rendering#adding-to-head',
        permanent: true,
      },
      {
        source: '/docs/configurations/add-custom-body',
        destination: '/docs/configure/story-rendering#adding-to-body',
        permanent: true,
      },
      {
        source: '/docs/configurations/serving-static-files',
        destination:
          '/docs/configure/images-and-assets#serving-static-files-via-storybook',
        permanent: true,
      },
      {
        source: '/docs/configurations/env-vars',
        destination: '/docs/configure/environment-variables',
        permanent: true,
      },
      {
        source: '/docs/configurations/theming',
        destination: '/docs/configure/theming',
        permanent: true,
      },
      {
        source: '/docs/configurations/cli-options',
        destination: '/docs/api/cli-options',
        permanent: true,
      },
      {
        source: '/docs/configurations/standalone-options',
        destination:
          'https://github.com/storybookjs/storybook/blob/next/lib/core/docs/standalone.md',
        permanent: true,
      },
      {
        source: '/docs/formats/component-story-format',
        destination: '/docs/api/csf',
        permanent: true,
      },
      {
        source: '/docs/formats/storiesof-api',
        destination:
          'https://github.com/storybookjs/storybook/blob/next/lib/core/docs/storiesOf.md',
        permanent: true,
      },
      {
        source: '/docs/formats/mdx-syntax',
        destination: '/docs/writing-docs/mdx',
        permanent: true,
      },
      {
        source: '/docs/testing/react-ui-testing',
        destination: '/docs/writing-tests',
        permanent: true,
      },
      {
        source: '/docs/testing/structural-testing',
        destination: '/docs/writing-tests/snapshot-testing',
        permanent: true,
      },
      {
        source: '/docs/testing/interaction-testing',
        destination: '/docs/writing-tests/interaction-testing',
        permanent: true,
      },
      {
        source: '/docs/testing/automated-visual-testing',
        destination: '/docs/writing-tests/visual-testing',
        permanent: true,
      },
      {
        source: '/docs/testing/manual-testing',
        destination: '/docs/writing-tests',
        permanent: true,
      },
      {
        source: '/docs/addons/using-addons',
        destination: '/docs/addons/install-addons',
        permanent: true,
      },
      {
        source: '/addons/writing-addons',
        destination: '/docs/addons/writing-addons',
        permanent: true,
      },
      {
        source: '/docs/addons/api',
        destination: '/docs/addons/addons-api',
        permanent: true,
      },
      {
        source: '/docs/presets/introduction',
        destination: '/docs/addons/writing-presets',
        permanent: true,
      },
      {
        source: '/docs/presets/preset-gallery',
        destination: 'https://github.com/storybookjs/presets',
        permanent: true,
      },
      {
        source: '/docs/presets/writing-presets',
        destination: '/docs/addons/writing-presets',
        permanent: true,
      },
      /* Addons */
      {
        source: '/addons/addon-gallery',
        destination: '/integrations',
        permanent: true,
      },
      {
        source: '/addons',
        destination: '/integrations',
        permanent: true,
      },
      {
        source: '/recipes',
        destination: '/integrations',
        permanent: true,
      },
      {
        source: '/addons/tags/:tag',
        destination: '/integrations/tag/:tag',
        permanent: true,
      },
      ...renderers.map((r) => ({
        source: `/docs${r}/get-started/examples`,
        destination: '/showcase',
        permanent: true,
      })),
      ...historicalVersions.map((v) => ({
        source: `/docs/${v}`,
        destination: `/docs/${v.split('.')[0]}/get-started/install`,
        permanent: true,
      })),
      // The `/get-started` route is only valid for 8.0+
      ...historicalVersions.reduce((acc, v) => {
        if (Number(v) < 8) {
          renderers.forEach((r) => {
            acc.push({
              source: `/docs/${v}/${r}/get-started`,
              destination: `/docs/${v.split('.')[0]}/get-started/install`,
              permanent: true,
            });
          });
        }
        return acc;
      }, []),
      ...generatedRedirects,
      /* 🐺 Wild Cards */
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
        source: '/docs/configurations/:path*',
        destination: '/docs/configure',
        permanent: true,
      },
      {
        source: '/examples/:path*',
        destination: '/docs',
        permanent: true,
      },
      {
        source: '/docs/examples/:path*',
        destination: '/docs',
        permanent: true,
      },
      {
        source: '/logos/:path*',
        destination: '/docs',
        permanent: true,
      },
      {
        source: '/docs/logos/:path*',
        destination: '/docs',
        permanent: true,
      },
      {
        source: '/testing/:path*',
        destination: '/docs',
        permanent: true,
      },
      {
        source: '/docs/testing/:path*',
        destination: '/docs/writing-tests',
        permanent: true,
      },
      {
        source: '/docs/guides/:path*',
        destination: '/docs',
        permanent: true,
      },
    ];
  },
});
