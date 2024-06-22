import { ADDON_FRAGMENT, RECIPE_FRAGMENT } from '../constants';
import { fetchAddonsQuery, gql } from './fetch-addons-query';
import { validateResponse } from './validate-response';

type Addon = {
  id: string;
  repositoryUrl: string;
  npmUrl: string;
  tags: Tag[];
  authors: Author[];
};

type Recipe = {
  tags: Tag[];
};

type AddonsHomeData = {
  popular: {
    addons: Addon[];
    recipes: Recipe[];
  };
  vta: Addon;
};

type TagWithOccurrence = Tag & { occurrence: number };

function createTagOccurrenceHash(...addons: Addon[]) {
  return addons
    .reduce<Tag[]>((allTags, { tags }) => [...allTags, ...tags], [])
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

export async function fetchHomeData(): Promise<AddonsHomeValue | null> {
  let value: AddonsHomeValue | null = null;
  try {
    const data = await fetchAddonsQuery<AddonsHomeData>(
      gql`
        query AddonsHome {
          popular: topIntegrations(sort: featuredMonthly, limit: 9) {
            addons {
              ${ADDON_FRAGMENT}
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
              ${RECIPE_FRAGMENT}
              tags {
                name
                displayName
                description
                icon
              }
            }
          }
          vta: detail(name: "@chromatic-com/storybook") {
            ${ADDON_FRAGMENT}
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

    value = {
      popularAddons: popular.addons,
      popularRecipes: popular.recipes,
      trendingTags: getNRandomTags(tagOccurrences, 20),
      vta,
    };
  } catch (error) {
    // @ts-expect-error - Seems safe
    throw new Error(`Failed to fetch home data: ${error.message}`);
  }

  return value;
}
