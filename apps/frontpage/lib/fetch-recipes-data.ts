import { validateResponse } from '@repo/utils';
import { fetchAddonsQuery, gql } from '../lib/fetch-addons-query';

type RecipesValue = Recipe['name'];

type RecipesData = {
  recipes: Pick<Recipe, 'name'>[];
};

export async function fetchRecipesData() {
  let value: RecipesValue[] = [];
  try {
    async function fetchPartialData(skip: number = 0) {
      const data = await fetchAddonsQuery<RecipesData, { skip: number }>(
        gql`
          query RecipeNames($skip: Int!) {
            recipes(limit: 30, skip: $skip) {
              name
            }
          }
        `,
        {
          variables: { skip },
        },
      );

      validateResponse(() => data.recipes);

      const { recipes } = data;

      value = [...value, ...recipes.map(({ name }) => name)];

      if (recipes.length > 0) await fetchPartialData(skip + recipes.length);

      return value;
    }

    return await fetchPartialData();
  } catch (error) {
    // @ts-expect-error - Seems safe
    throw new Error(`Failed to fetch recipes data: ${error.message}`);
  }
}
