import { addonFragment, recipeFragment } from '@repo/utils';
import { fetchAddonsQuery, gql } from '../../../../lib/fetch-addons-query';
import { validateResponse } from '@repo/utils';

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

export async function GET(
  request: Request,
  { params: { name } }: { params: { name: string } },
) {
  let categoriesData: TagValue[] | null;
  let tag: TagValue | undefined;
  try {
    // TODO: Cache this data
    categoriesData = (await fetchTagsData({ isCategory: true })) || [];
    const tagsData = (await fetchTagsData()) || [];

    tag = [...categoriesData, ...tagsData].find((tag) => tag.name === name);

    if (!tag) {
      return new Response(`Tag not found: ${name}`, {
        status: 400,
      });
    }
  } catch (error) {
    // @ts-expect-error - Seems safe
    return new Response(`Failed to fetch tags data: ${error.message}`, {
      status: 400,
    });
  }

  return Response.json({
    ...tag,
    isCategory: categoriesData!.map((category) => category.name).includes(name),
  });
}
