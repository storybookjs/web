import { buildTagLinks } from '../../lib/build-tag-links';
import { fetchHomeData } from '../../lib/fetch-home-data';
import { Home } from '../../components/home';

export default async function Page() {
  const {
    popularAddons = [],
    popularRecipes = [],
    vta,
  } = (await fetchHomeData()) || {};

  return (
    <Home
      popularRecipes={popularRecipes}
      popularAddons={popularAddons}
      vta={vta}
    />
  );
}
