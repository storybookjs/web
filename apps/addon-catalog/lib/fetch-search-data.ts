import { addonFragment, validateResponse } from '@repo/utils';
import { type Addon } from '../types';
import { fetchAddonsQuery, gql } from './fetch-addons-query';

interface SearchData {
  partialSearchIntegrations: {
    addons: Addon[];
  };
}

export async function fetchSearchData(query: string) {
  try {
    const data = await fetchAddonsQuery<SearchData, { query: string }>(
      gql`
          query Search($query: String!) {
            partialSearchIntegrations(query: $query) {
              addons {
                ${addonFragment}
              }
            }
          }
        `,
      {
        variables: { query },
      },
    );

    validateResponse(() => data.partialSearchIntegrations.addons);

    return data.partialSearchIntegrations.addons;
  } catch (error) {
    throw new Error(`Failed to fetch search data: ${(error as Error).message}`);
  }
}
