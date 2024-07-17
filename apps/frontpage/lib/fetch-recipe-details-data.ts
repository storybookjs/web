import { validateResponse, addonFragment, recipeFragment } from '@repo/utils';
import { fetchAddonsQuery, gql } from "./fetch-addons-query";
import { buildTagLinks } from './build-tag-links';

type RecipeValue = Pick<
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
  >
interface RecipeData {
  recipe: RecipeValue;
}

export async function fetchRecipeDetailsData(name: string) {
  try {
    const data = await fetchAddonsQuery<RecipeData, { name: string }>(
      gql`
        query Recipe($name: String!) {
          recipe(name: $name) {
            ${recipeFragment}
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
              ${addonFragment}
            }
          }
        }
      `,
      {
        variables: { name },
      },
    );

    validateResponse(() => data.recipe);

    const { tags, ...restRecipe } = data.recipe;

    return {
      ...restRecipe,
      tags: tags ? buildTagLinks(tags) : [],
    };
  } catch (error) {
    throw new Error(`Failed to fetch recipe details data: ${error}`);
  }
}
