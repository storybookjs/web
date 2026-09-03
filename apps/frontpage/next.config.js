const { withPlausibleProxy } = require('next-plausible');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

// TODO: Remove duplication with those in docs-versions.tsx
const HISTORICAL_VERSIONS = [
  '10.2',
  '10.1',
  '10.0',
  '9.1',
  '9.0',
  '8.6',
  '8.5',
  '8.4',
  '8.3',
  '8.2',
  '8.1',
  '8.0',
  '7.6',
  '7.5',
  '7.4',
  '7.3',
  '7.2',
  '7.1',
  '7.0',
  '6.5',
  '6.4',
  '6.3',
  '6.2',
  '6.1',
  '6.0',
];

/** @type {import('next').NextConfig} */
module.exports = withBundleAnalyzer(
  withPlausibleProxy()({
    images: {
      unoptimized: true,
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
        {
          protocol: 'https',
          hostname: 'cdn.sanity.io',
        },
        {
          protocol: 'https',
          hostname: '*.gravatar.com',
        },
        {
          protocol: 'https',
          hostname: 'raw.githubusercontent.com',
        },
      ],
    },
    async headers() {
      return HISTORICAL_VERSIONS.map((v) => ({
        source: `/docs/${v}/:path*`,
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex',
          },
        ],
      }));
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
    experimental: {
      /**
       * This ensures that we can read files from these directories when deployed
       * https://vercel.com/guides/how-can-i-use-files-in-serverless-functions#using-next.js
       */
      outputFileTracingIncludes: {
        '/docs/**': ['./content/docs/**'],
        '/versions': ['./generated-versions.json'],
        '/md-api/**': ['./content/docs/**', './content/snippets/**'],
      },
    },
    skipTrailingSlashRedirect: true,
    async rewrites() {
      return [
        // The blog (storybook.js.org/blog, hosted separately on Netlify) loads
        // Plausible from the root-relative path /js/script.js, so the request
        // is served by this app's proxy rather than by Netlify. Serve the
        // tagged-events build under that name so tagged link clicks in blog
        // posts are tracked. The generic filename is deliberate: the real one
        // (script.tagged-events.js) is on ad-blocker lists such as EasyPrivacy.
        // This must stay ahead of next-plausible's own /js/script.js rewrite;
        // withPlausibleProxy appends its rules after these, and Next.js uses
        // the first matching rewrite.
        {
          source: '/js/script.js',
          destination: 'https://plausible.io/js/script.tagged-events.js',
        },
        {
          source: '/ingest/static/:path*',
          destination: 'https://us-assets.i.posthog.com/static/:path*',
        },
        {
          source: '/ingest/:path*',
          destination: 'https://us.i.posthog.com/:path*',
        },
      ];
    },
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  }),
);