import { type MetadataRoute } from 'next';
import { getReleases } from '../../lib/get-releases';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const releases = getReleases();

  return releases.map((name) => ({
    url: `https://storybook.js.org/releases/${name}`,
  }));
}
