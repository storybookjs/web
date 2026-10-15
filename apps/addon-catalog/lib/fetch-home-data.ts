import { addonFragment, validateResponse } from '@repo/utils';
import { fetchAddonsQuery, gql } from '@repo/utils/fetch-addons-query';
import type { Addon } from '../types';

interface AddonsHomeData {
  popular: {
    addons: Addon[];
  };
}

export async function fetchHomeData() {
  try {
    const data = await fetchAddonsQuery<AddonsHomeData>(
      gql`
        query AddonsHome {
          popular: topIntegrations(sort: featuredMonthly, limit: 12) {
            addons {
              ${addonFragment}
              tags {
                name
                displayName
                description
                icon
              }
              repositoryUrl
              npmUrl
            }
          }
        }
      `,
    );

    validateResponse(() => data.popular?.addons);

    const { popular } = data;

    return {
      popularAddons: popular.addons,
    };
  } catch (error) {
    throw new Error(`Failed to fetch home data: ${(error as Error).message}`);
  }
}
