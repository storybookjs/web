import { type MetadataRoute } from 'next';
import { getReleases } from '../../lib/get-releases';

export default function sitemap(): MetadataRoute.Sitemap {
  const releases = getReleases();

  if (releases.length === 0) {
    throw new Error('Failed to fetch releases data');
  }

  return releases.map((name) => ({
    url: `https://storybook.js.org/releases/${name}`,
  }));
}
