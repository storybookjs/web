import { type ReactNode } from 'react';
import { CatalogTabs } from '../../components/catalog-tabs';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <CatalogTabs />
      <div className="mb-24">{children}</div>
    </>
  );
}
