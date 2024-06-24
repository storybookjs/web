'use client';

import { Preview } from '../components/preview';
import { HomeWrapper } from './home-wrapper';

interface HomeProps {
  tagLinks: TagLinkType[];
  popularRecipes: Recipe[];
  popularAddons: Addon[];
  vta: Addon | undefined;
}

export const Home = ({
  tagLinks,
  popularRecipes,
  popularAddons,
  vta,
}: HomeProps) => {
  return (
    <HomeWrapper tagLinks={tagLinks}>
      <h3 className="mb-8 text-2xl font-bold">New to Storybook 8</h3>
      {vta && (
        <Preview
          key={vta.name}
          orientation="horizontal"
          element={vta}
          type="addon"
        />
      )}
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
        {popularRecipes.slice(0, 6).map((recipe) => (
          <Preview
            key={recipe.name}
            orientation="horizontal"
            element={recipe}
            type="recipe"
          />
        ))}
      </div>
    </HomeWrapper>
  );
};
