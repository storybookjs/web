import { recipeFragment, validateResponse } from '@repo/utils';
import { fetchAddonsQuery, gql } from '@repo/utils/fetch-addons-query';
import type { Recipe } from '../types';

interface RecipesData {
  recipes: Recipe[];
}

export async function fetchRecipesData() {
  const value: Recipe[] = [];

  async function fetchPage(skip = 0): Promise<void> {
    const data = await fetchAddonsQuery<RecipesData, { skip: number }>(
      gql`
        query Recipes($skip: Int!) {
          recipes(limit: 30, skip: $skip) {
            ${recipeFragment}
          }
        }
      `,
      { variables: { skip } },
    );

    validateResponse(() => data.recipes);

    const page = data.recipes;
    // TODO: `authors` filter is a proxy for "real" recipes; clean up database
    value.push(...page.filter(({ authors }) => authors));
    if (page.length > 0) await fetchPage(skip + page.length);
  }

  try {
    await fetchPage();
    return value.sort((a, b) => (b.weeklyViews ?? 0) - (a.weeklyViews ?? 0));
  } catch (error) {
    throw new Error(
      `Failed to fetch recipes data: ${(error as Error).message}`,
    );
  }
}
