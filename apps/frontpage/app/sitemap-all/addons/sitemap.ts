import { MetadataRoute } from 'next';
import { addonsSitemap } from '../../../lib/get-sitemap-addons';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const urls = await addonsSitemap();
  return urls;
}
