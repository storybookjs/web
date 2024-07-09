export default [
  {
    source: '/basics/slow-start-guide',
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
    source: '/basics/:path*',
    destination: '/docs',
    permanent: true,
  },
] as RedirectData[];
