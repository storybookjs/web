'use client';

import { useState } from 'react';
import { Preview } from '../components/preview';
import { TagList } from '../components/tag-list';
import { BookIcon, EditIcon, SearchIcon } from '@storybook/icons';
import Link from 'next/link';
import { SearchResults } from './search-results';

interface HomeProps {
  tagLinks: TagLinkType[];
  popularRecipes: Recipe[];
  popularAddons: Addon[];
  vta: Addon | undefined;
}

const categories = [
  { name: 'Popular', href: '/integrations' },
  { name: 'Essential', href: '/integrations/tag/essentials' },
  { name: 'Code', href: '/integrations/tag/essentials' },
  { name: 'Data & State', href: '/integrations/tag/essentials' },
  { name: 'Test', href: '/integrations/tag/essentials' },
  { name: 'Style', href: '/integrations/tag/essentials' },
  { name: 'Design', href: '/integrations/tag/essentials' },
  { name: 'Appearance', href: '/integrations/tag/essentials' },
  { name: 'Organize', href: '/integrations/tag/essentials' },
];

export const Home = ({
  tagLinks,
  popularRecipes,
  popularAddons,
  vta,
}: HomeProps) => {
  const [search, setSearch] = useState('');

  return (
    <div className="mb-24">
      <div className="mb-12 flex flex-col gap-8 md:flex-row md:items-center md:gap-12">
        <div className="relative flex h-10 w-full flex-shrink-0 items-center rounded-full border border-zinc-300 md:w-[250px] dark:border-slate-700">
          <SearchIcon className="absolute left-4 dark:text-slate-500" />
          <input
            className="h-full w-full rounded-full bg-transparent pl-10 placeholder:text-slate-500"
            placeholder="Search integrations"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <TagList tagLinks={tagLinks} />
      </div>
      {search && <SearchResults search={search} />}
      {!search && (
        <div className="flex flex-col gap-12 md:flex-row">
          <div className="hidden flex-shrink-0 md:block md:w-[250px]">
            <div className="flex items-center py-2 text-sm font-bold">
              Categories
            </div>
            <ul className="-ml-2 border-b border-b-zinc-300 pb-6 dark:border-b-slate-700">
              {categories.map(({ name, href }) => (
                <li key={name}>
                  <a
                    href={href}
                    className="flex items-center px-2 py-[5px] text-sm text-zinc-600 transition-colors hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-500"
                  >
                    {name}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col gap-4">
              <Link
                href="/docs/addons/install-addons"
                className="flex items-center gap-2 text-sm transition-colors hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-500"
              >
                <BookIcon /> How to install addons
              </Link>
              <Link
                href="/docs/addons/writing-addons"
                className="flex items-center gap-2 text-sm transition-colors hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-500"
              >
                <EditIcon /> Create an addon
              </Link>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="mb-8 text-2xl font-bold">New to Storybook 8</h3>
            {vta && (
              <Preview key={vta.name} orientation="horizontal" {...vta} />
            )}
            <h3 className="mb-8 mt-12 text-2xl font-bold">Popular addons</h3>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
              {popularAddons.map((addon) => (
                <Preview key={addon.name} orientation="vertical" {...addon} />
              ))}
            </div>
            <h3 className="mb-8 mt-12 text-2xl font-bold">Popular recipes</h3>
            <div className="flex flex-col gap-6">
              {popularRecipes.slice(0, 6).map((recipe) => (
                <Preview
                  key={recipe.name}
                  orientation="horizontal"
                  {...recipe}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
