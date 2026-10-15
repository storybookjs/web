import { type ReactNode } from 'react';
import { AddonsSidebar } from '../../../components/addons-sidebar';
import { PageHeader } from '../../../components/page-header';
import { Search } from '../../../components/search';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <PageHeader
        title="Addons"
        description="Extend Storybook with new features and connect it to the tools you use."
        showAddButton
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
