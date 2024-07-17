import { Preview } from './preview';

interface SearchResultsProps {
  search: string;
  loading: boolean;
  searchResults: Addon[];
}

export const SearchResults = ({
  search,
  loading,
  searchResults,
}: SearchResultsProps) => {
  return (
    <div>
      <h3 className="mb-8 text-2xl font-bold">Search Results for {search}</h3>
      {loading ? <div>Loading...</div> : null}
      {!loading && searchResults.length === 0 && <div>No results found</div>}
      {!loading && searchResults.length > 0 && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {searchResults.map((addon) => (
            <Preview
              key={addon.name}
              orientation="vertical"
              element={addon}
              type="addon"
            />
          ))}
        </div>
      )}
    </div>
  );
};
