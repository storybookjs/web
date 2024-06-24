import { ADDON_FRAGMENT, RECIPE_FRAGMENT } from '../constants';
import { buildTagLinks } from './build-tag-links';
import { fetchAddonsQuery, gql } from './fetch-addons-query';
import { validateResponse } from './validate-response';

interface RecipesData {
  recipes: Recipe[];
}

interface RecipeValue
  extends Pick<
    Recipe,
    | 'accentColor'
    | 'addons'
    | 'authors'
    | 'description'
    | 'displayName'
    | 'icon'
    | 'name'
    | 'publishedAt'
    | 'tags'
    | 'updatedAt'
    | 'weeklyViews'
  > {}

async function fetchRecipesData(): Promise<RecipeValue[] | null> {
  let value: RecipeValue[] | null = null;
  try {
    async function fetchPartialData(skip: number = 0): Promise<RecipeValue[]> {
      const data = await fetchAddonsQuery<RecipesData, { skip: number }>(
        gql`
          query Recipes($skip: Int!) {
            recipes(limit: 30, skip: $skip) {
              ${RECIPE_FRAGMENT}
              status
              publishedAt
              updatedAt
              tags {
                name
                displayName
                description
                icon
              }
              addons {
                ${ADDON_FRAGMENT}
              }
            }
          }
        `,
        {
          variables: { skip },
        },
      );

      validateResponse(() => data?.recipes);

      const { recipes } = data!;

      value = [...(value || []), ...recipes];

      if (recipes.length > 0) {
        await fetchPartialData(skip + recipes.length);
      }

      return value;
    }

    return await fetchPartialData();
  } catch (error) {
    // @ts-expect-error - Seems safe
    throw new Error(`Failed to fetch recipes data: ${error.message}`);
  }
}

export async function fetchRecipeDetailsData(
  name: string,
): Promise<Recipe | null> {
  let recipe: (Omit<RecipeValue, 'tags'> & { tags: TagLinkType[] }) | undefined;
  try {
    // TODO: Cache this data
    const recipes = (await fetchRecipesData()) || [];

    // @ts-expect-error - Temporary
    recipe = recipes.find((recipe) => recipe.name === name);

    if (!recipe) {
      throw new Error(`Recipe not found: ${name}`);
    }
  } catch (error) {
    // @ts-expect-error - Seems safe
    throw new Error(`Failed to fetch recipes data: ${error.message}`);
  }

  const { tags, ...restRecipe } = recipe;

  // @ts-expect-error - Temporary
  return {
    ...restRecipe,
    tags: tags ? buildTagLinks(tags) : [],
  }
}
