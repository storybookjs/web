import { addonFragment } from '@repo/utils';
import { fetchAddonsQuery, gql } from './fetch-addons-query';

interface AddonData {
  detail: Addon;
}

export async function fetchAddonDetailsData(
  name: string,
): Promise<Addon | null> {
  try {
    const data = await fetchAddonsQuery<AddonData, { name: string }>(
      gql`
        query Addon($name: String!) {
          detail(name: $name) {
            ${addonFragment}
            tags {
              name
              displayName
              description
              icon
            }
            compatibility {
              name
              displayName
              icon
            }
            status
            readme
            publishedAt
            repositoryUrl
            homepageUrl
            npmUrl
          }
        }
      `,
      {
        variables: { name },
      },
    );

    return data.detail;
  } catch (error) {
    throw new Error(`Failed to fetch addon details data: ${error}`);
  }
}
