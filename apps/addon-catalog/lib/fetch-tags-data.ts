import { validateResponse } from '../lib/validate-response';
import { fetchAddonsQuery, gql } from '../lib/fetch-addons-query';

type TagsData = {
  tags: Pick<Tag, 'name'>[];
};

type TagsValue = Tag['name'][];

export async function fetchTagsData({
  isCategory,
}: {
  isCategory?: boolean;
} = {}): Promise<TagsValue | null> {
  let value: TagsValue | null = null;
  try {
    async function fetchPartialData(skip: number = 0): Promise<TagsValue> {
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

      const { tags } = data!;

      value = [...(value || []), ...tags.map(({ name }) => name)];

      if (tags.length > 0) {
        await fetchPartialData(skip + tags.length);
      }

      return value;
    }

    return await fetchPartialData();
  } catch (error) {
    // @ts-expect-error - Seems safe
    throw new Error(`Failed to fetch addons data: ${error.message}`);
  }
}
