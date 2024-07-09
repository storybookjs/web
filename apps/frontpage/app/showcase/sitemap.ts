import { MetadataRoute } from 'next';
import Sitemapper from 'sitemapper';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogXml = new Sitemapper({
    url: 'https://storybook.js.org/showcase/sitemap-0.xml',
    timeout: 15000, // 15 seconds
  });

  try {
    const { sites } = await blogXml.fetch();
    return sites.map((site) => {
      const url = site.replace(/\/$/, '');
      return { url };
    });
  } catch (error) {
    return [];
  }
}
