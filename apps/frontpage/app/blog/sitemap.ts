import { type MetadataRoute } from 'next';
import { fetchExternalSitemap } from '../../lib/fetch-external-sitemap';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const { sites, error } = await fetchExternalSitemap(
      'https://storybook.js.org/blog/sitemap/sitemap-0.xml',
    );

    if (error) throw new Error(error);

    return sites;
  } catch (error: any) {
    console.log(error.message || 'Error fetching sitemap');
    throw error;
  }
}
