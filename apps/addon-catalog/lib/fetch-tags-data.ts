import { validateResponse } from '@repo/utils';
import { type Tag } from '../types';
import { fetchAddonsQuery, gql } from './fetch-addons-query';

type TagValue = Tag['name'];

interface TagsData {
  tags: Pick<Tag, 'name'>[];
}

export async function fetchTagsData({
  isCategory,
}: {
  isCategory?: boolean;
} = {}) {
  let value: TagValue[] = []; // Moved outside to be accessible by fetchPartialData

  // Define fetchPartialData at the root of fetchTagsData function body
  async function fetchPartialData(): Promise<TagValue[]> {
    const data = await fetchAddonsQuery<TagsData, { isCategory: boolean }>(
      gql`
        query TagNames($isCategory: Boolean!) {
          tags(isCategory: $isCategory) {
            name
          }
        }
      `,
      {
        variables: { isCategory: Boolean(isCategory) },
      },
    );

    validateResponse(() => data?.tags);

    const { tags } = data;

    value = [...value, ...tags.map(({ name }) => name)];

    return value;
  }

  try {
    return await fetchPartialData(); // Call fetchPartialData at the end of fetchTagsData
  } catch (error) {
    throw new Error(`Failed to fetch addons data: ${(error as Error).message}`);
  }
}
