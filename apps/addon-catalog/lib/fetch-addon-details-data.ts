import { ADDON_FRAGMENT } from '../constants';
import { buildTagLinks, type TagLinkType } from './build-tag-links';
import { fetchAddonsQuery, gql } from './fetch-addons-query';
import { validateResponse } from './validate-response';

type AddonDetailsData = {
  detail: Addon;
};

type AddonDetailsValue = Omit<Addon, 'tags'> & {
  tags: TagLinkType[];
}

export async function fetchAddonDetailsData(name: string): Promise<AddonDetailsValue | null> {
  let value: AddonDetailsValue | null = null;
  try {
    const data = await fetchAddonsQuery<AddonDetailsData, { name: string }>(
      gql`
        query AddonDetail($name: String!) {
          detail(name: $name) {
            ${ADDON_FRAGMENT}
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
      }
    );

    validateResponse(() => data?.detail);

    const { detail: { tags, ...addon } } = data!;

    value = {
      ...addon,
      tags: tags ? buildTagLinks(tags) : [],
      // TODO: Readme processing
    };
  } catch (error) {
    // @ts-expect-error - Seems safe
    throw new Error(`Failed to fetch addon details data: ${error.message}`);
  }

  return value;
}
