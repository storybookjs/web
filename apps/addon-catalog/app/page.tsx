import { Preview } from '../components/preview';
import { buildTagLinks } from '../lib/build-tag-links';
import { fetchHomeData } from '../lib/fetch-home-data';
import { TagList } from '../components/tag-list';

export default async function Home() {
  const {
    popularAddons = [],
    popularRecipes = [],
    trendingTags = [],
    vta,
  } = (await fetchHomeData()) || {};

  const tagLinks = buildTagLinks(trendingTags);

  return (
    <>
      <div className="flex items-start justify-between mt-12 mb-8">
        <div>
          <h1 className="mb-4 text-5xl">Integrations</h1>
          <p>
            Integrate your tools with Storybook to connect workflows and unlock
            advanced features.
          </p>
        </div>
        <button className="flex-shrink-0 h-12 px-6 text-white bg-blue-500 rounded-full text-md">
          Add your integration
        </button>
      </div>
      <div className="flex flex-col mb-24 md:flex-row">
        <div className="w-[220px] flex-shrink-0">Sidebar</div>
        <div className="flex-1">
          <TagList tagLinks={tagLinks} />
          <h3 className="mt-12 mb-8 text-2xl font-bold">New to Storybook 8</h3>
          {vta && <Preview key={vta.id} orientation="horizontal" {...vta} />}
          <h3 className="mt-12 mb-8 text-2xl font-bold">Popular addons</h3>
          <div className="grid grid-cols-3 gap-6">
            {popularAddons.map((addon) => (
              <Preview key={addon.id} orientation="vertical" {...addon} />
            ))}
          </div>
          <h3 className="mt-12 mb-8 text-2xl font-bold">Popular recipes</h3>
          <div className="flex flex-col gap-6">
            {popularRecipes.slice(0, 6).map((recipe) => (
              <Preview key={recipe.id} orientation="horizontal" {...recipe} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
