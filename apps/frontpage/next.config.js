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
      /////// Older (prev 5.0 doc URLs) /////////////
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
      ///////// Pre 6.0 URLs ///////////////////////
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
      {
        source: '/docs/guides/slow-start-guide',
        destination: '/docs/configure',
        permanent: true,
      },
      {
        source: '/docs/guides/guide-react-native',
        destination:
          'https://github.com/storybookjs/react-native#storybook-for-react-native',
        permanent: true,
      },
      {
        source: '/docs/configurations/overview',
        destination: '/docs/configure',
        permanent: true,
      },
      {
        source: '/docs/configurations/options-parameter',
        destination: '/docs/configure/features-and-behavior',
        permanent: true,
      },
      {
        source: '/docs/configurations/default-config',
        destination: '/docs/configure',
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
        destination: '/docs/api/mdx',
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
        source: '/docs/addons/writing-addons',
        destination: '/docs/addons/writing-addons',
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
        destination: '/docs/api/presets',
        permanent: true,
      },
      {
        source: '/docs/presets/preset-gallery',
        destination: 'https://github.com/storybookjs/presets',
        permanent: true,
      },
      {
        source: '/docs/presets/writing-presets',
        destination: '/docs/api/writing-presets',
        permanent: true,
      },
      ////// Other ////////////////////////////////////
      {
        source: '/telemetry',
        destination: '/docs/configure/telemetry',
        permanent: true,
      },
      ////// Renderers ////////////////////////////////
      {
        source: '/docs/react/get-started/examples',
        destination: '/showcase',
        permanent: true,
      },
      {
        source: '/docs/vue/get-started/examples',
        destination: '/showcase',
        permanent: true,
      },
      {
        source: '/docs/angular/get-started/examples',
        destination: '/showcase',
        permanent: true,
      },
      {
        source: '/docs/web-components/get-started/examples',
        destination: '/showcase',
        permanent: true,
      },
      {
        source: '/docs/ember/get-started/examples',
        destination: '/showcase',
        permanent: true,
      },
      {
        source: '/docs/html/get-started/examples',
        destination: '/showcase',
        permanent: true,
      },
      {
        source: '/docs/mithril/get-started/examples',
        destination: '/showcase',
        permanent: true,
      },
      {
        source: '/docs/marko/get-started/examples',
        destination: '/showcase',
        permanent: true,
      },
      {
        source: '/docs/svelte/get-started/examples',
        destination: '/showcase',
        permanent: true,
      },
      {
        source: '/docs/riot/get-started/examples',
        destination: '/showcase',
        permanent: true,
      },
      {
        source: '/docs/preact/get-started/examples',
        destination: '/showcase',
        permanent: true,
      },
      {
        source: '/docs/rax/get-started/examples',
        destination: '/showcase',
        permanent: true,
      },
      ////// Addons ///////////////////////////////////
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
      {
        source: '/docs/guides/:path*',
        destination: '/docs',
        permanent: true,
      },
    ];
  },
};
