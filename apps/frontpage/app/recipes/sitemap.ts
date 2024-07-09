import { MetadataRoute } from 'next';
import { fetchRecipesData } from '../../lib/fetch-recipes-data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const recipes = (await fetchRecipesData()) || [];

  return recipes.map((name) => ({
    url: `https://storybook.js.org/recipes/${name}`,
  }));
}
