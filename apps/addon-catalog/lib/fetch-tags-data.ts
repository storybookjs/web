import { validateResponse } from '@repo/utils';
import { fetchAddonsQuery, gql } from "./fetch-addons-query";

type TagValue = Tag['name'];

interface TagsData {
  tags: Pick<Tag, 'name'>[];
}

export async function fetchTagsData({
  isCategory,
}: {
  isCategory?: boolean;
} = {}) {
  try {
    let value: TagValue[] = [];
    async function fetchPartialData(skip = 0) {
      const data = await fetchAddonsQuery<
        TagsData,
        { isCategory: boolean; skip: number }
      >(
        gql`
          query TagNames($isCategory: Boolean!, $skip: Int!) {
            tags(isCategory: $isCategory, limit: 30, skip: $skip) {
              name
            }
          }
        `,
        {
          variables: { isCategory: Boolean(isCategory), skip },
        },
      );

      validateResponse(() => data?.tags);

      const { tags } = data;

      value = [...value, ...tags.map(({ name }) => name)];

      if (tags.length > 0) await fetchPartialData(skip + tags.length);

      return value;
    }

    return await fetchPartialData();
  } catch (error) {
    // @ts-expect-error - Seems safe
    throw new Error(`Failed to fetch addons data: ${error.message}`);
  }
}
