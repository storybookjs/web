/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://storybook.js.org',
  generateIndexSitemap: false,
  sourceDir: 'apps/frontpage/.next',
  outDir: 'apps/frontpage/public/sitemap',
  sitemapBaseFileName: 'sitemap',
  exclude: [
    '/docs/*', // Handled by /sitemap/docs/sitemap.ts
    '/docs-urls',
    '/releases', // TODO: Why is this a page instead of a redirect?
    '/releases/iframe/*',
    '/sitemap/*',
    '/icon.svg',
    '/opengraph-image.jpg',
  ],
  transform: async (config, path) => {
    return {
      loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
      // changefreq: config.changefreq,
      // priority: config.priority,
      // lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      // alternateRefs: config.alternateRefs ?? [],
    };
  },
};
