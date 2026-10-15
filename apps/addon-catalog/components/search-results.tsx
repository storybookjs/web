import type { Addon, Recipe } from '../types';
import { Preview } from './preview';

type SearchResultsProps = {
  search: string;
  loading: boolean;
} & (
  | { kind: 'addons'; results: Addon[] }
  | { kind: 'recipes'; results: Recipe[] }
);

export const SearchResults = ({
  search,
  loading,
  kind,
  results,
}: SearchResultsProps) => {
  const isRecipes = kind === 'recipes';

  return (
    <div>
      <h3 className="mb-8 text-2xl font-bold">Search Results for {search}</h3>
      {loading ? <div>Loading...</div> : null}
      {!loading && results.length === 0 && <div>No results found</div>}
      {!loading && results.length > 0 && (
        // Match the layout of the list each tab shows when not searching
        <div
          className={
            isRecipes
              ? 'flex flex-col gap-6'
              : 'grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3'
          }
        >
          {results.map((item) => (
            <Preview
              key={item.name}
              orientation={isRecipes ? 'horizontal' : 'vertical'}
              element={item}
              type={isRecipes ? 'recipe' : 'addon'}
            />
          ))}
        </div>
      )}
    </div>
  );
};
