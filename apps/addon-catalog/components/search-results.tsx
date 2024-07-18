import type { Addon, Recipe } from '../types';
import { Preview } from './preview';

interface SearchResultsProps {
  search: string;
  loading: boolean;
  searchResults: {
    addons: Addon[];
    recipes: Recipe[];
  };
}

export const SearchResults = ({
  search,
  loading,
  searchResults: { addons, recipes },
}: SearchResultsProps) => {
  const searchResults = [...recipes, ...addons];
  return (
    <div>
      <h3 className="mb-8 text-2xl font-bold">Search Results for {search}</h3>
      {loading ? <div>Loading...</div> : null}
      {!loading && searchResults.length === 0 && <div>No results found</div>}
      {!loading && searchResults.length > 0 && (
        <>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {searchResults.map((item) => (
              <Preview
                key={item.name}
                orientation="vertical"
                element={item}
                type={item.type === 'Recipe' ? 'recipe' : 'addon'}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
