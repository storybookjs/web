import { Preview } from '../components/preview';
import { buildTagLinks } from '../lib/build-tag-links';
import { fetchHomeData } from '../lib/fetch-home-data';
import { TagList } from '../components/tag-list';
import { BookIcon, EditIcon, PlusIcon, SearchIcon } from '@storybook/icons';
import Link from 'next/link';

export default async function Home() {
  const {
    popularAddons = [],
    popularRecipes = [],
    trendingTags = [],
    vta,
  } = (await fetchHomeData()) || {};

  const tagLinks = buildTagLinks(trendingTags);

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

  return (
    <>
      <div className="flex items-start justify-between mt-12 mb-8">
        <div>
          <h1 className="mb-4 text-4xl font-bold">Integrations</h1>
          <p>
            Integrate your tools with Storybook to connect workflows and unlock
            advanced features.
          </p>
        </div>
        <a
          href="/docs/react/addons/integration-catalog"
          className="flex items-center flex-shrink-0 h-10 gap-2 px-5 text-white bg-blue-500 rounded-full text-md"
        >
          <PlusIcon />
          Add your integration
        </a>
      </div>

      <div className="flex flex-col gap-12 mb-24 md:flex-row">
        <div className="w-[250px] flex-shrink-0">
          <div className="flex items-center w-full h-10 gap-2 px-5 border rounded-full border-zinc-300">
            <SearchIcon /> Search integrations
          </div>
          <div className="flex items-center py-2 mt-10 text-sm font-bold">
            Categories
          </div>
          <ul className="pb-8 -ml-2 border-b border-b-zinc-300">
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
          <div className="flex flex-col gap-4 mt-6">
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
          <div className="flex items-center h-10">
            <TagList tagLinks={tagLinks} />
          </div>
          <h3 className="mt-12 mb-8 text-2xl font-bold">New to Storybook 8</h3>
          {vta && <Preview key={vta.name} orientation="horizontal" {...vta} />}
          <h3 className="mt-12 mb-8 text-2xl font-bold">Popular addons</h3>
          <div className="grid grid-cols-3 gap-6">
            {popularAddons.map((addon) => (
              <Preview key={addon.name} orientation="vertical" {...addon} />
            ))}
          </div>
          <h3 className="mt-12 mb-8 text-2xl font-bold">Popular recipes</h3>
          <div className="flex flex-col gap-6">
            {popularRecipes.slice(0, 6).map((recipe) => (
              <Preview key={recipe.name} orientation="horizontal" {...recipe} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
