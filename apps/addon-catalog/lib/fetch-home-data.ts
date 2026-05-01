import { addonFragment, recipeFragment, validateResponse } from '@repo/utils';
import { fetchAddonsQuery, gql } from '@repo/utils/fetch-addons-query';
import type { Addon, Recipe } from '../types';

interface AddonsHomeData {
  popular: {
    addons: Addon[];
    recipes: Recipe[];
  };
  vta: Addon;
}

export async function fetchHomeData() {
  try {
    const data = await fetchAddonsQuery<AddonsHomeData>(
      gql`
        query AddonsHome {
          popular: topIntegrations(sort: featuredMonthly, limit: 9) {
            addons {
              ${addonFragment}
              tags {
                name
                displayName
                description
                icon
              }
              repositoryUrl
              npmUrl
            }
            recipes {
              ${recipeFragment}
              tags {
                name
                displayName
                description
                icon
              }
            }
          }
          vta: detail(name: "@chromatic-com/storybook") {
            ${addonFragment}
            tags {
              name
              displayName
              description
              icon
            }
            repositoryUrl
            npmUrl
          }
        }
      `,
    );

    validateResponse(() => data?.popular && data?.vta);

    const { popular, vta } = data;

    return {
      popularAddons: popular.addons,
      popularRecipes: popular.recipes,
      vta,
    };
  } catch (error) {
    throw new Error(`Failed to fetch home data: ${(error as Error).message}`);
  }
}
