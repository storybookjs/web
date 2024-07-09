export default [
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
] as RedirectData[];
