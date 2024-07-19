import { database } from './mongodb-client';

interface Tag {
  name: string;
  description?: string;
  displayName?: string;
  isCategory?: boolean;
  aliases?: string[];
  disabled?: boolean;
}

async function fetchData(name: string) {
  const tags = database.collection<Tag>(name);
  const query = {};

  const allCuratedTags: Tag[] = [];

  const cursor = tags.find<Tag>(query, {
    sort: { name: 1 },
  });
  for await (const doc of cursor) {
    allCuratedTags.push(doc);
  }

  return allCuratedTags;
}

export const fetchMongodbTags = async () => {
  try {
    const crawledTags = await fetchData('crawledTags');
    const curatedTags = await fetchData('curatedTags');

    const allTagsWithCurated = crawledTags.map((tag) => {
      const curatedAddon = curatedTags.find((c) => c.name === tag.name);
      if (curatedAddon) {
        return {
          ...tag,
          ...curatedAddon,
        };
      }
      return tag;
    });

    return {
      tags: allTagsWithCurated,
      error: null,
    };
  } catch (error) {
    return { tags: [], error };
  }
};
