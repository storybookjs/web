'use client';

import { Preview } from '../components/preview';
import { TagList } from '../components/tag-list';
import { BookIcon, EditIcon, SearchIcon } from '@storybook/icons';
import Link from 'next/link';

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
  return (
    <div className="mb-24 flex flex-col gap-12 md:flex-row">
      <div className="flex-shrink-0 md:w-[250px]">
        <div className="relative flex h-10 w-full items-center rounded-full border border-zinc-300">
          <SearchIcon className="absolute left-4" />
          <input
            className="h-full w-full rounded-full pl-10"
            placeholder="Search integrations"
          />
        </div>
        <div className="hidden md:block">
          <div className="mt-10 flex items-center py-2 text-sm font-bold">
            Categories
          </div>
          <ul className="-ml-2 border-b border-b-zinc-300 pb-6">
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
      </div>
      <div className="flex-1">
        <div className="flex h-10 items-center">
          <TagList tagLinks={tagLinks} />
        </div>
        <h3 className="mb-8 mt-12 text-2xl font-bold">New to Storybook 8</h3>
        {vta && <Preview key={vta.name} orientation="horizontal" {...vta} />}
        <h3 className="mb-8 mt-12 text-2xl font-bold">Popular addons</h3>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {popularAddons.map((addon) => (
            <Preview key={addon.name} orientation="vertical" {...addon} />
          ))}
        </div>
        <h3 className="mb-8 mt-12 text-2xl font-bold">Popular recipes</h3>
        <div className="flex flex-col gap-6">
          {popularRecipes.slice(0, 6).map((recipe) => (
            <Preview key={recipe.name} orientation="horizontal" {...recipe} />
          ))}
        </div>
      </div>
    </div>
  );
};
