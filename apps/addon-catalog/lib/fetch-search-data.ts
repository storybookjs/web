import { addonFragment, recipeFragment, validateResponse } from '@repo/utils';
import type { Addon, Recipe } from '../types';
import { fetchAddonsQuery, gql } from './fetch-addons-query';

interface SearchData {
  partialSearchIntegrations: {
    addons: Addon[];
    recipes: Recipe[];
  };
}

export async function fetchSearchData(query: string) {
  try {
    const data = await fetchAddonsQuery<SearchData, { query: string }>(
      gql`
          query Search($query: string!) {
            partialSearchIntegrations(query: $query) {
              addons {
                ${addonFragment}
              }
              recipes {
                ${recipeFragment}
              }
            }
          }
        `,
      {
        variables: { query },
      },
    );

    validateResponse(
      () =>
        data.partialSearchIntegrations.addons &&
        data.partialSearchIntegrations.recipes,
    );

    return data.partialSearchIntegrations;
  } catch (error) {
    throw new Error(`Failed to fetch search data: ${(error as Error).message}`);
  }
}
