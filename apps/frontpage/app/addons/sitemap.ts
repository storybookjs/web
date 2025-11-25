import { type MetadataRoute } from 'next';
import { validateResponse } from '@repo/utils';
import { fetchAddonsQuery, gql } from '../../lib/fetch-addons-query';

type AddonValue = string;

interface AddonsData {
  addons: { name: string }[];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  /**
   * TODO: Move this to a shared location, \@repo/utils?
   * Canonical source: apps/addon-catalog/lib/fetch-addons-data.ts
   */
  async function fetchAddonsData() {
    let value: AddonValue[] = [];
    async function fetchPartialData(skip = 0) {
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
    try {
      return await fetchPartialData();
    } catch (error) {
      throw new Error(
        `Failed to fetch addons data: ${(error as Error).message}`,
      );
    }
  }

  type TagValue = string;

  interface TagsData {
    tags: { name: string }[];
  }

  /**
   * TODO: Move this to a shared location, \@repo/utils?
   * Canonical source: apps/addon-catalog/lib/fetch-tags-data.ts
   */
  async function fetchTagsData({
    isCategory,
  }: {
    isCategory?: boolean;
  } = {}) {
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
    try {
      return await fetchPartialData();
    } catch (error) {
      throw new Error(
        `Failed to fetch addons data: ${(error as Error).message}`,
      );
    }
  }

  const addons = await fetchAddonsData();
  const categories = await fetchTagsData({ isCategory: true });
  const tags = await fetchTagsData();

  if (addons.length === 0 || categories.length === 0 || tags.length === 0) {
    throw new Error('Failed to fetch addons data');
  }

  const addonPaths = addons.map((name) => {
    if (!name) throw new Error('Addon name is missing');
    return { loc: `https://storybook.js.org/addons/${name}/` };
  });
  const tagAndCategoryPaths = [...categories, ...tags].map((name) => {
    if (!name) throw new Error('Tag name is missing');
    return { loc: `https://storybook.js.org/addons/tag/${name}/` };
  });

  const urls = [...addonPaths, ...tagAndCategoryPaths].map(({ loc }) => {
    const encoded = loc
      .replace('&', '&amp;')
      .replace('<', '&lt;')
      .replace('>', '&gt;')
      .replace("'", '&apos;')
      .replace('"', '&quot;');
    return { url: encoded };
  });

  return [{ url: 'https://storybook.js.org/addons/' }, ...urls];
}
