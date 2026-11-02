'use client';

import { usePathname } from 'next/navigation';
import { SubHeader } from '@repo/ui';

const addonsHref = '/';

const tabs = [
  { label: 'Addons', href: addonsHref },
  { label: 'Recipes', href: '/recipes' },
  { label: 'Third-party tools', href: '/integrations' },
];

export const CatalogTabs = () => {
  const pathname = usePathname();
  // Home and tag pages belong to the Addons tab
  const activeHref =
    tabs.find(({ href }) => href === pathname)?.href ?? addonsHref;

  return <SubHeader label="Integrations" tabs={tabs} activeHref={activeHref} />;
};
