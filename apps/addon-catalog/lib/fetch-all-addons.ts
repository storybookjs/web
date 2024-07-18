import { database } from './mongodb-client';

interface Addon {
  name: string;
  disabled?: boolean;
}

export const fetchAllAddons = async () => {
  try {
    const query = {};
    const crawledAddonsCollection = database.collection<Addon>('crawledAddons');
    const crawledAddons = crawledAddonsCollection.find<Addon>(query, {});
    const curatedAddonsCollection = database.collection<Addon>('curatedAddons');
    const curatedAddons = curatedAddonsCollection.find<Addon>(query, {});

    const allCuratedAddons: Addon[] = [];
    const allAddons: Addon[] = [];

    const count = await crawledAddonsCollection.countDocuments(query);

    console.log(count);

    for await (const doc of curatedAddons) {
      allCuratedAddons.push(doc);
    }

    for await (const doc of crawledAddons) {
      allAddons.push(doc);
    }

    const allAddonsWithCurated = allAddons.map((addon) => {
      const curatedAddon = allCuratedAddons.find((c) => c.name === addon.name);
      if (curatedAddon) {
        return {
          ...addon,
          disabled: curatedAddon.disabled,
        };
      }
      return addon;
    });

    return {
      addons: allAddonsWithCurated
        .filter((addon) => !addon.disabled)
        .map((addon) => ({
          name: addon.name,
          disabled: addon.disabled,
        })),
      error: null,
    };
  } catch (error) {
    return { addons: [], error };
  }
};
