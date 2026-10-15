import { type Metadata } from 'next';
import { type ReactNode } from 'react';
import { AddonsSidebar } from '../../../components/addons-sidebar';
import { PageHeader } from '../../../components/page-header';
import { Search } from '../../../components/search';

const description =
  'Extend Storybook with new features and connect it to the tools you use.';

// Tag pages set their own title and inherit this description
export const metadata: Metadata = {
  title: 'Addons | Storybook integrations',
  description,
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <PageHeader
        title="Addons"
        description={description}
        action={{
          label: 'Add your addon',
          href: '/docs/addons/integration-catalog',
        }}
      />
      <Search kind="addons">
        <div className="flex flex-col gap-12 md:flex-row">
          <AddonsSidebar />
          <div className="flex-1">{children}</div>
        </div>
      </Search>
    </>
  );
}
