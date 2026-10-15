import { type ReactNode } from 'react';
import { AddonsSidebar } from '../../../components/addons-sidebar';
import { PageHeader } from '../../../components/page-header';
import { Search } from '../../../components/search';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <PageHeader
        title="Integrations"
        description="Integrate your tools with Storybook to connect workflows and unlock advanced features."
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
