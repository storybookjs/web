import { type MetadataRoute } from 'next';
import {
  fetchAddonsData,
  fetchTagsData,
} from '@repo/utils/fetch-addons-query';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const addons = await fetchAddonsData();
  const categories = await fetchTagsData({ isCategory: true });

  if (addons.length === 0 || categories.length === 0) {
    throw new Error('Failed to fetch addons data');
  }

  const addonPaths = addons.map((name) => {
    if (!name) throw new Error('Addon name is missing');
    return { loc: `https://storybook.js.org/addons/${name}` };
  });
  const categoryPaths = categories.map((name) => {
    if (!name) throw new Error('Tag name is missing');
    return { loc: `https://storybook.js.org/addons/tag/${name}` };
  });

  const urls = [...addonPaths, ...categoryPaths].map(({ loc }) => {
    const encoded = loc
      .replace('&', '&amp;')
      .replace('<', '&lt;')
      .replace('>', '&gt;')
      .replace("'", '&apos;')
      .replace('"', '&quot;');
    return { url: encoded };
  });

  return [{ url: 'https://storybook.js.org/addons' }, ...urls];
}
