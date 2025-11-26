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
  async function fetchPartialData(skip = 0): Promise<TagValue[]> {
    const data = await fetchAddonsQuery<TagsData, { isCategory: boolean, skip: number }>(
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

    // if (tags.length > 0) await fetchPartialData(skip + tags.length);

    return value;
  }

  try {
    return await fetchPartialData();
  } catch (error) {
    throw new Error(`Failed to fetch addons data: ${(error as Error).message}`);
  }
}
