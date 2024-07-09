export default [
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
] as RedirectData[];
