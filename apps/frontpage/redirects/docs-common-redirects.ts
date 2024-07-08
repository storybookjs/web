import { RedirectData } from './types';

export const docsCommonRedirects: RedirectData[] = [
  {
    source: '/versions.json',
    destination: '/versions',
    permanent: true,
  },
  {
    source: '/docs/get-started',
    destination: '/docs',
    permanent: true,
  },
  {
    source: '/addons/addon-gallery',
    destination: '/addons',
    permanent: true,
  },
  {
    source: '/integrations',
    destination: '/addons',
    permanent: true,
  },
  {
    source: '/integrations/tag/:path',
    destination: '/addons/tag/:path',
    permanent: true,
  },
  {
    source: '/recipes',
    destination: '/addons',
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
    source: '/design-system',
    destination: 'https://master--5ccbc373887ca40020446347.chromatic.com',
    permanent: true,
  },
  {
    source: '/migration-guides/7.0',
    destination: '/docs/7/migration-guide',
    permanent: true,
  },
  // TODO: Make sure this one works after 9.0
  {
    source: '/migration-guides/8.0',
    destination: '/docs/migration-guide',
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
  // TODO: Fix - This is a 404
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
