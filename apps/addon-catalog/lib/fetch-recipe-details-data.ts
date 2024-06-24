import { basePath, host } from '../constants';

export async function fetchRecipeDetailsData(
  name: string,
): Promise<Recipe | null> {
  let recipe: Recipe | null = null;
  try {
    const res = await fetch(`${host}${basePath}/api/recipe/${name}`);
    recipe = await res.json();
  } catch (error) {
    // @ts-expect-error - Seems safe
    throw new Error(`Failed to fetch recipe details data: ${error.message}`);
  }

  return recipe;
}
