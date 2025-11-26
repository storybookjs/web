import { validateResponse } from '@repo/utils';
import type { Addon } from '../types';
import { fetchAddonsQuery, gql } from './fetch-addons-query';

type AddonValue = Addon['name'];

interface AddonsData {
  addons: Pick<Addon, 'name'>[];
}

export async function fetchAddonsData() {
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

    // if (addons.length > 0) await fetchPartialData(skip + addons.length);

    return value;
  }
  try {
    return await fetchPartialData();
  } catch (error) {
    throw new Error(`Failed to fetch addons data: ${(error as Error).message}`);
  }
}
