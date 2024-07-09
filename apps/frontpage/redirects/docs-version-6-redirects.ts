import { RedirectData } from './types';

export const docsVersion6Redirects: RedirectData[] = [
  {
    source: '/docs/6/get-started',
    destination: '/docs/6',
    permanent: true,
  },
  // Version 6.4
  {
    source: '/docs/workflows/testing-with-storybook/',
    destination: '/docs/writing-tests',
    permanent: true,
  },
  {
    source: '/docs/workflows/unit-testing/',
    destination:
      '/docs/writing-tests/import-stories-in-tests/stories-in-unit-tests/',
    permanent: true,
  },
  {
    source: '/docs/workflows/visual-testing/',
    destination: '/docs/writing-tests/visual-testing/',
    permanent: true,
  },
  {
    source: '/docs/workflows/interaction-testing/',
    destination: '/docs/writing-tests/interaction-testing/',
    permanent: true,
  },
  {
    source: '/docs/workflows/snapshot-testing/',
    destination: '/docs/writing-tests/snapshot-testing/snapshot-testing',
    permanent: true,
  },
  {
    source: '/docs/workflows/build-pages-with-storybook/',
    destination: '/docs/writing-stories/build-pages-with-storybook/',
    permanent: true,
  },
  {
    source: '/docs/workflows/stories-for-multiple-components/',
    destination: '/docs/writing-stories/stories-for-multiple-components/',
    permanent: true,
  },
  {
    source: '/docs/workflows/publish-storybook/',
    destination: '/docs/sharing/publish-storybook/',
    permanent: true,
  },
  {
    source: '/docs/workflows/storybook-composition/',
    destination: '/docs/sharing/storybook-composition/',
    permanent: true,
  },
  {
    source: '/docs/workflows/package-composition/',
    destination: '/docs/sharing/package-composition/',
    permanent: true,
  },
  {
    source: '/docs/workflows/faq/',
    destination: '/docs/faq/',
    permanent: true,
  },
  // Version 6.5
  {
    source: '/docs/configure/webpack',
    destination: '/docs/builders/webpack',
    permanent: true,
  },
  { source: '/docs/api/addons', destination: '/docs/addons', permanent: true },
  {
    source: '/docs/api/addons-api',
    destination: '/docs/addons/addons-api',
    permanent: true,
  },
  {
    source: '/docs/api/presets',
    destination: '/docs/addons/writing-presets',
    permanent: true,
  },
  {
    source: '/docs/addons/addon-catalog',
    destination: '/docs/addons/integration-catalog',
    permanent: true,
  },
  {
    source: '/docs/api/mdx',
    destination: '/docs/writing-docs/mdx',
    permanent: true,
  },
  {
    source: '/docs/why-storybook/',
    destination: '/docs/get-started/why-storybook',
    permanent: true,
  },
  {
    source: '/docs/get-started/introduction',
    destination: '/docs/get-started/install',
    permanent: true,
  },
];
