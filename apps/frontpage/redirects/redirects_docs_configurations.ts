export default [
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
    source: '/docs/configurations/:path*',
    destination: '/docs/configure',
    permanent: true,
  },
] as RedirectData[];
