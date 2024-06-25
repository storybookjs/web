'use client';

import { ReactNode, useState } from 'react';
import { TagList } from './tag-list';
import { BookIcon, EditIcon, PlusIcon, SearchIcon } from '@storybook/icons';
import Link from 'next/link';
import { SearchResults } from './search-results';

interface HomeProps {
  tagLinks?: TagLinkType[];
  children: ReactNode;
}

const categories = [
  { name: 'Popular', href: '/' },
  { name: 'Essential', href: '/tag/essentials' },
  { name: 'Code', href: '/tag/code' },
  { name: 'Data & State', href: '/tag/data-state' },
  { name: 'Test', href: '/tag/test' },
  { name: 'Style', href: '/tag/style' },
  { name: 'Design', href: '/tag/design' },
  { name: 'Appearance', href: '/tag/appearance' },
  { name: 'Organize', href: '/tag/organize' },
];

export const HomeWrapper = ({ tagLinks, children }: HomeProps) => {
  const [search, setSearch] = useState('');

  return (
    <>
      <div className="mb-8 mt-12 flex items-start justify-between">
        <div>
          <h1 className="mb-4 text-4xl font-bold">Integrations</h1>
          <p>
            Integrate your tools with Storybook to connect workflows and unlock
            advanced features.
          </p>
        </div>
        <a
          href="/docs/react/addons/integration-catalog"
          className="hidden h-10 flex-shrink-0 items-center gap-2 rounded-full bg-blue-500 px-5 text-sm font-bold text-white md:flex"
        >
          <PlusIcon />
          Add your integration
        </a>
      </div>
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
          {tagLinks && <TagList tagLinks={tagLinks} />}
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
                    <Link
                      href={href}
                      className="flex items-center px-2 py-[5px] text-sm text-zinc-600 transition-colors hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-500"
                    >
                      {name}
                    </Link>
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
            <div className="flex-1">{children}</div>
          </div>
        )}
      </div>
    </>
  );
};
