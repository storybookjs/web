import { addonFragment, recipeFragment, validateResponse } from '@repo/utils';
import { fetchAddonsQuery, gql } from './fetch-addons-query';

type TagsData = {
  tags: Tag[];
};

type TagValue = Pick<
  Tag,
  | 'name'
  | 'displayName'
  | 'description'
  | 'icon'
  | 'relatedTags'
  | 'topIntegrations'
>;

async function fetchTagsData({
  isCategory,
}: {
  isCategory?: boolean;
} = {}): Promise<TagValue[] | null> {
  let value: TagValue[] | null = null;
  try {
    async function fetchPartialData(skip: number = 0): Promise<TagValue[]> {
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

      validateResponse(() => data?.tags);

      const { tags } = data!;

      value = [...(value || []), ...tags];

      if (tags.length > 0) {
        await fetchPartialData(skip + tags.length);
      }

      return value;
    }

    return await fetchPartialData();
  } catch (error) {
    // @ts-expect-error - Seems safe
    throw new Error(`Failed to fetch tags data: ${error.message}`);
  }
}

export async function fetchTagDetailsData(
  name: string,
): Promise<(TagValue & { isCategory: boolean }) | null> {
  try {
    // TODO: Cache this data
    const categoriesData = (await fetchTagsData({ isCategory: true })) || [];
    const tagsData = (await fetchTagsData()) || [];

    const tag = [...categoriesData, ...tagsData].find((tag) => tag.name === name);

    if (!tag) {
      throw new Error(`Tag not found: ${name}`);
    }

    return {
      ...tag,
      isCategory: categoriesData!.map((category) => category.name).includes(name),
    };
  } catch (error) {
    // @ts-expect-error - Seems safe
    throw new Error(`Failed to fetch tags data: ${error.message}`);
  }
}
