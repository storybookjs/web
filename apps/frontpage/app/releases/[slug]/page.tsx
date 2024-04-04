import { Footer } from '../../../components/footer/footer';
import { Header } from '@ui';
import { ReleaseNewsletter } from '../../../components/release-newsletter';
import { Sidebar } from '../../../components/docs/sidebar/sidebar';
import { getRelease } from '../../../lib/get-release';
import { getReleases } from '../../../lib/get-releases';
import { cn, container } from '../../../lib/tailwind';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Fragment } from 'react';

interface Props {
  params: {
    slug: string;
  };
}

export const generateStaticParams = async () => {
  return getReleases().map((release) => ({
    slug: release,
  }));
};

export default async function Page({ params: { slug } }: Props) {
  const releases = getReleases();

  // TODO: This is not really working on prod
  if (releases.includes(slug) === false) return notFound();

  const page = await getRelease(slug);

  return (
    <Fragment>
      <Header variant="system" />
      <main className={cn(container, 'lg:pl-5 lg:pr-8 flex gap-4')}>
        <Sidebar>
          <div className="flex flex-col pt-4 mt-4 border-t border-zinc-200">
            {releases
              .sort((a, b) => b.localeCompare(a))
              .map((release) => (
                <Link
                  key={release}
                  href={`/releases/${release}`}
                  className={cn(
                    'flex items-center text-sm h-8 text-zinc-600 hover:text-blue-500 transition-colors px-2',
                    release === slug && 'text-blue-500'
                  )}
                >
                  Version {release}
                </Link>
              ))}
          </div>
        </Sidebar>
        <article className="flex-1 w-full max-w-3xl py-12">
          <h1 className="mt-0 mb-6 text-4xl font-bold">
            {page?.frontmatter.title || 'Page Not Found'}
          </h1>
          {page && page.content}
          <ReleaseNewsletter />
        </article>
      </main>
      <Footer />
    </Fragment>
  );
}
