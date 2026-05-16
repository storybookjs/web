import { addonFragment, recipeFragment, validateResponse } from '@repo/utils';
import { fetchAddonsQuery, gql } from '@repo/utils/fetch-addons-query';
import { type Tag } from '../types';

type TagValue = Pick<
  Tag,
  'name' | 'displayName' | 'description' | 'icon' | 'topIntegrations'
>;

async function fetchTagData({ name }: { name: string }) {
  try {
    const data = await fetchAddonsQuery<{ tag: TagValue }, { name: string }>(
      gql`
          query Tag($name: String!) {
            tag(name: $name) {
              name
              displayName
              description
              icon
              topIntegrations(sort: monthlyDownloads) {
                addons {
                  ${addonFragment}
                }

                recipes {
                  ${recipeFragment}
                  addons {
                    ${addonFragment}
                  }
                }
              }
            }
          }
        `,
      {
        variables: { name },
      },
    );

    validateResponse(() => data.tag);

    const { tag } = data;

    return tag;
  } catch (error) {
    throw new Error(`Failed to fetch tags data: ${(error as Error).message}`);
  }
}

export async function fetchTagDetailsData(name: string) {
  try {
    const tag = await fetchTagData({ name });
    if (!tag) return { error: `Tag not found: ${name}` };
    return tag;
  } catch (error) {
    throw new Error(`Failed to fetch tags data: ${(error as Error).message}`);
  }
}
