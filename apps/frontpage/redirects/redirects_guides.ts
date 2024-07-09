export default [
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
    source: '/docs/guides/:path*',
    destination: '/docs',
    permanent: true,
  },
] as RedirectData[];
