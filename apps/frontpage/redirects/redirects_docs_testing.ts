export default [
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
    source: '/docs/testing/:path*',
    destination: '/docs/writing-tests',
    permanent: true,
  },
] as RedirectData[];
