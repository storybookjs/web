import { addonFragment, recipeFragment, validateResponse } from '@repo/utils';
import { fetchAddonsQuery, gql } from './fetch-addons-query';

interface TagValue
  extends Pick<
    Tag,
    | 'name'
    | 'displayName'
    | 'description'
    | 'icon'
    | 'relatedTags'
    | 'topIntegrations'
  > {}

interface TagsData {
  tags: TagValue[];
}

async function fetchTagsData({
  isCategory,
}: {
  isCategory?: boolean;
} = {}) {
  try {
    let value: TagValue[] = [];
    async function fetchPartialData(skip: number = 0) {
      const data = await fetchAddonsQuery<
        TagsData,
        { isCategory: boolean; skip: number }
      >(
        gql`
          query Tags($isCategory: Boolean!, $skip: Int!) {
            tags(isCategory: $isCategory, limit: 30, skip: $skip) {
              name
              displayName
              description
              icon
              relatedTags {
                name
                displayName
                icon
              }
              topIntegrations(sort: monthlyDownloads) {
                addons {
                  ${addonFragment}
                }
  
                recipes {
                  ${recipeFragment}
                  addons {
                    ${addonFragment}
                  }
                }
              }
            }
          }
        `,
        {
          variables: { isCategory: Boolean(isCategory), skip },
        },
      );

      validateResponse(() => data.tags);

      const { tags } = data;

      value = [...value, ...tags];

      if (tags.length > 0) await fetchPartialData(skip + tags.length);

      return value;
    }

    return await fetchPartialData();
  } catch (error) {
    // @ts-expect-error - Seems safe
    throw new Error(`Failed to fetch tags data: ${error.message}`);
  }
}

export async function fetchTagDetailsData(name: string) {
  try {
    // TODO: Cache this data
    const categoriesData = await fetchTagsData({ isCategory: true });
    const tagsData = await fetchTagsData();

    const tag = [...categoriesData, ...tagsData].find(
      (tag) => tag.name === name,
    );

    if (!tag) throw new Error(`Tag not found: ${name}`);

    return {
      ...tag,
      isCategory: categoriesData.find((category) => category.name === name),
    };
  } catch (error) {
    // @ts-expect-error - Seems safe
    throw new Error(`Failed to fetch tags data: ${error.message}`);
  }
}
