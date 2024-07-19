import { database } from './mongodb-client';

interface Addon {
  name: string;
  disabled?: boolean;
  authors: { name: string; email: string }[];
}

async function fetchData(name: string) {
  const movies = database.collection<Addon>(name);
  const query = {};

  const allCuratedAddons: Addon[] = [];

  const cursor = movies.find<Addon>(query, {
    sort: { name: 1 },
    // projection: { _id: 0, name: 1, disabled: 1 },
  });
  for await (const doc of cursor) {
    allCuratedAddons.push(doc);
  }

  return allCuratedAddons;
}

export const fetchMongodbAddons = async () => {
  try {
    const crawledAddons = await fetchData('crawledAddons');
    const curatedAddons = await fetchData('curatedAddons');

    const allAddonsWithCurated = crawledAddons
      .map((addon) => {
        const curatedAddon = curatedAddons.find((c) => c.name === addon.name);
        if (curatedAddon) {
          return {
            ...addon,
            disabled: curatedAddon.disabled,
          };
        }
        return addon;
      })
      .filter((addon) => !addon.disabled);

    // get all authors
    const authors: { name: string; email: string }[] = allAddonsWithCurated
      .map((addon) => addon.authors)
      .flat()
      .filter((author) => author !== null);

    const uniqueAuthors = Array.from(new Set(authors.map((a) => a.name))).map(
      (name) => {
        return authors.find((a) => a.name === name);
      },
    );

    return {
      addons: allAddonsWithCurated,
      authors: uniqueAuthors,
      error: null,
    };
  } catch (error) {
    return { addons: [], error };
  }
};
