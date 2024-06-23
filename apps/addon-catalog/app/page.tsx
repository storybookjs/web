import { buildTagLinks } from '../lib/build-tag-links';
import { fetchHomeData } from '../lib/fetch-home-data';
import { PlusIcon } from '@storybook/icons';
import { Home } from '../components/home';

export default async function Page() {
  const {
    popularAddons = [],
    popularRecipes = [],
    trendingTags = [],
    vta,
  } = (await fetchHomeData()) || {};

  const tagLinks = buildTagLinks(trendingTags);

  return (
    <>
      <div className="mb-8 mt-12 flex items-start justify-between">
        <div>
          <h1 className="mb-4 text-4xl font-bold">Integrations</h1>
          <p>
            Integrate your tools with Storybook to connect workflows and unlock
            advanced features.
          </p>
        </div>
        <a
          href="/docs/react/addons/integration-catalog"
          className="text-md hidden h-10 flex-shrink-0 items-center gap-2 rounded-full bg-blue-500 px-5 text-white md:flex"
        >
          <PlusIcon />
          Add your integration
        </a>
      </div>
      <Home
        tagLinks={tagLinks}
        popularRecipes={popularRecipes}
        popularAddons={popularAddons}
        vta={vta}
      />
    </>
  );
}
