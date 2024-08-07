import { notFound } from 'next/navigation';
import { globalSearchMetaKeys, globalSearchImportance } from '@repo/ui';
import { latestVersion } from '@repo/utils';
import { type Metadata } from 'next';
import { getPageData } from '../../lib/get-page';
import { Content } from '../../components/docs/content';

export function generateMetadata(): Metadata {
  return {
    alternates: {
      canonical: '/docs',
    },
    other: {
      [globalSearchMetaKeys.version]: latestVersion.id,
      [globalSearchMetaKeys.importance]: globalSearchImportance.docs,
    },
  };
}

export default async function Page() {
  const page = await getPageData([latestVersion.id], latestVersion);

  if (!page) notFound();

  return <Content page={page} />;
}
