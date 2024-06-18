import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { TreeProps } from '@repo/utils';
import { latestVersion, cn } from '@repo/utils';
import { getVersion } from '../../../lib/get-version';
import { getPageData } from '../../../lib/get-page';
import { Renderers } from '../../../components/docs/renderers';
import { generateDocsTree } from '../../../lib/get-tree';

interface PageProps {
  params: {
    slug: string[];
  };
}

const latestVersionId = latestVersion.id;

export const generateStaticParams = () => {
  const result: { slug: string[] }[] = [];
  const tree = generateDocsTree();

  const getSlugs = (data: TreeProps[]) => {
    data.forEach((item) => {
      if ('slug' in item) {
        const newSlug = item.slug.replace('/docs/', '').split('/');
        const { id: versionId, inSlug: versionInSlug } = getVersion(newSlug);

        const isLatest = versionId === latestVersionId;

        if (isLatest) {
          // Remove the version
          newSlug.shift();
        } else if (versionInSlug) {
          newSlug[0] = versionInSlug;
        }
        result.push({
          slug: newSlug,
        });
      }
      if (item.children) {
        getSlugs(item.children);
      }
    });
  };
  getSlugs(tree);

  return result;
};

export default async function Page({ params: { slug } }: PageProps) {
  const activeVersion = getVersion(slug);
  const isLatest = activeVersion.id === latestVersion.id;
  const slugToFetch = slug ? [...slug] : [];
  if (!isLatest) slugToFetch.shift();
  slugToFetch.unshift(activeVersion.id);

  const page = await getPageData(slugToFetch, activeVersion);

  // if (!page) notFound();

  return <div>hello</div>;
}
