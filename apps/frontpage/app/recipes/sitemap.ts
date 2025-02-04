import { type MetadataRoute } from 'next';
import { fetchRecipesData } from '../../lib/fetch-recipes-data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const recipes = (await fetchRecipesData()) || [];

  if (recipes.length === 0) {
    throw new Error('Failed to fetch recipes data');
  }

  return recipes.map((name) => ({
    url: `https://storybook.js.org/recipes/${name}`,
  }));
}
