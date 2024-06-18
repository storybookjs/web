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

  console.log(page);

  // if (!page) notFound();

  if (!page) return <div>Hello World</div>;

  return <div>Hello World</div>;

  return (
    <div className="w-full min-w-0 flex-1 py-12">
      <div className="mx-auto max-w-[720px]">
        <h1
          className="relative mb-6 mt-0 text-4xl font-bold text-black transition-colors duration-200 group-hover:text-blue-500 dark:text-white"
          data-docs-heading
        >
          {page?.title || 'Title is missing'}
        </h1>
        {!page?.hideRendererSelector && <Renderers />}
        {page?.tabs && page.tabs.length > 0 ? (
          <div className="flex items-center gap-8 border-b border-zinc-200">
            {page?.tabs.map((tab) => {
              const isActive = tab.slug === `/docs/${slug.join('/')}`;

              return (
                <Link
                  className={cn(
                    '-mb-px border-b px-2 pb-2 text-sm capitalize transition-colors hover:text-blue-500',
                    isActive && 'border-b border-blue-500 text-blue-500',
                  )}
                  href={tab.slug}
                  key={tab.name}
                >
                  {tab.tab?.title || tab.title}
                </Link>
              );
            })}
          </div>
        ) : null}
        <article
          className={cn(
            '[&>details]:my-6',
            '[&>details]:relative',
            '[&>details[open]>summary]:mb-4',
            "[&>details[open]]:before:content-['']",
            '[&>details[open]]:before:absolute',
            '[&>details[open]]:before:border-l',
            '[&>details[open]]:before:border-l-zinc-200',
            '[&>details[open]]:before:left-1',
            '[&>details[open]]:before:top-[calc(28px+1em)]',
            '[&>details[open]]:before:h-[calc(100%-2.4rem)]',
            '[&>details[open]>*]:ml-7',
            '[&>details[open]>summary]:ml-0',
            '[&>details>summary]:text-blue-600',
            '[&>details>summary]:cursor-pointer',
            '[&>details>summary>h3]:inline',
            '[&>details>summary>h3]:text-xl',
          )}
        >
          {page?.content}
        </article>
      </div>
    </div>
  );
}
