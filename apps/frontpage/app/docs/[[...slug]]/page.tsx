import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { TreeProps } from '@repo/utils';
import { renderers, docsVersions, cn } from '@repo/utils';
import { getVersion } from '../../../lib/get-version';
import { getPageData } from '../../../lib/get-page';
import { Renderers } from '../../../components/docs/renderers';
import { generateDocsTree } from '../../../lib/get-tree';
import { slugHasVersion } from '../../../lib/slug-has-version';

interface PageProps {
  params: {
    slug: string[];
  };
}

export const generateStaticParams = () => {
  const result: { slug: string[] }[] = [];
  const tree = generateDocsTree();
  const treeFirstVersion = generateDocsTree(
    `content/docs/${docsVersions[0]?.id}`,
  );

  const ids = (data: TreeProps[], removeVersion: boolean) => {
    data.forEach((item) => {
      if ('slug' in item) {
        const newSlug = item.slug.replace('/docs/', '').split('/');
        if (removeVersion) newSlug.shift();
        result.push({
          slug: newSlug,
        });
      }
      if (item.children) {
        ids(item.children, removeVersion);
      }
    });
  };

  ids(treeFirstVersion, true);
  ids(tree, false);

  return result;
};

export default async function Page({ params: { slug } }: PageProps) {
  const activeVersion = getVersion(slug) || { id: 'next', label: 'Next' };
  const hasVersion = slugHasVersion(slug);
  const newSlug = slug ? [...slug] : [];
  if (!hasVersion) newSlug.unshift(activeVersion.id);

  const page = await getPageData(newSlug, activeVersion);

  if (!page) notFound();

  return (
    <div className="flex-1 w-full py-12">
      <div className="max-w-[720px] mx-auto">
        <h1
          className="relative mt-0 mb-6 text-4xl font-bold text-black transition-colors duration-200 group-hover:text-blue-500"
          data-docs-heading
        >
          {page.title || 'Title is missing'}
        </h1>
        {!page.hideRendererSelector && (
          <Renderers activeRenderer={renderers[0]?.id || ''} />
        )}
        {page.tabs && page.tabs.length > 0 ? (
          <div className="flex items-center gap-8 border-b border-zinc-200">
            {page.tabs.map((tab) => {
              const isActive = tab.slug === `/docs/${slug.join('/')}`;

              return (
                <Link
                  className={cn(
                    'border-b -mb-px pb-2 hover:text-blue-500 transition-colors px-2 text-sm capitalize',
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
          {page.content}
        </article>
      </div>
    </div>
  );
}
