import { notFound } from 'next/navigation';
import { globalSearchMetaKeys, globalSearchImportance } from '@repo/ui';
import { latestVersion } from '@repo/utils';
import { type Metadata } from 'next';
import { getPageData } from '../../lib/get-page';
import { Content } from '../../components/docs/content';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageData([latestVersion.id], latestVersion);

  return {
    title: page?.title ? `${page.title} | Storybook docs` : 'Storybook docs',
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
