import { ADDON_FRAGMENT, RECIPE_FRAGMENT } from '../../../../constants';
import { buildTagLinks } from '../../../../lib/build-tag-links';
import { fetchAddonsQuery, gql } from '../../../../lib/fetch-addons-query';
import { validateResponse } from '../../../../lib/validate-response';

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

export async function GET(
  request: Request,
  { params }: { params: { name: string[] } },
) {
  // TODO: Better decoding?
  const name = params.name.join('/').replace('%40', '@');

  let recipe: RecipeValue | undefined;
  try {
    // TODO: Cache this data
    const recipes = (await fetchRecipesData()) || [];

    recipe = recipes.find((recipe) => recipe.name === name);

    if (!recipe) {
      return new Response(`Recipe not found: ${name}`, {
        status: 400,
      });
    }
  } catch (error) {
    // @ts-expect-error - Seems safe
    return new Response(`Failed to fetch recipes data: ${error.message}`, {
      status: 400,
    });
  }

  const { tags, ...restRecipe } = recipe;

  return Response.json({
    ...restRecipe,
    tags: tags ? buildTagLinks(tags) : [],
  });
}
