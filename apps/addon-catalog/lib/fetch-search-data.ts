import { addonFragment, validateResponse } from '@repo/utils';
import { fetchAddonsQuery, gql } from "./fetch-addons-query";

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
    // @ts-expect-error - Seems safe
    throw new Error(`Failed to fetch search data: ${error.message}`);
  }
}
