import { type Metadata } from 'next';
import { PageHeader } from '../../../components/page-header';
import { Preview } from '../../../components/preview';
import { Search } from '../../../components/search';
import { fetchRecipesData } from '../../../lib/fetch-recipes-data';

// 60*60*24 = 24 hrs
export const revalidate = 86400;

const description =
  'Instructions to integrate popular libraries with Storybook, written and maintained by the Storybook team.';

export const metadata: Metadata = {
  title: 'Recipes | Storybook integrations',
  description,
};

export default async function Page() {
  const recipes = await fetchRecipesData();

  return (
    <>
      {/* The Storybook team writes recipes, so users request them */}
      <PageHeader
        title="Recipes"
        description={description}
        action={{
          label: 'Request a recipe',
          href: '/docs/addons/integration-catalog#request-a-recipe',
        }}
      />
      <Search kind="recipes">
        <div className="flex flex-col gap-6">
          {recipes.map((recipe) => (
            <Preview
              key={recipe.name}
              orientation="horizontal"
              element={recipe}
              type="recipe"
            />
          ))}
        </div>
      </Search>
    </>
  );
}
