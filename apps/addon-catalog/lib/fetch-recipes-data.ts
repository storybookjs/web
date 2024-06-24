import { fetchAddonsQuery, gql } from './fetch-addons-query';
import { validateResponse } from './validate-response';

type RecipesData = {
  recipes: Pick<Recipe, 'name'>[];
};

type RecipesValue = Recipe['name'][];

export async function fetchRecipesData(): Promise<RecipesValue | null> {
  let value: RecipesValue | null = null;
  try {
    async function fetchPartialData(skip: number = 0): Promise<RecipesValue> {
      const data = await fetchAddonsQuery<
        RecipesData,
        { skip: number }
      >(
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

      validateResponse(() => data?.recipes);

      const { recipes } = data!;

      value = [...(value || []), ...recipes.map(({ name }) => name)];

      if (recipes.length > 0) {
        await fetchPartialData(skip + recipes.length);
      }

      return value;
    }

    return await fetchPartialData();
  } catch (error) {
    // @ts-expect-error - Seems safe
    throw new Error(`Failed to fetch addons data: ${error.message}`);
  }
}
