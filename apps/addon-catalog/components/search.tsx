'use client';

import { type ReactNode, useEffect, useState } from 'react';
import { CloseIcon, SearchIcon } from '@storybook/icons';
import { fetchSearchData } from '../lib/fetch-search-data';
import type { Addon, Recipe } from '../types';
import { SearchResults } from './search-results';

interface SearchProps {
  kind: 'addons' | 'recipes';
  /** Shown when there is no search query */
  children: ReactNode;
}

export const Search = ({ kind, children }: SearchProps) => {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState<{
    addons: Addon[];
    recipes: Recipe[];
  }>({ addons: [], recipes: [] });

  useEffect(() => {
    setLoading(true);

    const getData = setTimeout(() => {
      if (search.length > 1) {
        void fetchSearchData(search).then((data) => {
          setLoading(false);
          setSearchResults(data);
        });
      }
    }, 600);

    return () => {
      clearTimeout(getData);
    };
  }, [search]);

  return (
    <>
      <div className="mb-12 flex flex-col gap-8 md:flex-row md:items-center md:gap-12">
        <div className="relative flex h-10 w-full flex-shrink-0 items-center rounded-full border border-zinc-300 md:w-[250px] dark:border-slate-700">
          <SearchIcon className="absolute left-4 dark:text-slate-500" />
          <input
            className="h-full w-full rounded-full bg-transparent pl-10 placeholder:text-slate-500 dark:placeholder:text-slate-400"
            placeholder={`Search ${kind}`}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          {search.length > 0 && (
            <div
              className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 cursor-pointer items-center justify-center"
              onClick={() => {
                setSearch('');
              }}
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  setSearch('');
                }
              }}
              role="button"
              tabIndex={0}
              aria-label="Clear search"
            >
              <CloseIcon />
            </div>
          )}
        </div>
      </div>
      {search ? (
        <SearchResults
          search={search}
          loading={loading}
          searchResults={
            kind === 'addons'
              ? { addons: searchResults.addons, recipes: [] }
              : { addons: [], recipes: searchResults.recipes }
          }
        />
      ) : (
        children
      )}
    </>
  );
};
