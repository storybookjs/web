import { notFound, redirect } from 'next/navigation';
import { globalSearchMetaKeys, globalSearchImportance } from '@repo/ui';
import { latestVersion } from '@repo/utils';
import { type Metadata } from 'next';
import { getVersion } from '../../../lib/get-version';
import { getPageData } from '../../../lib/get-page';
import { getAllTrees } from '../../../lib/get-all-trees';
import { getFlatTree } from '../../../lib/get-flat-tree';
import { Content } from '../../../components/docs/content';

interface PageProps {
  params: {
    slug?: string[];
  };
}

export async function generateMetadata({
  params: { slug },
}: PageProps): Promise<Metadata> {
  const activeVersion = getVersion(slug);
  const listofTrees = getAllTrees();
  const flatTree = getFlatTree({
    tree: listofTrees,
    filterDrafts: false,
    filterSecondLevelDirectories: false,
  });
  const findPage = flatTree.find(
    (node) => node.slug === `/docs/${slug?.join('/')}`,
  );

  const slugToFetch = slug ? [...slug] : [];
  const page = await getPageData(slugToFetch, activeVersion);

  return {
    title: `${page?.title || 'Docs'} | Storybook`,
    alternates: {
      canonical: findPage?.canonical,
    },
    other: {
      [globalSearchMetaKeys.version]: activeVersion.id,
      [globalSearchMetaKeys.importance]: globalSearchImportance.docs,
    },
  };
}

export const generateStaticParams = () => {
  const listofTrees = getAllTrees();
  const flatTree = getFlatTree({
    tree: listofTrees,
    filterDrafts: false,
    filterSecondLevelDirectories: false,
  });

  const listOfSlugs = flatTree
    .filter((node) => node.slug !== '/docs')
    .map((node) => ({
      slug: node.slug.replace('/docs/', '').split('/'),
    }));

  return listOfSlugs;
};

export default async function Page({ params: { slug } }: PageProps) {
  const activeVersion = getVersion(slug);
  const isLatest = activeVersion.id === latestVersion.id;
  const slugToFetch = slug ? [...slug] : [];
  if (!isLatest) slugToFetch.shift();
  slugToFetch.unshift(activeVersion.id);

  const page = await getPageData(slugToFetch, activeVersion);

  const isIndex = slug && slug[slug.length - 1] === 'index';
  const pathWithoutIndex = `/docs/${slug?.slice(0, -1).join('/')}`;

  // If the page is an index page, redirect to the parent page
  if (isIndex) redirect(pathWithoutIndex);

  if (!page) notFound();

  return <Content page={page} />;
}
