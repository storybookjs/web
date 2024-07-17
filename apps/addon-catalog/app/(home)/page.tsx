import { fetchHomeData } from '../../lib/fetch-home-data';
import { Preview } from '../../components/preview';

export default async function Page() {
  const {
    popularAddons = [],
    popularRecipes = [],
    vta,
  } = (await fetchHomeData()) || {};

  return (
    <>
      <h3 className="mb-8 text-2xl font-bold">New to Storybook 8</h3>
      {vta ? <Preview
          key={vta.name}
          orientation="horizontal"
          element={vta}
          type="addon"
        /> : null}
      <h3 className="mb-8 mt-12 text-2xl font-bold">Popular addons</h3>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {popularAddons.map((addon) => (
          <Preview
            key={addon.name}
            orientation="vertical"
            element={addon}
            type="addon"
          />
        ))}
      </div>
      <h3 className="mb-8 mt-12 text-2xl font-bold">Popular recipes</h3>
      <div className="flex flex-col gap-6">
        {popularRecipes.map((recipe) => (
          <Preview
            key={recipe.name}
            orientation="horizontal"
            element={recipe}
            type="recipe"
          />
        ))}
      </div>
    </>
  );
}
