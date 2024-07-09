export default [
  {
    source: '/docs/basics/slow-start-guide',
    destination: '/docs/configure',
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
    destination: 'https://github.com/storybookjs/sandboxes',
    permanent: true,
  },
  {
    source: '/docs/basics/:path*',
    destination: '/docs',
    permanent: true,
  },
] as RedirectData[];
