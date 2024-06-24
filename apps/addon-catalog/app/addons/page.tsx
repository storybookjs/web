import { buildTagLinks } from '../../lib/build-tag-links';
import { fetchHomeData } from '../../lib/fetch-home-data';
import { Home } from '../../components/home';

export default async function Page() {
  const {
    popularAddons = [],
    popularRecipes = [],
    trendingTags = [],
    vta,
  } = (await fetchHomeData()) || {};

  const tagLinks = buildTagLinks(trendingTags);

  return (
    <Home
      tagLinks={tagLinks}
      popularRecipes={popularRecipes}
      popularAddons={popularAddons}
      vta={vta}
    />
  );
}
