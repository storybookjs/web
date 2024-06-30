/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://storybook.js.org/tutorials',
  sourceDir: '.next',
  outDir: 'public',
  sitemapBaseFileName: 'sitemap',
  generateIndexSitemap: false,
  exclude: [
    '/icon.svg',
    '/opengraph-image.jpg',
  ],
};
