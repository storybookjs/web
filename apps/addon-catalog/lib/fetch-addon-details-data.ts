import { addonFragment, validateResponse } from '@repo/utils';
import { fetchAddonsQuery, gql } from '../lib/fetch-addons-query';
import { buildTagLinks } from './build-tag-links';
import { createMarkdownProcessor } from './create-markdown-processor';

interface AddonValue
  extends Pick<
    Addon,
    | 'name'
    | 'displayName'
    | 'description'
    | 'icon'
    | 'authors'
    | 'weeklyDownloads'
    | 'verified'
    | 'verifiedCreator'
    | 'tags'
    | 'compatibility'
    | 'status'
    | 'readme'
    | 'publishedAt'
    | 'repositoryUrl'
    | 'homepageUrl'
    | 'npmUrl'
  > {}
interface AddonData {
  addon: AddonValue;
}

function createAddonBaseLink(
  addon: Pick<Addon, 'repositoryUrl' | 'npmUrl'>,
): string {
  return `${addon.repositoryUrl || addon.npmUrl}/`;
}

export async function fetchAddonDetailsData(name: string) {
  try {
    const data = await fetchAddonsQuery<AddonData, { name: string }>(
      gql`
        query Addon($name: String!) {
          addon: detail(name: $name) {
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

    validateResponse(() => data.addon);

    const { readme, tags, ...restAddon } = data.addon;

    const baseLink = createAddonBaseLink(restAddon);
    const processor = createMarkdownProcessor(baseLink);

    return {
      ...restAddon,
      readme: readme ? processor.processSync(readme).toString() : null,
      tags: tags ? buildTagLinks(tags) : [],
    };
  } catch (error) {
    throw new Error(`Failed to fetch addon details data: ${error}`);
  }
}
