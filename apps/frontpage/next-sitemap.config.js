/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://storybook.js.org',
  sourceDir: '.next',
  outDir: 'public',
  sitemapBaseFileName: 'sitemap/sitemap',
  exclude: [
    '/docs-urls',
    '/releases', // TODO: Why is this a page instead of a redirect?
    '/releases/iframe/*',
    '/sitemap/*',
    '/icon.svg',
    '/opengraph-image.jpg',
  ],
  transform: async (config, path) => {
    // Filter out the versioned paths
    if (/docs\/\d+\//.test(path)) return null;

    return {
      loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
      // changefreq: config.changefreq,
      // priority: config.priority,
      // lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      // alternateRefs: config.alternateRefs ?? [],
    };
  },
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://storybook.js.org/sitemap/addons/sitemap.xml',
      'https://storybook.js.org/sitemap/blog/sitemap.xml',
      'https://storybook.js.org/sitemap/showcase/sitemap.xml',
      'https://storybook.js.org/sitemap/tutorials/sitemap.xml',
    ],
  },
};
