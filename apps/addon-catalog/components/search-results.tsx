interface SearchResultsProps {
  search: string;
}

export const SearchResults = ({ search }: SearchResultsProps) => {
  return (
    <div className="mb-8 text-2xl font-bold">Search Results for {search}</div>
  );
};
