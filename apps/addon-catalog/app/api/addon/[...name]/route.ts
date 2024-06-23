import { ADDON_FRAGMENT } from '../../../../constants';
import { buildTagLinks } from '../../../../lib/build-tag-links';
import { createMarkdownProcessor } from '../../../../lib/create-markdown-processor';
import { fetchAddonsQuery, gql } from '../../../../lib/fetch-addons-query';
import { validateResponse } from '../../../../lib/validate-response';

interface AddonsData {
  addons: Addon[];
}

interface AddonValue extends Pick<
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

function createAddonBaseLink(addon: Pick<Addon, 'repositoryUrl' | 'npmUrl'>): string {
  return `${addon.repositoryUrl || addon.npmUrl}/`;
}

async function fetchAddonsData(): Promise<AddonValue[] | null> {
  let value: AddonValue[] | null = null;
  try {
    async function fetchPartialData(skip: number = 0): Promise<AddonValue[]> {
      const data = await fetchAddonsQuery<AddonsData, { skip: number }>(
        gql`
          query Addons($skip: Int!) {
            addons(limit: 30, skip: $skip) {
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
          variables: { skip },
        },
      );

      validateResponse(() => data?.addons);

      const { addons } = data!;

      value = [...(value || []), ...addons];

      if (addons.length > 0) {
        await fetchPartialData(skip + addons.length);
      }

      return value;
    }

    return await fetchPartialData();
  } catch (error) {
    // @ts-expect-error - Seems safe
    throw new Error(`Failed to fetch addons data: ${error.message}`);
  }
}

export async function GET(
  request: Request,
  { params }: { params: { name: string[] } },
) {
  // TODO: Better decoding?
  const name = params.name.join('/').replace('%40', '@');
  
  let addon: AddonValue | undefined;
  try {
    // TODO: Cache this data
    const addons = (await fetchAddonsData()) || [];

    addon = addons.find((addon) => addon.name === name);

    if (!addon) {
      return new Response(`Addon not found: ${name}`, {
        status: 400,
      });
    }
  } catch (error) {
    // @ts-expect-error - Seems safe
    return new Response(`Failed to fetch addons data: ${error.message}`, {
      status: 400,
    });
  }

  const { readme, tags, ...restAddon } = addon;

  const baseLink = createAddonBaseLink(restAddon);
  const processor = createMarkdownProcessor(baseLink);

  return Response.json({
    ...restAddon,
    tags: tags ? buildTagLinks(tags) : [],
    readme: readme ? processor.processSync(readme).toString() : null,
  });
}
