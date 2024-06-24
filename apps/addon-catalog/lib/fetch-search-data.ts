import { addonFragment, fetchAddonsQuery, gql } from '@repo/utils';

type TagsData = {
  partialSearchIntegrations: {
    addons: Addon[];
  };
};

export async function fetchSearchData(name: string): Promise<Addon[] | null> {
  try {
    console.log('fetchTagDetailsData', name);
    const data = await fetchAddonsQuery<TagsData, { query: string }>(
      gql`
          query Tag($query: String!) {
            partialSearchIntegrations(query: $query) {
              addons {
                ${addonFragment}
              }
            }
          }
        `,
      {
        variables: { query: name },
      },
    );

    return data.partialSearchIntegrations.addons;
  } catch (error) {
    // @ts-expect-error - Seems safe
    throw new Error(`Failed to fetch tag details data: ${error.message}`);
  }
}
