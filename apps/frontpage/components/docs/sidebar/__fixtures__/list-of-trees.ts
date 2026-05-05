import type { TreeProps } from '@repo/utils';

const make = (
  partial: Partial<TreeProps> & Pick<TreeProps, 'name' | 'pathSegment' | 'title' | 'slug'>,
): TreeProps =>
  ({
    type: 'directory',
    canonical: partial.slug,
    ...partial,
  }) as TreeProps;

export const listOfTreesFixture: TreeProps[] = [
  make({
    name: '10.3',
    pathSegment: 'docs/10.3',
    title: 'Storybook Docs',
    slug: '/docs',
    children: [
      make({
        name: 'get-started',
        pathSegment: 'get-started',
        title: 'Get started',
        slug: '/docs/get-started',
        children: [
          make({
            name: 'install.mdx',
            pathSegment: 'install',
            title: 'Install',
            slug: '/docs/get-started/install',
            type: 'link',
          }),
          make({
            name: 'setup.mdx',
            pathSegment: 'setup',
            title: 'Setup',
            slug: '/docs/get-started/setup',
            type: 'link',
          }),
        ],
      }),
      make({
        name: 'writing-stories',
        pathSegment: 'writing-stories',
        title: 'Writing stories',
        slug: '/docs/writing-stories',
        children: [
          make({
            name: 'index.mdx',
            pathSegment: 'index',
            title: 'Introduction',
            slug: '/docs/writing-stories',
            type: 'link',
          }),
          make({
            name: 'args.mdx',
            pathSegment: 'args',
            title: 'Args',
            slug: '/docs/writing-stories/args',
            type: 'link',
          }),
          make({
            name: 'play-function.mdx',
            pathSegment: 'play-function',
            title: 'Play function',
            slug: '/docs/writing-stories/play-function',
            type: 'link',
          }),
        ],
      }),
      make({
        name: 'configure',
        pathSegment: 'configure',
        title: 'Configure',
        slug: '/docs/configure',
        children: [
          make({
            name: 'index.mdx',
            pathSegment: 'index',
            title: 'Overview',
            slug: '/docs/configure',
            type: 'link',
          }),
          make({
            name: 'integration',
            pathSegment: 'integration',
            title: 'Integration',
            slug: '/docs/configure/integration',
            children: [
              make({
                name: 'frameworks.mdx',
                pathSegment: 'frameworks',
                title: 'Frameworks',
                slug: '/docs/configure/integration/frameworks',
                type: 'link',
              }),
              make({
                name: 'webpack.mdx',
                pathSegment: 'webpack',
                title: 'Webpack',
                slug: '/docs/configure/integration/webpack',
                type: 'link',
              }),
            ],
          }),
        ],
      }),
    ],
  }),
];
