import { type Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { globalSearchMetaKeys, globalSearchImportance } from '@repo/ui';
import { type DocsVersion, latestVersion } from '@repo/utils';
import { getVersion } from '../../../lib/get-version';
import { getPageData, type PageDataProps } from '../../../lib/get-page';
import { getAllTrees } from '../../../lib/get-all-trees';
import { getFlatTree } from '../../../lib/get-flat-tree';
import { Content } from '../../../components/docs/content';

interface Params {
  slug: string[];
}

type GenerateMetaData = (props: {
  params: Promise<Params>;
}) => Promise<Metadata>;

interface PageProps {
  params: Params;
}

async function getPageFromSlug(
  slug: string[],
): Promise<{ activeVersion: DocsVersion; page: PageDataProps | undefined }> {
  const activeVersion = getVersion(slug);
  const isLatest = activeVersion.id === latestVersion.id;

  const slugToFetch = slug ? [...slug] : [];
  if (!isLatest) slugToFetch.shift();
  slugToFetch.unshift(activeVersion.id);

  const page = await getPageData(slugToFetch, activeVersion);
  return { activeVersion, page };
}

export const generateMetadata: GenerateMetaData = async ({ params }) => {
  const slug = (await params).slug;
  const { activeVersion, page } = await getPageFromSlug(slug);

  const listofTrees = getAllTrees();
  const flatTree = getFlatTree({
    tree: listofTrees,
    filterDrafts: false,
    filterSecondLevelDirectories: false,
  });
  const newSlug = slug ?? [];
  const findPage = flatTree.find(
    (node) => node.slug === `/docs/${newSlug.join('/')}`,
  );

  return {
    title: page?.title ? `${page.title} | Storybook docs` : undefined,
    alternates: {
      canonical: findPage?.canonical,
    },
    other: {
      [globalSearchMetaKeys.version]: activeVersion.id,
      [globalSearchMetaKeys.importance]: globalSearchImportance.docs,
    },
  };
};

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
  // If the page is an index page, redirect to the parent page
  const isIndex = slug && slug[slug.length - 1] === 'index';
  if (isIndex) {
    const newSlug = slug ?? [];
    const pathWithoutIndex = `/docs/${newSlug.slice(0, -1).join('/')}`;
    redirect(pathWithoutIndex);
  }

  const { page } = await getPageFromSlug(slug);
  if (!page) notFound();

  return <Content page={page} />;
}
