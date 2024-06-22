import { AddonItem } from '../components/addon-item';
import { RecipesList } from '../components/recipes-list';
import { buildTagLinks } from '../lib/build-tag-links';
import { fetchHomeData } from '../lib/fetch-home-data';
import { TagList } from '../components/tag-list';

const PopularRecipes = (props: any) => <RecipesList {...props} />;
// margin-bottom: 3rem;

export default async function Home() {
  const {
    popularAddons = [],
    popularRecipes = [],
    trendingTags = [],
    vta,
  } = (await fetchHomeData()) || {};
  // console.log({ popularAddons, popularRecipes, trendingTags, vta })

  const tagLinks = buildTagLinks(trendingTags);

  return (
    <>
      <div className="mb-8 mt-12 flex items-start justify-between">
        <div>
          <h1 className="mb-4 text-5xl">Integrations</h1>
          <p>
            Integrate your tools with Storybook to connect workflows and unlock
            advanced features.
          </p>
        </div>
        <button className="text-md h-12 flex-shrink-0 rounded-full bg-blue-500 px-6 text-white">
          Add your integration
        </button>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="w-[220px] flex-shrink-0">Sidebar</div>
        <div className="flex-1">
          <TagList tagLinks={tagLinks} />
          <h3 className="mb-4 mt-12 text-2xl">New to Storybook 8</h3>
          {vta && <AddonItem key={vta.id} orientation="horizontal" {...vta} />}
          <h3 className="mb-4 mt-12 text-2xl">Popular addons</h3>
          <div className="grid grid-cols-2 gap-4">
            {popularAddons.map((addon) => (
              <AddonItem key={addon.id} orientation="vertical" {...addon} />
            ))}
          </div>
          <h3 className="mb-4 mt-12 text-2xl">Popular recipes</h3>
          <PopularRecipes recipeItems={popularRecipes} />
        </div>
      </div>
    </>
  );
}
