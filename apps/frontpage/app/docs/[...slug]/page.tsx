import { type Metadata } from 'next';
import { notFound } from 'next/navigation';
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
  params: Promise<Params>;
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
    title: page?.title ? `${page.title} | Storybook docs` : 'Storybook docs',
    ...(page?.isIndexPage && !page?.isHeading && !page.isTab
      ? {
          robots: {
            index: false,
          },
        }
      : {
          alternates: {
            canonical: findPage?.canonical,
            types: {
              'text/markdown': `/docs/${newSlug.join('/')}.md`,
            },
          },
          other: {
            [globalSearchMetaKeys.version]: activeVersion.id,
            [globalSearchMetaKeys.importance]: globalSearchImportance.docs,
          },
        }),
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

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const { activeVersion, page } = await getPageFromSlug(slug);
  if (!page) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: page.title ?? 'Storybook docs',
    url: `https://storybook.js.org/docs/${slug.join('/')}`,
    publisher: {
      '@type': 'Organization',
      name: 'Storybook',
      url: 'https://storybook.js.org',
      logo: {
        '@type': 'ImageObject',
        url: 'https://storybook.js.org/icon.svg',
      },
    },
    isPartOf: {
      '@type': 'WebSite',
      name: 'Storybook',
      url: 'https://storybook.js.org',
    },
    about: {
      '@type': 'SoftwareApplication',
      name: 'Storybook',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Cross-platform',
    },
    inLanguage: 'en',
    version: activeVersion.label,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Content page={page} />
    </>
  );
}
