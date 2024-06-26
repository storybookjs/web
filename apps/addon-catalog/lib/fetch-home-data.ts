import { addonFragment, recipeFragment } from '@repo/utils';
import { fetchAddonsQuery, gql } from '../lib/fetch-addons-query';
import { validateResponse } from '@repo/utils';

interface AddonsHomeData {
  popular: {
    addons: Addon[];
    recipes: Recipe[];
  };
  vta: Addon;
}

interface TagWithOccurrence extends Tag {
  occurrence: number;
}

function createTagOccurrenceHash(...addons: Addon[]) {
  return addons
    .reduce<Tag[]>((allTags, { tags }) => [...allTags, ...(tags || [])], [])
    .filter(({ icon }) => icon === null)
    .reduce<Record<string, TagWithOccurrence>>(
      (hash, tag) => ({
        ...hash,
        [tag.name]: hash[tag.name]
          ? { ...tag, occurrence: hash[tag.name].occurrence + 1 }
          : { ...tag, occurrence: 1 },
      }),
      {},
    );
}

function getNRandomTags(
  tags: Record<string, TagWithOccurrence>,
  numberOfTags: number,
) {
  return Object.values(tags)
    .map((tag) => ({ ...tag, occurrence: tag.occurrence * Math.random() }))
    .sort((a, b) => b.occurrence - a.occurrence)
    .slice(0, numberOfTags)
    .map(({ occurrence, ...tag }) => tag);
}

type AddonsHomeValue = {
  popularAddons: Addon[];
  popularRecipes: Recipe[];
  trendingTags: Tag[];
  vta: Addon;
};

export async function fetchHomeData() {
  try {
    let value: AddonsHomeValue | null = null;
    const data = await fetchAddonsQuery<AddonsHomeData>(
      gql`
        query AddonsHome {
          popular: topIntegrations(sort: featuredMonthly, limit: 9) {
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
            recipes {
              ${recipeFragment}
              tags {
                name
                displayName
                description
                icon
              }
            }
          }
          vta: detail(name: "@chromatic-com/storybook") {
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
      `,
    );

    validateResponse(() => data?.popular && data?.vta);

    const { popular, vta } = data!;

    const tagOccurrences = createTagOccurrenceHash(...popular.addons);

    return {
      popularAddons: popular.addons,
      popularRecipes: popular.recipes,
      trendingTags: getNRandomTags(tagOccurrences, 20),
      vta,
    };
  } catch (error) {
    // @ts-expect-error - Seems safe
    throw new Error(`Failed to fetch home data: ${error.message}`);
  }
}
