import { fetchAddonsQuery, gql } from '../lib/fetch-addons-query';
import { validateResponse } from '@repo/utils';

type AddonValue = string;

interface AddonsData {
  addons: { name: string }[];
}

export async function addonsSitemap() {
  /**
   * TODO: Move this to a shared location, @repo/utils?
   * Canonical source: apps/addon-catalog/lib/fetch-addons-data.ts
   */
  async function fetchAddonsData() {
    try {
      let value: AddonValue[] = [];
      async function fetchPartialData(skip: number = 0) {
        const data = await fetchAddonsQuery<AddonsData, { skip: number }>(
          gql`
            query Addons($skip: Int!) {
              addons(limit: 30, skip: $skip) {
                name
              }
            }
          `,
          {
            variables: { skip },
          },
        );

        validateResponse(() => data.addons);

        const { addons } = data;

        value = [...value, ...addons.map(({ name }) => name)];

        if (addons.length > 0) await fetchPartialData(skip + addons.length);

        return value;
      }

      return await fetchPartialData();
    } catch (error) {
      // @ts-expect-error - Seems safe
      throw new Error(`Failed to fetch addons data: ${error.message}`);
    }
  }

  type TagValue = string;

  interface TagsData {
    tags: { name: string }[];
  }

  /**
   * TODO: Move this to a shared location, @repo/utils?
   * Canonical source: apps/addon-catalog/lib/fetch-tags-data.ts
   */
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

  const addons = await fetchAddonsData();
  const categories = await fetchTagsData({ isCategory: true });
  const tags = await fetchTagsData();

  const addonPaths = addons.map((name) => {
    if (!name) throw new Error('Addon name is missing');
    return { loc: `https://storybook.js.org/addons/${name}` };
  });
  const tagAndCategoryPaths = [...categories, ...tags].map((name, i) => {
    if (!name) throw new Error('Tag name is missing');
    return { loc: `https://storybook.js.org/addons/tag/${name}` };
  });

  const urls = [...addonPaths, ...tagAndCategoryPaths].map(({ loc }, i) => {
    const encoded = loc
      .replace('&', '&amp;')
      .replace('<', '&lt;')
      .replace('>', '&gt;')
      .replace("'", '&apos;')
      .replace('"', '&quot;');
    return { url: encoded };
  });

  return [{ url: 'https://storybook.js.org/addons' }, ...urls];
}
