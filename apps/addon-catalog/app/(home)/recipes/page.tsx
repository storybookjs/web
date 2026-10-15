import { type Metadata } from 'next';
import { PageHeader } from '../../../components/page-header';
import { Preview } from '../../../components/preview';
import { Search } from '../../../components/search';
import { fetchRecipesData } from '../../../lib/fetch-recipes-data';

// 60*60*24 = 24 hrs
export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Recipes | Storybook integrations',
  description:
    'Instructions to integrate popular libraries with Storybook, written and maintained by the Storybook team.',
};

export default async function Page() {
  const recipes = await fetchRecipesData();

  return (
    <>
      <PageHeader
        title="Integrations"
        description="Integrate your tools with Storybook to connect workflows and unlock advanced features."
        showAddButton
      />
      <Search kind="recipes">
        <h3 className="mb-8 text-2xl font-bold">Recipes</h3>
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
