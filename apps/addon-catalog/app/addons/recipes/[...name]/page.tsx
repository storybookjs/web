import fs from 'node:fs';
import path from 'node:path';
import { MDXContent } from '@repo/ui';
import { fetchRecipeDetailsData } from '../../../../lib/fetch-recipe-details-data';
import { fetchRecipesData } from '../../../../lib/fetch-recipes-data';

interface RecipeDetailsProps {
  params: {
    name: string[];
  };
}

export async function generateStaticParams() {
  const recipes = (await fetchRecipesData()) || [];
  return recipes.map((name) => ({
    params: { name },
  }));
}

export default async function RecipeDetails({ params }: RecipeDetailsProps) {
  // TODO: Better decoding?
  const name = params.name.join('/').replace('%40', '@');
  const metadata = await fetchRecipeDetailsData(name);

  const mdx = await fs.promises.readFile(
    path.join(process.cwd(), 'content/recipes', `${name}.mdx`),
    'utf-8',
  );

  return (
    <main className="p-8">
      <pre>{JSON.stringify(metadata, null, 2)}</pre>
      <MDXContent source={mdx} />
    </main>
  );
}
