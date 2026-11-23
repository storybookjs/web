'use client';

import { BookIcon, EditIcon } from '@storybook/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@repo/utils';

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

export const AddonsSidebar = () => {
  const pathname = usePathname();

  return (
    <div className="hidden flex-shrink-0 md:block md:w-[250px]">
      <h3 className="mb-6 text-2xl font-bold">Categories</h3>
      <ul className="-ml-2 border-b border-b-zinc-300 pb-6 dark:border-b-slate-700">
        {categories.map(({ name, href }) => (
          <li key={name}>
            <Link
              href={href}
              rel="nofollow"
              className={cn(
                'flex items-center px-2 py-[5px] text-sm text-zinc-600 transition-colors hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-500',
                pathname === href && 'text-blue-500',
              )}
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-col gap-4">
        <a
          href="/docs/addons/install-addons"
          className="flex items-center gap-2 text-sm transition-colors hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-500"
        >
          <BookIcon /> How to install addons
        </a>
        <a
          href="/docs/addons/writing-addons"
          className="flex items-center gap-2 text-sm transition-colors hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-500"
        >
          <EditIcon /> Create an addon
        </a>
      </div>
    </div>
  );
};
